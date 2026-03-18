import Sun from "./Sun";
import PlanetSystem from "./PlanetSystem";
import { FlyControls, OrbitControls, Stars } from "@react-three/drei";
import SmoothZoom from "./SmoothZoom";
import { useUIStore } from "@/app/states/useUIStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const tempDir = new THREE.Vector3();
const tempTarget = new THREE.Vector3();

function DroneLeveler() {
  useFrame(({ camera }) => {
    camera.getWorldDirection(tempDir);

    tempTarget.copy(camera.position).add(tempDir);

    camera.up.set(0, 1, 0);

    camera.lookAt(tempTarget);
  });
  return null;
}

export default function Scene() {
  const { isUserIdle, isFreeCam } = useUIStore();

  return (
    <>
      <ambientLight intensity={0.2} />
      <hemisphereLight args={["#333", "#000", 1]} position={[0, 0, 0]} />
      <pointLight args={["#fff", 500, 0]} position={[0, 0, 0]} />

      <Sun />
      <PlanetSystem />
      <Stars />

      {isFreeCam ? (
        <>
          <FlyControls
            dragToLook={true}
            movementSpeed={20}
            rollSpeed={0.5}
            makeDefault
          />
          <DroneLeveler />
        </>
      ) : (
        <OrbitControls
          makeDefault
          autoRotate={isUserIdle}
          autoRotateSpeed={0.2}
          enableZoom={false}
          enablePan={false}
          minDistance={2}
          maxDistance={100}
        />
      )}

      <SmoothZoom />
    </>
  );
}
