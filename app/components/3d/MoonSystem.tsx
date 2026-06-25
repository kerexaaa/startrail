import CelestialBody from "./CelestialBody";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { getBodyTextureUrls } from "@/app/utils/textures";
import {
  BASE_SPEED,
  SIZE_SCALE,
  EARTH_RADIUS_KM,
  GENERIC_MOON_RADIUS,
  MOON_ORBIT_PERIOD,
  UNASSIGNED_MOON_RADIUS,
  YEAR_IN_DAYS,
} from "../../constants/index";
import { getJ2000Angle } from "@/app/utils/ephemeris";

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
      return !isGeneric || moon.meanRadius > 6;
    });

  return (
    <>
      {planetMoons.map((moon) => {
        const name = moon.englishName || moon.name;
        const isGeneric =
          getBodyTextureUrls(name).bodyUrl.includes("generic_moon");

        const trueRadius = (moon.meanRadius / EARTH_RADIUS_KM) * SIZE_SCALE;
        const radius = Math.max(
          0.1,
          trueRadius *
            (isGeneric ? GENERIC_MOON_RADIUS : UNASSIGNED_MOON_RADIUS),
        );

        const distance =
          planetRadius + 1.5 + Math.pow(moon.semimajorAxis / 80000, 0.7);

        const orbitalPeriod = Math.max(
          0.1,
          moon.sideralOrbit || MOON_ORBIT_PERIOD,
        );
        const travelSpeed = (YEAR_IN_DAYS / orbitalPeriod) * BASE_SPEED;

        const startAngle = getJ2000Angle(orbitalPeriod);
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
            startAngle={startAngle}
            isGeneric={isGeneric}
          />
        );
      })}
    </>
  );
}
