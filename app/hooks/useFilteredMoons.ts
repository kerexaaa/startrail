import { useCallback } from "react";
import { getBodyTextureUrls } from "@/app/utils/textures";
import { MoonData } from "../types/astronomy";
import { MIN_MOON_MEAN_RADIUS } from "../constants";

export function useFilteredMoons() {
  const getValidMoons = useCallback(
    (apiMoons: MoonData[], planetId: string) => {
      return apiMoons
        .filter((m) => m.aroundPlanet?.planet === planetId)
        .filter((moon) => {
          const name = moon.englishName || moon.name;
          const isGeneric =
            getBodyTextureUrls(name).bodyUrl.includes("generic_moon");
          return !isGeneric || moon.meanRadius > MIN_MOON_MEAN_RADIUS;
        });
    },
    [],
  );

  return { getValidMoons };
}
