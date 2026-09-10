import { usePlanetStore } from "../../states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { MIN_CLICK_RADIUS } from "@/app/constants";
import { getEnglishPlanetName } from "@/app/utils/bodies";
import * as THREE from "three";
import { useMemo, useEffect } from "react";

interface InteractionZoneProps {
  name: string;
  radius: number;
  orbitGroupRef: React.RefObject<THREE.Group | null>;
  proxyRadius: number;
  onHover: (hovered: boolean) => void;
  children?: React.ReactNode;
  isFocused?: boolean;
}

export default function InteractionZone({
  name,
  radius,
  orbitGroupRef,
  proxyRadius,
  onHover,
  children,
  isFocused,
}: InteractionZoneProps) {
  const searchTarget = usePlanetStore((state) => state.searchTarget);
  const apiMoons = usePlanetStore((state) => state.apiMoons);
  const setFocusedPlanet = usePlanetStore((state) => state.setFocusedPlanet);
  const setSearchTarget = usePlanetStore((state) => state.setSearchTarget);
  const isFreeCam = useUIStore((state) => state.isFreeCam);

  const isTargetOurMoon = useMemo(() => {
    if (!searchTarget) {
      return false;
    }

    const targetMoon = apiMoons.find((m) => m.englishName === searchTarget);

    if (!targetMoon?.aroundPlanet) {
      return false;
    }

    const frenchId = targetMoon.aroundPlanet.planet;
    const parentEnglishName = getEnglishPlanetName(frenchId);

    return (
      parentEnglishName === name ||
      frenchId.toLowerCase() === name.toLowerCase()
    );
  }, [searchTarget, apiMoons, name]);

  const activeRadius =
    isFocused || isTargetOurMoon ? radius * 1.05 : proxyRadius;

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <mesh
      onClick={(e) => {
        if (isFreeCam) return;
        e.stopPropagation();
        if (orbitGroupRef.current) {
          setFocusedPlanet(
            orbitGroupRef.current,
            Math.max(MIN_CLICK_RADIUS, radius * 6),
          );
        }
        setSearchTarget(name);
        onHover(false);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onHover(false);
        document.body.style.cursor = "auto";
      }}
    >
      {name !== "Sun" && <sphereGeometry args={[activeRadius, 16, 16]} />}
      {children}
    </mesh>
  );
}
