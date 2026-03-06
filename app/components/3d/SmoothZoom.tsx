import { usePlanetStore } from "@/app/states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const tempPlanetPos = new THREE.Vector3();
const tempOutDir = new THREE.Vector3();
const tempCinematicPos = new THREE.Vector3();
const tempDirection = new THREE.Vector3();
const origin = new THREE.Vector3(0, 0, 0);

export default function SmoothZoom() {
  const { isUserIdle } = useUIStore();
  const { focusedPlanet, targetZoom } = usePlanetStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useThree((state) => state.controls as any);

  useFrame(() => {
    if (!controls) return;

    const camera: THREE.Camera = controls.object;
    const currentDistance = controls.getDistance();

    if (focusedPlanet) {
      tempPlanetPos.set(focusedPlanet.position.x, 0, focusedPlanet.position.z);

      controls.target.lerp(tempPlanetPos, 0.08);

      if (isUserIdle) {
        tempOutDir.copy(tempPlanetPos).normalize();

        const distance = targetZoom;

        tempCinematicPos
          .copy(tempPlanetPos)
          .add(
            tempDirection.set(
              tempOutDir.x * distance,
              distance * 0.5,
              tempOutDir.z * distance + distance * 0.3,
            ),
          );

        camera.position.lerp(tempCinematicPos, 0.04);
      } else {
        const newDistance = THREE.MathUtils.lerp(
          currentDistance,
          targetZoom,
          0.05,
        );

        tempDirection
          .copy(camera.position)
          .sub(controls.target)
          .normalize()
          .multiplyScalar(newDistance);

        camera.position.copy(controls.target).add(tempDirection);
      }
    } else {
      controls.target.lerp(origin, 0.08);

      const newDistance = THREE.MathUtils.lerp(
        currentDistance,
        targetZoom,
        0.06,
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
