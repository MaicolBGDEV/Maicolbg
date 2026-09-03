import { motion } from "framer-motion";
import { CONFIG } from "../config";
import PhotoFrame from "./PhotoFrame";
import "./Timeline.css";

export default function Timeline() {
  const items = CONFIG.timeline.items;

  return (
    <section className="section timeline" id="momentos">
      <div className="section-inner">
        <motion.h2
          className="section-title timeline__title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {CONFIG.timeline.title}
        </motion.h2>

        <div className="timeline__track">
          <div className="timeline__line" aria-hidden="true" />
          {items.map((item, i) => (
            <motion.div
              className={`timeline__item ${i % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline__dot" aria-hidden="true" />
              <div className="timeline__card">
                {item.photo && (
                  <div className="timeline__photo">
                    <PhotoFrame src={item.photo} alt={item.title} />
                  </div>
                )}
                <span className="eyebrow timeline__date">{item.date}</span>
                <h3 className="timeline__item-title">{item.title}</h3>
                <p className="timeline__message">{item.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
