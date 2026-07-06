import { useUIStore } from "@/app/states/useUIStore";
import Button from "../common/Button";
import Icon from "../common/Icon";
import {
  freecamIcon,
  fullscreenIcon,
  infoIcon,
  smallscreenIcon,
} from "@/app/assets/icons";
import { Slide, toast } from "react-toastify";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";

export default function MobileMenuButtons() {
  const {
    setIsInfoOpen,
    setIsFreeCam,
    setIsFullscreen,
    isFullscreen,
    setMobileMenuOpen,
  } = useUIStore();
  const isTouch = useIsTouchDevice();

  const { setFocusedPlanet, setSearchTarget } = usePlanetStore();

  return (
    <div className="p-4 flex flex-col gap-3">
      <Button
        className="text-base font-medium text-left"
        onClick={() => {
          setIsInfoOpen(true);
          setMobileMenuOpen(false);
        }}
        icon={<Icon src={infoIcon} alt="Info" />}
      >
        About App
      </Button>
      <Button
        className="text-base font-medium text-left"
        onClick={() => {
          setIsFreeCam(true);
          setFocusedPlanet(null);
          setSearchTarget("");
          toast.dismiss();
          setMobileMenuOpen(false);
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
        }}
        icon={<Icon src={freecamIcon} alt="Free Camera" />}
      >
        Freecam Mode
      </Button>
      <Button
        className="text-base font-medium text-left"
        onClick={() => {
          if (!isFullscreen) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
          } else {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          setMobileMenuOpen(false);
        }}
        icon={
          <Icon
            src={isFullscreen ? smallscreenIcon : fullscreenIcon}
            alt="Fullscreen"
          />
        }
      >
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </Button>
    </div>
  );
}
