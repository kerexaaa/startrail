import * as THREE from "three";

export default function OrbitPath({ distance }: { distance: number }) {
  return (
    <>
      <ringGeometry args={[distance + 0.02, distance + 0.04, 64]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </>
  );
}
