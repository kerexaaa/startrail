import Button from "./common/Button";
import { useTimeController } from "@/app/hooks/useTimeController";
import { slowIcon, speedIcon, pauseIcon, playIcon, resetIcon } from "@/app/assets/icons";
import Icon from "./common/Icon";

export default function TimeController() {
  const { isPaused, FULL_STEPS, currentIndex, currentLabel, timeControls } = useTimeController();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
      <Button
        onClick={timeControls.handleSlowDown}
        disabled={currentIndex <= 0 || isPaused}
        className={currentIndex <= 0 || isPaused ? "opacity-50 cursor-not-allowed" : ""}
        icon={<Icon src={slowIcon} alt="Slow" />}
      />

      <div className="glassmorphism px-5 py-3 rounded min-w-40 text-center text-white select-none transition-all">
        {currentLabel}
      </div>

      <Button
        onClick={timeControls.handleSpeedUp}
        disabled={currentIndex >= FULL_STEPS.length - 1 || isPaused}
        className={currentIndex >= FULL_STEPS.length - 1 || isPaused ? "opacity-50 cursor-not-allowed" : ""}
        icon={<Icon src={speedIcon} alt="Speed" />}
      />
      
      <div className="py-3 bg-white/50 w-px"></div>
      
      <Button
        onClick={timeControls.togglePause}
        icon={<Icon src={isPaused ? playIcon : pauseIcon} alt={isPaused ? "Play" : "Pause"} />}
      />
      <Button
        onClick={timeControls.handleReset}
        icon={<Icon src={resetIcon} alt="Reset" />}
      />
    </div>
  );
}