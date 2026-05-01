import { AnimatePresence, motion } from "framer-motion";
import { usePlanetStore } from "../../../states/usePlanetStore";
import { getBody, useAstroCalculations } from "../../../hooks/useAstroCalcs";
import { DEFAULT_TRANSITION_DURATION } from "../../../constants/index";
import TelescopeDataSkeleton from "./TelescopeDataSkeleton";
import SatellitesMode from "./SatellitesMode";
import TelescopeMode from "./TelescopeMode";
import InterplanetaryMode from "./InterplanetaryMode";
import DistanceRowInfo from "./DistanceRowInfo";
import DataCardHeader from "./DataCardHeader";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { closeIcon } from "@/app/assets/icons";

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

  return (
    <AnimatePresence mode="wait">
      {isSkeleton ? (
        <TelescopeDataSkeleton />
      ) : showDataCard ? (
        <motion.div
          key="data"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-3 text-white z-10 w-72"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION }}
        >
          <DataCardHeader
            astroData={astroData}
            foundOriginPlanet={foundOriginPlanet}
            locationName={locationName}
            setToValue={setToValue}
            toValue={toValue}
          />

          <div className="absolute top-4 right-4">
            <Button
              onClick={() => handleReset()}
              variant="ghost"
              icon={<Icon src={closeIcon} alt="Close icon" size={16} />}
            />
          </div>

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
            <InterplanetaryMode astroData={astroData} fromValue={fromValue} />
          )}

          {(astroData.mode === "interplanetary" ||
            astroData.mode === "telescope") && (
            <DistanceRowInfo astroData={astroData} />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
