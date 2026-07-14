"use client";
import { useTexture } from "@react-three/drei";
import { useRef, ReactNode, useMemo } from "react";
import * as THREE from "three";
import OrbitPath from "./OrbitPath";
import BodyName from "./BodyName";
import Rings from "./Rings";
import InteractionZone from "./InteractionZone";
import { MIN_CLICK_RADIUS, PLANETARY_BODIES } from "@/app/constants";
import { getBodyTextureUrls, getMoonTint } from "@/app/utils/textures";
import { useUIStore } from "@/app/states/useUIStore";
import useCelestialPhysics from "@/app/hooks/useCelestialPhysics";
import useCelestialInteraction from "@/app/hooks/useCelestialInteraction";

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
  const bodyMeshRef = useRef<THREE.Mesh>(null);

  const { showOrbits, showLabels } = useUIStore();

  const { hovered, setHovered, isFocused, handleFocus } =
    useCelestialInteraction(name, radius, orbitGroupRef);

  useCelestialPhysics({
    name,
    distance,
    rotationSpeed,
    travelSpeed,
    startAngle,
    orbitGroupRef,
    bodyMeshRef,
  });

  const proxyRadius = isGeneric
    ? radius * 2
    : Math.max(radius * 1.2, MIN_CLICK_RADIUS);
  const segments = isGeneric ? 16 : 32;
  const { bodyUrl, ringUrl, ringScales } = getBodyTextureUrls(name);
  const bodyColor = useMemo(
    () => (isGeneric ? getMoonTint(name) : "#ffffff"),
    [isGeneric, name],
  );
  const texture = useTexture(bodyUrl);

  return (
    <group rotation={[orbitTilt, 0, 0]}>
      {showOrbits && distance > 0 && !isGeneric && (
        <OrbitPath distance={distance} />
      )}

      <group ref={orbitGroupRef}>
        {children}
        <BodyName
          name={name}
          isVisible={hovered}
          isVIP={!isGeneric && PLANETARY_BODIES.includes(name)}
          radius={radius}
          showLabels={showLabels}
          isFocused={isFocused}
          onLabelClick={handleFocus}
          onHover={setHovered}
        />
        <group rotation={[0, 0, (tilt * Math.PI) / 180]}>
          <mesh castShadow={!!ringUrl} ref={bodyMeshRef} name="planet">
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
          </mesh>
          <InteractionZone
            name={name}
            radius={radius}
            proxyRadius={proxyRadius}
            orbitGroupRef={orbitGroupRef}
            onHover={setHovered}
            isFocused={isFocused}
          >
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </InteractionZone>
        </group>
      </group>
    </group>
  );
}
