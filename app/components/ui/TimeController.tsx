import IconButton from "./IconButton";
import Image from "next/image";
import slowIcon from "@/app/assets/icons/dark/slow.svg";
import speedIcon from "@/app/assets/icons/dark/speed.svg";
import pauseIcon from "@/app/assets/icons/dark/pause.svg";
import playIcon from "@/app/assets/icons/dark/play.svg";
import resetIcon from "@/app/assets/icons/dark/reset.svg";
import { usePlanetStore } from "../../states/usePlanetStore";
import { useState, useMemo } from "react";
import { SPEED_STEPS } from "../../constants/index";

export default function TimeController() {
  const { setTimeMultiplier, timeMultiplier, triggerTimeReset } =
    usePlanetStore();
  const [isPaused, setIsPaused] = useState(false);
  const [multiplierSave, setMultiplierSave] = useState(1);

  const FULL_STEPS = useMemo(() => {
    const negativeSteps = [...SPEED_STEPS].reverse().map((step) => ({
      label: `-${step.label}`,
      value: -step.value,
    }));
    return [...negativeSteps, ...SPEED_STEPS];
  }, []);

  const currentIndex = FULL_STEPS.findIndex(
    (step) => step.value === timeMultiplier,
  );

  const currentLabel = isPaused
    ? "Paused"
    : FULL_STEPS[currentIndex]?.label || `${timeMultiplier} days/sec`;

  const handleSlowDown = () => {
    if (isPaused) return;
    if (currentIndex > 0) {
      setTimeMultiplier(FULL_STEPS[currentIndex - 1].value);
    }
  };

  const handleSpeedUp = () => {
    if (isPaused) return;
    if (currentIndex !== -1 && currentIndex < FULL_STEPS.length - 1) {
      setTimeMultiplier(FULL_STEPS[currentIndex + 1].value);
    }
  };

  const togglePause = () => {
    if (!isPaused) {
      setMultiplierSave(timeMultiplier);
      setTimeMultiplier(0);
    } else {
      setTimeMultiplier(multiplierSave);
    }
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    triggerTimeReset();
    setIsPaused(false);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
      <IconButton
        onClick={handleSlowDown}
        className={
          currentIndex <= 0 || isPaused ? "opacity-50 cursor-not-allowed" : ""
        }
        icon={<Image src={slowIcon} alt="Slow" width={24} height={24} />}
      />

      <div className="glassmorphism px-5 py-3 rounded min-w-40 text-center text-white select-none transition-all">
        {currentLabel}
      </div>

      <IconButton
        onClick={handleSpeedUp}
        className={
          currentIndex >= FULL_STEPS.length - 1 || isPaused
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
        icon={<Image src={speedIcon} alt="Speed" width={24} height={24} />}
      />
      <div className="py-3 bg-white/50 w-px"></div>
      <IconButton
        onClick={togglePause}
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
        onClick={handleReset}
        icon={<Image src={resetIcon} alt="Reset" width={24} height={24} />}
      />
    </div>
  );
}
