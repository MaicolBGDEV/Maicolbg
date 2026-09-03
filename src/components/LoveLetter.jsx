import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./LoveLetter.css";

export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const paragraphs = CONFIG.letter.body.split("\n\n").filter(Boolean);

  return (
    <section className="section love-letter" id="carta-final">
      <div className="section-inner love-letter__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {CONFIG.letter.intro}
        </motion.p>

        <div className="love-letter__stage">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="envelope"
                type="button"
                className="envelope"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.7 }}
                aria-label={CONFIG.letter.tapHint}
              >
                <span className="envelope__glow" />
                <svg viewBox="0 0 200 140" className="envelope__svg">
                  <rect x="4" y="4" width="192" height="132" rx="10" className="envelope__body" />
                  <path d="M4 14 L100 84 L196 14" className="envelope__flap" />
                  <path d="M4 126 L70 66" className="envelope__fold" />
                  <path d="M196 126 L130 66" className="envelope__fold" />
                </svg>
                <span className="envelope__hint">{CONFIG.letter.tapHint}</span>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                className="letter-paper"
                initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -12 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.3 + i * 0.3 }}
                  >
                    {p}
                  </motion.p>
                ))}
                <motion.p
                  className="letter-paper__signature"
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.3 + paragraphs.length * 0.3 }}
                >
                  {CONFIG.letter.signature}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
