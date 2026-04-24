import { AU_IN_KM, DAY_IN_SECONDS } from "@/app/constants";
import { AstroDataType } from "@/app/hooks/useAstroCalcs";
import { usePlanetStore } from "@/app/states/usePlanetStore";

export default function InterplanetaryMode({
  astroData,
  fromValue,
}: {
  astroData: AstroDataType & { mode: "interplanetary" };
  fromValue: string;
}) {
  const { searchTarget } = usePlanetStore();
  return (
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
          {((astroData.speed * AU_IN_KM) / DAY_IN_SECONDS).toLocaleString(
            "en-US",
            {
              maximumFractionDigits: 2,
            },
          )}{" "}
          km/s
          <br />
          <span className="text-[10px] text-white/30">
            {astroData.speed.toFixed(2)} AU/day
          </span>
        </div>
      </div>
    </>
  );
}
