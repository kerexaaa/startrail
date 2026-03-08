import Image from "next/image";
import IconButton from "./IconButton";
import freecamIcon from "@/app/assets/icons/light/freecam.svg";
import infoIcon from "@/app/assets/icons/light/info.svg";
import minusIcon from "@/app/assets/icons/light/minus.svg";
import optionsIcon from "@/app/assets/icons/light/options.svg";
import plusIcon from "@/app/assets/icons/light/plus.svg";
import fullscreenIcon from "@/app/assets/icons/light/fullscreen.svg";
import smallscreenIcon from "@/app/assets/icons/light/smallscreen.svg";
import { Slide, toast } from "react-toastify";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";

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
  } = useUIStore();

  const { setTargetZoom } = usePlanetStore();

  const handleTBA = () => {
    toast.info("This button does nothing, for now");
  };

  return (
    <div {...props}>
      {children}
      <div
        className={`flex select-none flex-col gap-3 transition-all relative ${isVisible ? "opacity-100 right-0" : "opacity-0 pointer-events-none -right-40"}`}
      >
        <IconButton
          onClick={handleTBA}
          icon={<Image width={16} height={16} src={infoIcon} alt="Info" />}
        />
        <IconButton
          onClick={() => setTargetZoom((prev) => Math.max(2, prev - 2))}
          icon={<Image width={16} height={16} src={plusIcon} alt="Zoom In" />}
        />
        <IconButton
          onClick={() => setTargetZoom((prev) => Math.min(100, prev + 2))}
          icon={<Image width={16} height={16} src={minusIcon} alt="Zoom Out" />}
        />
        <IconButton
          onClick={() => {
            setIsFreeCam(true);
            toast("Press F1 to exit Freecam", {
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          }}
          icon={
            <Image width={16} height={16} src={freecamIcon} alt="Free Camera" />
          }
        />
        <IconButton
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
            <Image
              width={16}
              height={16}
              src={isFullscreen ? smallscreenIcon : fullscreenIcon}
              alt={`${isFullscreen ? "Smallscreen" : "Fullscreen"}`}
            />
          }
        />
      </div>
      <IconButton
        onClick={() => setIsVisible((prev) => !prev)}
        icon={
          <Image
            className={`transition-all ${isVisible ? "rotate-0" : "rotate-180"}`}
            width={16}
            height={16}
            src={optionsIcon}
            alt="Options"
          />
        }
      />
    </div>
  );
}

export default SettingsButtons;
