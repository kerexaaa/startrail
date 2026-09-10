import { useMemo } from "react";
import { SPEED_STEPS } from "../constants";
import { usePlanetStore } from "../states/usePlanetStore";

export function useTimeController() {
  const timeMultiplier = usePlanetStore((s) => s.timeMultiplier);
  const setTimeMultiplier = usePlanetStore((s) => s.setTimeMultiplier);
  const triggerTimeReset = usePlanetStore((s) => s.triggerTimeReset);
  const isPaused = usePlanetStore((s) => s.isPaused);
  const setIsPaused = usePlanetStore((s) => s.setIsPaused);
  const multiplierSave = usePlanetStore((s) => s.multiplierSave);
  const setMultiplierSave = usePlanetStore((s) => s.setMultiplierSave);

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

  const timeControls = {
    handleReset,
    handleSpeedUp,
    handleSlowDown,
    togglePause,
  };

  return {
    isPaused,
    FULL_STEPS,
    currentIndex,
    currentLabel,
    timeControls,
  };
}
