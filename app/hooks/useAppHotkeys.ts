import { useEffect } from "react";
import { usePlanetStore } from "../states/usePlanetStore";
import { toast } from "react-toastify";
import { useUIStore } from "../states/useUIStore";
import { MIN_ZOOM, MAX_ZOOM, ZOOM_SPEED_MULTIPLIER } from "../constants/index";

export function useAppHotkeys() {
  const {
    setFocusedPlanet,
    setTargetZoom,
    focusedPlanet,
    focusZoom,
    setSearchTarget,
  } = usePlanetStore();

  const {
    isFreeCam,
    setIsFreeCam,
    setIsFullscreen,
    isInfoOpen,
    setIsInfoOpen,
  } = useUIStore();

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

      if (event.key === "Escape") {
        if (isInfoOpen) {
          setIsInfoOpen(false);
          return;
        }

        if (isFreeCam) {
          setIsFreeCam(false);
          toast.dismiss();
          return;
        }

        if (focusedPlanet) {
          setTargetZoom(50);
          setFocusedPlanet(null);
          setSearchTarget("");
          toast.dismiss();
          return;
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      setTargetZoom((prevZoom) => {
        const zoomDelta = prevZoom * ZOOM_SPEED_MULTIPLIER;

        if (event.deltaY > 0) {
          return Math.min(prevZoom + zoomDelta, MAX_ZOOM);
        } else {
          return Math.max(prevZoom - zoomDelta, MIN_ZOOM);
        }
      });
    };

    let initialPinchDistance: number | null = null;
    let initialZoomValue = 50;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const t1 = event.touches[0];
        const t2 = event.touches[1];
        initialPinchDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        initialZoomValue = usePlanetStore.getState().targetZoom;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && initialPinchDistance !== null) {
        event.preventDefault();

        const t1 = event.touches[0];
        const t2 = event.touches[1];
        const currentDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

        if (initialPinchDistance > 0 && currentDistance > 0) {
          const ratio = initialPinchDistance / currentDistance;
          const newZoom = initialZoomValue * ratio;
          setTargetZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom)));
        }
      }
    };

    const handleTouchEnd = () => {
      initialPinchDistance = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    focusedPlanet,
    setFocusedPlanet,
    setTargetZoom,
    setIsFullscreen,
    setIsFreeCam,
    setSearchTarget,
    isFreeCam,
    isInfoOpen,
    setIsInfoOpen,
    focusZoom,
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
