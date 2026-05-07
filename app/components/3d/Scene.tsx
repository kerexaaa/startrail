import Sun from "./Sun";
import PlanetSystem from "./PlanetSystem";
import { FlyControls, OrbitControls, Stars } from "@react-three/drei";
import SmoothZoom from "./SmoothZoom";
import { useUIStore } from "@/app/states/useUIStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MIN_ZOOM, MAX_ZOOM } from "../../constants/index";

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
          minDistance={MIN_ZOOM}
          maxDistance={MAX_ZOOM}
        />
      )}

      <SmoothZoom />
    </>
  );
}
