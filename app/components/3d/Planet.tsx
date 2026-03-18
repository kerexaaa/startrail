"use client";
import { useTexture, Outlines } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import OrbitPath from "./OrbitPath";
import { usePlanetStore } from "../../states/usePlanetStore";
import * as Astronomy from "astronomy-engine";
import { getBody } from "@/app/hooks/useAstroCalcs";
import BodyName from "./BodyName";
import { useUIStore } from "@/app/states/useUIStore";

interface PlanetProps {
  name: string;
  texturePath: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  travelSpeed: number;
  tilt: number;
  ringTexturePath?: string;
}

export default function Planet({
  name,
  texturePath,
  radius,
  distance,
  rotationSpeed,
  travelSpeed,
  tilt,
  ringTexturePath,
}: PlanetProps) {
  const texture = useTexture(texturePath);
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [shiny, setShiny] = useState(false);
  const [hovered, setHovered] = useState(false);

  const ringTexture = useTexture(
    ringTexturePath || "/textures/planets/placeholder.png",
  );

  const { isFreeCam } = useUIStore();

  const simTime = useRef(0);
  const {
    registerPlanetRef,
    setFocusedPlanet,
    setSearchTarget,
    timeMultiplier,
    timeResetTrigger,
  } = usePlanetStore();

  useEffect(() => {
    simTime.current = 0;
  }, [timeResetTrigger]);

  useEffect(() => {
    if (orbitRef.current) registerPlanetRef(name, orbitRef.current);
  }, [name, registerPlanetRef]);

  const initialAngle = useMemo(() => {
    const body = getBody(name);
    if (!body) return 0;
    const date = new Date();
    const vector = Astronomy.HelioVector(body, date);
    return Math.atan2(vector.x, vector.z);
  }, [name]);

  useFrame((state, delta) => {
    simTime.current += delta * timeMultiplier;

    const currentAngle = initialAngle + simTime.current * travelSpeed;

    if (orbitRef.current) {
      orbitRef.current.position.x = Math.sin(currentAngle) * distance;
      orbitRef.current.position.z = Math.cos(currentAngle) * distance;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y = simTime.current * rotationSpeed;
    }
  });

  const ringGeo = useMemo(() => {
    if (!ringTexturePath) return null;

    const inner = radius * 1.4;
    const outer = radius * 2.4;
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
  }, [radius, ringTexturePath]);

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <OrbitPath distance={distance} />
      </mesh>
      <group ref={orbitRef}>
        <group rotation={[0, 0, (tilt * Math.PI) / 180]}>
          <mesh
            ref={planetRef}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setShiny(true);
              setHovered(true);
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
              setShiny(false);
              setHovered(false);
            }}
            onClick={(e) => {
              if (isFreeCam) return;
              e.stopPropagation();
              setFocusedPlanet(orbitRef.current, Math.max(1.5, radius * 4));
              setSearchTarget(name);
            }}
          >
            <sphereGeometry args={[radius, 64, 64]} />{" "}
            <meshStandardMaterial map={texture} />
            <BodyName name={name} isVisible={hovered} />
            {ringGeo && ringTexture && (
              <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeo}>
                <meshStandardMaterial
                  map={ringTexture}
                  transparent={true}
                  opacity={0.9}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
            {shiny && <Outlines thickness={1} color="red" />}
          </mesh>
        </group>
      </group>
    </>
  );
}
