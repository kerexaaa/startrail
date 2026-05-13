import { PlanetConfig } from "../types/astronomy";
import { PLANET_IDS } from "./bodies";

export const AU_IN_KM = 149597870.7;
export const SPEED_OF_LIGHT_KM_S = 299792.458;
export const DAY_IN_SECONDS = 86400;
export const EARTH_RADIUS_KM = 6371;
export const YEAR_IN_DAYS = 365;

export const SIZE_SCALE = 1; // 1 unit = 1 earth radius
export const DISTANCE_SCALE = 40; // (1 AU) = 40 units
export const SUN_RADIUS = 15; // sun scale
export const SUN_ROTATION_SPEED = 27;
export const MIN_CLICK_RADIUS = 1.5;
export const BASE_SPEED = (2 * Math.PI) / YEAR_IN_DAYS;

export const EARTH_TO_MOON_DISTANCE_KM = 384400;
export const MOON_ORBIT_PERIOD = 300;
export const GENERIC_MOON_RADIUS = 0.8;
export const UNASSIGNED_MOON_RADIUS = 0.5;

export const PLANETS_CONFIG: PlanetConfig[] = [
  {
    name: "Mercury",
    planetId: null,
    distance: SUN_RADIUS + 0.39 * DISTANCE_SCALE,
    radius: 0.38 * SIZE_SCALE,
    rotationSpeed: 1 / 58.6,
    travelSpeed: (1 / 0.24) * BASE_SPEED,
    tilt: 0.03,
  },
  {
    name: "Venus",
    planetId: null,
    distance: SUN_RADIUS + 0.72 * DISTANCE_SCALE,
    radius: 0.95 * SIZE_SCALE,
    rotationSpeed: -1 / 243,
    travelSpeed: (1 / 0.61) * BASE_SPEED,
    tilt: 177.3,
  },
  {
    name: "Earth",
    planetId: PLANET_IDS.Earth,
    distance: SUN_RADIUS + 1.0 * DISTANCE_SCALE,
    radius: 1.0 * SIZE_SCALE,
    rotationSpeed: 1,
    travelSpeed: 1 * BASE_SPEED,
    tilt: 23.4,
  },
  {
    name: "Mars",
    planetId: PLANET_IDS.Mars,
    distance: SUN_RADIUS + 1.52 * DISTANCE_SCALE,
    radius: 0.53 * SIZE_SCALE,
    rotationSpeed: 1 / 1.03,
    travelSpeed: (1 / 1.88) * BASE_SPEED,
    tilt: 25.2,
  },
  {
    name: "Jupiter",
    planetId: PLANET_IDS.Jupiter,
    distance: SUN_RADIUS + 5.2 * DISTANCE_SCALE,
    radius: 11.2 * SIZE_SCALE,
    rotationSpeed: 1 / 0.41,
    travelSpeed: (1 / 11.86) * BASE_SPEED,
    tilt: 3.1,
  },
  {
    name: "Saturn",
    planetId: PLANET_IDS.Saturn,
    distance: SUN_RADIUS + 9.5 * DISTANCE_SCALE,
    radius: 9.4 * SIZE_SCALE,
    rotationSpeed: 1 / 0.45,
    travelSpeed: (1 / 29.4) * BASE_SPEED,
    tilt: 26.7,
  },
  {
    name: "Uranus",
    planetId: PLANET_IDS.Uranus,
    distance: SUN_RADIUS + 19.2 * DISTANCE_SCALE,
    radius: 4.0 * SIZE_SCALE,
    rotationSpeed: -1 / 0.72,
    travelSpeed: (1 / 84) * BASE_SPEED,
    tilt: 97.8,
  },
  {
    name: "Neptune",
    planetId: PLANET_IDS.Neptune,
    distance: SUN_RADIUS + 30.1 * DISTANCE_SCALE,
    radius: 3.9 * SIZE_SCALE,
    rotationSpeed: 1 / 0.67,
    travelSpeed: (1 / 165) * BASE_SPEED,
    tilt: 28.3,
  },
];
