import { useState } from "react";
import { useUIStore } from "@/app/states/useUIStore";
import { toast } from "react-toastify";
import Icon from "./common/Icon";
import { closeIcon, dropdownIcon } from "@/app/assets/icons";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./common/Button";
import { DEFAULT_TRANSITION_DURATION } from "@/app/constants";

export default function FeedbackModal() {
  const isFeedbackOpen = useUIStore((s) => s.isFeedbackOpen);
  const setIsFeedbackOpen = useUIStore((s) => s.setIsFeedbackOpen);

  const [type, setType] = useState("Bug Report");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const feedbackTypes = ["Bug Report", "Feature Request", "General Feedback"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, message, contact }),
      });

      if (!res.ok) {
        throw new Error("Failed to send feedback");
      }

      toast.success("Feedback sent! Thank you.");
      setIsFeedbackOpen(false);
      setMessage("");
      setContact("");
    } catch (error) {
      toast.error("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFeedbackOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: DEFAULT_TRANSITION_DURATION,
            }}
            className="relative w-full max-w-md flex flex-col glassmorphism rounded-2xl text-white shadow-2xl overflow-visible"
            onWheelCapture={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              icon={<Icon src={closeIcon} alt="Close" />}
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer z-10 p-3"
            />

            <div className="p-6 lg:p-8 flex flex-col gap-5">
              <div className="shrink-0 pb-2 border-b border-white/10 pr-12">
                <h2 className="text-xl lg:text-2xl font-bold tracking-wider">
                  Send Feedback
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm text-gray-300">Type</label>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none hover:border-white/30 transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>{type}</span>
                    <Icon
                      src={dropdownIcon}
                      alt="Toggle"
                      className={`${isDropdownOpen ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 top-[calc(100%+8px)] w-full flex flex-col bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-lg"
                      >
                        {feedbackTypes.map((fbType) => (
                          <div
                            key={fbType}
                            onClick={() => {
                              setType(fbType);
                              setIsDropdownOpen(false);
                            }}
                            className={`p-3 cursor-pointer hover:bg-white/10 transition-colors text-base ${
                              type === fbType ? "bg-white/5" : ""
                            }`}
                          >
                            {fbType}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-300">Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/30 transition-colors resize-none custom-scrollbar"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-300">Contact (Optional)</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Discord tag, email, etc."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 w-full py-3 rounded-xl font-medium tracking-wide transition-all ${
                    isSubmitting
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200 active:scale-[0.98] cursor-pointer"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
