"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import Loader from "./components/ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import SettingsButtons from "./components/ui/SettingsButtons";
import { toast, Slide } from "react-toastify";
import { usePlanetStore } from "./states/usePlanetStore";
import { useUIStore } from "./states/useUIStore";
import Scene from "./components/3d/Scene";
import { useIdleTimer } from "./hooks/useIdleTimer";
import { useAppHotkeys } from "./hooks/useAppHotkeys";
import BodyInfo from "./components/ui/BodyInfo/BodyInfo";
import InfoModal from "./components/ui/InfoModal";
import { LOAD_SCENE } from "./constants";
import SearchButton from "./components/ui/SearchPanel/SearchButton";
import MenuButton from "./components/ui/Menu/MenuButton";
import TimeControllerWrapper from "./components/ui/TimeController/TimeControllerWrapper";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import ExitFreecamButton from "./components/ui/ExitFreecamButton";
import MobileJoystick from "./components/ui/MobileJoystick";
import * as THREE from "three";
// import useFetchMoons from "./hooks/useFetchMoons";

export default function Home() {
  const { isFreeCam, setIsLoading, isLoading } = useUIStore();
  const {
    focusedPlanet,
    searchTarget,
    focusZoom,
    setTargetZoom,
    setFocusedPlanet,
    setSearchTarget,
  } = usePlanetStore();
  const toastIdRef = useRef<string | null>(null);
  const prevFocusedPlanetRef = useRef<THREE.Group | null>(null);
  // useFetchMoons();
  const isTouch = useIsTouchDevice();
  const exitHint = isTouch ? "Tap empty space to exit" : "Press ESC to exit";

  useIdleTimer();
  useAppHotkeys();
  useEffect(() => {
    if (focusedPlanet) {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }

      const newToastId = `focus-${Date.now()}`;
      toastIdRef.current = newToastId;
      toast(`Tracking ${searchTarget}. ${exitHint}`, {
        toastId: newToastId,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setTargetZoom(focusZoom || 6);
      prevFocusedPlanetRef.current = focusedPlanet;
    } else {
      if (prevFocusedPlanetRef.current) {
        const pos = new THREE.Vector3();
        prevFocusedPlanetRef.current.getWorldPosition(pos);
        const distanceToSun = pos.length();
        setTargetZoom(Math.max(150, distanceToSun * 1.5));
        prevFocusedPlanetRef.current = null;
      } else {
        setTargetZoom(150);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPlanet]);

  const Handle = () => {
    useEffect(() => {
      setIsLoading(true);
      return () => setIsLoading(false);
    }, []);

    return null;
  };

  return (
    <main className="relative h-full w-full flex items-center justify-center bg-black overflow-hidden">
      {LOAD_SCENE && (
        <>
          <Canvas
            onPointerMissed={() => {
              if (isTouch && focusedPlanet) {
                setFocusedPlanet(null);
                setSearchTarget("");
                setTargetZoom(50); // или дефолтный зум
                toast.dismiss();
              }
            }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 100, 200], fov: 68, near: 0.1, far: 10000 }}
            shadows
          >
            <Suspense fallback={<Handle />}>
              <Scene />
            </Suspense>
          </Canvas>

          {isFreeCam && isTouch && <ExitFreecamButton />}
          <AnimatePresence>
            {isFreeCam && isTouch && <MobileJoystick />}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Loader />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <div
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 ${
          isFreeCam ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="pointer-events-auto">
          <SettingsButtons className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 flex flex-col items-end gap-3" />
          <SearchButton />
          <TimeControllerWrapper />
          <MenuButton />
          <BodyInfo />
          <InfoModal />
        </div>
      </div>
    </main>
  );
}
