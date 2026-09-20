"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { SUN_RADIUS, DISTANCE_SCALE, BASE_SPEED } from "@/app/constants";

const ASTEROID_COUNT = 2000;
const INNER_RADIUS = SUN_RADIUS + 2.1 * DISTANCE_SCALE;
const OUTER_RADIUS = SUN_RADIUS + 3.3 * DISTANCE_SCALE;
const BELT_HEIGHT = 1.5;
const MIN_ASTEROID_SIZE = 0.04;
const MAX_ASTEROID_SIZE = 0.15;
const BELT_SPEED = (1 / 4.5) * BASE_SPEED;

function generateAsteroids() {
  const data: {
    angle: number;
    radius: number;
    y: number;
    scale: number;
    speed: number;
  }[] = [];

  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const t = i / ASTEROID_COUNT;
    const hash1 = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const hash2 = Math.sin(i * 269.5 + 183.3) * 43758.5453;
    const hash3 = Math.sin(i * 419.2 + 71.9) * 43758.5453;

    const r1 = hash1 - Math.floor(hash1);
    const r2 = hash2 - Math.floor(hash2);
    const r3 = hash3 - Math.floor(hash3);

    const angle = t * Math.PI * 2;
    const radius = INNER_RADIUS + r1 * (OUTER_RADIUS - INNER_RADIUS);
    const y = (r2 - 0.5) * BELT_HEIGHT;
    const scale = MIN_ASTEROID_SIZE + r3 * (MAX_ASTEROID_SIZE - MIN_ASTEROID_SIZE);
    const speedVariation = 0.85 + r1 * 0.3;

    data.push({ angle, radius, y, scale, speed: BELT_SPEED * speedVariation });
  }

  return data;
}

const ASTEROID_DATA = generateAsteroids();
const _dummy = new THREE.Object3D();

export default function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const simTime = useRef(0);

  const timeMultiplier = usePlanetStore((s) => s.timeMultiplier);
  const timeResetTrigger = usePlanetStore((s) => s.timeResetTrigger);

  useEffect(() => {
    simTime.current = 0;
  }, [timeResetTrigger]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    simTime.current += delta * timeMultiplier;

    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const ast = ASTEROID_DATA[i];
      const currentAngle = ast.angle + simTime.current * ast.speed;

      _dummy.position.set(
        Math.sin(currentAngle) * ast.radius,
        ast.y,
        Math.cos(currentAngle) * ast.radius,
      );
      _dummy.scale.setScalar(ast.scale);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, _dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, ASTEROID_COUNT]}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8a8078"
        roughness={0.9}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
