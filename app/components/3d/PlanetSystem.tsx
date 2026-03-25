import { Suspense, useEffect } from "react";
import {
  BASE_SPEED,
  DISTANCE_SCALE,
  EARTH_ROTATION,
  PLANET_IDS,
  RADIUS_SCALE,
} from "../../constants";
import CelestialBody from "./CelestialBody";
import { MoonApiResponse } from "@/app/types/astronomy";
import { getBodyTextureUrls } from "@/app/utils/textures";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { toast } from "react-toastify";

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
        (moon.meanRadius / 6371) * RADIUS_SCALE * (isGeneric ? 1.5 : 1.0),
      );

      const distance =
        planetRadius * 1.5 + Math.pow(moon.semimajorAxis / 384400, 0.5) * 2.0;

      const orbitalPeriod = Math.max(0.1, moon.sideralOrbit || 300);
      const travelSpeed = (365 / orbitalPeriod) * BASE_SPEED;

      const randomOffset = (name.length * 10) % (Math.PI * 2);
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
      <CelestialBody
        name="Mercury"
        distance={0.39 * DISTANCE_SCALE * 8}
        radius={0.38 * RADIUS_SCALE}
        rotationSpeed={1 / 7}
        travelSpeed={(1 / 0.24) * BASE_SPEED}
        tilt={2.04}
      />
      <CelestialBody
        name="Venus"
        distance={0.72 * DISTANCE_SCALE * 6}
        radius={0.95 * RADIUS_SCALE}
        rotationSpeed={1 / 4}
        travelSpeed={(1 / 0.61) * BASE_SPEED}
        tilt={2.04}
      />
      <CelestialBody
        name="Earth"
        distance={1.0 * DISTANCE_SCALE * 6}
        radius={1.0 * RADIUS_SCALE}
        rotationSpeed={EARTH_ROTATION}
        travelSpeed={1 * BASE_SPEED}
        tilt={23.5}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Earth, 1.0 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>
      <CelestialBody
        name="Mars"
        distance={1.52 * DISTANCE_SCALE * 5}
        radius={0.53 * RADIUS_SCALE}
        rotationSpeed={1.1}
        travelSpeed={(1 / 1.88) * BASE_SPEED}
        tilt={25.2}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Mars, 0.53 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>

      <CelestialBody
        name="Jupiter"
        distance={3.2 * DISTANCE_SCALE * 3}
        radius={5.5 * RADIUS_SCALE}
        rotationSpeed={0.44}
        travelSpeed={(1 / 11.86) * BASE_SPEED}
        tilt={3.13}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Jupiter, 5.5 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>
      <CelestialBody
        name="Saturn"
        distance={4.5 * DISTANCE_SCALE * 3}
        radius={6.5 * RADIUS_SCALE}
        rotationSpeed={0.45}
        travelSpeed={(1 / 29) * BASE_SPEED}
        tilt={26.7}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Saturn, 6.5 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>
      <CelestialBody
        name="Uranus"
        distance={7.2 * DISTANCE_SCALE * 2.5}
        radius={3 * RADIUS_SCALE}
        rotationSpeed={0.72}
        travelSpeed={(1 / 84) * BASE_SPEED}
        tilt={98}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Uranus, 3 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>
      <CelestialBody
        name="Neptune"
        distance={10 * DISTANCE_SCALE * 2.5}
        radius={2.8 * RADIUS_SCALE}
        rotationSpeed={0.69}
        travelSpeed={(1 / 165) * BASE_SPEED}
        tilt={28.32}
      >
        <Suspense fallback={null}>
          {renderMoons(PLANET_IDS.Neptune, 2.8 * RADIUS_SCALE)}
        </Suspense>
      </CelestialBody>
    </>
  );
}
