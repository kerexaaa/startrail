import { AnimatePresence, motion } from "framer-motion";
import { usePlanetStore } from "../../states/usePlanetStore";
import { getBody, useAstroCalculations } from "../../hooks/useAstroCalcs";
import { Tooltip } from "react-tooltip";
import { getSphereParams } from "../../utils/getSphereParams";
import {
  AU_IN_KM,
  DAY_IN_SECONDS,
  MIN_ZOOM,
  ZOOM_SCALE,
  DEFAULT_TRANSITION_DURATION,
  PLANET_IDS,
} from "../../constants/index";

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
  const {
    setSearchTarget,
    setFocusedPlanet,
    searchTarget,
    apiMoons,
    planetRefs,
  } = usePlanetStore();
  const { astroData, setAstroData, locationName, isLoading } =
    useAstroCalculations(fromValue, toValue);

  const foundOriginPlanet = (val: string): string => {
    const moon = apiMoons.find((item) => item.englishName === val);
    if (moon?.aroundPlanet) {
      const frenchId = moon.aroundPlanet.planet;
      const englishName = Object.keys(PLANET_IDS).find(
        (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === frenchId,
      );
      return englishName || frenchId;
    }
    return "";
  };

  const handleReset = () => {
    setAstroData(null);
    setFromValue("");
    setToValue("");
    setSearchTarget("");
    setFocusedPlanet(null);
  };

  const isSkeleton = isLoading && fromValue && toValue && fromValue !== toValue;
  const isSatellitesMode = astroData?.mode === "satellites" && toValue;
  const isTrackingMode =
    astroData &&
    astroData.mode !== "satellites" &&
    fromValue !== toValue &&
    getBody(toValue);
  const showDataCard = isSatellitesMode || isTrackingMode;
  const currentMoon = isSatellitesMode
    ? apiMoons.find((item) => item.englishName === toValue)
    : null;

  return (
    <AnimatePresence mode="wait">
      {isSkeleton ? (
        <motion.div
          key="skeleton"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-4 w-72 text-white z-10"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION }}
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
      ) : showDataCard ? (
        <motion.div
          key="data"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-3 text-white z-10 w-72"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION }}
        >
          <div className="text-sm text-white/50 border-b border-white/10 pb-2 leading-relaxed pr-6">
            {astroData.mode === "satellites" ? "Satellite: " : "Tracking: "}
            <span className="text-white font-semibold capitalize">
              {toValue}
            </span>{" "}
            <br />
            {astroData.mode === "satellites" ? "Origin planet: " : "from: "}
            <span
              className={`text-white font-medium capitalize ${
                astroData.mode === "satellites"
                  ? "underline decoration-wavy cursor-pointer "
                  : ""
              }`}
              onClick={() => {
                if (astroData.mode !== "satellites") return;

                const parentName = foundOriginPlanet(toValue);
                const parentRef = planetRefs[parentName];

                if (parentRef) {
                  const sphereParams = getSphereParams(parentRef);
                  if (sphereParams) {
                    setFocusedPlanet(
                      parentRef,
                      Math.max(MIN_ZOOM, sphereParams.radius * ZOOM_SCALE),
                    );
                  }
                  setSearchTarget(parentName);
                  setToValue(parentName);
                }
              }}
            >
              {astroData.mode === "satellites"
                ? foundOriginPlanet(toValue)
                : locationName}
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

          {astroData.mode === "satellites" && currentMoon && (
            <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-white/50">Radius</div>
                  <div className="text-lg font-mono text-blue-300">
                    {currentMoon.meanRadius.toLocaleString()} km
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Orbital Period</div>
                  <div className="text-lg font-mono text-blue-300">
                    {Math.abs(currentMoon.sideralOrbit).toFixed(2)} days
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-2">
                <div className="text-xs text-white/50">
                  Distance from {foundOriginPlanet(toValue)}
                </div>
                <div className="text-lg font-mono text-blue-300">
                  {currentMoon.semimajorAxis.toLocaleString()} km
                </div>
              </div>
            </div>
          )}

          {astroData.mode === "telescope" && (
            <div className="grid grid-cols-2 gap-2">
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
              <div>
                <div className="text-xs text-white/50">Constellation</div>
                <div className="text-xl font-mono">
                  {astroData.constellation}
                </div>
              </div>
              <div id="magnitudeTooltip" className="w-fit">
                <div className="text-xs text-white/50">Magnitude</div>
                <div className="text-xl font-mono underline decoration-wavy">
                  {astroData.magnitude.toFixed(2)}
                </div>
                <Tooltip
                  anchorSelect="#magnitudeTooltip"
                  className="z-50 max-w-xs text-center"
                >
                  {astroData.magnitude < 1 &&
                    "Very bright, easily visible to the naked eye."}
                  {astroData.magnitude >= 1 &&
                    astroData.magnitude <= 6 &&
                    "Visible to the naked eye in a dark, clear sky."}
                  {astroData.magnitude > 6 &&
                    "Requires a telescope or good binoculars to see."}
                </Tooltip>
              </div>
            </div>
          )}

          {astroData.mode === "interplanetary" && (
            <>
              <div className="bg-white/5 p-2 rounded-lg grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-white/50">Light Travel Time</div>
                  <div className="text-lg font-mono text-blue-300">
                    {Math.floor(astroData.lightTime / 60)}m{" "}
                    {(astroData.lightTime % 60).toFixed(0)}s
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Signal Ping:</div>
                  <div className="text-lg font-mono text-blue-300">
                    {Math.floor(astroData.pingTime / 60)}m{" "}
                    {(astroData.pingTime % 60).toFixed(0)}s
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/50">
                  {searchTarget} Relative Speed (vs {fromValue})
                </div>
                <div className="text-lg font-mono text-blue-300">
                  {(
                    (astroData.speed * AU_IN_KM) /
                    DAY_IN_SECONDS
                  ).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  km/s
                  <br />
                  <span className="text-[10px] text-white/30">
                    {astroData.speed.toFixed(2)} AU/day
                  </span>
                </div>
              </div>
            </>
          )}

          {(astroData.mode === "interplanetary" ||
            astroData.mode === "telescope") && (
            <div className="mt-1 text-xs text-white/50">
              Distance:&nbsp;
              {(astroData.dist * AU_IN_KM).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}{" "}
              km <br />
              <span className="text-[10px] text-white/30">
                {astroData.dist.toFixed(2)} AU
              </span>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
