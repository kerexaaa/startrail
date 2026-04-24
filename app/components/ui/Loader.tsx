"use client";
import { useProgress } from "@react-three/drei";
import { useLoaderPhrase } from "@/app/hooks/useLoaderPhrase";

export default function Loader() {
  const phrase = useLoaderPhrase();

  const { progress } = useProgress();

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-black flex items-center justify-center flex-col gap-8">
      <div className="font-semibold text-5xl text-white">
        {progress.toFixed(0)}%
      </div>
      <div className="w-xl h-8 rounded-full glassmorphism overflow-hidden">
        <div
          className={`h-full bg-white rounded-full shadow-md transition-all duration-100 ease-in-out `}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-2xl" suppressHydrationWarning>
        {phrase}
      </div>
    </div>
  );
}
