import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from "three";

export default function Sun() {
  const texture = useTexture("/textures/stars/sun/sun_8k.jpg");
  const sunRef =
    useRef<
      THREE.Mesh<
        THREE.SphereGeometry,
        THREE.MeshStandardMaterial,
        THREE.Object3DEventMap
      >
    >(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y = (time * 0.5) / 27;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
