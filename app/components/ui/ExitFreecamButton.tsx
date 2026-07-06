import { useUIStore } from "@/app/states/useUIStore";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./common/Button";
import { toast } from "react-toastify";

export default function ExitFreecamButton() {
  const { isFreeCam, setIsFreeCam } = useUIStore();

  return (
    <AnimatePresence>
      {isFreeCam && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <Button
            className="glassmorphism px-6 py-2 rounded-full font-medium text-white shadow-lg active:scale-95 transition-transform"
            onClick={() => {
              setIsFreeCam(false);
              toast.dismiss();
            }}
          >
            Exit Freecam
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
