import { AnimatePresence, motion } from "framer-motion";
import { usePlanetStore } from "../../states/usePlanetStore";
import { getBody, useAstroCalculations } from "../../hooks/useAstroCalcs";

interface TelescopeDataProps {
  fromValue: string;
  toValue: string;
  setToValue: (val: string) => void;
  setFromValue: (val: string) => void;
}

export default function TelescopeData({
  fromValue,
  toValue,
  setFromValue,
  setToValue,
}: TelescopeDataProps) {
  const { setSearchTarget, setFocusedPlanet } = usePlanetStore();

  const { astroData, setAstroData, locationName, isLoading } =
    useAstroCalculations(fromValue, toValue);

  const handleReset = () => {
    setAstroData(null);
    setFromValue("");
    setToValue("");
    setSearchTarget("");
    setFocusedPlanet(null);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && fromValue && toValue && fromValue !== toValue ? (
        <motion.div
          key="skeleton"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-4 w-72 text-white z-10"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-white/10 rounded-lg"></div>
              <div className="h-16 bg-white/10 rounded-lg"></div>
            </div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        </motion.div>
      ) : astroData &&
        fromValue !== toValue &&
        getBody(toValue) &&
        (getBody(fromValue) || fromValue === "My Location") ? (
        <motion.div
          key="data"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-3 text-white z-10 w-72"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-white/50 border-b border-white/10 pb-2 leading-relaxed pr-6">
            Tracking:{" "}
            <span className="text-white font-semibold capitalize">
              {toValue}
            </span>{" "}
            <br />
            from{" "}
            <span className="text-white font-medium capitalize">
              {locationName}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <button
              onClick={() => handleReset()}
              className="text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {astroData.mode === "telescope" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-white/50">Azimuth</div>
                <div className="text-xl font-mono">
                  {astroData.az.toFixed(2)}°
                </div>
              </div>
              <div>
                <div className="text-xs text-white/50">Altitude</div>
                <div className="text-xl font-mono">
                  {astroData.alt.toFixed(2)}°
                  {astroData.alt < 0 && (
                    <span className="text-red-400 text-[10px] block leading-tight mt-1">
                      Below horizon
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {astroData.mode === "interplanetary" && (
            <div className="bg-white/5 p-2 rounded-lg">
              <div className="text-xs text-white/50">Light Travel Time</div>
              <div className="text-lg font-mono text-blue-300">
                {Math.floor(astroData.lightTime / 60)}m{" "}
                {(astroData.lightTime % 60).toFixed(0)}s
              </div>
            </div>
          )}

          <div className="mt-1 text-xs text-white/50">
            Distance:&nbsp;
            {(astroData.dist * 149597870.7).toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            km <br />
            <span className="text-[10px] text-white/30">
              {astroData.dist.toFixed(4)} AU
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
