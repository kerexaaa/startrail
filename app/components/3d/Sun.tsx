import { usePlanetStore } from "@/app/states/usePlanetStore";
import { Outlines, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import BodyName from "./BodyName";
import { useUIStore } from "@/app/states/useUIStore";

export default function Sun() {
  const texture = useTexture("/textures/stars/sun/sun_8k.jpg");
  const sunRef = useRef<THREE.Group>(null);
  const [shiny, setShiny] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { isFreeCam } = useUIStore();

  const { setFocusedPlanet, setSearchTarget, registerPlanetRef } =
    usePlanetStore();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y = (time * 0.5) / 27;
    }
  });

  useEffect(() => {
    if (sunRef.current) registerPlanetRef("Sun", sunRef.current);
  }, [registerPlanetRef]);

  return (
    <group ref={sunRef}>
      <mesh
        onClick={(e) => {
          if (isFreeCam) return;
          e.stopPropagation();
          setFocusedPlanet(sunRef.current, Math.max(1.5, 10 * 4));
          setSearchTarget("Sun");
        }}
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
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[10, 64, 64]} />
        <BodyName name={"Sun"} isVisible={hovered} />
        <meshBasicMaterial map={texture} />
        {shiny && <Outlines thickness={1} color="red" />}
      </mesh>
    </group>
  );
}
