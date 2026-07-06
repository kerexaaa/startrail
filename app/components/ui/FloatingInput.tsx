import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import Dropdown from "./Dropdown/Dropdown";
import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import Input from "./common/Input";
import Icon from "./common/Icon";
import { dropdownIcon } from "@/app/assets/icons";

interface FloatingInputProps {
  children: React.ReactNode;
  yDelta?: number;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
  options: string[];
}

export default function FloatingInput({
  children,
  yDelta,
  id,
  value,
  onChange,
  isOpen,
  onToggle,
  onSelect,
  options,
}: FloatingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative flex flex-col w-full ${isOpen ? "z-50" : "z-10"}`}
    >
      <div className="relative flex flex-row items-center w-full">
        <AnimatePresence>
          {value === "" && (
            <motion.label
              initial={{ opacity: 0, y: yDelta ?? 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: yDelta ?? 30 }}
              transition={{ duration: DEFAULT_TRANSITION_DURATION }}
              className={`absolute -translate-y-1/2 text-white/50 text-base pointer-events-none left-4 lg:left-6 ${id === "input-from" ? "top-[calc(50%+8px)] lg:top-[calc(50%+12px)]" : "top-[calc(50%-8px)] lg:top-[calc(50%-12px)]"}`}
              htmlFor={id}
            >
              {children}
            </motion.label>
          )}
        </AnimatePresence>
        <Input
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          ref={inputRef}
          value={value}
          autoComplete="off"
          onKeyDown={(event) => event.stopPropagation()}
          onChange={onChange}
          className={`w-full text-white text-base p-4 lg:p-6 ${id === "input-from" ? "pb-0 lg:pb-0" : "pt-0 lg:pt-0"}`}
          id={id}
          type="text"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            // inputRef.current?.focus();
            onToggle();
          }}
          className={`flex justify-center items-center hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all rounded-full cursor-pointer p-3 absolute right-0 lg:right-3 user-select-none ${id === "input-from" ? "top-0 lg:top-3" : "bottom-0 lg:bottom-3"}`}
        >
          <Icon
            src={dropdownIcon}
            alt="Input icon"
            className={`${isOpen ? "rotate-180" : ""} transition-transform duration-200`}
          />
        </div>
      </div>

      <Dropdown
        isOpen={isOpen}
        options={options}
        value={value}
        onSelect={onSelect}
      />
    </div>
  );
}
