import { motion } from "framer-motion";
import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm text-white/80 font-medium">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${
          checked ? "bg-blue-500" : "bg-white/20"
        }`}
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full absolute top-1"
          initial={false}
          animate={{ left: checked ? "26px" : "4px" }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: DEFAULT_TRANSITION_DURATION,
          }}
        />
      </button>
    </div>
  );
}
