import CelestialBody from "./CelestialBody";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { getBodyTextureUrls } from "@/app/utils/textures";
import {
  BASE_SPEED,
  RADIUS_SCALE,
  EARTH_RADIUS_KM,
  EARTH_TO_MOON_DISTANCE_KM,
  GENERIC_MOON_RADIUS,
  MOON_DISTANCE_SCALE,
  MOON_ORBIT_PERIOD,
  RANDOM_OFFSET_RANGE,
  UNASSIGNED_MOON_RADIUS,
  YEAR_IN_DAYS,
} from "../../constants/index";

interface MoonSystemProps {
  planetId: string;
  planetRadius: number;
}

export default function MoonSystem({
  planetId,
  planetRadius,
}: MoonSystemProps) {
  const { apiMoons } = usePlanetStore();

  if (!apiMoons || apiMoons.length === 0) return null;

  const planetMoons = apiMoons
    .filter((m) => m.aroundPlanet?.planet === planetId)
    .filter((moon) => {
      const name = moon.englishName || moon.name;
      const isGeneric =
        getBodyTextureUrls(name).bodyUrl.includes("generic_moon");
      return !isGeneric || moon.meanRadius > 5;
    });

  return (
    <>
      {planetMoons.map((moon) => {
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

        const randomOffset =
          (name.length * RANDOM_OFFSET_RANGE) % (Math.PI * 2);
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
      })}
    </>
  );
}
