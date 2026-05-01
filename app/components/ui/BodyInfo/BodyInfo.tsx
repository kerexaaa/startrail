import { DEFAULT_TRANSITION_DURATION } from "../../../constants/index";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useBodyInfo } from "@/app/hooks/useBodyInfo";
import BodyInfoRow from "./BodyInfoRow";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { dropdownIcon } from "@/app/assets/icons";

export default function BodyInfo() {
  const { focusedPlanet } = usePlanetStore();
  const { info, name } = useBodyInfo();
  const [hidden, setHidden] = useState(false);

  if (!focusedPlanet || !info || !name) return null;

  return (
    <AnimatePresence>
      <motion.div
        onWheelCapture={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 32 }}
        transition={{ duration: DEFAULT_TRANSITION_DURATION }}
        className="absolute top-8 right-8 w-80 p-5 glassmorphism rounded-[20px] text-white z-10 pointer-events-auto shadow-2xl flex flex-col"
      >
        <div className="relative">
          <h2 className="text-3xl font-bold mb-1 tracking-wider">{name}</h2>
          <div
            className={`text-blue-300 font-medium transition-all ${!hidden ? "mb-5" : "mb-0"}`}
          >
            {info.type}
          </div>

          <Button
            variant="ghost"
            onClick={() => setHidden(!hidden)}
            className="absolute top-0 right-0 z-20 rounded-full"
          >
            <Icon
              src={dropdownIcon}
              alt="Toggle visibility"
              className={`transition-transform duration-300 ${!hidden ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {!hidden && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: DEFAULT_TRANSITION_DURATION,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="contents flex-col gap-3 text-sm shrink-0 pt-2">
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
                  <span className="text-white/50 block text-xs mb-1 uppercase tracking-wider">
                    Interesting Fact
                  </span>
                  <p className="leading-relaxed text-white/90 italic">
                    {info.fact}
                  </p>
                </div>

                <span className="mt-4 text-white/50 block text-xs mb-2 uppercase tracking-wider">
                  Description
                </span>
                <div className="text-sm leading-relaxed text-white/80 text-justify overflow-y-auto max-h-40 pr-2 custom-scrollbar">
                  {info.description}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
