"use client";
import React, { useRef, useState } from "react";
import { usePlanetStore } from "@/app/states/usePlanetStore";
import { motion } from "framer-motion";

interface BaseJoystickProps {
  isVerticalOnly?: boolean;
  onDeltaChange: (delta: { x: number; y: number }) => void;
  className: string;
}

function BaseJoystick({
  isVerticalOnly = false,
  onDeltaChange,
  className,
}: BaseJoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!containerRef.current) return;
    setIsDragging(true);
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = isVerticalOnly ? 0 : e.clientX - centerX;
    const dy = e.clientY - centerY;

    const maxRadius = rect.width / 2 - 10;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let finalX = dx;
    let finalY = dy;

    if (dist > maxRadius) {
      finalX = isVerticalOnly ? 0 : (dx / dist) * maxRadius;
      finalY = (dy / dist) * maxRadius;
    }

    setStickPos({ x: finalX, y: finalY });
    onDeltaChange({ x: finalX / maxRadius, y: finalY / maxRadius });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setStickPos({ x: 0, y: 0 });
    onDeltaChange({ x: 0, y: 0 });
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        //maybe then add trace here?
      }
    }
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-24 h-24 rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center relative touch-none cursor-pointer"
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.05), inset 0 0 15px rgba(255, 255, 255, 0.05)",
        }}
      >
        {!isVerticalOnly && <div className="absolute w-full h-px bg-white/5" />}
        <div className="absolute h-full w-px bg-white/5" />

        {isVerticalOnly && (
          <div className="absolute inset-0 flex flex-col items-center justify-between py-2 text-[10px] text-white/20 font-bold pointer-events-none uppercase tracking-widest font-mono">
            <span>▲</span>
            <span>▼</span>
          </div>
        )}

        <div
          className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `translate3d(${stickPos.x}px, ${stickPos.y}px, 0px)`,
            boxShadow: isDragging
              ? "0 0 15px rgba(255, 255, 255, 0.2)"
              : "0 0 5px rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

export default function MobileJoystick() {
  const setJoystickDelta = usePlanetStore((state) => state.setJoystickDelta);
  const setJoystickVertical = usePlanetStore(
    (state) => state.setJoystickVertical,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-28 left-0 w-full px-8 flex justify-between z-40 pointer-events-none"
    >
      <BaseJoystick
        onDeltaChange={(delta) => setJoystickDelta(delta)}
        className="pointer-events-auto"
      />

      <BaseJoystick
        isVerticalOnly={true}
        onDeltaChange={(delta) => setJoystickVertical(-delta.y)}
        className="pointer-events-auto"
      />
    </motion.div>
  );
}
