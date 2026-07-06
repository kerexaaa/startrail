import { AU_IN_KM, DAY_IN_SECONDS } from "@/app/constants";
import { AstroDataType } from "@/app/hooks/useAstroCalcs";
// import { usePlanetStore } from "@/app/states/usePlanetStore";

export default function InterplanetaryMode({
  astroData,
  fromValue,
}: {
  astroData: AstroDataType & { mode: "interplanetary" };
  fromValue: string;
}) {
  // const { searchTarget } = usePlanetStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/5 p-3 lg:p-4 rounded-xl grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
            Light Travel Time
          </div>
          <div className="text-base lg:text-lg font-mono text-blue-300">
            {Math.floor(astroData.lightTime / 60)}m{" "}
            {(astroData.lightTime % 60).toFixed(0)}s
          </div>
        </div>
        <div>
          <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
            Signal Ping
          </div>
          <div className="text-base lg:text-lg font-mono text-blue-300">
            {Math.floor(astroData.pingTime / 60)}m{" "}
            {(astroData.pingTime % 60).toFixed(0)}s
          </div>
        </div>
      </div>

      <div className="px-1">
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Relative Speed (vs {fromValue})
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300">
          {((astroData.speed * AU_IN_KM) / DAY_IN_SECONDS).toLocaleString(
            "en-US",
            {
              maximumFractionDigits: 2,
            },
          )}{" "}
          <span className="text-xs lg:text-sm font-sans text-white/50">km/s</span>
        </div>
        <div className="text-xs text-white/40 mt-0.5 font-mono">
          {astroData.speed.toFixed(2)} AU/day
        </div>
      </div>
    </div>
  );
}
