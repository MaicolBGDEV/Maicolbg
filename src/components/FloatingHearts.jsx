import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { seededRandom, seededRange } from "../utils/random";
import "./FloatingHearts.css";

/**
 * Pequeños corazones rosados/rojos que flotan lentamente hacia arriba
 * en toda la página, como ambientación (no interactivo).
 */
export default function FloatingHearts({ count = 16 }) {
  const reducedMotion = usePrefersReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seededRange(i + 1, 2, 98),
        size: seededRange(i + 11, 10, 22),
        duration: seededRange(i + 21, 14, 26),
        delay: seededRange(i + 31, 0, 20),
        drift: seededRange(i + 41, -40, 40),
        opacity: seededRange(i + 51, 0.15, 0.5),
        hue: seededRandom(i + 61) > 0.5 ? "var(--rose-strong)" : "var(--red-deep)",
      })),
    [count]
  );

  if (reducedMotion) return null;

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="floating-hearts__item"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            color: h.hue,
            opacity: h.opacity,
          }}
          initial={{ y: "110vh", x: 0, rotate: -8 }}
          animate={{ y: "-10vh", x: [0, h.drift, 0], rotate: [-8, 8, -8] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 28S3 19.4 3 11.6C3 6.9 6.6 3.6 11 3.6c2.7 0 5 1.3 6.5 3.4 1.5-2.1 3.8-3.4 6.5-3.4 4.4 0 8 3.3 8 8 0 7.8-13 16.4-13 16.4z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
