import { Suspense } from "react";
import CelestialBody from "./CelestialBody";
import MoonSystem from "./MoonSystem";
import { PLANETS_CONFIG } from "../../constants/index";
import { PlanetConfig } from "@/app/types/astronomy";
import useFetchMoons from "@/app/hooks/useFetchMoons";

export default function PlanetSystem() {
  useFetchMoons();

  return (
    <>
      {PLANETS_CONFIG.map((planet: PlanetConfig) => (
        <CelestialBody
          key={planet.name}
          name={planet.name}
          distance={planet.distance}
          radius={planet.radius}
          rotationSpeed={planet.rotationSpeed}
          travelSpeed={planet.travelSpeed}
          tilt={planet.tilt}
        >
          {planet.planetId && (
            <Suspense fallback={null}>
              <MoonSystem
                planetId={planet.planetId}
                planetRadius={planet.radius}
              />
            </Suspense>
          )}
        </CelestialBody>
      ))}
    </>
  );
}
