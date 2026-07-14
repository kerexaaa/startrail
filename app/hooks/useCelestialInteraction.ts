import { useState, useEffect, RefObject } from "react";
import * as THREE from "three";
import { usePlanetStore } from "../states/usePlanetStore";
import { useUIStore } from "../states/useUIStore";
import { MIN_CLICK_RADIUS } from "../constants";

export default function useCelestialInteraction(
  name: string,
  radius: number,
  orbitGroupRef: RefObject<THREE.Group | null>,
) {
  const [hovered, setHovered] = useState(false);
  const {
    focusedPlanet,
    planetRefs,
    registerPlanetRef,
    setFocusedPlanet,
    searchTarget,
    setSearchTarget,
  } = usePlanetStore();
  const { isFreeCam } = useUIStore();

  useEffect(() => {
    if (orbitGroupRef.current) {
      registerPlanetRef(name, orbitGroupRef.current);
      
      if (searchTarget === name && focusedPlanet !== orbitGroupRef.current) {
        setFocusedPlanet(
          orbitGroupRef.current,
          Math.max(MIN_CLICK_RADIUS, radius * 3),
        );
      }
    }
  }, [name, registerPlanetRef, orbitGroupRef, searchTarget, focusedPlanet, radius, setFocusedPlanet]);

  const handleFocus = () => {
    if (isFreeCam) return;
    if (orbitGroupRef.current) {
      setFocusedPlanet(
        orbitGroupRef.current,
        Math.max(MIN_CLICK_RADIUS, radius * 3),
      );
    }
    setSearchTarget(name);
  };

  const isFocused = focusedPlanet === planetRefs[name];

  return {
    hovered,
    setHovered,
    isFocused,
    handleFocus,
  };
}
