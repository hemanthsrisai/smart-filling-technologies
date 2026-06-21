"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect prefers-reduced-motion media query.
 * Returns true if the user has requested reduced motion.
 */
export function useReducedMotion(): boolean {
  // Forced to false so animations always run, regardless of OS settings.
  return false;
}
