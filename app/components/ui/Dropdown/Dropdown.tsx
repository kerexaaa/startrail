import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";
import DropdownItem from "./DropdownItem";
import useDropdownLogic from "@/app/hooks/useDropdownLogic";

interface DropdownProps {
  isOpen: boolean;
  options: string[];
  value: string;
  onSelect: (val: string) => void;
}

export default function Dropdown({
  isOpen,
  options,
  value,
  onSelect,
}: DropdownProps) {
  const { expandedOption, groupedBodies, setExpandedOption } =
    useDropdownLogic();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{
            duration: DEFAULT_TRANSITION_DURATION,
            ease: "easeOut",
          }}
          className="absolute top-full left-0 rounded-xl w-full flex flex-col mt-2 p-1 z-50 bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
            {(() => {
              const searchValue = value.toLowerCase();

              const filteredNodes = options
                .map((option) => {
                  const targetGroup = groupedBodies.find(
                    (g) => g.planetName === option,
                  );
                  const isPlanetMatch = option
                    .toLowerCase()
                    .includes(searchValue);
                  const matchingMoons = targetGroup
                    ? targetGroup.moons.filter((m) =>
                        m.toLowerCase().includes(searchValue),
                      )
                    : [];

                  return {
                    option,
                    targetGroup,
                    isPlanetMatch,
                    matchingMoons,
                    hasMoons: targetGroup && targetGroup.moons.length > 0,
                  };
                })
                .filter(
                  (node) => node.isPlanetMatch || node.matchingMoons.length > 0,
                );

              if (filteredNodes.length === 0) {
                return (
                  <div className="px-3 py-2 text-center text-white/50 text-sm">
                    No bodies found...
                  </div>
                );
              }

              return filteredNodes.map(
                ({
                  option,
                  targetGroup,
                  isPlanetMatch,
                  matchingMoons,
                  hasMoons,
                }) => {
                  return (
                    <DropdownItem
                      expandedOption={expandedOption}
                      hasMoons={hasMoons}
                      isPlanetMatch={isPlanetMatch}
                      matchingMoons={matchingMoons}
                      onSelect={onSelect}
                      option={option}
                      searchValue={searchValue}
                      setExpandedOption={setExpandedOption}
                      targetGroup={targetGroup}
                      key={option}
                    />
                  );
                },
              );
            })()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
