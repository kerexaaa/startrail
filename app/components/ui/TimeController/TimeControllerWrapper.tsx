import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import TimeController from "./TimeController";
import { useUIStore } from "@/app/states/useUIStore";
import { AnimatePresence, motion } from "framer-motion";

export default function TimeControllerWrapper() {
  const { isMobileTimeControllerOpen, setMobileTimeControllerOpen } =
    useUIStore();

  return (
    <>
      <div className="hidden lg:block">
        <TimeController isDesktop={true} />
      </div>

      <AnimatePresence>
        {isMobileTimeControllerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DEFAULT_TRANSITION_DURATION }}
              onClick={() => setMobileTimeControllerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: DEFAULT_TRANSITION_DURATION }}
              className="fixed bottom-0 w-full z-60 lg:hidden p-4"
            >
              <TimeController />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
