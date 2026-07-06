import { AstroDataType } from "@/app/hooks/useAstroCalcs";
import { Tooltip } from "react-tooltip";

export default function TelescopeMode({
  astroData,
}: {
  astroData: AstroDataType & { mode: "telescope" };
}) {
  return (
    <div className="bg-white/5 p-3 lg:p-4 rounded-xl grid grid-cols-2 gap-y-4 gap-x-3">
      <div>
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Azimuth
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300">
          {astroData.az.toFixed(2)}°
        </div>
      </div>
      <div>
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Altitude
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300">
          {astroData.alt.toFixed(2)}°
          {astroData.alt < 0 && (
            <span className="text-red-400 font-sans tracking-wide uppercase text-xs lg:text-sm block leading-tight mt-1">
              Below horizon
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Constellation
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300 capitalize">
          {astroData.constellation}
        </div>
      </div>
      <div id="magnitudeTooltip" className="w-fit cursor-help">
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Magnitude
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300 underline decoration-wavy decoration-white/30 underline-offset-4">
          {astroData.magnitude.toFixed(2)}
        </div>
        <Tooltip
          anchorSelect="#magnitudeTooltip"
          className="z-50 max-w-xs text-center text-xs lg:text-sm"
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
