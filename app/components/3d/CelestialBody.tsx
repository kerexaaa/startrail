"use client";
import { useTexture, Outlines } from "@react-three/drei";
import { useEffect, useRef, useState, ReactNode, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import OrbitPath from "./OrbitPath";
import BodyName from "./BodyName";
import { usePlanetStore } from "../../states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { getBodyTextureUrls, getMoonTint } from "@/app/utils/textures";
import Rings from "./Rings";
import { MIN_CLICK_RADIUS } from "@/app/constants";
import { getBody } from "@/app/hooks/useAstroCalcs";
import * as Astronomy from "astronomy-engine";

interface CelestialBodyProps {
  name: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  travelSpeed: number;
  tilt?: number;
  orbitTilt?: number;
  startAngle?: number;
  isGeneric?: boolean;
  children?: ReactNode;
}

export default function CelestialBody({
  name,
  radius,
  distance,
  rotationSpeed,
  travelSpeed,
  tilt = 0,
  orbitTilt = 0,
  isGeneric = false,
  startAngle = 0,
  children,
}: CelestialBodyProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);
  const bodyMeshRef = useRef<THREE.Mesh>(null);
  const simTime = useRef(0);
  const proxyRadius = isGeneric
    ? radius * 2
    : Math.max(radius * 1.2, MIN_CLICK_RADIUS);
  const segments = isGeneric ? 16 : 64;

  const [hovered, setHovered] = useState(false);

  const {
    registerPlanetRef,
    setFocusedPlanet,
    setSearchTarget,
    timeMultiplier,
    timeResetTrigger,
    focusedPlanet,
    searchTarget,
  } = usePlanetStore();
  const { isFreeCam, showOrbits } = useUIStore();

  useEffect(() => {
    simTime.current = 0;
  }, [timeResetTrigger]);

  const { bodyUrl, ringUrl, ringScales } = getBodyTextureUrls(name);
  const bodyColor = useMemo(
    () => (isGeneric ? getMoonTint(name) : "#ffffff"),
    [isGeneric, name],
  );
  const texture = useTexture(bodyUrl);

  useEffect(() => {
    if (orbitGroupRef.current) registerPlanetRef(name, orbitGroupRef.current);
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

    const currentAngle =
      (startAngle === 0 ? initialAngle : startAngle) +
      simTime.current * travelSpeed;

    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.x = Math.sin(currentAngle) * distance;
      orbitGroupRef.current.position.z = Math.cos(currentAngle) * distance;
    }

    if (bodyMeshRef.current) {
      bodyMeshRef.current.rotation.y = simTime.current * rotationSpeed;
    }
  });

  return (
    <>
      <group rotation={[orbitTilt, 0, 0]}>
        {showOrbits && distance > 0 && !isGeneric && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <OrbitPath distance={distance} />
          </mesh>
        )}

        <group ref={orbitGroupRef}>
          {children}
          <group ref={tiltGroupRef} rotation={[0, 0, (tilt * Math.PI) / 180]}>
            <mesh ref={bodyMeshRef}>
              <sphereGeometry args={[radius, segments, segments]} />
              <meshStandardMaterial
                map={texture}
                color={bodyColor}
                transparent={isGeneric}
                opacity={1}
              />

              {ringUrl && ringScales && (
                <Rings
                  radius={radius}
                  ringUrl={ringUrl}
                  ringScales={ringScales}
                />
              )}
              {!isGeneric && hovered && <Outlines thickness={1} color="red" />}
            </mesh>
            <BodyName name={name} isVisible={hovered} />
            <mesh
              scale={focusedPlanet && searchTarget === name ? 0 : 1}
              onClick={(e) => {
                if (isFreeCam) return;
                e.stopPropagation();
                setFocusedPlanet(
                  orbitGroupRef.current,
                  Math.max(1.5, radius * 3),
                );
                setSearchTarget(name);
              }}
              onPointerEnter={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
              }}
              onPointerLeave={(e) => {
                e.stopPropagation();
                setHovered(false);
                document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry args={[proxyRadius, 16, 16]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}
