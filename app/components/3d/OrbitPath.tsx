import { useMemo } from "react";
import * as THREE from "three";

interface OrbitPathProps {
  distance: number;
  eccentricity?: number;
}

const ORBIT_SEGMENTS = 256;

export default function OrbitPath({
  distance,
  eccentricity = 0,
}: OrbitPathProps) {
  const points = useMemo(() => {
    const a = distance; // большая полуось
    const b = a * Math.sqrt(1 - eccentricity * eccentricity); // малая полуось
    const focalOffset = a * eccentricity; // Смещение фокуса (Солнца)

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const theta = (i / ORBIT_SEGMENTS) * Math.PI * 2;
      // Параметрическое уравнение эллипса со смещением
      const x = a * Math.cos(theta) - focalOffset;
      const z = b * Math.sin(theta);
      pts.push(new THREE.Vector3(x, 0, z));
    }
    return pts;
  }, [distance, eccentricity]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial attach="material" color="white" transparent opacity={0.1} />
    </line>
  );
}
