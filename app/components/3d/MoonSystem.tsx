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
  BODY_DATA,
} from "../../constants/index";
import { getJ2000Angle } from "@/app/utils/ephemeris";
import { useFilteredMoons } from "@/app/hooks/useFilteredMoons";

interface MoonSystemProps {
  planetId: string;
  planetRadius: number;
}

export default function MoonSystem({
  planetId,
  planetRadius,
}: MoonSystemProps) {
  const { apiMoons } = usePlanetStore();
  const { getValidMoons } = useFilteredMoons();

  if (!apiMoons || apiMoons.length === 0) return null;
  let planetMoons = getValidMoons(apiMoons, planetId);
  if (planetId === "terre") {
    planetMoons = planetMoons.filter(
      (m) =>
        m.englishName === "Moon" ||
        m.name === "La Lune" ||
        m.englishName === "La Lune"
    );
  } else {
    const uniqueMoons = planetMoons.filter(
      (m) => m.englishName in BODY_DATA || m.name in BODY_DATA
    );
    const genericMoons = planetMoons.filter(
      (m) => !(m.englishName in BODY_DATA || m.name in BODY_DATA)
    );

    const limit = 10;
    const combinedMoons = [...uniqueMoons];
    for (const moon of genericMoons) {
      if (combinedMoons.length >= limit) break;
      combinedMoons.push(moon);
    }
    planetMoons = combinedMoons;
  }

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
