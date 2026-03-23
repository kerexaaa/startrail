"use client";
import { useTexture, Outlines } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import OrbitPath from "./OrbitPath";
import { usePlanetStore } from "../../states/usePlanetStore";
import * as Astronomy from "astronomy-engine";
import { getBody } from "@/app/hooks/useAstroCalcs";
import BodyName from "./BodyName";
import { useUIStore } from "@/app/states/useUIStore";
import { getBodyTextureUrls } from "@/app/utils/textures";
import Rings from "./Rings";

interface PlanetProps {
  name: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  travelSpeed: number;
  tilt: number;
}

export default function Planet({
  name,
  radius,
  distance,
  rotationSpeed,
  travelSpeed,
  tilt,
}: PlanetProps) {
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [shiny, setShiny] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { bodyUrl, ringUrl, ringScales } = getBodyTextureUrls(name);
  const bodyTexture = useTexture(bodyUrl);

  const { isFreeCam, showOrbits } = useUIStore();

  const simTime = useRef(0);
  const {
    registerPlanetRef,
    setFocusedPlanet,
    setSearchTarget,
    timeMultiplier,
    timeResetTrigger,
  } = usePlanetStore();

  useEffect(() => {
    simTime.current = 0;
  }, [timeResetTrigger]);

  useEffect(() => {
    if (orbitRef.current) registerPlanetRef(name, orbitRef.current);
  }, [name, registerPlanetRef]);

  const initialAngle = useMemo(() => {
    const body = getBody(name);
    if (!body) return 0;
    const date = new Date();
    const vector = Astronomy.HelioVector(body, date);
    return Math.atan2(vector.x, vector.z);
  }, [name]);

  useFrame((state, delta) => {
    simTime.current += delta * timeMultiplier;

    const currentAngle = initialAngle + simTime.current * travelSpeed;

    if (orbitRef.current) {
      orbitRef.current.position.x = Math.sin(currentAngle) * distance;
      orbitRef.current.position.z = Math.cos(currentAngle) * distance;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y = simTime.current * rotationSpeed;
    }
  });

  return (
    <>
      {showOrbits && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <OrbitPath distance={distance} />
        </mesh>
      )}
      <group ref={orbitRef}>
        <group rotation={[0, 0, (tilt * Math.PI) / 180]}>
          <mesh
            ref={planetRef}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setShiny(true);
              setHovered(true);
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
              setShiny(false);
              setHovered(false);
            }}
            onClick={(e) => {
              if (isFreeCam) return;
              e.stopPropagation();
              setFocusedPlanet(orbitRef.current, Math.max(1.5, radius * 4));
              setSearchTarget(name);
            }}
          >
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial map={bodyTexture} />
            <BodyName name={name} isVisible={hovered} />
            {ringUrl && (
              <Rings
                radius={radius}
                ringUrl={ringUrl}
                ringScales={ringScales!}
              />
            )}
            {shiny && <Outlines thickness={1} color="red" />}
          </mesh>
        </group>
      </group>
    </>
  );
}
