import { useMemo } from "react";
import useParentPlanetName from "@/app/hooks/useParentPlanetName";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { Html } from "@react-three/drei";
import { BODY_DATA, PLANET_IDS } from "../../constants/index";

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
  const isAnyPlanetSelected = !!searchTarget;
  const isOtherPlanetSelected = isAnyPlanetSelected && searchTarget !== name;
  const shouldShow = !isFocused && (isVisible || (showLabels && isVIP));

  const opacityStyle = shouldShow
    ? isVisible
      ? "opacity-100 scale-105"
      : isOtherPlanetSelected
        ? "opacity-30 scale-90"
        : "opacity-100"
    : "opacity-0";

  const targetParentPlanetName = useMemo(() => {
    if (!searchTarget || !apiMoons) return null;
    const thisMoon = apiMoons.find((m) => m.englishName === searchTarget);
    if (!thisMoon?.aroundPlanet) return null;

    const frenchId = thisMoon.aroundPlanet.planet;
    return (
      Object.keys(PLANET_IDS).find(
        (key) => PLANET_IDS[key as keyof typeof PLANET_IDS] === frenchId,
      ) || null
    );
  }, [searchTarget, apiMoons]);

  const isParentFocused =
    focusedPlanet?.name === parentPlanetName ||
    searchTarget === parentPlanetName ||
    (targetParentPlanetName !== null &&
      targetParentPlanetName === parentPlanetName);

  const isTargeted = searchTarget === name;
  const isMajorMoon = name in BODY_DATA;

  const isOtherMoonSelected = !!targetParentPlanetName && !isTargeted;
  const moonOpacityStyle = isVisible
    ? "opacity-100 scale-105"
    : isOtherMoonSelected
      ? "opacity-30 scale-95"
      : "opacity-100";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stopEvent = (e: any) => e.stopPropagation();

  return (
    <>
      {isTargeted ? (
        <>
          {/* Target Reticle at center of body */}
          <Html
            center
            zIndexRange={[14, 0]}
            className="pointer-events-none"
            pointerEvents="none"
            style={{ pointerEvents: "none" }}
          >
            <div className="flex items-center justify-center relative">
              <div className="absolute w-12 h-12 border border-white/30 rounded-full animate-[spin_4s_linear_infinite]" />
              <div className="absolute w-16 h-16 border-t border-b border-blue-400/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
            </div>
          </Html>
          {/* Bright, prominent label above the body */}
          <Html
            position={[0, radius + 0.8, 0]}
            center
            zIndexRange={[15, 0]}
            className="pointer-events-none"
            pointerEvents="none"
            style={{ pointerEvents: "none" }}
          >
            <div className="select-none flex flex-col items-center -translate-y-8 pointer-events-none">
              <div className="text-white text-[11px] uppercase tracking-widest font-bold bg-blue-600/90 border border-blue-400 px-3 py-1.5 rounded-md shadow-[0_0_15px_rgba(59,130,246,0.6)] backdrop-blur-md whitespace-nowrap flex items-center gap-1.5 pointer-events-auto">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {name}
              </div>
            </div>
          </Html>
        </>
      ) : isParentFocused ? (
        <Html
          position={[0, radius + 0.3, 0]}
          center
          zIndexRange={[10, 0]}
          pointerEvents="none"
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`flex items-center gap-2 select-none -translate-y-4 pointer-events-none transition-all duration-300 ${moonOpacityStyle}`}
          >
            <span
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
              className={`text-[8px] font-semibold font-mono uppercase tracking-widest drop-shadow-md px-1.5 py-0.5 rounded pointer-events-auto cursor-pointer transition-all hover:scale-110 ${
                isMajorMoon
                  ? "bg-cyan-950/40 text-cyan-200 border border-cyan-500/30"
                  : "bg-black/30 text-neutral-400 border border-neutral-700/20"
              }`}
            >
              {name}
            </span>
          </div>
        </Html>
      ) : (
        <Html
          position={[0, radius + 0.5, 0]}
          center
          zIndexRange={[isVIP ? 5 : 2, 0]}
          pointerEvents="none"
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`transition-all duration-300 pointer-events-none select-none -translate-y-5 ${opacityStyle}`}
          >
            <div className="flex flex-col items-center">
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
                className="text-white text-[10px] uppercase tracking-widest font-mono bg-black/40 px-2 py-1 rounded-sm backdrop-blur-md border border-white/10 whitespace-nowrap pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
              >
                {name}
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
