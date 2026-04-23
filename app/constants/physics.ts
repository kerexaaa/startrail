import { PlanetConfig } from "../types/astronomy";
import { PLANET_IDS } from "./bodies";

//universal
export const DISTANCE_SCALE = 4;
export const RADIUS_SCALE = 0.5;
export const BASE_SPEED = (2 * Math.PI) / 365;
export const MIN_CLICK_RADIUS = 1.5;

export const AU_IN_KM = 149597870.7;
export const SPEED_OF_LIGHT_KM_S = 299792.458;
export const DAY_IN_SECONDS = 86400;
export const EARTH_RADIUS_KM = 6371;

//moons
export const EARTH_TO_MOON_DISTANCE_KM = 384400;
export const GENERIC_MOON_RADIUS = 1.5;
export const UNASSIGNED_MOON_RADIUS = 1;
export const MOON_DISTANCE_SCALE = 1.5;
export const MOON_ORBIT_PERIOD = 300;
export const YEAR_IN_DAYS = 365;
export const RANDOM_OFFSET_RANGE = 10;

//sun
export const SUN_ROTATION_SPEED = 27;
export const SUN_RADIUS = 10;

//planets

export const PLANETS_CONFIG: PlanetConfig[] = [
  {
    name: "Mercury",
    planetId: null,
    distance: 0.39 * DISTANCE_SCALE * 8,
    radius: 0.38 * RADIUS_SCALE,
    rotationSpeed: 1 / 7,
    travelSpeed: (1 / 0.24) * BASE_SPEED,
    tilt: 2.04,
  },
  {
    name: "Venus",
    planetId: null,
    distance: 0.72 * DISTANCE_SCALE * 6,
    radius: 0.95 * RADIUS_SCALE,
    rotationSpeed: 1 / 4,
    travelSpeed: (1 / 0.61) * BASE_SPEED,
    tilt: 177.4,
  },
  {
    name: "Earth",
    planetId: PLANET_IDS.Earth,
    distance: 1.0 * DISTANCE_SCALE * 6,
    radius: 1.0 * RADIUS_SCALE,
    rotationSpeed: 1,
    travelSpeed: 1 * BASE_SPEED,
    tilt: 23.5,
  },
  {
    name: "Mars",
    planetId: PLANET_IDS.Mars,
    distance: 1.52 * DISTANCE_SCALE * 5,
    radius: 0.53 * RADIUS_SCALE,
    rotationSpeed: 1.1,
    travelSpeed: (1 / 1.88) * BASE_SPEED,
    tilt: 25.2,
  },
  {
    name: "Jupiter",
    planetId: PLANET_IDS.Jupiter,
    distance: 3.2 * DISTANCE_SCALE * 3,
    radius: 6.5 * RADIUS_SCALE,
    rotationSpeed: 0.44,
    travelSpeed: (1 / 11.86) * BASE_SPEED,
    tilt: 3.13,
  },
  {
    name: "Saturn",
    planetId: PLANET_IDS.Saturn,
    distance: 4.5 * DISTANCE_SCALE * 3,
    radius: 5.5 * RADIUS_SCALE,
    rotationSpeed: 0.45,
    travelSpeed: (1 / 29) * BASE_SPEED,
    tilt: 26.7,
  },
  {
    name: "Uranus",
    planetId: PLANET_IDS.Uranus,
    distance: 7.2 * DISTANCE_SCALE * 2.5,
    radius: 3 * RADIUS_SCALE,
    rotationSpeed: 0.72,
    travelSpeed: (1 / 84) * BASE_SPEED,
    tilt: 98,
  },
  {
    name: "Neptune",
    planetId: PLANET_IDS.Neptune,
    distance: 10 * DISTANCE_SCALE * 2.5,
    radius: 2.8 * RADIUS_SCALE,
    rotationSpeed: 0.69,
    travelSpeed: (1 / 165) * BASE_SPEED,
    tilt: 28.32,
  },
];