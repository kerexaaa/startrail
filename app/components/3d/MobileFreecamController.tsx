import { usePlanetStore } from "@/app/states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function MobileFreecamController() {
  const tempX = useMemo(() => new THREE.Vector3(), []);
  const tempY = useMemo(() => new THREE.Vector3(), []);
  const tempZ = useMemo(() => new THREE.Vector3(), []);
  const movementVector = useMemo(() => new THREE.Vector3(), []);
  const currentVelocity = useMemo(() => new THREE.Vector2(0, 0), []);
  const currentVelocityVertical = useRef(0);
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const rotationInitialized = useRef(false);

  useEffect(() => {
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      const { isFreeCam } = useUIStore.getState();
      if (!isFreeCam) return;

      if (e.clientX < 150 && e.clientY > window.innerHeight - 150) return;
      if (
        e.clientX > window.innerWidth - 150 &&
        e.clientY > window.innerHeight - 150
      )
        return;

      isPointerDown = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;

      targetRotation.current.y -= dx * 0.003; // Yaw
      targetRotation.current.x -= dy * 0.003; // Pitch

      targetRotation.current.x = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, targetRotation.current.x),
      );

      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isPointerDown = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []); // Ref does not change, dependencies can be empty

  useFrame((state, delta) => {
    const camera = state.camera;

    if (!rotationInitialized.current) {
      camera.rotation.order = "YXZ"; // Use YXZ order to prevent gimbal locks
      targetRotation.current.set(camera.rotation.x, camera.rotation.y);
      rotationInitialized.current = true;
    }

    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      targetRotation.current.y,
      0.15,
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      targetRotation.current.x,
      0.15,
    );

    const { joystickDelta, joystickVertical } = usePlanetStore.getState();
    const targetX = joystickDelta ? joystickDelta.x : 0;
    const targetY = joystickDelta ? joystickDelta.y : 0;
    const targetVertical = joystickVertical || 0;

    currentVelocity.x = THREE.MathUtils.lerp(currentVelocity.x, targetX, 0.1);
    currentVelocity.y = THREE.MathUtils.lerp(currentVelocity.y, targetY, 0.1);
    currentVelocityVertical.current = THREE.MathUtils.lerp(
      currentVelocityVertical.current,
      targetVertical,
      0.1,
    );

    if (
      Math.abs(currentVelocity.x) < 0.001 &&
      Math.abs(currentVelocity.y) < 0.001 &&
      Math.abs(currentVelocityVertical.current) < 0.001
    )
      return;

    camera.matrix.extractBasis(tempX, tempY, tempZ);
    tempX.normalize();
    tempY.normalize();
    tempZ.normalize();

    const speed = 40 * delta;

    movementVector
      .copy(tempZ)
      .multiplyScalar(currentVelocity.y)
      .addScaledVector(tempX, currentVelocity.x)
      .addScaledVector(tempY, currentVelocityVertical.current)
      .multiplyScalar(speed);

    camera.position.add(movementVector);
  });

  return null;
}
