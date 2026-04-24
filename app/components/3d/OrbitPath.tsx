import * as THREE from "three";

export default function OrbitPath({ distance }: { distance: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance + 0.02, distance + 0.04, 64]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
