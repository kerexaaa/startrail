import { Html } from "@react-three/drei";

interface BodyNameProps {
  name: string;
  isVisible: boolean;
}

export default function BodyName({ name, isVisible }: BodyNameProps) {
  return (
    <Html
      center
    //   distanceFactor={focusZoom}
      zIndexRange={[100, 0]}
      className="pointer-events-none"
    >
      <div
        className={`transition-opacity duration-300 pointer-events-none select-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-white text-xs font-mono bg-black/60 px-2 py-1 rounded-md backdrop-blur-md border border-white/20 whitespace-nowrap -translate-y-6">
          {name}
        </div>
      </div>
    </Html>
  );
}
