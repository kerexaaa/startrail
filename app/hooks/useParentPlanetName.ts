import { useMemo } from "react";
import { MoonData } from "../types/astronomy";
import { getEnglishPlanetName } from "../utils/bodies";

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
    return getEnglishPlanetName(thisMoon.aroundPlanet.planet);
  }, [name, apiMoons]);

  return parentPlanetName;
}

