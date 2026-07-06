import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import { motion } from "framer-motion";

export default function TelescopeDataSkeleton() {
  return (
    <motion.div
      key="skeleton"
      className="absolute top-0 lg:top-36 left-0 mt-2 p-6 glassmorphism rounded-2xl flex flex-col gap-4 z-10 w-[calc(100dvw-32px)] lg:w-80 shadow-2xl"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: DEFAULT_TRANSITION_DURATION }}
    >
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-4 bg-white/20 rounded w-2/3"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-white/10 rounded-xl"></div>
          <div className="h-16 bg-white/10 rounded-xl"></div>
        </div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    </motion.div>
  );
}
