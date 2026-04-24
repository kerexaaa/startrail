import IconButton from "./IconButton";
import Image from "next/image";
import slowIcon from "@/app/assets/icons/dark/slow.svg";
import speedIcon from "@/app/assets/icons/dark/speed.svg";
import pauseIcon from "@/app/assets/icons/dark/pause.svg";
import playIcon from "@/app/assets/icons/dark/play.svg";
import resetIcon from "@/app/assets/icons/dark/reset.svg";
import { useTimeController } from "@/app/hooks/useTimeController";

export default function TimeController() {
  const { isPaused, FULL_STEPS, currentIndex, currentLabel, timeControls } =
    useTimeController();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
      <IconButton
        onClick={timeControls.handleSlowDown}
        className={
          currentIndex <= 0 || isPaused ? "opacity-50 cursor-not-allowed" : ""
        }
        icon={<Image src={slowIcon} alt="Slow" width={24} height={24} />}
      />

      <div className="glassmorphism px-5 py-3 rounded min-w-40 text-center text-white select-none transition-all">
        {currentLabel}
      </div>

      <IconButton
        onClick={timeControls.handleSpeedUp}
        className={
          currentIndex >= FULL_STEPS.length - 1 || isPaused
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
        icon={<Image src={speedIcon} alt="Speed" width={24} height={24} />}
      />
      <div className="py-3 bg-white/50 w-px"></div>
      <IconButton
        onClick={timeControls.togglePause}
        icon={
          <Image
            src={isPaused ? playIcon : pauseIcon}
            alt={isPaused ? "Play" : "Pause"}
            width={24}
            height={24}
          />
        }
      />
      <IconButton
        onClick={timeControls.handleReset}
        icon={<Image src={resetIcon} alt="Reset" width={24} height={24} />}
      />
    </div>
  );
}
