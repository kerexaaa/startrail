import { AstroDataType } from "@/app/hooks/useAstroCalcs";
import { Tooltip } from "react-tooltip";

export default function TelescopeMode({
  astroData,
}: {
  astroData: AstroDataType & { mode: "telescope" };
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <div className="text-xs text-white/50">Azimuth</div>
        <div className="text-xl font-mono">{astroData.az.toFixed(2)}°</div>
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
        <div className="text-xl font-mono">{astroData.constellation}</div>
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
  );
}
