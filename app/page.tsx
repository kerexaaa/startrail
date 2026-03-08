"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import Loader from "./components/ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import SettingsButtons from "./components/ui/SettingsButtons";
import { Slide, toast } from "react-toastify";
import SearchPanel from "./components/ui/SearchPanel";
import { usePlanetStore } from "./states/usePlanetStore";
import TimeController from "./components/ui/TimeController";
import { useUIStore } from "./states/useUIStore";
import Scene from "./components/3d/Scene";
import { useIdleTimer } from "./hooks/useIdleTimer";
import { useAppHotkeys } from "./hooks/useAppHotkeys";
import BodyInfo from "./components/ui/BodyInfo";

export default function Home() {
  const { isFreeCam, setIsLoading, isLoading } = useUIStore();
  const { focusedPlanet, searchTarget, focusZoom, setTargetZoom } =
    usePlanetStore();

  useIdleTimer();
  useAppHotkeys();

  useEffect(() => {
    if (focusedPlanet) {
      toast(`Tracking ${searchTarget}. Press Q to exit`, {
        toastId: "focus-toast",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
    if (focusedPlanet) {
      setTargetZoom(focusZoom || 6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPlanet, focusZoom]);

  const Handle = () => {
    useEffect(() => {
      setIsLoading(true);
      return () => setIsLoading(false);
    }, []);

    return null;
  };

  return (
    <main className="relative h-full w-full flex items-center justify-center bg-black overflow-hidden">
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <Suspense fallback={<Handle />}>
          <Scene />
        </Suspense>
      </Canvas>

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

      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 ${
          isFreeCam ? "opacity-0" : "opacity-100"
        }`}
      >
        <SettingsButtons className="pointer-events-auto absolute bottom-8 right-8 flex flex-col gap-3 overflow-hidden" />

        <div className="pointer-events-auto">
          <SearchPanel />
        </div>

        <div className="pointer-events-auto">
          <TimeController />
        </div>
        <div className="pointer-events-auto">
          <BodyInfo />
        </div>
      </div>
    </main>
  );
}
