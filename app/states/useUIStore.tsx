import { create } from "zustand";

interface UIStore {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;

  isFreeCam: boolean;
  setIsFreeCam: (val: boolean) => void;

  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;

  isUserIdle: boolean;
  setIsUserIdle: (val: boolean) => void;

  isVisible: boolean;
  setIsVisible: (val: boolean | ((prev: boolean) => boolean)) => void;

  isInfoOpen: boolean;
  setIsInfoOpen: (val: boolean) => void;

  showOrbits: boolean;
  setShowOrbits: (val: boolean) => void;

  showLabels: boolean;
  setShowLabels: (val: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: true,
  setIsLoading: (val) => set({ isLoading: val }),

  isFreeCam: false,
  setIsFreeCam: (val) => set({ isFreeCam: val }),

  isFullscreen: false,
  setIsFullscreen: (val) => set({ isFullscreen: val }),

  isUserIdle: false,
  setIsUserIdle: (val) => set({ isUserIdle: val }),

  isVisible: true,
  setIsVisible: (val) =>
    set((state) => ({
      isVisible: typeof val === "function" ? val(state.isVisible) : val,
    })),

  isInfoOpen: false,
  setIsInfoOpen: (val) => set({ isInfoOpen: val }),

  showOrbits: true,
  setShowOrbits: (val) => set({ showOrbits: val }),

  showLabels: true,
  setShowLabels: (val) => set({ showLabels: val }),
}));
