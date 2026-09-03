import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import PhotoFrame from "./PhotoFrame";
import "./Gallery.css";

export default function Gallery() {
  const photos = CONFIG.photos;
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i + 1) % photos.length),
    [photos.length]
  );

  // Navegación por teclado dentro del modal
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  const current = isOpen ? photos[openIndex] : null;

  return (
    <section className="section gallery" id="galeria">
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {CONFIG.gallery.subtitle}
        </motion.p>
        <motion.h2
          className="section-title gallery__title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          {CONFIG.gallery.title}
        </motion.h2>

        <div className="gallery__grid">
          {photos.map((photo, i) => (
            <motion.button
              type="button"
              key={photo.src + i}
              className="gallery__cell"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              onClick={() => setOpenIndex(i)}
              aria-label={`Ver fotografía ${i + 1}${photo.caption ? `: ${photo.caption}` : ""}`}
            >
              <PhotoFrame src={photo.src} alt={photo.caption || `Fotografía ${i + 1}`} />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="gallery-modal__close"
              onClick={close}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <button
              type="button"
              className="gallery-modal__nav gallery-modal__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
            >
              ‹
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                className="gallery-modal__frame"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <PhotoFrame src={current.src} alt={current.caption || ""} />
                {current.caption && <p className="gallery-modal__caption">{current.caption}</p>}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              className="gallery-modal__nav gallery-modal__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Foto siguiente"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
