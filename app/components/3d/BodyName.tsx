import { Html } from "@react-three/drei";

interface BodyNameProps {
  name: string;
  isVisible: boolean;
  isVIP?: boolean;
  isFocused?: boolean;
  showLabels: boolean;
  radius: number;
}

export default function BodyName({
  name,
  isVisible,
  isVIP = false,
  isFocused = false,
  showLabels,
  radius,
}: BodyNameProps) {
  const shouldShow = !isFocused && (isVisible || (showLabels && isVIP));

  return (
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
  );
}
