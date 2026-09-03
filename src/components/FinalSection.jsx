import { motion } from "framer-motion";
import { CONFIG } from "../config";
import "./FinalSection.css";

export default function FinalSection() {
  return (
    <section className="section final-section" id="final">
      <div className="section-inner final-section__inner">
        <motion.div
          className="final-section__heart"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 100 90">
            <path
              d="M50 84 C 15 60, 2 38, 2 22 C 2 6, 16 -2, 30 4 C 40 8, 47 16, 50 22 C 53 16, 60 8, 70 4 C 84 -2, 98 6, 98 22 C 98 38, 85 60, 50 84 Z"
              fill="url(#finalHeartGradient)"
            />
            <defs>
              <linearGradient id="finalHeartGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--rose)" />
                <stop offset="55%" stopColor="var(--rose-strong)" />
                <stop offset="100%" stopColor="var(--red-deep)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h2
          className="final-section__title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {CONFIG.final.title}
        </motion.h2>

        <motion.p
          className="final-section__subtitle"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {CONFIG.final.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
