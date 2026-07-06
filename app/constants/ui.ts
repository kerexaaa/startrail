export const IDLE_TIMEOUT = 10000;
export const LOADER_CHANGE = 1500;

export const MIN_ZOOM = 2;
export const MAX_ZOOM = 3000;
export const ZOOM_SCALE = 3;
export const ZOOM_LERP_FACTOR = 0.06;
export const ZOOM_SPEED_MULTIPLIER = 0.15;
export const ZOOM_BUTTON_MULTIPLIER = 0.1;

export const SPEED_STEPS = [
  { label: "1 hour/sec", value: 1 / 24 },
  { label: "6 hours/sec", value: 0.25 },
  { label: "12 hours/sec", value: 0.5 },
  { label: "1 day/sec", value: 1 },
  { label: "1 week/sec", value: 7 },
  { label: "2 weeks/sec", value: 14 },
  { label: "1 month/sec", value: 30 },
  { label: "3 months/sec", value: 90 },
  { label: "6 months/sec", value: 180 },
  { label: "1 year/sec", value: 365 },
  { label: "3 years/sec", value: 365 * 3 },
  { label: "5 years/sec", value: 365 * 5 },
];

export interface KeybindInfo {
  keys: string;
  label: string;
  color?: string;
}

export const MOBILE_KEYBINDS = [
  { keys: ["Tap"], label: "Focus (On body)", color: "bg-white/20" },
  { keys: ["Pinch"], label: "Zoom In/Out", color: "bg-white/20" },
  { keys: ["Drag"], label: "Move Camera", color: "bg-white/20" },
  { keys: ["2-Finger Drag"], label: "Rotate Camera", color: "bg-white/20" },
];

export const APP_KEYBINDS: KeybindInfo[] = [
  {
    keys: "LMB",
    label: "Focus (On body)",
  },
  {
    keys: "Scroll",
    label: "Zoom In/Out",
  },
  {
    keys: "F",
    label: "Enter/Exit Fullscreen",
    color: "text-red-400",
  },
  {
    keys: "Esc",
    label: "Exit Freecam",
    color: "text-red-400",
  },
  {
    keys: "Esc",
    label: "Exit Focus",
    color: "text-red-400",
  },
  {
    keys: "",
    label: "",
    color: "transparent",
  },
  {
    keys: "WASD",
    label: "Move Drone (Freecam Mode only)",
    color: "text-blue-300",
  },
  {
    keys: "LMB Hold",
    label: "Rotate Drone (Freecam Mode only)",
    color: "text-blue-300",
  },
];

export const DEFAULT_TRANSITION_DURATION = 0.2;
