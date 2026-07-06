import { MoonData } from "@/app/types/astronomy";

interface SatelliteModeProps {
  currentMoon: MoonData;
  foundOriginPlanet: (val: string) => string;
  toValue: string;
}

export default function SatellitesMode({
  currentMoon,
  foundOriginPlanet,
  toValue,
}: SatelliteModeProps) {
  return (
    <div className="bg-white/5 p-3 lg:p-4 rounded-xl flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
            Radius
          </div>
          <div className="text-base lg:text-lg font-mono text-blue-300">
            {currentMoon.meanRadius.toLocaleString()}{" "}
            <span className="text-xs lg:text-sm font-sans text-blue-300/50">
              km
            </span>
          </div>
        </div>
        <div>
          <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
            Orbital Period
          </div>
          <div className="text-base lg:text-lg font-mono text-blue-300">
            {Math.abs(currentMoon.sideralOrbit).toFixed(2)}{" "}
            <span className="text-xs lg:text-sm font-sans text-blue-300/50">
              days
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3">
        <div className="text-xs lg:text-sm uppercase tracking-wider text-white/50 mb-1">
          Distance from {foundOriginPlanet(toValue)}
        </div>
        <div className="text-base lg:text-lg font-mono text-blue-300">
          {currentMoon.semimajorAxis.toLocaleString()}{" "}
          <span className="text-xs lg:text-sm font-sans text-blue-300/50">
            km
          </span>
        </div>
      </div>
    </div>
  );
}
