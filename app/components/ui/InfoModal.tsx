import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/app/states/useUIStore";
import { DEFAULT_TRANSITION_DURATION } from '../../constants/ui';

export default function InfoModal() {
  const { isInfoOpen, setIsInfoOpen, showOrbits, setShowOrbits } = useUIStore();

  return (
    <AnimatePresence>
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInfoOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: DEFAULT_TRANSITION_DURATION }}
            className="relative w-150 max-w-[90vw] max-h-[85vh] flex flex-col glassmorphism rounded-2xl text-white shadow-2xl overflow-hidden"
            onWheelCapture={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="shrink-0 p-8 pb-4 border-b border-white/10">
              <h2 className="text-3xl font-bold mb-1 tracking-wider">
                Startrail
              </h2>
              <div className="text-sm text-blue-300 font-medium">
                Interactive Solar System
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar pr-4">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="text-xs uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                    Telescope Mode
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Select <b>My Location</b> as the source and celestial body
                    as destination to get real-time azimuth, altitude,
                    magnitude, and constellation data for stargazing.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="text-xs uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                    Interplanetary
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Select two different celestial bodies to instantly calculate
                    the distance, light travel time, signal ping, and relative
                    speed.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">
                  Controls & Keybinds
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  <div className="text-sm text-white/80 flex items-center">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-10 text-center">
                      LMB
                    </span>
                    Focus (On body)
                  </div>
                  <div className="text-sm text-white/80 flex items-center">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-10 text-center">
                      Scroll
                    </span>
                    Zoom In/Out
                  </div>
                  <div className="text-sm text-white/80 flex items-center">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-10 text-center text-red-400">
                      F
                    </span>
                    Enter/Exit Fullscreen
                  </div>
                  <div className="text-sm text-white/80 flex items-center">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-10 text-center text-red-400">
                      F1
                    </span>
                    Exit Freecam
                  </div>
                  <div className="text-sm text-white/80 flex items-center">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-10 text-center text-red-400">
                      Q
                    </span>
                    Exit Focus
                  </div>
                  <div className="text-sm text-white/80 flex items-center col-span-2">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-16 text-center text-blue-300">
                      WASD
                    </span>
                    Move Drone (Freecam Mode only)
                  </div>
                  <div className="text-sm text-white/80 flex items-center col-span-2">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded mr-3 text-xs min-w-16 text-center text-blue-300">
                      LMB Hold
                    </span>
                    Rotate Drone (Freecam Mode only)
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 p-6 px-8 border-t border-white/10 bg-black/20 flex items-center justify-between">
              <span className="text-sm text-white/80 font-medium">
                Show Orbital Paths
              </span>
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${showOrbits ? "bg-blue-500" : "bg-white/20"}`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 bg-white rounded-full absolute top-1"
                  initial={false}
                  animate={{ left: showOrbits ? "26px" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, duration: DEFAULT_TRANSITION_DURATION }}
                />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
