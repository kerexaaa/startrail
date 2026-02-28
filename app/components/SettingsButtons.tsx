import Image from "next/image";
import IconButton from "./Buttons/IconButton";
import freecamIcon from "@/app/assets/icons/light/freecam.svg";
import infoIcon from "@/app/assets/icons/light/info.svg";
import minusIcon from "@/app/assets/icons/light/minus.svg";
import optionsIcon from "@/app/assets/icons/light/options.svg";
import plusIcon from "@/app/assets/icons/light/plus.svg";
import fullscreenIcon from "@/app/assets/icons/light/fullscreen.svg";
import smallscreenIcon from "@/app/assets/icons/light/smallscreen.svg";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  setIsFreeCam: (state: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
}

function SettingsButtons({
  children,
  isFullscreen,
  setIsFreeCam,
  zoomIn,
  zoomOut,
  setIsFullscreen,
  ...props
}: DivProps) {
  const [isVisible, setIsVisible] = useState(true);

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
          onClick={zoomIn}
          icon={<Image width={16} height={16} src={plusIcon} alt="Zoom In" />}
        />
        <IconButton
          onClick={zoomOut}
          icon={<Image width={16} height={16} src={minusIcon} alt="Zoom Out" />}
        />
        <IconButton
          onClick={() => {
            setIsFreeCam(true);
            toast("Press F1 to exit Freecam", {
              position: "top-right",
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
