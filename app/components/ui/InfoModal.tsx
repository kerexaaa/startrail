import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/app/states/useUIStore";
import { DEFAULT_TRANSITION_DURATION } from "../../constants/ui";
import Switch from "./common/Switch";
import Keybind from "./common/Keybind";
import Button from "./common/Button";
import { closeIcon } from "@/app/assets/icons";
import Icon from "./common/Icon";

export default function InfoModal() {
  const {
    isInfoOpen,
    setIsInfoOpen,
    showOrbits,
    setShowOrbits,
    setShowLabels,
    showLabels,
  } = useUIStore();

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
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: DEFAULT_TRANSITION_DURATION,
            }}
            className="relative w-150 max-w-[90vw] max-h-[85vh] flex flex-col glassmorphism rounded-2xl text-white shadow-2xl overflow-hidden"
            onWheelCapture={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              icon={<Icon src={closeIcon} alt="Close" />}
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
            />

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
                  <Keybind keys="LMB" label="Focus (On body)" />
                  <Keybind keys="Scroll" label="Zoom In/Out" />
                  <Keybind
                    keys="F"
                    label="Enter/Exit Fullscreen"
                    color="text-red-400"
                  />
                  <Keybind
                    keys="Esc"
                    label="Exit Freecam"
                    color="text-red-400"
                  />
                  <Keybind keys="Esc" label="Exit Focus" color="text-red-400" />
                  <Keybind keys="" label="" color="transparent" />
                  <Keybind
                    keys="WASD"
                    label="Move Drone (Freecam Mode only)"
                    color="text-blue-300"
                  />
                  <Keybind
                    keys="LMB Hold"
                    label="Rotate Drone (Freecam Mode only)"
                    color="text-blue-300"
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 p-6 px-8 border-t border-white/10 bg-black/20 flex items-center justify-between gap-6">
              <Switch
                label="Show Orbital Paths"
                checked={showOrbits}
                onChange={() => setShowOrbits(!showOrbits)}
              />
              <Switch
                label="Show Planet Labels"
                checked={showLabels}
                onChange={() => setShowLabels(!showLabels)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
