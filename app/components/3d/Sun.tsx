import { Outlines, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import BodyName from "./BodyName";
import { getBodyTextureUrls } from "@/app/utils/textures";
import { SUN_RADIUS, SUN_ROTATION_SPEED } from "../../constants/index";
import { useUIStore } from "@/app/states/useUIStore";
import InteractionZone from "./InteractionZone";
import useCelestialInteraction from "@/app/hooks/useCelestialInteraction";

export default function Sun() {
  const sunRef = useRef<THREE.Group>(null);
  const { bodyUrl } = getBodyTextureUrls("Sun");
  const texture = useTexture(bodyUrl);
  const { showLabels } = useUIStore();

  const { hovered, setHovered, isFocused, handleFocus } = useCelestialInteraction(
    "Sun",
    SUN_RADIUS,
    sunRef
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y = (time * 0.5) / SUN_ROTATION_SPEED;
    }
  });

  return (
    <group ref={sunRef}>
      <InteractionZone
        name="Sun"
        onHover={setHovered}
        orbitGroupRef={sunRef}
        radius={SUN_RADIUS}
        proxyRadius={SUN_RADIUS}
        isFocused={isFocused}
      >
        <mesh>
          <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
          <meshBasicMaterial map={texture} />
          
          {!isFocused && hovered && <Outlines thickness={1} color="red" />}
          
          <BodyName
            name={"Sun"}
            isVisible={hovered}
            isVIP={true}
            radius={SUN_RADIUS}
            showLabels={showLabels}
            isFocused={isFocused}
            onLabelClick={handleFocus}
            onHover={setHovered}
          />
        </mesh>
      </InteractionZone>
    </group>
  );
}