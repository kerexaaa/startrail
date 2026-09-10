import { useTexture } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import * as THREE from "three";

const RING_COLOR = new THREE.Color(2.5, 2.5, 2.5);
const RING_EMISSIVE = new THREE.Color("#ffffff");

export default function Rings({
  radius,
  ringUrl,
  ringScales = [1.4, 2.4],
}: {
  radius: number;
  ringUrl: string;
  ringScales: [number, number];
}) {
  const ringTexture = useTexture(ringUrl);

  const ringGeo = useMemo(() => {
    const inner = radius * ringScales[0];
    const outer = radius * ringScales[1];
    const geometry = new THREE.RingGeometry(inner, outer, 128);

    const pos = geometry.attributes.position;
    const uvs = geometry.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);

      const u = (dist - inner) / (outer - inner);
      uvs.setXY(i, u, 0.5);
    }
    return geometry;
  }, [radius, ringScales]);

  useEffect(() => {
    return () => {
      ringGeo.dispose();
    };
  }, [ringGeo]);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeo} receiveShadow>
      <meshLambertMaterial
        map={ringTexture}
        transparent={true}
        opacity={0.6}
        side={THREE.DoubleSide}
        depthWrite={false}
        color={RING_COLOR}
        emissiveMap={ringTexture}
        emissive={RING_EMISSIVE}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
