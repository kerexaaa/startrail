import { closeIcon, swapIcon } from "@/app/assets/icons/index";
import FloatingInput from "../FloatingInput";
import {
  DEFAULT_TRANSITION_DURATION,
  PLANETARY_BODIES,
} from "../../../constants/index";
import TelescopeData from "../TelescopeData/TelescopeData";
import { useSearchPanel } from "@/app/hooks/useSearchPanel";
import Icon from "../common/Icon";
import { useUIStore } from "@/app/states/useUIStore";
import { motion } from "framer-motion";

export default function SearchPanel({
  isDesktop = false,
}: {
  isDesktop?: boolean;
}) {
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

  const { isMobileSearchOpen, setMobileSearchOpen } = useUIStore();
  const isRouteActive = !!toValue;

  return (
    <div>
      {!isDesktop && !isRouteActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileSearchOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer"
        />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10, x: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10, x: -10 }}
        style={{ transformOrigin: "top left" }}
        transition={{
          duration: DEFAULT_TRANSITION_DURATION,
        }}
        ref={panelRef}
        className={`absolute flex-row items-center glassmorphism rounded-lg z-20 ${
          isRouteActive && !isDesktop ? "hidden" : "flex"
        } ${isDesktop ? "w-96" : "w-[calc(100dvw-32px)]"}`}
      >
        {!isDesktop && (
          <div
            className="ml-1 cursor-pointer p-3 button-hologram-hover rounded-full relative shrink-0"
            onClick={() => setMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Icon src={closeIcon} alt="Close" />
          </div>
        )}
        <div className="flex flex-col gap-4 flex-1 w-full">
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
          className="mr-1 lg:mr-5 cursor-pointer p-3 button-hologram-hover rounded-full relative active:bg-white/20 active:scale-95 transition-all"
          onClick={handleSwap}
        >
          <Icon src={swapIcon} alt="Swap" />
        </div>
      </motion.div>
      <TelescopeData
        fromValue={fromValue}
        toValue={toValue}
        setFromValue={setFromValue}
        setToValue={handleToSelect}
      />
    </div>
  );
}
