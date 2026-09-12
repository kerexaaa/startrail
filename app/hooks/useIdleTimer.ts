import { useEffect } from "react";
import { useUIStore } from "../states/useUIStore";
import { IDLE_TIMEOUT } from '../constants/index';

const MOUSEMOVE_THROTTLE_MS = 200;

export function useIdleTimer() {
  const setIsUserIdle = useUIStore((s) => s.setIsUserIdle);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let lastMoveTime = 0;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsUserIdle(false);

      idleTimer = setTimeout(() => {
        setIsUserIdle(true);
      }, IDLE_TIMEOUT);
    };

    const throttledMouseMove = () => {
      const now = Date.now();
      if (now - lastMoveTime < MOUSEMOVE_THROTTLE_MS) return;
      lastMoveTime = now;
      resetIdleTimer();
    };

    resetIdleTimer();

    window.addEventListener("click", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("wheel", resetIdleTimer);
    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("touchstart", resetIdleTimer);

    return () => {
      window.removeEventListener("click", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("wheel", resetIdleTimer);
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("touchstart", resetIdleTimer);

      clearTimeout(idleTimer);
    };
  }, [setIsUserIdle]);
}
