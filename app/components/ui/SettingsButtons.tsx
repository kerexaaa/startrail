import Button from "./common/Button";
import {
  freecamIcon,
  infoIcon,
  minusIcon,
  optionsIcon,
  plusIcon,
  fullscreenIcon,
  smallscreenIcon,
} from "@/app/assets/icons/index";
import { Slide, toast } from "react-toastify";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { MIN_ZOOM, MAX_ZOOM } from "../../constants/index";
import Icon from "./common/Icon";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function SettingsButtons({ children, ...props }: DivProps) {
  const {
    setIsFreeCam,
    setIsFullscreen,
    isFullscreen,
    isVisible,
    setIsVisible,
    setIsInfoOpen,
  } = useUIStore();
  const { setTargetZoom, setSearchTarget, setFocusedPlanet } = usePlanetStore();

  return (
    <div {...props}>
      {children}
      <div
        className={`flex select-none flex-col gap-3 transition-all relative ${isVisible ? "opacity-100 right-0" : "opacity-0 pointer-events-none -right-40"}`}
      >
        <Button
          onClick={() => setIsInfoOpen(true)}
          icon={<Icon size={16} src={infoIcon} alt="Info" />}
        />
        <Button
          onClick={() => setTargetZoom((prev) => Math.max(MIN_ZOOM, prev - 2))}
          icon={<Icon size={16} src={plusIcon} alt="Zoom In" />}
        />
        <Button
          onClick={() => setTargetZoom((prev) => Math.min(MAX_ZOOM, prev + 2))}
          icon={<Icon size={16} src={minusIcon} alt="Zoom Out" />}
        />
        <Button
          onClick={() => {
            setIsFreeCam(true);
            setFocusedPlanet(null);
            setSearchTarget("");
            toast.dismiss();
            toast("Press ESC to exit Freecam", {
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              transition: Slide,
            });
          }}
          icon={<Icon size={16} src={freecamIcon} alt="Free Camera" />}
        />
        <Button
          onClick={() => {
            if (!isFullscreen) {
              document.documentElement.requestFullscreen();
              setIsFullscreen(true);
            } else {
              document.exitFullscreen();
              setIsFullscreen(false);
            }
          }}
          icon={
            <Icon
              size={16}
              src={isFullscreen ? smallscreenIcon : fullscreenIcon}
              alt="Fullscreen"
            />
          }
        />
      </div>

      <Button
        onClick={() => setIsVisible((prev) => !prev)}
        icon={
          <Icon
            size={16}
            src={optionsIcon}
            alt="Options"
            className={`transition-all duration-300 ${isVisible ? "rotate-0" : "rotate-180"}`}
          />
        }
      />
    </div>
  );
}

export default SettingsButtons;
