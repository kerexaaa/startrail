import { MoonData } from "../types/astronomy";
import {
  PLANET_IDS,
  BODY_DATA,
  MIN_MOON_MEAN_RADIUS,
} from "../constants";
import { getBodyTextureUrls } from "./textures";

/**
 * Translates French planet IDs (e.g. "terre", "saturne") to English planet names (e.g. "Earth", "Saturn").
 */
export function getEnglishPlanetName(frenchId: string | undefined | null): string | null {
  if (!frenchId) return null;
  const normalizedId = frenchId.toLowerCase();
  const foundKey = Object.keys(PLANET_IDS).find(
    (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === normalizedId,
  );
  return foundKey || null;
}

/**
 * Returns filtered and formatted list of moons for a given planet ID or name.
 */
export function getPlanetMoons(
  apiMoons: MoonData[] | null | undefined,
  planetIdOrName: string,
): MoonData[] {
  if (!apiMoons || apiMoons.length === 0 || !planetIdOrName) return [];

  // Determine French planet ID
  const frenchId =
    PLANET_IDS[planetIdOrName as keyof typeof PLANET_IDS] ||
    planetIdOrName.toLowerCase();

  const validMoons = apiMoons
    .filter((m) => m.aroundPlanet?.planet === frenchId)
    .filter((moon) => {
      const name = moon.englishName || moon.name;
      const isGeneric = getBodyTextureUrls(name).bodyUrl.includes("generic_moon");
      return !isGeneric || moon.meanRadius > MIN_MOON_MEAN_RADIUS;
    });

  if (frenchId === "terre") {
    return validMoons.filter(
      (m) =>
        m.englishName === "Moon" ||
        m.name === "La Lune" ||
        m.englishName === "La Lune",
    );
  }

  const uniqueMoons = validMoons.filter(
    (m) => m.englishName in BODY_DATA || m.name in BODY_DATA,
  );
  const genericMoons = validMoons.filter(
    (m) => !(m.englishName in BODY_DATA || m.name in BODY_DATA),
  );

  const limit = 10;
  const combinedMoons = [...uniqueMoons];
  for (const moon of genericMoons) {
    if (combinedMoons.length >= limit) break;
    combinedMoons.push(moon);
  }

  return combinedMoons;
}
