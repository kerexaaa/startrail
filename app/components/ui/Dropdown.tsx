import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: DEFAULT_TRANSITION_DURATION, ease: "easeOut" }}
          className="absolute top-full left-0 rounded-xl w-full flex flex-col mt-2 p-1 z-50 bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
          onWheelCapture={(e) => e.stopPropagation()}
        >
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options
              .filter((opt) => opt.toLowerCase().includes(value.toLowerCase()))
              .map((option) => (
                <button
                  key={option}
                  onClick={() => onSelect(option)}
                  className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors rounded-lg text-sm"
                >
                  {option}
                </button>
              ))}
            {options.filter((opt) =>
              opt.toLowerCase().includes(value.toLowerCase()),
            ).length === 0 && (
              <div className="px-3 py-2 text-white/50 text-sm">
                No bodies found...
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
