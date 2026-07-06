import Button from "../common/Button";
import { useTimeController } from "@/app/hooks/useTimeController";
import {
  slowIcon,
  speedIcon,
  pauseIcon,
  playIcon,
  resetIcon,
} from "@/app/assets/icons";
import Icon from "../common/Icon";

export default function TimeController({
  isDesktop = false,
}: {
  isDesktop?: boolean;
}) {
  const { isPaused, FULL_STEPS, currentIndex, currentLabel, timeControls } =
    useTimeController();

  return (
    <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col gap-2 lg:gap-4 z-20 w-max max-w-[calc(100vw-32px)]">
      {!isDesktop && (
        <div className="glassmorphism h-12 flex items-center justify-center rounded-lg min-w-27.5 w-full lg:min-w-40 text-center text-sm lg:text-base text-white select-none transition-all shrink-0">
          {currentLabel}
        </div>
      )}
      <div className="flex items-center justify-center gap-3 w-full">
        <Button
          onClick={timeControls.handleSlowDown}
          disabled={currentIndex <= 0 || isPaused}
          className={`shrink-0 ${currentIndex <= 0 || isPaused ? "opacity-50 cursor-not-allowed" : ""}`}
          icon={<Icon src={slowIcon} alt="Slow" />}
        />

        {isDesktop && (
          <div className="glassmorphism h-[stretch] flex items-center justify-center rounded-lg min-w-27.5 lg:min-w-40 text-center text-sm lg:text-lg text-white select-none transition-all shrink-0">
            {currentLabel}
          </div>
        )}

        <Button
          onClick={timeControls.handleSpeedUp}
          disabled={currentIndex >= FULL_STEPS.length - 1 || isPaused}
          className={`shrink-0 ${currentIndex >= FULL_STEPS.length - 1 || isPaused ? "opacity-50 cursor-not-allowed" : ""}`}
          icon={<Icon src={speedIcon} alt="Speed" />}
        />

        <div className="py-3 bg-white/50 w-px shrink-0"></div>

        <Button
          className="shrink-0"
          onClick={timeControls.togglePause}
          icon={
            <Icon
              src={isPaused ? playIcon : pauseIcon}
              alt={isPaused ? "Play" : "Pause"}
            />
          }
        />
        <Button
          className="shrink-0"
          onClick={timeControls.handleReset}
          icon={<Icon src={resetIcon} alt="Reset" />}
        />
      </div>
    </div>
  );
}
