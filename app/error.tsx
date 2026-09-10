"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white font-inter">
      <div className="relative z-10 flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-[90%] text-center">
        <h2 className="text-3xl font-bold mb-4">🛸 Houston, we have a problem!</h2>
        <p className="text-white/70 mb-6">
          {error.message || "Something went wrong in the application."}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-full transition-colors font-medium border border-white/10"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
