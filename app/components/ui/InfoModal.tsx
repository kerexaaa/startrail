import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/app/states/useUIStore";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import {
  APP_KEYBINDS,
  DEFAULT_TRANSITION_DURATION,
  MOBILE_KEYBINDS,
} from "../../constants/ui";
import Switch from "./common/Switch";
import Keybind from "./common/Keybind";
import Button from "./common/Button";
import { closeIcon } from "@/app/assets/icons";
import Icon from "./common/Icon";
import { useIsTouchDevice } from "@/app/hooks/useIsTouchDevice";

export default function InfoModal() {
  const {
    isInfoOpen,
    setIsInfoOpen,
    showOrbits,
    setShowOrbits,
    setShowLabels,
    showLabels,
  } = useUIStore();

  const { showSatellites, setShowSatellites } = usePlanetStore();

  const isTouchDevice = useIsTouchDevice();

  const activeKeybinds = isTouchDevice ? MOBILE_KEYBINDS : APP_KEYBINDS;

  return (
    <AnimatePresence>
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto p-4">
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
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col glassmorphism rounded-2xl text-white shadow-2xl overflow-hidden"
            onWheelCapture={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              icon={<Icon src={closeIcon} alt="Close" />}
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-10 p-3"
            />

            <div className="shrink-0 p-5 lg:p-8 pb-4 border-b border-white/10 pr-16">
              <h2 className="text-2xl lg:text-3xl font-bold mb-1 tracking-wider">
                Startrail
              </h2>
              <div className="text-base lg:text-xl text-blue-300 font-medium">
                Interactive Solar System
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 lg:p-8 lg:pt-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="text-sm lg:text-base uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                    Telescope Mode
                  </h3>
                  <p className="text-xs lg:text-sm text-white/70 leading-relaxed">
                    Select <b className="text-white">My Location</b> as the
                    source and celestial body as destination to get real-time
                    azimuth, altitude, magnitude, and constellation data for
                    stargazing.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="text-sm lg:text-base uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                    Interplanetary
                  </h3>
                  <p className="text-xs lg:text-sm text-white/70 leading-relaxed">
                    Select two different celestial bodies to instantly calculate
                    the distance, light travel time, signal ping, and relative
                    speed.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 md:col-span-2 lg:col-span-1">
                  <h3 className="text-sm lg:text-base uppercase tracking-widest text-blue-300 mb-2 font-semibold">
                    Satellites Mode
                  </h3>
                  <p className="text-xs lg:text-sm text-white/70 leading-relaxed">
                    Select a moon as the destination to view its radius, orbital
                    period, and distance from its parent planet. The parent
                    planet is clickable for quick navigation.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs lg:text-sm uppercase tracking-widest text-white/50 mb-4">
                  {isTouchDevice ? "Touch Controls" : "Controls & Keybinds"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {activeKeybinds.map((kb, index) => (
                    <Keybind
                      key={index}
                      keys={kb.keys}
                      label={kb.label}
                      color={kb.color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 p-5 lg:p-6 text-xs lg:text-sm lg:px-8 border-t border-white/10 bg-black/20 flex flex-wrap items-start sm:items-center justify-between gap-4">
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
              <Switch
                label="Show Satellites"
                checked={showSatellites}
                onChange={() => setShowSatellites(!showSatellites)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
