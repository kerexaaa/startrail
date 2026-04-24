import { useMemo } from "react";
import { BODY_DATA, PLANET_IDS } from "../constants";
import { usePlanetStore } from "../states/usePlanetStore";

export function useBodyInfo() {
  const { searchTarget, apiMoons } = usePlanetStore();

  return useMemo(() => {
    if (!searchTarget) return { info: null, name: null };

    if (BODY_DATA[searchTarget]) {
      return { info: BODY_DATA[searchTarget], name: searchTarget };
    }

    const apiMoon = apiMoons.find(
      (m) => m.englishName === searchTarget || m.name === searchTarget,
    );

    if (apiMoon) {
      let parentName = apiMoon.aroundPlanet?.planet || "unknown planet";
      const englishParent = Object.keys(PLANET_IDS).find(
        (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === parentName,
      );
      parentName = englishParent || parentName;

      const fallbackInfo = {
        type: "Minor Satellite",
        mass: apiMoon.mass || { massValue: 0, massExponent: 0 },
        temp: apiMoon.avgTemp ? `${apiMoon.avgTemp} K` : "Unknown",
        fact: apiMoon.discoveredBy
          ? `Discovered by ${apiMoon.discoveredBy} in ${apiMoon.discoveryDate}.`
          : `A minor celestial body orbiting ${parentName}.`,
        description: `${searchTarget} is a small natural satellite orbiting ${parentName}. It takes approximately ${Math.abs(
          apiMoon.sideralOrbit || 0,
        ).toFixed(
          2,
        )} days to complete one full revolution around its parent planet. With a mean radius of roughly ${
          apiMoon.meanRadius
        } km, it is one of the many minor bodies in the outer solar system.`,
      };

      return { info: fallbackInfo, name: searchTarget };
    }

    return { info: null, name: null };
  }, [searchTarget, apiMoons]);
}
