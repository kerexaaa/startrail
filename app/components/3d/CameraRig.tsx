import { FlyControls, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SmoothZoom from "./SmoothZoom";
import { useUIStore } from "@/app/states/useUIStore";
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

export default function CameraRig() {
  const { isUserIdle, isFreeCam } = useUIStore();

  return (
    <>
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
