import { usePlanetStore } from "@/app/states/usePlanetStore";
import { Outlines, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import BodyName from "./BodyName";
import { getBodyTextureUrls } from "@/app/utils/textures";
import { SUN_RADIUS, SUN_ROTATION_SPEED } from "../../constants/index";
import { useUIStore } from "@/app/states/useUIStore";
import InteractionZone from "./InteractionZone";

export default function Sun() {
  const sunRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { bodyUrl } = getBodyTextureUrls("Sun");
  const texture = useTexture(bodyUrl);
  const { showLabels } = useUIStore();

  const { registerPlanetRef } = usePlanetStore();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y = (time * 0.5) / SUN_ROTATION_SPEED;
    }
  });

  useEffect(() => {
    if (sunRef.current) registerPlanetRef("Sun", sunRef.current);
  }, [registerPlanetRef]);

  return (
    <group ref={sunRef}>
      <InteractionZone
        name="Sun"
        onHover={setHovered}
        orbitGroupRef={sunRef}
        radius={SUN_RADIUS}
        proxyRadius={SUN_RADIUS}
      >
        <mesh>
          <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
          <meshBasicMaterial map={texture} />
          {hovered && <Outlines thickness={1} color="red" />}
          <BodyName
            name={"Sun"}
            isVisible={hovered}
            isVIP={true}
            radius={SUN_RADIUS}
            showLabels={showLabels}
          />
        </mesh>
      </InteractionZone>
    </group>
  );
}
