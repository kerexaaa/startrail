import { MIN_ZOOM, ZOOM_SCALE } from "@/app/constants";
import { AstroDataType } from "@/app/hooks/useAstroCalcs";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { getSphereParams } from "@/app/utils/getSphereParams";

interface DataCardHeaderProps {
  astroData: AstroDataType;
  toValue: string;
  foundOriginPlanet: (val: string) => string;
  setToValue: (val: string) => void;
  locationName: string;
}

export default function DataCardHeader({
  astroData,
  toValue,
  foundOriginPlanet,
  setToValue,
  locationName,
}: DataCardHeaderProps) {
  const { planetRefs, setFocusedPlanet, setSearchTarget } = usePlanetStore();

  return (
    <div className="text-sm lg:text-base text-white/50 border-b border-white/10 pb-4 pr-8">
      <div className="mb-1">
        <span className="text-xs lg:text-sm uppercase tracking-wider block mb-1">
          {astroData.mode === "satellites" ? "Satellite" : "Tracking"}
        </span>
        <span className="text-white text-xl lg:text-3xl font-bold capitalize">
          {toValue}
        </span>
      </div>

      <div className="mt-2">
        <span className="text-xs lg:text-sm uppercase tracking-wider block mb-1">
          {astroData.mode === "satellites" ? "Origin planet" : "From"}
        </span>
        <span
          className={`text-white/90 font-medium capitalize text-base lg:text-xl ${
            astroData.mode === "satellites"
              ? "underline decoration-wavy cursor-pointer hover:text-white transition-colors"
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
    </div>
  );
}
