import Button from "./common/Button";
import {
  freecamIcon,
  infoIcon,
  minusIcon,
  optionsIcon,
  plusIcon,
  fullscreenIcon,
  smallscreenIcon,
  timeIcon,
} from "@/app/assets/icons/index";
import { Slide, toast } from "react-toastify";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import {
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_BUTTON_MULTIPLIER,
} from "../../constants/index";
import Icon from "./common/Icon";
import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";

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
    isMobileTimeControllerOpen,
    setMobileTimeControllerOpen,
  } = useUIStore();
  const { setTargetZoom, setSearchTarget, setFocusedPlanet } = usePlanetStore();
  const isTouch = useIsTouchDevice();

  return (
    <div {...props}>
      {children}
      <div
        className={`flex select-none flex-col gap-3 transition-all relative ${isVisible ? "opacity-100 right-0" : "opacity-0 pointer-events-none -right-40"}`}
      >
        <Button
          className="hidden lg:block"
          onClick={() => setIsInfoOpen(true)}
          icon={<Icon src={infoIcon} alt="Info" />}
        />
        <Button
          className="lg:hidden"
          onClick={() =>
            setMobileTimeControllerOpen(!isMobileTimeControllerOpen)
          }
          icon={<Icon src={timeIcon} alt="Time Settings" />}
        />
        <Button
          onClick={() =>
            setTargetZoom((prev) =>
              Math.max(prev - prev * ZOOM_BUTTON_MULTIPLIER, MIN_ZOOM),
            )
          }
          icon={<Icon src={plusIcon} alt="Zoom In" />}
        />
        <Button
          onClick={() =>
            setTargetZoom((prev) =>
              Math.min(prev + prev * ZOOM_BUTTON_MULTIPLIER, MAX_ZOOM),
            )
          }
          icon={<Icon src={minusIcon} alt="Zoom Out" />}
        />
        <Button
          className="hidden lg:block"
          onClick={() => {
            setIsFreeCam(true);
            setFocusedPlanet(null);
            setSearchTarget("");
            toast.dismiss();
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
        />
        <Button
          className="hidden lg:block"
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
              src={isFullscreen ? smallscreenIcon : fullscreenIcon}
              alt="Fullscreen"
            />
          }
        />
      </div>

      <Button
        className="hidden lg:block"
        onClick={() => setIsVisible((prev) => !prev)}
        icon={
          <Icon
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
