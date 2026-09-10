import { useCallback } from "react";
import { MoonData } from "../types/astronomy";
import { getPlanetMoons } from "../utils/bodies";

export function useFilteredMoons() {
  const getValidMoons = useCallback(
    (apiMoons: MoonData[], planetId: string) => {
      return getPlanetMoons(apiMoons, planetId);
    },
    [],
  );

  return { getValidMoons };
}

