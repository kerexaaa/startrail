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
    <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs text-white/50">Radius</div>
          <div className="text-lg font-mono text-blue-300">
            {currentMoon.meanRadius.toLocaleString()} km
          </div>
        </div>
        <div>
          <div className="text-xs text-white/50">Orbital Period</div>
          <div className="text-lg font-mono text-blue-300">
            {Math.abs(currentMoon.sideralOrbit).toFixed(2)} days
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-2">
        <div className="text-xs text-white/50">
          Distance from {foundOriginPlanet(toValue)}
        </div>
        <div className="text-lg font-mono text-blue-300">
          {currentMoon.semimajorAxis.toLocaleString()} km
        </div>
      </div>
    </div>
  );
}
