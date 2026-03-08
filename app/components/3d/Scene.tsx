import Sun from "./Sun";
import PlanetSystem from "./PlanetSystem";
import { OrbitControls, Stars } from "@react-three/drei";
import SmoothZoom from "./SmoothZoom";
import { useUIStore } from "@/app/states/useUIStore";

export default function Scene() {
  const { isUserIdle } = useUIStore();

  return (
    <>
      <ambientLight intensity={0.2} />
      <hemisphereLight args={["#333", "#000", 1]} position={[0, 0, 0]} />
      <pointLight args={["#fff", 500, 0]} position={[0, 0, 0]} />

      <Sun />
      <PlanetSystem />
      <Stars />

      <OrbitControls
        makeDefault
        autoRotate={isUserIdle}
        autoRotateSpeed={0.2}
        enableZoom={false}
        enablePan={false}
        minDistance={2}
        maxDistance={100}
      />
      <SmoothZoom />
    </>
  );
}
