import { Suspense, useEffect } from "react";
import CelestialBody from "./CelestialBody";
import { MoonApiResponse, PlanetConfig } from "@/app/types/astronomy";
import { getBodyTextureUrls } from "@/app/utils/textures";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { toast } from "react-toastify";
import {
  BASE_SPEED,
  RADIUS_SCALE,
  EARTH_RADIUS_KM,
  EARTH_TO_MOON_DISTANCE_KM,
  GENERIC_MOON_RADIUS,
  MOON_DISTANCE_SCALE,
  MOON_ORBIT_PERIOD,
  PLANETS_CONFIG,
  RANDOM_OFFSET_RANGE,
  UNASSIGNED_MOON_RADIUS,
  YEAR_IN_DAYS,
} from "../../constants/index";

export default function PlanetSystem() {
  const { setApiMoons, apiMoons } = usePlanetStore();

  useEffect(() => {
    if (apiMoons.length !== 0) {
      return;
    }
    fetch("/api/opendata")
      .then((res) => res.json())
      .then((data: MoonApiResponse) => {
        if (!data) {
          toast(`request error, try later`, {
            toastId: "api-error",
          });
          return;
        }
        const moonsArray = data.bodies;
        const filteredMoons = moonsArray.filter(
          (item) => item.englishName && !item.englishName.includes("/"),
        );
        setApiMoons(filteredMoons);
      })
      .catch((err) => {
        console.error("Error", err);
        toast(`request error`, {
          toastId: "api-error",
        });
        setApiMoons([]);
      });
  }, [apiMoons.length, setApiMoons]);

  const renderMoons = (planetId: string, planetRadius: number) => {
    if (!apiMoons) return null;

    let planetMoons = apiMoons.filter(
      (m) => m.aroundPlanet?.planet === planetId,
    );

    planetMoons = planetMoons.filter((moon) => {
      const name = moon.englishName || moon.name;
      const isGeneric =
        getBodyTextureUrls(name).bodyUrl.includes("generic_moon");
      return !isGeneric || moon.meanRadius > 5;
    });

    return planetMoons.map((moon) => {
      const name = moon.englishName || moon.name;
      const isGeneric =
        getBodyTextureUrls(name).bodyUrl.includes("generic_moon");

      const radius = Math.max(
        0.02,
        (moon.meanRadius / EARTH_RADIUS_KM) *
          RADIUS_SCALE *
          (isGeneric ? GENERIC_MOON_RADIUS : UNASSIGNED_MOON_RADIUS),
      );

      const distance =
        planetRadius * MOON_DISTANCE_SCALE +
        Math.pow(moon.semimajorAxis / EARTH_TO_MOON_DISTANCE_KM, 0.5) * 2.0;

      const orbitalPeriod = Math.max(
        0.1,
        moon.sideralOrbit || MOON_ORBIT_PERIOD,
      );
      const travelSpeed = (YEAR_IN_DAYS / orbitalPeriod) * BASE_SPEED;

      const randomOffset = (name.length * RANDOM_OFFSET_RANGE) % (Math.PI * 2);
      const orbitTilt = (moon.inclination * Math.PI) / 180;

      return (
        <CelestialBody
          key={moon.id}
          name={name}
          radius={radius}
          distance={distance}
          rotationSpeed={1 / orbitalPeriod}
          travelSpeed={travelSpeed}
          orbitTilt={orbitTilt}
          startAngle={randomOffset}
          isGeneric={isGeneric}
        />
      );
    });
  };

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
              {renderMoons(planet.planetId, planet.radius)}
            </Suspense>
          )}
        </CelestialBody>
      ))}
    </>
  );
}
