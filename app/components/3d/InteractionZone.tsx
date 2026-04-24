import { usePlanetStore } from "../../states/usePlanetStore";
import { useUIStore } from "@/app/states/useUIStore";
import { MIN_CLICK_RADIUS } from "@/app/constants";
import * as THREE from "three";

interface InteractionZoneProps {
  name: string;
  radius: number;
  proxyRadius: number;
  orbitGroupRef: React.RefObject<THREE.Group | null>;
  onHover: (hovered: boolean) => void;
  children?: React.ReactNode;
  isFocused?: boolean;
}

export default function InteractionZone({
  name,
  radius,
  orbitGroupRef,
  onHover,
  children,
  isFocused,
}: InteractionZoneProps) {
  const { setFocusedPlanet, setSearchTarget } = usePlanetStore();
  const { isFreeCam } = useUIStore();

  if (isFocused) {
    return null;
  }

  return (
    <mesh
      onClick={(e) => {
        if (isFreeCam) return;
        e.stopPropagation();
        if (orbitGroupRef.current) {
          setFocusedPlanet(
            orbitGroupRef.current,
            Math.max(MIN_CLICK_RADIUS, radius * 3),
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
      {children}
    </mesh>
  );
}
