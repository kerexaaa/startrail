export const IDLE_TIMEOUT = 10000;
export const LOADER_CHANGE = 1500;

export const MIN_ZOOM = 2;
export const MAX_ZOOM = 100;
export const ZOOM_SCALE = 3;
export const ZOOM_LERP_FACTOR = 0.06;

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

export const DEFAULT_TRANSITION_DURATION = 0.2;
