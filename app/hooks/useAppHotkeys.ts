import { useEffect } from "react";
import { usePlanetStore } from "../states/usePlanetStore";
import { toast } from "react-toastify";
import { useUIStore } from "../states/useUIStore";
import { MIN_ZOOM, MAX_ZOOM } from "../constants/index";

export function useAppHotkeys() {
  const { setFocusedPlanet, setTargetZoom, focusedPlanet } = usePlanetStore();
  const { setIsFreeCam, setIsFullscreen } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        setIsFreeCam(false);
        toast.dismiss();
      }

      if (event.code === "KeyF") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable fullscreen: ${err.message}`,
            );
          });
        } else {
          document.exitFullscreen().catch((err) => {
            console.error(
              `Error attempting to exit fullscreen: ${err.message}`,
            );
          });
        }
      }

      if (
        (event.ctrlKey && event.key === "=") ||
        (event.ctrlKey && event.key === "+")
      ) {
        event.preventDefault();
        setTargetZoom((prev) => Math.max(2, prev - 2));
      }

      if (event.ctrlKey && event.key === "-") {
        event.preventDefault();
        setTargetZoom((prev) => Math.min(100, prev + 2));
      }

      if (event.code === "KeyQ" && focusedPlanet) {
        setTargetZoom(50);
        setFocusedPlanet(null);
        toast.dismiss();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 1 : -1;
      setTargetZoom((prev) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta)));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [
    focusedPlanet,
    setFocusedPlanet,
    setTargetZoom,
    setIsFullscreen,
    setIsFreeCam,
  ]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setIsFullscreen]);
}
