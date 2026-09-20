import { useEffect, useMemo, useRef } from "react";
import { usePlanetStore } from "../states/usePlanetStore";
import { getBody } from "./useAstroCalcs";

import * as Astronomy from "astronomy-engine";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface UseCelestialPhysicsProps {
  name: string;
  startAngle: number;
  travelSpeed: number;
  distance: number;
  rotationSpeed: number;
  eccentricity: number;
  orbitGroupRef: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>;
  bodyMeshRef: React.RefObject<THREE.Mesh<
    THREE.BufferGeometry<
      THREE.NormalBufferAttributes,
      THREE.BufferGeometryEventMap
    >,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  > | null>;
}

/**
 * Solves Kepler's equation M = E - e*sin(E) for eccentric anomaly E
 * using Newton-Raphson iteration (converges in 3-5 steps for e < 0.3).
 */
function solveKepler(meanAnomaly: number, eccentricity: number): number {
  let E = meanAnomaly; // initial guess
  for (let i = 0; i < 6; i++) {
    E = E - (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E));
  }
  return E;
}

export default function useCelestialPhysics({
  name,
  startAngle,
  travelSpeed,
  bodyMeshRef,
  distance,
  rotationSpeed,
  eccentricity,
  orbitGroupRef,
}: UseCelestialPhysicsProps) {
  const simTime = useRef(0);

  const timeMultiplier = usePlanetStore((s) => s.timeMultiplier);
  const timeResetTrigger = usePlanetStore((s) => s.timeResetTrigger);

  useEffect(() => {
    simTime.current = 0;
  }, [timeResetTrigger]);

  const initialAngle = useMemo(() => {
    const body = getBody(name);
    if (!body) return 0;
    const date = new Date();
    const vector = Astronomy.HelioVector(body, date);
    return Math.atan2(vector.x, vector.z);
  }, [name]);

  // Pre-calculate ellipse parameters (semi-major, semi-minor, focal offset)
  const a = distance; // semi-major axis
  const b = a * Math.sqrt(1 - eccentricity * eccentricity); // semi-minor axis
  const focalOffset = a * eccentricity; // Sun at focus

  useFrame((_, delta) => {
    simTime.current += delta * timeMultiplier;

    // Mean anomaly (uniform angular rate)
    const M =
      (startAngle === 0 ? initialAngle : startAngle) +
      simTime.current * travelSpeed;

    if (eccentricity > 0.001) {
      // Solve Kepler's equation for eccentric anomaly
      const E = solveKepler(M, eccentricity);

      // Elliptical position with Sun at one focus
      if (orbitGroupRef.current) {
        orbitGroupRef.current.position.set(
          a * Math.cos(E) - focalOffset,
          0,
          b * Math.sin(E),
        );
      }
    } else {
      // Near-circular: skip Kepler solver for performance
      if (orbitGroupRef.current) {
        orbitGroupRef.current.position.set(
          Math.sin(M) * distance,
          0,
          Math.cos(M) * distance,
        );
      }
    }

    if (bodyMeshRef.current) {
      bodyMeshRef.current.rotation.y = simTime.current * rotationSpeed;
    }
  });
}
