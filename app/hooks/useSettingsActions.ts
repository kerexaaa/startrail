import { useCallback } from "react";
import { Slide, toast } from "react-toastify";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";

export function useSettingsActions() {
  const setIsFreeCam = useUIStore((s) => s.setIsFreeCam);
  const setIsFullscreen = useUIStore((s) => s.setIsFullscreen);
  const isFullscreen = useUIStore((s) => s.isFullscreen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  const setFocusedPlanet = usePlanetStore((s) => s.setFocusedPlanet);
  const setSearchTarget = usePlanetStore((s) => s.setSearchTarget);

  const isTouch = useIsTouchDevice();

  const handleToggleFreecam = useCallback(
    (closeMobileMenu = false) => {
      setIsFreeCam(true);
      setFocusedPlanet(null);
      setSearchTarget("");
      toast.dismiss();

      if (closeMobileMenu) {
        setMobileMenuOpen(false);
      }

      toast(
        isTouch
          ? "Freecam Mode. Tap 'Exit' to close"
          : "Press ESC to exit Freecam",
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
        },
      );
    },
    [isTouch, setFocusedPlanet, setIsFreeCam, setMobileMenuOpen, setSearchTarget],
  );

  const handleToggleFullscreen = useCallback(
    (closeMobileMenu = false) => {
      if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement
            .requestFullscreen()
            .then(() => setIsFullscreen(true))
            .catch(() => {
              toast.info("Fullscreen is not supported on this device/browser.");
            });
        } else {
          toast.info("Fullscreen API is not supported on this device.");
        }
      } else {
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .then(() => setIsFullscreen(false))
            .catch(() => {
              setIsFullscreen(false);
            });
        } else {
          setIsFullscreen(false);
        }
      }

      if (closeMobileMenu) {
        setMobileMenuOpen(false);
      }
    },
    [isFullscreen, setIsFullscreen, setMobileMenuOpen],
  );

  return {
    handleToggleFreecam,
    handleToggleFullscreen,
    isFullscreen,
  };
}
