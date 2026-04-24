import { AU_IN_KM } from "@/app/constants";
import { AstroDataType } from "@/app/hooks/useAstroCalcs";

export default function DistanceRowInfo({
  astroData,
}: {
  astroData: AstroDataType &
    ({ mode: "interplanetary" } | { mode: "telescope" });
}) {
  return (
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
  );
}
