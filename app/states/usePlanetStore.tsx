import { create } from "zustand";
import * as THREE from "three";
import { MoonData } from "../types/astronomy";

interface PlanetStore {
  focusedPlanet: THREE.Group | null;
  focusZoom: number;
  setFocusedPlanet: (planet: THREE.Group | null, zoom?: number) => void;

  planetRefs: Record<string, THREE.Group>;
  registerPlanetRef: (name: string, ref: THREE.Group) => void;

  searchTarget: string;
  setSearchTarget: (target: string) => void;

  timeMultiplier: number;
  setTimeMultiplier: (multiplier: number) => void;

  timeResetTrigger: number;
  triggerTimeReset: () => void;

  targetZoom: number;
  setTargetZoom: (val: number | ((prev: number) => number)) => void;

  apiMoons: MoonData[];
  setApiMoons: (val: MoonData[]) => void;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  focusedPlanet: null,
  focusZoom: 50,
  setFocusedPlanet: (planet, zoom) =>
    set({ focusedPlanet: planet, focusZoom: zoom }),

  planetRefs: {},
  registerPlanetRef: (name, ref) =>
    set((state) => ({
      planetRefs: { ...state.planetRefs, [name]: ref },
    })),

  searchTarget: "",
  setSearchTarget: (name) => set({ searchTarget: name }),

  timeMultiplier: 1,
  setTimeMultiplier: (multiplier) => set({ timeMultiplier: multiplier }),

  timeResetTrigger: 0,
  triggerTimeReset: () =>
    set((state) => ({
      timeResetTrigger: state.timeResetTrigger + 1,
      timeMultiplier: 1,
    })),

  targetZoom: 50,
  setTargetZoom: (val) =>
    set((state) => ({
      targetZoom: typeof val === "function" ? val(state.targetZoom) : val,
    })),
  apiMoons: [],
  setApiMoons: (val) => set({ apiMoons: val }),
}));
