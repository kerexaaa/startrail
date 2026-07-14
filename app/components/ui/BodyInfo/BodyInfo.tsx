import { DEFAULT_TRANSITION_DURATION } from "../../../constants/index";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useBodyInfo } from "@/app/hooks/useBodyInfo";
import BodyInfoRow from "./BodyInfoRow";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { closeIcon, dropdownIcon, resetIcon } from "@/app/assets/icons";
import { useAstroCalculations } from "@/app/hooks/useAstroCalcs";

const cardTransition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.8,
} as const;

const pillTransition = {
  type: "spring",
  stiffness: 400,
  damping: 38,
  mass: 0.6,
} as const;

export default function BodyInfo() {
  const { focusedPlanet } = usePlanetStore();
  const { info, name } = useBodyInfo();
  const [isExpanded, setIsExpanded] = useState(false);
  const { handleReset } = useAstroCalculations({
    fromValue: "",
    toValue: "",
    setFromValue: () => {},
    setToValue: () => {},
  });

  return (
    <AnimatePresence>
      {focusedPlanet && info && name && (
        <motion.div
          key="body-info-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION }}
          className="fixed inset-0 pointer-events-none z-40"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isExpanded ? (
              <motion.div
                key="pill"
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 12 }}
                transition={pillTransition}
                style={{ willChange: "transform, opacity" }}
                className="absolute bottom-4 lg:bottom-[unset] lg:left-[unset] lg:translate-x-[unset] lg:right-8 lg:top-8 left-1/2 -translate-x-1/2 pointer-events-auto select-none"
              >
                <Button
                  onClick={() => setIsExpanded(true)}
                  className="glassmorphism rounded-full px-6 py-3 flex items-center gap-3 text-white shadow-2xl hover:bg-white/10 active:bg-white/10 transition-all"
                >
                  <Icon
                    src={dropdownIcon}
                    alt="Expand"
                    className="rotate-180"
                  />
                  <span className="font-medium text-sm lg:text-base">
                    {name}
                  </span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="full-card"
                onWheelCapture={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={cardTransition}
                style={{ willChange: "transform, opacity" }}
                className="absolute bottom-0 left-0 w-full rounded-t-3xl p-5 lg:pb-5 lg:bottom-auto lg:left-[unset] lg:top-8 lg:right-8 lg:w-80 lg:rounded-[20px] glassmorphism text-white shadow-[0_-10px_40px_rgba(0,0,0,0.4)] lg:shadow-2xl flex flex-col pointer-events-auto select-none"
              >
                <div className="relative pr-16">
                  <h2 className="text-xl lg:text-3xl font-bold mb-1 tracking-wider select-text">
                    {name}
                  </h2>
                  <div className="text-blue-300 font-medium mb-5 text-base lg:text-xl">
                    {info.type}
                  </div>

                  <div className="absolute top-0 right-0 z-20 flex gap-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleReset()}
                      className="rounded-full p-3 hover:bg-white/10 active:bg-white/20 transition-colors"
                      title="Return to Solar System"
                    >
                      <Icon src={resetIcon} alt="Return to Solar System" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="rounded-full p-3 hover:bg-white/10 active:bg-white/20 transition-colors"
                      title="Minimize Panel"
                    >
                      <Icon src={closeIcon} alt="Minimize" />
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
                    <p className="leading-relaxed text-sm lg:text-base text-white/90 italic select-text">
                      {info.fact}
                    </p>
                  </div>

                  <span className="mt-4 text-white/50 block text-xs lg:text-sm mb-2 uppercase tracking-wider">
                    Description
                  </span>
                  <div className="text-sm lg:text-base leading-relaxed text-white/80 text-justify overflow-y-auto max-h-[30vh] lg:max-h-40 pr-2 custom-scrollbar select-text">
                    {info.description}
                  </div>
                  <Button
                    className="w-full mt-5 py-3 bg-white/10 hover:bg-white/20 active:bg-white/20 text-white font-medium rounded-xl transition-all"
                    onClick={() => {}}
                  >
                    View Full Data (later)
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
