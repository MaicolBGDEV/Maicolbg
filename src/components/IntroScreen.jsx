import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./IntroScreen.css";

/**
 * Pantalla completa e inicial: fondo oscuro (heredado del StarBackground
 * global), un corazón brillante central, el mensaje de bienvenida y el
 * botón "Comenzar". Se desmonta con una animación de salida al hacer clic.
 */
export default function IntroScreen({ visible, onStart }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="intro__heart"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <motion.svg
              viewBox="0 0 100 90"
              className="intro__heart-svg"
              animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M50 84 C 15 60, 2 38, 2 22 C 2 6, 16 -2, 30 4 C 40 8, 47 16, 50 22 C 53 16, 60 8, 70 4 C 84 -2, 98 6, 98 22 C 98 38, 85 60, 50 84 Z"
                fill="url(#heartGradient)"
              />
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--rose)" />
                  <stop offset="55%" stopColor="var(--rose-strong)" />
                  <stop offset="100%" stopColor="var(--red-deep)" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>

          <motion.p
            className="intro__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {CONFIG.welcome.eyebrow}
          </motion.p>

          <motion.button
            type="button"
            className="glow-btn intro__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            onClick={onStart}
          >
            {CONFIG.welcome.startButton}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
