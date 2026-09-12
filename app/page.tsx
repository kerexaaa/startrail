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
import FeedbackModal from "./components/ui/FeedbackModal";
import { LOAD_SCENE, FALLBACK_FOCUS_ZOOM, UNFOCUS_MIN_ZOOM, UNFOCUS_ZOOM_MULTIPLIER, DEFAULT_ZOOM, MOBILE_DISMISS_ZOOM } from "./constants";
import SearchButton from "./components/ui/SearchPanel/SearchButton";
import MenuButton from "./components/ui/Menu/MenuButton";
import TimeControllerWrapper from "./components/ui/TimeController/TimeControllerWrapper";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import ExitFreecamButton from "./components/ui/ExitFreecamButton";
import MobileJoystick from "./components/ui/MobileJoystick";
import * as THREE from "three";
import { WebGLErrorBoundary } from "./components/ui/WebGLErrorBoundary";

const TEMP_POS = new THREE.Vector3();

function LoadingHandle() {
  const setIsLoading = useUIStore((state) => state.setIsLoading);
  useEffect(() => {
    setIsLoading(true);
    return () => setIsLoading(false);
  }, [setIsLoading]);
  return null;
}

export default function Home() {
  const isFreeCam = useUIStore((s) => s.isFreeCam);
  const isLoading = useUIStore((s) => s.isLoading);
  const focusedPlanet = usePlanetStore((s) => s.focusedPlanet);
  const searchTarget = usePlanetStore((s) => s.searchTarget);
  const focusZoom = usePlanetStore((s) => s.focusZoom);
  const setTargetZoom = usePlanetStore((s) => s.setTargetZoom);
  const setFocusedPlanet = usePlanetStore((s) => s.setFocusedPlanet);
  const setSearchTarget = usePlanetStore((s) => s.setSearchTarget);
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
      setTargetZoom(focusZoom || FALLBACK_FOCUS_ZOOM);
      prevFocusedPlanetRef.current = focusedPlanet;
    } else {
      if (prevFocusedPlanetRef.current) {
        prevFocusedPlanetRef.current.getWorldPosition(TEMP_POS);
        const distanceToSun = TEMP_POS.length();
        setTargetZoom(Math.max(UNFOCUS_MIN_ZOOM, distanceToSun * UNFOCUS_ZOOM_MULTIPLIER));
        prevFocusedPlanetRef.current = null;
      } else {
        setTargetZoom(DEFAULT_ZOOM);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPlanet]);

  return (
    <main className="relative h-full w-full flex items-center justify-center bg-black overflow-hidden">
      {LOAD_SCENE && (
        <>
          <WebGLErrorBoundary>
            <Canvas
              onPointerMissed={() => {
                if (isTouch && focusedPlanet) {
                  setFocusedPlanet(null);
                  setSearchTarget("");
                  setTargetZoom(MOBILE_DISMISS_ZOOM);
                  toast.dismiss();
                }
              }}
              dpr={[1, 1.5]}
              camera={{ position: [0, 100, 200], fov: 68, near: 0.1, far: 10000 }}
              shadows
            >
              <Suspense fallback={<LoadingHandle />}>
                <Scene />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>

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
          <FeedbackModal />
        </div>
      </div>
    </main>
  );
}
