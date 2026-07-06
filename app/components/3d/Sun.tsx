import { useTexture } from "@react-three/drei";
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

  const { hovered, setHovered, isFocused, handleFocus } =
    useCelestialInteraction("Sun", SUN_RADIUS, sunRef);

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
          <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
          <meshBasicMaterial map={texture} />

          {!isFocused && hovered && (
            <mesh scale={1.01} raycast={() => null}>
              <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
              <meshBasicMaterial
                color="#4da6ff"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}

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
