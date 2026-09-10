import { Suspense, useMemo } from "react";
import CelestialBody from "./CelestialBody";
import MoonSystem from "./MoonSystem";
import { PLANETS_CONFIG } from "../../constants/index";
import { PlanetConfig } from "@/app/types/astronomy";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { getEnglishPlanetName } from "@/app/utils/bodies";

export default function PlanetSystem() {
  const showSatellites = usePlanetStore((state) => state.showSatellites);
  const searchTarget = usePlanetStore((state) => state.searchTarget);
  const focusedPlanet = usePlanetStore((state) => state.focusedPlanet);
  const apiMoons = usePlanetStore((state) => state.apiMoons);

  const parentPlanetOfSearchTarget = useMemo(() => {
    if (!searchTarget || !apiMoons) return null;
    const thisMoon = apiMoons.find((m) => m.englishName === searchTarget);
    if (!thisMoon?.aroundPlanet) return null;

    return getEnglishPlanetName(thisMoon.aroundPlanet.planet);
  }, [searchTarget, apiMoons]);

  return (
    <>
      {PLANETS_CONFIG.map((planet: PlanetConfig) => {
        const isPlanetFocused =
          searchTarget === planet.name ||
          focusedPlanet?.name === planet.name ||
          parentPlanetOfSearchTarget === planet.name;
        const shouldRenderMoons = showSatellites && isPlanetFocused;

        return (
          <CelestialBody
            key={planet.name}
            name={planet.name}
            distance={planet.distance}
            radius={planet.radius}
            rotationSpeed={planet.rotationSpeed}
            travelSpeed={planet.travelSpeed}
            tilt={planet.tilt}
          >
            {shouldRenderMoons && planet.planetId && (
              <Suspense fallback={null}>
                <MoonSystem
                  planetId={planet.planetId}
                  planetRadius={planet.radius}
                />
              </Suspense>
            )}
          </CelestialBody>
        );
      })}
    </>
  );
}
