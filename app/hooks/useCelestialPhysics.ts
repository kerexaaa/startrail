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

export default function useCelestialPhysics({
  name,
  startAngle,
  travelSpeed,
  bodyMeshRef,
  distance,
  rotationSpeed,
  orbitGroupRef,
}: UseCelestialPhysicsProps) {
  const simTime = useRef(0);

  const { timeMultiplier, timeResetTrigger } = usePlanetStore();

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

  useFrame((state, delta) => {
    simTime.current += delta * timeMultiplier;

    const currentAngle =
      (startAngle === 0 ? initialAngle : startAngle) +
      simTime.current * travelSpeed;

    if (orbitGroupRef?.current) {
      orbitGroupRef.current.position.x = Math.sin(currentAngle) * distance;
      orbitGroupRef.current.position.z = Math.cos(currentAngle) * distance;
    }

    if (bodyMeshRef?.current) {
      bodyMeshRef.current.rotation.y = simTime.current * rotationSpeed;
    }
  });
}
