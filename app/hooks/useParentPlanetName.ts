import { useMemo } from "react";
import { MoonData } from "../types/astronomy";
import { PLANET_IDS } from "../constants";

export default function useParentPlanetName({
  apiMoons,
  name,
}: {
  apiMoons: MoonData[];
  name: string;
}) {
  const parentPlanetName = useMemo(() => {
    const thisMoon = apiMoons.find((m) => m.englishName === name);
    if (!thisMoon?.aroundPlanet) return null;

    const frenchId = thisMoon.aroundPlanet.planet;
    return Object.keys(PLANET_IDS).find(
      (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === frenchId,
    );
  }, [name, apiMoons]);

  return parentPlanetName;
}
