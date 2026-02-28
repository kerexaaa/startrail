export const EARTH_RADIUS = 3;
export const EARTH_DISTANCE = 3;
export const EARTH_ROTATION = 1;
export const EARTH_TRAVEL = 1;

export const DISTANCE_SCALE = 4;

export const RADIUS_SCALE = 0.5;

export const BASE_SPEED = (2 * Math.PI) / 365;

export const PLANETARY_BODIES = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

export const SPEED_STEPS = [
  { label: "1 day/sec", value: 1 },
  { label: "2 days/sec", value: 2 },
  { label: "3 days/sec", value: 3 },
  { label: "1 week/sec", value: 7 },
  { label: "2 weeks/sec", value: 14 },
  { label: "3 weeks/sec", value: 21 },
  { label: "1 month/sec", value: 30 },
  { label: "3 months/sec", value: 90 },
  { label: "6 months/sec", value: 180 },
  { label: "1 year/sec", value: 365 },
  { label: "3 years/sec", value: 365 * 3 },
  { label: "5 years/sec", value: 365 * 5 },
];
