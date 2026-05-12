import Sun from "./Sun";
import PlanetSystem from "./PlanetSystem";
import CameraRig from "./CameraRig";
import { Stars } from "@react-three/drei";
import useFetchMoons from "@/app/hooks/useFetchMoons";

export default function Scene() {
  useFetchMoons();

  return (
    <>
      <ambientLight intensity={0.03} />
      <pointLight
        args={["#fff", 0.5, 0]}
        decay={0}
        position={[0, 0, 0]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-radius={5}
      />
      <Stars />

      <CameraRig />

      <Sun />
      <PlanetSystem />
    </>
  );
}
