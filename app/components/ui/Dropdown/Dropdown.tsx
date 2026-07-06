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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute z-50 top-[calc(100%+12px)] w-[calc(100dvw-32px)] -left-13 lg:w-full lg:left-0 flex flex-col bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-lg"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <div className="max-h-[40dvh] lg:max-h-80 overflow-y-auto custom-scrollbar p-3">
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
                  <div className="p-3 text-center text-white/50 text-base">
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
