import { useMemo, useState } from "react";
import { usePlanetStore } from "../states/usePlanetStore";
import { useFilteredMoons } from "./useFilteredMoons";
import { PLANETS_CONFIG, BODY_DATA } from "../constants";
import { MoonData } from "../types/astronomy";

type GroupedBodies = { planetName: string; moons: string[] };

export default function useDropdownLogic() {
  const { apiMoons } = usePlanetStore();
  const { getValidMoons } = useFilteredMoons();

  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const groupedBodies = useMemo(() => {
    const groups: GroupedBodies[] = [];
    groups.push({ planetName: "My Location", moons: [] });
    groups.push({ planetName: "Sun", moons: [] });

    PLANETS_CONFIG.forEach((planet) => {
      if (!planet.planetId) {
        return;
      }
      let validMoons = getValidMoons(apiMoons, planet.planetId);

      if (planet.planetId === "terre") {
        validMoons = validMoons.filter(
          (m) =>
            m.englishName === "Moon" ||
            m.name === "La Lune" ||
            m.englishName === "La Lune"
        );
      } else {
        const uniqueMoons = validMoons.filter(
          (m) => m.englishName in BODY_DATA || m.name in BODY_DATA
        );
        const genericMoons = validMoons.filter(
          (m) => !(m.englishName in BODY_DATA || m.name in BODY_DATA)
        );

        const limit = 10;
        const combinedMoons = [...uniqueMoons];
        for (const moon of genericMoons) {
          if (combinedMoons.length >= limit) break;
          combinedMoons.push(moon);
        }
        validMoons = combinedMoons;
      }

      const moonNames = validMoons.map(
        (moon: MoonData) => moon.englishName || moon.name,
      );

      groups.push({ planetName: planet.name, moons: moonNames });
    });
    return groups;
  }, [apiMoons, getValidMoons]);

  return { groupedBodies, expandedOption, setExpandedOption };
}
