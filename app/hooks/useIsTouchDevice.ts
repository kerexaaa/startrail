import { useState, useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (hasTouch) {
      const timer = setTimeout(() => {
        setIsTouch(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  return isTouch;
}
