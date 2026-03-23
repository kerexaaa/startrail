import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import dropdownIcon from "@/app/assets/icons/dark/dropdown.svg";
import Dropdown from "../ui/Dropdown";

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
    <div className="relative flex flex-row">
      <AnimatePresence>
        {value === "" && (
          <motion.label
            initial={{ opacity: 0, y: yDelta ?? 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: yDelta ?? 30 }}
            transition={{ duration: 0.2 }}
            className="absolute -translate-y-1/2 top-1/2 text-white pointer-events-none"
            htmlFor={id}
          >
            {children}
          </motion.label>
        )}
      </AnimatePresence>
      <input
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        ref={inputRef}
        value={value}
        autoComplete="off"
        onKeyDown={(event) => event.stopPropagation()}
        onChange={onChange}
        className="w-80 text-white"
        id={id}
        type="text"
      />
      <Dropdown
        isOpen={isOpen}
        options={options}
        value={value}
        onSelect={onSelect}
      />
      <div
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
          onToggle();
        }}
        className="flex justify-center items-center hover:bg-white/10 transition-colors rounded-full cursor-pointer p-2 relative user-select-none"
      >
        <Image
          src={dropdownIcon}
          width={24}
          height={24}
          alt="Input icon"
          className={`${isOpen ? "rotate-180" : ""} transition-transform duration-200`}
        />
      </div>
    </div>
  );
}
