import useParentPlanetName from "@/app/hooks/useParentPlanetName";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { Html } from "@react-three/drei";

interface BodyNameProps {
  name: string;
  isVisible: boolean;
  isVIP?: boolean;
  isFocused?: boolean;
  showLabels: boolean;
  radius: number;
  onLabelClick?: () => void;
}

export default function BodyName({
  name,
  isVisible,
  isVIP = false,
  isFocused = false,
  showLabels,
  radius,
  onLabelClick,
}: BodyNameProps) {
  const focusedPlanet = usePlanetStore((state) => state.focusedPlanet);
  const searchTarget = usePlanetStore((state) => state.searchTarget);
  const apiMoons = usePlanetStore((state) => state.apiMoons);
  const parentPlanetName = useParentPlanetName({ apiMoons, name });
  const shouldShow = !isFocused && (isVisible || (showLabels && isVIP));

  const isParentFocused =
    focusedPlanet?.name === parentPlanetName ||
    searchTarget === parentPlanetName;

  const isTargeted = searchTarget === name;

  return (
    <>
      {isTargeted ? (
        <Html center zIndexRange={[100, 0]} className="pointer-events-none">
          <div className="flex items-center justify-center relative">
            <div className="absolute w-12 h-12 border border-white/30 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute w-16 h-16 border-t border-b border-blue-400/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
          </div>
        </Html>
      ) : isParentFocused ? (
        <Html
          center
          distanceFactor={Math.max(radius, 5)}
          zIndexRange={[100, 0]}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (onLabelClick) onLabelClick();
            }}
            className={`
              flex items-center gap-2 select-none translate-x-4
              pointer-events-auto cursor-pointer transition-all hover:scale-110
            `}
          >
            <div className={`w-1 h-1 rounded-full bg-white/50`} />
            <span className="text-xs font-mono uppercase tracking-widest drop-shadow-md">
              {name}
            </span>
          </div>
        </Html>
      ) : (
        <Html
          position={[0, radius + 0.5, 0]}
          center
          zIndexRange={[10, 0]}
          className="pointer-events-none"
        >
          <div
            className={`transition-opacity duration-300 pointer-events-none select-none ${
              shouldShow ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="text-white text-[10px] uppercase tracking-widest font-mono bg-black/40 px-2 py-1 rounded-sm backdrop-blur-md border border-white/10 whitespace-nowrap">
                {name}
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
