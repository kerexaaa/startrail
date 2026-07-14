import { AnimatePresence, motion } from "framer-motion";
import { usePlanetStore } from "../../../states/usePlanetStore";
import { useUIStore } from "../../../states/useUIStore";
import { getBody, useAstroCalculations } from "../../../hooks/useAstroCalcs";
import TelescopeDataSkeleton from "./TelescopeDataSkeleton";
import SatellitesMode from "./SatellitesMode";
import TelescopeMode from "./TelescopeMode";
import InterplanetaryMode from "./InterplanetaryMode";
import DistanceRowInfo from "./DistanceRowInfo";
import DataCardHeader from "./DataCardHeader";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { closeIcon, dropdownIcon, infoIcon } from "@/app/assets/icons";
import { useState } from "react";

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
  const { apiMoons } = usePlanetStore();
  const { isMobileSearchOpen } = useUIStore();
  const { astroData, locationName, foundOriginPlanet, handleReset, isLoading } =
    useAstroCalculations({ fromValue, toValue, setToValue, setFromValue });

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
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isSkeleton ? (
        <TelescopeDataSkeleton />
      ) : showDataCard ? (
        <motion.div
          key="container"
          className={`absolute left-0 z-10 w-full lg:w-80 pointer-events-none transition-all duration-300 ${
            isMobileSearchOpen ? "top-35" : "top-0"
          } lg:top-36`}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="pill"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto w-max"
              >
                <Button
                  onClick={() => setIsExpanded(true)}
                  className="glassmorphism rounded-full px-5 py-3 flex items-center gap-3 text-white text-sm lg:text-base font-medium shadow-xl hover:bg-white/10 active:scale-95 transition-all"
                >
                  <Icon src={infoIcon} alt="Info" />
                  <span>
                    Tracking:{" "}
                    <span className="capitalize text-blue-300">{toValue}</span>
                  </span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="full-card"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto p-6 glassmorphism rounded-2xl flex flex-col gap-4 text-white shadow-2xl w-[calc(100dvw-32px)] lg:w-full mx-auto"
              >
                <DataCardHeader
                  astroData={astroData}
                  foundOriginPlanet={foundOriginPlanet}
                  locationName={locationName}
                  setToValue={setToValue}
                  toValue={toValue}
                />

                <div className="absolute top-4 right-4 flex gap-1">
                  <Button
                    onClick={() => setIsExpanded(false)}
                    variant="ghost"
                    className="hover:bg-white/10 active:bg-white/20 p-3 rounded-full transition-colors"
                    icon={
                      <Icon
                        src={dropdownIcon}
                        alt="Hide"
                        className="rotate-180"
                      />
                    }
                  />
                  <Button
                    onClick={() => handleReset()}
                    variant="ghost"
                    className="hover:bg-white/10 active:bg-white/20 p-3 rounded-full transition-colors"
                    icon={<Icon src={closeIcon} alt="Close icon" />}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {astroData.mode === "satellites" && currentMoon && (
                    <SatellitesMode
                      currentMoon={currentMoon}
                      foundOriginPlanet={foundOriginPlanet}
                      toValue={toValue}
                    />
                  )}

                  {astroData.mode === "telescope" && (
                    <TelescopeMode astroData={astroData} />
                  )}

                  {astroData.mode === "interplanetary" && (
                    <InterplanetaryMode
                      astroData={astroData}
                      fromValue={fromValue}
                    />
                  )}

                  {(astroData.mode === "interplanetary" ||
                    astroData.mode === "telescope") && (
                    <DistanceRowInfo astroData={astroData} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
