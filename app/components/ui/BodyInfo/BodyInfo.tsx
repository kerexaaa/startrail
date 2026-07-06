import { DEFAULT_TRANSITION_DURATION } from "../../../constants/index";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useBodyInfo } from "@/app/hooks/useBodyInfo";
import BodyInfoRow from "./BodyInfoRow";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { closeIcon, dropdownIcon } from "@/app/assets/icons";
import { useAstroCalculations } from "@/app/hooks/useAstroCalcs";
import { useUIStore } from "@/app/states/useUIStore";
// import { BodyDataType } from "@/app/types/astronomy";

export default function BodyInfo() {
  const { focusedPlanet } = usePlanetStore();
  const { isVisible } = useUIStore();
  const { info, name } = useBodyInfo();
  // const [hidden, setHidden] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { handleReset } = useAstroCalculations({
    fromValue: "",
    toValue: "",
    setFromValue: () => {},
    setToValue: () => {},
  });

  // if (!focusedPlanet || !info || !name) return null;

  return (
    <AnimatePresence mode="wait">
      {focusedPlanet &&
        info &&
        name &&
        (!isExpanded ? (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 lg:bottom-[unset] lg:left-[unset] lg:translate-x-[unset] lg:right-8 lg:top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          >
            <Button
              onClick={() => setIsExpanded(true)}
              className="glassmorphism rounded-full px-6 py-3 flex items-center gap-3 text-white shadow-2xl hover:bg-white/10 active:scale-95 transition-all"
            >
              <Icon src={dropdownIcon} alt="Expand" className="rotate-180" />
              <span className="font-medium text-sm lg:text-base">{name}</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="full-card"
            onWheelCapture={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: DEFAULT_TRANSITION_DURATION }}
            className={`fixed bottom-0 transition-all duration-300 left-0 w-full rounded-t-3xl p-5 lg:pb-5 lg:absolute lg:bottom-auto lg:left-[unset] lg:top-8 ${isVisible ? "lg:right-24" : "lg:right-8"} lg:w-80 lg:rounded-[20px] glassmorphism text-white z-50 lg:z-10 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.4)] lg:shadow-2xl flex flex-col`}
          >
            <div className="relative pr-16">
              <h2 className="text-xl lg:text-3xl font-bold mb-1 tracking-wider">
                {name}
              </h2>
              <div className="text-blue-300 font-medium mb-5 text-base lg:text-xl">
                {info.type}
              </div>

              <div className="absolute top-0 right-0 z-20 flex gap-1">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-3 hover:bg-white/10 active:bg-white/20 transition-colors"
                >
                  <Icon src={dropdownIcon} alt="Hide" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleReset()}
                  className="rounded-full p-3 hover:bg-white/10 active:bg-white/20 transition-colors"
                >
                  <Icon src={closeIcon} alt="Close info" />
                </Button>
              </div>
            </div>

            <div className="contents flex-col gap-3 text-sm shrink-0">
              <BodyInfoRow label="Mass">
                {info.mass.massValue > 0 ? (
                  <>
                    {info.mass.massValue} &times; 10
                    <sup>{info.mass.massExponent}</sup> kg
                  </>
                ) : (
                  "Unknown"
                )}
              </BodyInfoRow>

              <BodyInfoRow label="Avg Temp">{info.temp}</BodyInfoRow>

              <div className="pt-2 pb-3 border-b border-white/10">
                <span className="text-white/50 block text-xs lg:text-sm mb-1 uppercase tracking-wider">
                  Interesting Fact
                </span>
                <p className="leading-relaxed text-sm lg:text-base text-white/90 italic">
                  {info.fact}
                </p>
              </div>

              <span className="mt-4 text-white/50 block text-xs lg:text-sm mb-2 uppercase tracking-wider">
                Description
              </span>
              <div className="text-sm lg:text-base leading-relaxed text-white/80 text-justify overflow-y-auto max-h-[30vh] lg:max-h-40 pr-2 custom-scrollbar">
                {info.description}
              </div>
              <Button
                className="w-full mt-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
                onClick={() => {}}
              >
                View Full Data (later)
              </Button>
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}
