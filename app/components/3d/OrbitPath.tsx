import * as THREE from "three";

export default function OrbitPath({ distance }: { distance: number }) {
  const segments = Math.max(64, Math.floor(distance / 2));

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance + 0.02, distance + 0.04, segments]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
