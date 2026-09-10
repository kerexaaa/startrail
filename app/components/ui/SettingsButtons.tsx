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
  feedbackIcon,
} from "@/app/assets/icons/index";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import {
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_BUTTON_MULTIPLIER,
} from "../../constants/index";
import Icon from "./common/Icon";
import { useSettingsActions } from "@/app/hooks/useSettingsActions";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function SettingsButtons({ children, ...props }: DivProps) {
  const isVisible = useUIStore((s) => s.isVisible);
  const setIsVisible = useUIStore((s) => s.setIsVisible);
  const setIsInfoOpen = useUIStore((s) => s.setIsInfoOpen);
  const setIsFeedbackOpen = useUIStore((s) => s.setIsFeedbackOpen);
  const isMobileTimeControllerOpen = useUIStore((s) => s.isMobileTimeControllerOpen);
  const setMobileTimeControllerOpen = useUIStore((s) => s.setMobileTimeControllerOpen);
  const setTargetZoom = usePlanetStore((s) => s.setTargetZoom);
  const { handleToggleFreecam, handleToggleFullscreen, isFullscreen } = useSettingsActions();

  return (
    <div {...props}>
      {children}

      <div
        className={`flex flex-col gap-0 lg:gap-3 transition-all duration-300 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-3 justify-end">
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
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            className="hidden lg:block"
            onClick={() => handleToggleFreecam(false)}
            icon={<Icon src={freecamIcon} alt="Free Camera" />}
          />
          <Button
            className="hidden lg:block"
            onClick={() => handleToggleFullscreen(false)}
            icon={
              <Icon
                src={isFullscreen ? smallscreenIcon : fullscreenIcon}
                alt="Fullscreen"
              />
            }
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end items-end">
        <div
          className={`flex flex-col gap-0 lg:gap-3 transition-all duration-300 ${
            isVisible
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <Button
            className="hidden lg:block"
            onClick={() => setIsFeedbackOpen(true)}
            icon={<Icon src={feedbackIcon} alt="Feedback" />}
          />
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
    </div>
  );
}

export default SettingsButtons;
