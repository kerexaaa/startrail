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
  onHover: (state: boolean) => void;
}

export default function BodyName({
  name,
  isVisible,
  isVIP = false,
  isFocused = false,
  showLabels,
  radius,
  onLabelClick,
  onHover,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stopEvent = (e: any) => e.stopPropagation();

  return (
    <>
      {isTargeted ? (
        <Html center zIndexRange={[5, 0]} className="pointer-events-none">
          <div className="flex items-center justify-center relative">
            <div className="absolute w-12 h-12 border border-white/30 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute w-16 h-16 border-t border-b border-blue-400/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
          </div>
        </Html>
      ) : isParentFocused ? (
        <Html center zIndexRange={[5, 0]}>
          <div
            onPointerEnter={(e) => {
              stopEvent(e);
              onHover(true);
            }}
            onPointerLeave={(e) => {
              stopEvent(e);
              onHover(false);
            }}
            onClick={(e) => {
              stopEvent(e);
              if (onLabelClick) onLabelClick();
            }}
            className={`
              flex items-center gap-2 select-none translate-x-4
              pointer-events-auto cursor-pointer transition-all hover:scale-110
            `}
          >
            <span className="text-[8px] font-mono uppercase tracking-widest drop-shadow-md bg-black/20">
              {name}
            </span>
          </div>
        </Html>
      ) : (
        <Html
          position={[0, radius + 0.5, 0]}
          center
          zIndexRange={[isVIP ? 5 : 2, 0]}
        >
          <div
            className={`transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110 select-none ${
              shouldShow ? "opacity-100" : "opacity-0"
            }`}
            onPointerEnter={(e) => {
              stopEvent(e);
              onHover(true);
            }}
            onPointerLeave={(e) => {
              stopEvent(e);
              onHover(false);
            }}
            onClick={(e) => {
              stopEvent(e);
              if (onLabelClick) onLabelClick();
            }}
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
