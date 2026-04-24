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
  );
}
