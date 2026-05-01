import { swapIcon } from "@/app/assets/icons/index";
import FloatingInput from "./FloatingInput";
import { PLANETARY_BODIES } from "../../constants/index";
import TelescopeData from "./TelescopeData/TelescopeData";
import { useSearchPanel } from "@/app/hooks/useSearchPanel";
import Icon from "./common/Icon";

export default function SearchPanel() {
  const {
    activeDropdown,
    setActiveDropdown,
    panelRef,
    fromValue,
    setFromValue,
    handleSwap,
    handleFromSelect,
    handleToSelect,
    toValue,
  } = useSearchPanel();

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
            onSelect={handleFromSelect}
            options={["My Location", ...PLANETARY_BODIES]}
          >
            From...
          </FloatingInput>
          <FloatingInput
            id="input-to"
            value={toValue}
            onChange={(e) => handleToSelect(e.target.value)}
            yDelta={30}
            isOpen={activeDropdown === "to"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "to" ? null : "to")
            }
            onSelect={handleToSelect}
            options={PLANETARY_BODIES}
          >
            To...
          </FloatingInput>
        </div>
        <div
          className="mr-4 cursor-pointer p-2 button-hologram-hover rounded-full relative"
          onClick={handleSwap}
        >
          <Icon src={swapIcon} alt="Swap" />
        </div>
      </div>
      <TelescopeData
        fromValue={fromValue}
        toValue={toValue}
        setFromValue={setFromValue}
        setToValue={handleToSelect}
      />
    </>
  );
}
