import { useEffect, useRef, useState } from "react";
import { usePlanetStore } from "../states/usePlanetStore";

export function useSearchPanel() {
  const [fromValue, setFromValue] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<"from" | "to" | null>(
    null,
  );
  const toValue = usePlanetStore((s) => s.searchTarget);
  const setToValue = usePlanetStore((s) => s.setSearchTarget);
  const planetRefs = usePlanetStore((s) => s.planetRefs);
  const setFocusedPlanet = usePlanetStore((s) => s.setFocusedPlanet);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromSelect = (val: string) => {
    setFromValue(val);
    setActiveDropdown(null);
  };

  const handleToSelect = (val: string) => {
    setToValue(val);
    setActiveDropdown(null);
    if (planetRefs[val]) {
      setFocusedPlanet(planetRefs[val]);
    }
  };

  const handleSwap = () => {
    const oldFrom = fromValue;
    const oldTo = toValue;

    setFromValue(oldTo);
    setToValue(oldFrom);

    if (planetRefs[oldFrom]) {
      setFocusedPlanet(planetRefs[oldFrom]);
    } else {
      setFocusedPlanet(null);
    }
  };

  return {
    activeDropdown,
    setActiveDropdown,
    panelRef,
    fromValue,
    setFromValue,
    handleSwap,
    handleToSelect,
    handleFromSelect,
    toValue,
  };
}
