import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { seededRange } from "../utils/random";
import "./PhotoHeart.css";

/**
 * Efectos ambientales del corazón ya formado: brillo detrás de las fotos
 * y partículas suaves alrededor. Se renderiza DENTRO de la caja recortada
 * (.photo-anim, con overflow:hidden), así que todo queda contenido y
 * nunca agranda el scroll de la página.
 */
export default function PhotoHeart({ phase }) {
  const reducedMotion = usePrefersReducedMotion();
  const formed = phase === "formed";

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: seededRange(i + 101, 6, 94),
        top: seededRange(i + 111, 4, 96),
        size: seededRange(i + 121, 3, 7),
        delay: seededRange(i + 131, 0, 3),
        duration: seededRange(i + 141, 2.4, 4.2),
      })),
    []
  );

  return (
    <>
      <motion.div
        className="photo-heart__glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: formed ? 1 : 0 }}
        transition={{ duration: 1.6 }}
        aria-hidden="true"
      />

      {formed && !reducedMotion && (
        <div className="photo-heart__sparkles" aria-hidden="true">
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              className="photo-heart__spark"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                repeatDelay: seededRange(s.id + 5, 0.5, 2),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

/**
 * Subtítulo + botón "Hay algo más...". Se renderiza en flujo normal del
 * documento (NO en posición absoluta), como hermano de .photo-anim, para
 * que nunca quede recortado y siempre reserve su propio espacio.
 */
export function HeartCaption({ formed, onContinue }) {
  return (
    <AnimatePresence>
      {formed && (
        <motion.div
          className="heart-caption"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="heart-caption__subtitle">{CONFIG.heart.subtitle}</p>
          <button type="button" className="glow-btn" onClick={onContinue}>
            {CONFIG.heart.continueButton}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
