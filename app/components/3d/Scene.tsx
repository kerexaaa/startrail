import Sun from "./Sun";
import PlanetSystem from "./PlanetSystem";
import CameraRig from "./CameraRig";
import { Stars } from "@react-three/drei";
import useFetchMoons from "@/app/hooks/useFetchMoons";

const SHADOW_MAP_SIZE: [number, number] = [2048, 2048];

export default function Scene() {
  useFetchMoons();

  return (
    <>
      <ambientLight intensity={0.05} />

      <pointLight
        args={["#fff", 2.5, 0]}
        decay={0}
        position={[0, 0, 0]}
        castShadow
        shadow-mapSize={SHADOW_MAP_SIZE}
        shadow-bias={-0.0005}
        shadow-camera-far={650}
        shadow-radius={1}
      />

      <Stars
        radius={3000}
        depth={500}
        count={10000}
        factor={4}
        saturation={0}
        speed={1}
      />

      <CameraRig />

      <Sun />
      <PlanetSystem />
    </>
  );
}
