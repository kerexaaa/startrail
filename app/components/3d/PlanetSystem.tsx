import {
  BASE_SPEED,
  DISTANCE_SCALE,
  EARTH_ROTATION,
  RADIUS_SCALE,
} from "../../constants";
import Planet from "./Planet";

export default function PlanetSystem() {
  return (
    <>
      <Planet
        name="Mercury"
        distance={0.39 * DISTANCE_SCALE * 8}
        radius={0.38 * RADIUS_SCALE}
        rotationSpeed={1 / 7}
        travelSpeed={(1 / 0.24) * BASE_SPEED}
        tilt={2.04}
      />
      <Planet
        name="Venus"
        distance={0.72 * DISTANCE_SCALE * 6}
        radius={0.95 * RADIUS_SCALE}
        rotationSpeed={1 / 4}
        travelSpeed={(1 / 0.61) * BASE_SPEED}
        tilt={2.04}
      />
      <Planet
        name="Earth"
        distance={1.0 * DISTANCE_SCALE * 6}
        radius={1.0 * RADIUS_SCALE}
        rotationSpeed={EARTH_ROTATION}
        travelSpeed={1 * BASE_SPEED}
        tilt={23.5}
      />
      <Planet
        name="Mars"
        distance={1.52 * DISTANCE_SCALE * 5}
        radius={0.53 * RADIUS_SCALE}
        rotationSpeed={1.1}
        travelSpeed={(1 / 1.88) * BASE_SPEED}
        tilt={25.2}
      />

      <Planet
        name="Jupiter"
        distance={3.2 * DISTANCE_SCALE * 3}
        radius={5.5 * RADIUS_SCALE}
        rotationSpeed={0.44}
        travelSpeed={(1 / 11.86) * BASE_SPEED}
        tilt={3.13}
      />
      <Planet
        name="Saturn"
        distance={4.5 * DISTANCE_SCALE * 3}
        radius={6.5 * RADIUS_SCALE}
        rotationSpeed={0.45}
        travelSpeed={(1 / 29) * BASE_SPEED}
        tilt={26.7}
      />
      <Planet
        name="Uranus"
        distance={7.2 * DISTANCE_SCALE * 2.5}
        radius={3 * RADIUS_SCALE}
        rotationSpeed={0.72}
        travelSpeed={(1 / 84) * BASE_SPEED}
        tilt={98}
      />
      <Planet
        name="Neptune"
        distance={10 * DISTANCE_SCALE * 2.5}
        radius={2.8 * RADIUS_SCALE}
        rotationSpeed={0.69}
        travelSpeed={(1 / 165) * BASE_SPEED}
        tilt={28.32}
      />
    </>
  );
}
