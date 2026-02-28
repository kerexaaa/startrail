import {
  BASE_SPEED,
  DISTANCE_SCALE,
  EARTH_ROTATION,
  RADIUS_SCALE,
} from "../constants";
import Planet from "./planets/Planet";

export default function PlanetSystem() {
  return (
    <>
      <Planet
        name="Mercury"
        distance={0.39 * DISTANCE_SCALE * 8}
        radius={0.38 * RADIUS_SCALE}
        rotationSpeed={1 / 7}
        travelSpeed={(1 / 0.24) * BASE_SPEED}
        texturePath="/textures/planets/mercury/mercury_8k.jpg"
        tilt={2.04}
      />
      <Planet
        name="Venus"
        distance={0.72 * DISTANCE_SCALE * 6}
        radius={0.95 * RADIUS_SCALE}
        rotationSpeed={1 / 4}
        travelSpeed={(1 / 0.61) * BASE_SPEED}
        texturePath="/textures/planets/venus/venus_8k.jpg"
        tilt={2.04}
      />
      <Planet
        name="Earth"
        distance={1.0 * DISTANCE_SCALE * 6}
        radius={1.0 * RADIUS_SCALE}
        rotationSpeed={EARTH_ROTATION}
        travelSpeed={1 * BASE_SPEED}
        texturePath="/textures/planets/earth/earth_8k.jpg"
        tilt={23.5}
      />
      <Planet
        name="Mars"
        distance={1.52 * DISTANCE_SCALE * 5}
        radius={0.53 * RADIUS_SCALE}
        rotationSpeed={1.1}
        travelSpeed={(1 / 1.88) * BASE_SPEED}
        texturePath="/textures/planets/mars/mars_8k.jpg"
        tilt={25.2}
      />

      <Planet
        name="Jupiter"
        distance={3.2 * DISTANCE_SCALE * 3}
        radius={5.5 * RADIUS_SCALE}
        rotationSpeed={0.44}
        travelSpeed={(1 / 11.86) * BASE_SPEED}
        texturePath="/textures/planets/jupiter/jupiter_8k.jpg"
        tilt={3.13}
      />
      <Planet
        name="Saturn"
        distance={4.5 * DISTANCE_SCALE * 3}
        radius={6.5 * RADIUS_SCALE}
        rotationSpeed={0.45}
        travelSpeed={(1 / 29) * BASE_SPEED}
        texturePath="/textures/planets/saturn/saturn_p_8k.jpg"
        tilt={26.7}
        ringTexturePath="/textures/planets/saturn/saturn_r_2k.png"
      />
      <Planet
        name="Uranus"
        distance={7.2 * DISTANCE_SCALE * 2.5}
        radius={3 * RADIUS_SCALE}
        rotationSpeed={0.72}
        travelSpeed={(1 / 84) * BASE_SPEED}
        texturePath="/textures/planets/uranus/uranus_2k.jpg"
        tilt={98}
      />
      <Planet
        name="Neptune"
        distance={10 * DISTANCE_SCALE * 2.5}
        radius={2.8 * RADIUS_SCALE}
        rotationSpeed={0.69}
        travelSpeed={(1 / 165) * BASE_SPEED}
        texturePath="/textures/planets/neptune/neptune_2k.jpg"
        tilt={28.32}
      />
    </>
  );
}

//нужно будет добавить апишку которая получает данные про планеты/их положение потому что каждый раз планеты запускается с одного и того же положения
//изменить треил, потому что тот треил очень соу-соу
//добавить спутники, кольца
//рефакторнуть код всего
