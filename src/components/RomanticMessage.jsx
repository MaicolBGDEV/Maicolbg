import { motion } from "framer-motion";
import { CONFIG } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./RomanticMessage.css";

/**
 * Tarjeta grande semitransparente con el mensaje romántico principal.
 * Los párrafos aparecen progresivamente (fade-in escalonado) cuando la
 * sección entra en la pantalla.
 */
export default function RomanticMessage() {
  const reducedMotion = usePrefersReducedMotion();
  const paragraphs = CONFIG.romanticMessage.body.split("\n\n").filter(Boolean);

  return (
    <section className="section romantic-message" id="carta-cumple">
      <div className="section-inner romantic-message__inner">
        <motion.div
          className="romantic-message__card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="eyebrow romantic-message__date"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {CONFIG.date}
          </motion.p>

          <motion.h2
            className="romantic-message__title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Feliz {CONFIG.occasion}, {CONFIG.personName} ❤️
          </motion.h2>

          <div className="romantic-message__body">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.25 + i * 0.35 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
