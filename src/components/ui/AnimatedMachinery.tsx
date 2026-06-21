"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Animated gear SVG — used as decorative elements throughout the site.
 * Slowly rotates to create an ambient industrial feel.
 */
export function AnimatedGear({
  size = 120,
  className = "",
  direction = "clockwise",
  speed = 20,
}: {
  size?: number;
  className?: string;
  direction?: "clockwise" | "counter-clockwise";
  speed?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      animate={prefersReduced ? {} : { rotate: direction === "clockwise" ? 360 : -360 }}
      transition={prefersReduced ? {} : { duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer gear teeth */}
      <path
        d="M50 5 L55 5 L56 12 C58.5 12.5 61 13.5 63 14.5 L68 9 L72 12 L68 18 C69.8 20 71.3 22.3 72.5 24.8 L80 23 L82 28 L75 31 C75.8 33.6 76.3 36.3 76.5 39 L84 39 L84 44 L76.5 45 C76.2 47.7 75.5 50.3 74.5 52.8 L81 57 L79 61 L72 58 C70.5 60.2 68.7 62.2 66.7 64 L70 71 L66 74 L62 67 C59.8 68.3 57.3 69.3 54.8 70 L55 78 L50 78 L49 70 C46.5 69.5 44 68.5 41.8 67.3 L37 73 L33 70 L37 63.5 C35.2 61.7 33.7 59.5 32.5 57.2 L25 59 L23 54 L30 51.5 C29.3 49 28.8 46.3 28.5 43.5 L21 43 L21 38 L28.5 37.5 C28.8 34.8 29.5 32.2 30.5 29.7 L24 25 L26 21 L33 24 C34.5 21.8 36.3 19.8 38.3 18 L35 11 L39 8 L43 14.5 C45.2 13.3 47.5 12.5 50 11.8 L50 5Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
      {/* Center circle */}
      <circle cx="50" cy="42" r="15" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
      <circle cx="50" cy="42" r="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    </motion.svg>
  );
}

/**
 * Animated screw SVG — moves up/down with rotation to simulate
 * the auger filling mechanism that is the company's core technology.
 */
export function AnimatedScrew({
  size = 80,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      width={size / 3}
      height={size}
      viewBox="0 0 30 90"
      fill="none"
      className={className}
      animate={
        prefersReduced
          ? {}
          : {
              y: [0, -8, 0],
              rotate: [0, 180, 360],
            }
      }
      transition={
        prefersReduced
          ? {}
          : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {/* Screw shaft */}
      <rect x="12" y="0" width="6" height="90" rx="3" fill="currentColor" fillOpacity="0.12" />
      {/* Screw threads */}
      {[10, 22, 34, 46, 58, 70].map((y, i) => (
        <ellipse
          key={i}
          cx="15"
          cy={y}
          rx="14"
          ry="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
      ))}
    </motion.svg>
  );
}

/**
 * Interlocking gears pair — two gears that rotate in opposite directions,
 * mimicking the SFT logo design with F and T gears.
 */
export function InterlockingGears({
  className = "",
  size = 200,
}: {
  className?: string;
  size?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 0.6 }}>
      <AnimatedGear
        size={size * 0.55}
        direction="clockwise"
        speed={25}
        className="absolute left-0 bottom-0 text-neon-blue"
      />
      <AnimatedGear
        size={size * 0.55}
        direction="counter-clockwise"
        speed={25}
        className="absolute right-0 bottom-0 text-neon-violet"
      />
    </div>
  );
}

/**
 * Floating particles — small dots that float upward, simulating
 * powder particles being filled (ambient decoration).
 */
export function FloatingParticles({ className = "" }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReduced || !mounted) return null;

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-neon-cyan/20"
          style={{
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -300, -600],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
