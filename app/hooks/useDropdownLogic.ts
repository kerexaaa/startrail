import { useMemo, useState } from "react";
import { usePlanetStore } from "../states/usePlanetStore";
import { PLANETS_CONFIG } from "../constants";
import { MoonData } from "../types/astronomy";
import { getPlanetMoons } from "../utils/bodies";

type GroupedBodies = { planetName: string; moons: string[] };

export default function useDropdownLogic() {
  const apiMoons = usePlanetStore((s) => s.apiMoons);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const groupedBodies = useMemo(() => {
    const groups: GroupedBodies[] = [];
    groups.push({ planetName: "My Location", moons: [] });
    groups.push({ planetName: "Sun", moons: [] });

    PLANETS_CONFIG.forEach((planet) => {
      if (!planet.planetId) {
        return;
      }
      const validMoons = getPlanetMoons(apiMoons, planet.planetId);
      const moonNames = validMoons.map(
        (moon: MoonData) => moon.englishName || moon.name,
      );

      groups.push({ planetName: planet.name, moons: moonNames });
    });
    return groups;
  }, [apiMoons]);

  return { groupedBodies, expandedOption, setExpandedOption };
}
