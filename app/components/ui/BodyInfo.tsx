import { BODY_DATA, DEFAULT_TRANSITION_DURATION, PLANET_IDS } from "../../constants/index";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useMemo } from "react";
import dropdownIcon from "@/app/assets/icons/dark/dropdown.svg";

export default function BodyInfo() {
  const { focusedPlanet, searchTarget, apiMoons } = usePlanetStore();
  const [hidden, setHidden] = useState(false);

  const info = useMemo(() => {
    if (!searchTarget) return null;

    if (BODY_DATA[searchTarget]) {
      return BODY_DATA[searchTarget];
    }

    const apiMoon = apiMoons.find(
      (m) => m.englishName === searchTarget || m.name === searchTarget,
    );

    if (apiMoon) {
      let parentName = apiMoon.aroundPlanet?.planet || "unknown planet";
      const englishParent = Object.keys(PLANET_IDS).find(
        (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === parentName,
      );
      parentName = englishParent || parentName;

      return {
        type: "Minor Satellite",
        mass: apiMoon.mass || { massValue: 0, massExponent: 0 },
        temp: apiMoon.avgTemp ? `${apiMoon.avgTemp} K` : "Unknown",
        fact: apiMoon.discoveredBy
          ? `Discovered by ${apiMoon.discoveredBy} in ${apiMoon.discoveryDate}.`
          : `A minor celestial body orbiting ${parentName}.`,
        description: `${searchTarget} is a small natural satellite orbiting ${parentName}. It takes approximately ${Math.abs(
          apiMoon.sideralOrbit || 0,
        ).toFixed(
          2,
        )} days to complete one full revolution around its parent planet. With a mean radius of roughly ${
          apiMoon.meanRadius
        } km, it is one of the many minor bodies in the outer solar system.`,
      };
    }

    return null;
  }, [searchTarget, apiMoons]);

  const handleHide = () => {
    setHidden((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {focusedPlanet && info && (
        <motion.div
          onWheelCapture={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION }}
          className="absolute top-8 right-8 w-80 p-5 glassmorphism rounded-[20px] text-white z-10 pointer-events-auto shadow-2xl flex flex-col"
        >
          <div className="relative">
            <h2 className="text-3xl font-bold mb-1 tracking-wider">
              {searchTarget}
            </h2>
            <div
              className={`text-blue-300 font-medium transition-all ${
                !hidden ? "mb-5" : "mb-0"
              }`}
            >
              {info.type}
            </div>

            <div className="absolute top-0 right-0 z-20 flex justify-center items-center hover:bg-white/10 transition-colors rounded-full cursor-pointer p-2 user-select-none">
              <button
                onClick={handleHide}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <Image
                  src={dropdownIcon}
                  alt="visibility"
                  className={`transition-all duration-300 ${
                    !hidden ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {!hidden && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: DEFAULT_TRANSITION_DURATION, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="contents flex-col gap-3 text-sm shrink-0 pt-2">
                  <div className="flex justify-between border-b border-white/10 pb-2 pt-2">
                    <span className="text-white/50">Mass</span>
                    <span className="font-mono text-right">
                      {info.mass.massValue > 0 ? (
                        <>
                          {info.mass.massValue} &times; 10
                          <sup>{info.mass.massExponent}</sup> kg
                        </>
                      ) : (
                        "Unknown"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 pt-2">
                    <span className="text-white/50">Avg Temp</span>
                    <span className="font-mono text-right">{info.temp}</span>
                  </div>
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
      )}
    </AnimatePresence>
  );
}
