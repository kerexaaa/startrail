"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import Sun from "./components/stars/Sun";
import SettingsButtons from "./components/SettingsButtons";
import { Slide, toast } from "react-toastify";
import * as THREE from "three";
import SearchPanel from "./components/SearchPanel";
import PlanetSystem from "./components/PlanetSystem";
import { usePlanetStore } from "./components/states/usePlanetStore";
import TimeController from "./components/TimeController";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFreeCam, setIsFreeCam] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUserIdle, setIsUserIdle] = useState(false);

  const { focusedPlanet, setFocusedPlanet, searchTarget, focusZoom } =
    usePlanetStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  const targetZoomRef = useRef(50);

  const zoomIn = () => {
    if (!controlsRef.current) return;
    targetZoomRef.current = Math.max(2, targetZoomRef.current - 2);
  };

  const zoomOut = () => {
    if (!controlsRef.current) return;
    targetZoomRef.current = Math.min(100, targetZoomRef.current + 2);
  };

  function SmoothZoom() {
    useFrame(() => {
      const controls = controlsRef.current;
      if (!controls) return;

      const camera: THREE.Camera = controls.object;
      const currentDistance = controls.getDistance();

      if (focusedPlanet) {
        const planetPos = new THREE.Vector3(
          focusedPlanet.position.x,
          0,
          focusedPlanet.position.z,
        );

        controls.target.lerp(planetPos, 0.08);

        if (isUserIdle) {
          const outDir = planetPos.clone().normalize();

          const distance = targetZoomRef.current;
          const cinematicPos = planetPos
            .clone()
            .add(
              new THREE.Vector3(
                outDir.x * distance,
                distance * 0.5,
                outDir.z * distance + distance * 0.3,
              ),
            );

          camera.position.lerp(cinematicPos, 0.04);
        } else {
          const newDistance = THREE.MathUtils.lerp(
            currentDistance,
            targetZoomRef.current,
            0.05,
          );

          const direction = camera.position
            .clone()
            .sub(controls.target)
            .normalize()
            .multiplyScalar(newDistance);

          camera.position.copy(controls.target.clone().add(direction));
        }
      } else {
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.08);

        const newDistance = THREE.MathUtils.lerp(
          currentDistance,
          targetZoomRef.current,
          0.06,
        );

        const direction = camera.position
          .clone()
          .sub(controls.target)
          .normalize()
          .multiplyScalar(newDistance);

        camera.position.copy(controls.target.clone().add(direction));
      }

      if (
        Math.abs(currentDistance - targetZoomRef.current) > 0.01 ||
        focusedPlanet
      ) {
        controls.update();
      }
    });

    return null;
  }

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 1 : -1;
      targetZoomRef.current = THREE.MathUtils.clamp(
        targetZoomRef.current + delta,
        2, // minDistance
        100, // maxDistance
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const Handle = () => {
    useEffect(() => {
      setIsLoading(true);
      return () => setIsLoading(false);
    }, []);

    return null;
  };

  const checkUserIdle = () => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsUserIdle(false);

      idleTimer = setTimeout(() => {
        console.log("User is idle...");
        setIsUserIdle(true);
      }, 10000);
    };

    window.addEventListener("click", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("wheel", resetIdleTimer);
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);

    return () => {
      window.removeEventListener("click", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("wheel", resetIdleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);

      clearTimeout(idleTimer);
    };
  };

  useEffect(() => {
    const cleanupIdle = checkUserIdle();
    return () => cleanupIdle?.();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        setIsFreeCam(false);
        toast.dismiss();
      }
      if (event.code === "KeyF") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
      if (
        (event.ctrlKey && event.key === "=") ||
        (event.ctrlKey && event.key === "+")
      ) {
        event.preventDefault();
        zoomIn();
      }
      if (event.ctrlKey && event.key === "-") {
        event.preventDefault();
        zoomOut();
      }
      if (event.code === "KeyQ" && focusedPlanet) {
        targetZoomRef.current = 50;
        setFocusedPlanet(null);
        toast.dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedPlanet, setFocusedPlanet]);

  useEffect(() => {
    if (focusedPlanet) {
      toast(`Tracking ${searchTarget}. Press Q to exit`, {
        toastId: "focus-toast",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
    if (focusedPlanet) {
      targetZoomRef.current = focusZoom || 6;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPlanet, focusZoom]);

  return (
    <main className="h-full w-full flex items-center justify-center bg-black">
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <Suspense fallback={<Handle />}>
          <ambientLight intensity={0.3} />
          <hemisphereLight args={["#333", "#000", 0.5]} position={[0, 0, 0]} />
          <pointLight args={["#fff", 5, 100]} position={[0, 0, 0]} />
          <Sun />
          <PlanetSystem />
          <Stars />
          <OrbitControls
            ref={controlsRef}
            autoRotate={isUserIdle}
            autoRotateSpeed={0.2}
            enableZoom={false}
            enablePan={false}
            minDistance={2}
            maxDistance={100}
          />
          <SmoothZoom />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="z-100"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`${isFreeCam ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity`}
      >
        <SettingsButtons
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          setIsFreeCam={setIsFreeCam}
          className="absolute bottom-8 right-8 flex flex-col gap-3 overflow-hidden"
        />
        <SearchPanel />
        <TimeController />
      </div>
    </main>
  );
}
