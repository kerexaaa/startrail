import { useUIStore } from "@/app/states/useUIStore";
import Button from "../common/Button";
import Icon from "../common/Icon";
import {
  freecamIcon,
  fullscreenIcon,
  infoIcon,
  smallscreenIcon,
  feedbackIcon,
} from "@/app/assets/icons";
import { useSettingsActions } from "@/app/hooks/useSettingsActions";

export default function MobileMenuButtons() {
  const setIsInfoOpen = useUIStore((s) => s.setIsInfoOpen);
  const setIsFeedbackOpen = useUIStore((s) => s.setIsFeedbackOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const { handleToggleFreecam, handleToggleFullscreen, isFullscreen } = useSettingsActions();

  return (
    <div className="p-4 flex flex-col gap-3">
      <Button
        className="text-base font-medium text-left"
        onClick={() => {
          setIsFeedbackOpen(true);
          setMobileMenuOpen(false);
        }}
        icon={<Icon src={feedbackIcon} alt="Feedback" />}
      >
        Send Feedback
      </Button>
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
        onClick={() => handleToggleFreecam(true)}
        icon={<Icon src={freecamIcon} alt="Free Camera" />}
      >
        Freecam Mode
      </Button>
      <Button
        className="text-base font-medium text-left"
        onClick={() => handleToggleFullscreen(true)}
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
