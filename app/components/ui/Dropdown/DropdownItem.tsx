import { AnimatePresence, motion } from "framer-motion";
import { dropdownIcon } from "@/app/assets/icons";
import Button from "../common/Button";
import Icon from "../common/Icon";

interface DropdownItemProps {
  option: string;
  targetGroup: { planetName: string; moons: string[] } | undefined;
  isPlanetMatch: boolean;
  matchingMoons: string[];
  hasMoons: boolean | undefined;
  searchValue: string;
  expandedOption: string | null;
  setExpandedOption: (val: string | null) => void;
  onSelect: (val: string) => void;
}

export default function DropdownItem({
  option,
  targetGroup,
  searchValue,
  isPlanetMatch,
  matchingMoons,
  hasMoons,
  expandedOption,
  setExpandedOption,
  onSelect,
}: DropdownItemProps) {
  const isExpanded =
    expandedOption === option ||
    (searchValue !== "" && matchingMoons.length > 0);

  const displayMoons =
    isPlanetMatch || searchValue === ""
      ? targetGroup?.moons || []
      : matchingMoons;

  return (
    <div className="mb-2 last:mb-0 relative">
      <Button
        onClick={() => onSelect(option)}
        className="w-full text-left px-3 py-3 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors rounded-lg text-sm"
      >
        {option}
      </Button>

      {hasMoons && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setExpandedOption(isExpanded ? null : option);
            }}
            className="flex justify-center items-center hover:bg-white/10 transition-colors rounded-lg cursor-pointer h-11 p-3 user-select-none absolute z-10 right-0 top-0"
          >
            <Icon
              src={dropdownIcon}
              alt="Dropdown icon"
              className={`${
                isExpanded ? "rotate-180" : ""
              } transition-transform duration-200`}
            />
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <div className="relative arrows-pole">
                  {displayMoons.map((moon) => (
                    <div key={moon} className="arrows relative">
                      <Button
                        onClick={() => onSelect(moon)}
                        className="block w-[stretch] text-left ml-10.5 mt-2 mb-2 last:mb-0 p-2 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors rounded-lg text-sm"
                      >
                        {moon}
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
