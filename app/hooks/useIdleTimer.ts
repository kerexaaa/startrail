import { useEffect } from "react";
import { useUIStore } from "../states/useUIStore";

export function useIdleTimer() {
  const { setIsUserIdle } = useUIStore();

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsUserIdle(false);

      idleTimer = setTimeout(() => {
        setIsUserIdle(true);
      }, 10000);
    };

    resetIdleTimer();

    window.addEventListener("click", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("wheel", resetIdleTimer);
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);

    return () => {
      window.removeEventListener("click", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("wheel", resetIdleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);

      clearTimeout(idleTimer);
    };
  }, [setIsUserIdle]);
}
