import swapIcon from "@/app/assets/icons/dark/swap.svg";
import FloatingInput from "./FloatingInput";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PLANETARY_BODIES } from "../../constants/index";
import TelescopeData from "./TelescopeData";
import { usePlanetStore } from "../../states/usePlanetStore";

export default function SearchPanel() {
  const [fromValue, setFromValue] = useState("");

  const {
    searchTarget: toValue,
    setSearchTarget: setToValue,
    planetRefs,
    setFocusedPlanet,
  } = usePlanetStore();

  const [activeDropdown, setActiveDropdown] = useState<"from" | "to" | null>(
    null,
  );
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    const oldFrom = fromValue;
    const oldTo = toValue;

    setFromValue(oldTo);
    setToValue(oldFrom);

    if (planetRefs[oldFrom]) {
      setFocusedPlanet(planetRefs[oldFrom]);
    } else {
      setFocusedPlanet(null);
    }
  };

  return (
    <>
      <div
        ref={panelRef}
        className="absolute top-8 left-8 flex flex-row items-center glassmorphism rounded-[20px] z-20"
      >
        <div className="p-4 flex flex-col gap-2">
          <FloatingInput
            id="input-from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            yDelta={-30}
            isOpen={activeDropdown === "from"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "from" ? null : "from")
            }
            onSelect={(val: string) => {
              setFromValue(val);
              setActiveDropdown(null);
            }}
            options={["My Location", ...PLANETARY_BODIES]}
          >
            From...
          </FloatingInput>
          <FloatingInput
            id="input-to"
            value={toValue}
            onChange={(e) => {
              setToValue(e.target.value);
              if (planetRefs[e.target.value]) {
                setFocusedPlanet(planetRefs[e.target.value]);
              }
            }}
            yDelta={30}
            isOpen={activeDropdown === "to"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "to" ? null : "to")
            }
            onSelect={(val: string) => {
              setToValue(val);
              setActiveDropdown(null);
              if (planetRefs[val]) {
                setFocusedPlanet(planetRefs[val]);
              }
            }}
            options={PLANETARY_BODIES}
          >
            To...
          </FloatingInput>
        </div>
        <div
          className="mr-4 cursor-pointer p-2 button-hologram-hover rounded-full relative"
          onClick={handleSwap}
        >
          <Image src={swapIcon} alt="Swap" width={24} height={24} />
        </div>
      </div>
      <TelescopeData
        fromValue={fromValue}
        toValue={toValue}
        setFromValue={setFromValue}
        setToValue={setToValue}
      />
    </>
  );
}
