import { closeIcon } from "@/app/assets/icons";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Link from "next/link";
import MobileMenuButtons from "./MobileMenuButtons";
import { useUIStore } from "@/app/states/useUIStore";
import { motion } from "framer-motion";
import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";

export default function Menu() {
  const { setMobileMenuOpen, isMobileMenuOpen } = useUIStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -30, x: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30, x: 30 }}
        transition={{
          duration: DEFAULT_TRANSITION_DURATION,
        }}
        className="fixed top-4 right-4 z-50 w-[calc(100vw-32px)] sm:w-80 max-h-[85vh] glassmorphism rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 ">
          <div className="text-2xl lg:text-3xl text-white font-extralight tracking-wide">
            <Link href="/">Startrail</Link>
          </div>
          <Button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            icon={<Icon src={closeIcon} alt="Close" />}
          />
        </div>
        <MobileMenuButtons />
        {/* blog here */}
      </motion.div>
    </>
  );
}
