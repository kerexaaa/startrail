import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";
import { motion } from "framer-motion";

export default function TelescopeDataSkeleton() {
  return (
    <motion.div
      key="skeleton"
      className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-4 w-72 text-white z-10"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: DEFAULT_TRANSITION_DURATION }}
    >
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-4 bg-white/20 rounded w-2/3"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
        </div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    </motion.div>
  );
}
