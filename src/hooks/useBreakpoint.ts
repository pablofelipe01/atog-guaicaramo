'use client'

import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

/**
 * Devuelve el breakpoint activo según el ancho del viewport.
 * mobile  < 640px
 * tablet  640px – 1023px
 * desktop ≥ 1024px
 * SSR-safe: devuelve "desktop" hasta que el cliente hidrate.
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    function get(): Breakpoint {
      if (window.innerWidth < 640)  return "mobile";
      if (window.innerWidth < 1024) return "tablet";
      return "desktop";
    }
    setBp(get());
    const handler = () => setBp(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return bp;
}
