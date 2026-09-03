import { useEffect, useState } from "react";

/**
 * Detecta si el usuario tiene activado "reducir movimiento" en su sistema.
 * Se usa en toda la app para simplificar o desactivar animaciones pesadas.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}
