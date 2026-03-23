"use client";
import { useEffect, useState } from "react";
import { loaderData } from "@/app/utils/loader";
import { useProgress } from "@react-three/drei";

function getRandom() {
  return Math.floor(Math.random() * loaderData.phrases.length);
}

function changePhrase() {
  return loaderData.phrases[getRandom()];
}

export default function Loader() {
  const [phrase, setPhrase] = useState(changePhrase());

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(changePhrase());
    }, 1500);

    return () => clearInterval(interval);
  }, []);

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
