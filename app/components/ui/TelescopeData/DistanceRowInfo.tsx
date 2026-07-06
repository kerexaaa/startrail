import { AU_IN_KM } from "@/app/constants";
import { AstroDataType } from "@/app/hooks/useAstroCalcs";

export default function DistanceRowInfo({
  astroData,
}: {
  astroData: AstroDataType &
    ({ mode: "interplanetary" } | { mode: "telescope" });
}) {
  return (
    <div className="pt-2">
      <span className="text-xs lg:text-sm uppercase tracking-wider text-white/50 block mb-1">
        Distance
      </span>
      <div className="font-mono text-white/90 text-base lg:text-lg">
        {(astroData.dist * AU_IN_KM).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}{" "}
        <span className="text-sm text-white/50 font-sans">km</span>
      </div>
      <div className="text-xs text-white/40 mt-0.5 font-mono">
        {astroData.dist.toFixed(2)} AU
      </div>
    </div>
  );
}
