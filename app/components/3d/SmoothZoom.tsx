import { usePlanetStore } from "@/app/states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ZOOM_LERP_FACTOR } from "../../constants/index";

const tempOutDir = new THREE.Vector3();
const tempCinematicPos = new THREE.Vector3();
const tempDirection = new THREE.Vector3();
const origin = new THREE.Vector3(0, 0, 0);
const vWorldPos = new THREE.Vector3();

export default function SmoothZoom() {
  const { isUserIdle, isFreeCam } = useUIStore();
  const { focusedPlanet, targetZoom } = usePlanetStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useThree((state) => state.controls as any);

  useFrame(() => {
    if (!controls || isFreeCam) return;

    const camera: THREE.Camera = controls.object;
    const currentDistance = controls.getDistance();

    if (focusedPlanet) {
      focusedPlanet.getWorldPosition(vWorldPos);

      controls.target.lerp(vWorldPos, ZOOM_LERP_FACTOR);

      if (isUserIdle) {
        tempOutDir.copy(vWorldPos).normalize();

        const distance = targetZoom;

        tempCinematicPos
          .copy(vWorldPos)
          .add(
            tempDirection.set(
              tempOutDir.x * distance,
              distance * 0.5,
              tempOutDir.z * distance + distance,
            ),
          );

        camera.position.lerp(tempCinematicPos, ZOOM_LERP_FACTOR);
      } else {
        const newDistance = THREE.MathUtils.lerp(
          currentDistance,
          targetZoom,
          ZOOM_LERP_FACTOR,
        );

        tempDirection
          .copy(camera.position)
          .sub(controls.target)
          .normalize()
          .multiplyScalar(newDistance);

        camera.position.copy(controls.target).add(tempDirection);
      }
    } else {
      controls.target.lerp(origin, ZOOM_LERP_FACTOR);

      const newDistance = THREE.MathUtils.lerp(
        currentDistance,
        targetZoom,
        ZOOM_LERP_FACTOR,
      );

      tempDirection
        .copy(camera.position)
        .sub(controls.target)
        .normalize()
        .multiplyScalar(newDistance);

      camera.position.copy(controls.target).add(tempDirection);
    }

    if (Math.abs(currentDistance - targetZoom) > 0.01 || focusedPlanet) {
      controls.update();
    }
  });

  return null;
}
