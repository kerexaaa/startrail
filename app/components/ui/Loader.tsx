"use client";
import { useProgress } from "@react-three/drei";
import { useLoaderPhrase } from "@/app/hooks/useLoaderPhrase";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Loader() {
  const phrase = useLoaderPhrase();
  const { progress } = useProgress();

  const highestProgress = useRef(0);

  const animatedProgress = useMotionValue(0);
  const roundedProgress = useTransform(animatedProgress, (latest) =>
    Math.round(latest),
  );
  const barWidth = useTransform(animatedProgress, (p) => `${p}%`);

  useEffect(() => {
    if (progress > highestProgress.current) {
      highestProgress.current = progress;
    }

    const controls = animate(animatedProgress, highestProgress.current, {
      duration: 0.8,
      ease: "easeOut",
    });

    return controls.stop;
  }, [progress, animatedProgress]);

  return (
    <div className="absolute left-0 top-0 w-full h-dvh bg-black flex flex-col items-center justify-center gap-6 lg:gap-8 p-4 z-50">
      <div className="font-bold text-4xl lg:text-5xl text-white tabular-nums tracking-wider">
        <motion.span>{roundedProgress}</motion.span>%
      </div>

      <div className="w-full max-w-50 lg:max-w-xs h-2 lg:h-3 rounded-full glassmorphism overflow-hidden relative shadow-lg">
        <motion.div
          className="absolute left-0 top-0 h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ width: barWidth }}
        />
      </div>

      <div
        className="text-base lg:text-2xl text-white/70 font-light text-center px-4"
        suppressHydrationWarning
      >
        {roundedProgress.get() !== 100 ? phrase : "computing the universe..."}
      </div>
    </div>
  );
}
