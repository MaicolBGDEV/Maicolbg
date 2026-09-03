import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { getHeartOutlinePoints } from "../utils/heartShape";
import { seededRange } from "../utils/random";
import PhotoFrame from "./PhotoFrame";
import MessageCard from "./MessageCard";
import PhotoHeart, { HeartCaption } from "./PhotoHeart";
import "./PhotoAnimation.css";

const TOTAL_ITEMS = 19; // 15 fotos + 4 tarjetas decorativas, distribuidas en el contorno
const CARD_SLOTS = [0, 5, 10, 14]; // posiciones (índices) donde van las tarjetas de texto

/** Construye la lista de piezas (fotos + tarjetas) que forman el corazón. */
function buildHeartItems() {
  const photos = CONFIG.photos.slice(0, 15);
  const cards = CONFIG.heart.decorativeCards;
  let photoCursor = 0;
  let cardCursor = 0;

  return Array.from({ length: TOTAL_ITEMS }, (_, i) => {
    if (CARD_SLOTS.includes(i)) {
      const text = cards[cardCursor % cards.length];
      cardCursor += 1;
      return { id: `card-${i}`, type: "card", text };
    }
    const photo = photos[photoCursor % photos.length];
    photoCursor += 1;
    return { id: `photo-${i}`, type: "photo", ...photo };
  });
}

export default function PhotoAnimation({ active, onFormed, onContinue }) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState("hidden"); // hidden -> converge -> formed

  const items = useMemo(() => buildHeartItems(), []);
  const points = useMemo(() => getHeartOutlinePoints(TOTAL_ITEMS, { jitter: 0.16 }), []);

  const bounds = useMemo(() => {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }, [points]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dispara la coreografía cuando la sección se activa
  useEffect(() => {
    if (!active || phase !== "hidden") return;
    const t = setTimeout(() => setPhase("converge"), 250);
    return () => clearTimeout(t);
  }, [active, phase]);

  // Marca "formed" cuando termina la coreografía y avisa al padre
  useEffect(() => {
    if (phase !== "converge") return;
    const delayMs = reducedMotion ? 500 : 3600;
    const t = setTimeout(() => {
      setPhase("formed");
      onFormed?.();
    }, delayMs);
    return () => clearTimeout(t);
  }, [phase, reducedMotion, onFormed]);

  const unitScale = useMemo(() => {
    if (!box.w || !box.h) return 0;
    const spanX = bounds.maxX - bounds.minX || 1;
    const spanY = bounds.maxY - bounds.minY || 1;
    const scaleX = (box.w * 0.84) / spanX;
    const scaleY = (box.h * 0.84) / spanY;
    return Math.min(scaleX, scaleY);
  }, [box, bounds]);

  return (
    <div className="photo-anim-wrap">
      <div className="photo-anim" ref={containerRef}>
        {unitScale > 0 &&
          items.map((item, i) => (
            <HeartItem
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              point={points[i]}
              unitScale={unitScale}
              box={box}
              phase={phase}
              reducedMotion={reducedMotion}
            />
          ))}
        <PhotoHeart phase={phase} />
      </div>
      <HeartCaption formed={phase === "formed"} onContinue={onContinue} />
    </div>
  );
}

function HeartItem({ item, index, total, point, unitScale, box, phase, reducedMotion }) {
  const target = { x: point.x * unitScale, y: point.y * unitScale };

  // Tamaño de cada pieza: varía un poco para que no todas sean iguales
  const sizeFactor = seededRange(index + 3, 0.86, 1.16);
  const baseSize = Math.max(42, Math.min(110, unitScale * 3.05));
  const size = baseSize * sizeFactor;

  const finalTilt = seededRange(index + 7, -7, 7);

  // Posición inicial "dispersa": dentro del propio escenario (la caja con
  // overflow:hidden), para que el vuelo de las fotos nunca agrande el
  // scroll de la página, solo lo que se ve dentro del escenario.
  const scatterAngle = seededRange(index + 13, 0, Math.PI * 2);
  const stageRadius = Math.max(box.w || 600, box.h || 600) * 0.5;
  const scatterRadius = seededRange(index + 17, 0.72, 1.15);
  const scatterDist = stageRadius * scatterRadius;
  const scatterX = Math.cos(scatterAngle) * scatterDist;
  const scatterY = Math.sin(scatterAngle) * scatterDist;
  const scatterRot = seededRange(index + 23, -70, 70);

  // Punto intermedio: se acercan al centro con un leve giro orbital
  const midAngle = scatterAngle + seededRange(index + 29, -0.8, 0.8);
  const midRadius = unitScale * seededRange(index + 31, 2.5, 5.5);
  const midX = Math.cos(midAngle) * midRadius;
  const midY = Math.sin(midAngle) * midRadius;
  const midRot = seededRange(index + 37, -140, 140);

  const delay = reducedMotion ? 0 : (index / total) * 1.05 + seededRange(index + 41, 0, 0.25);
  const duration = reducedMotion ? 0.4 : seededRange(index + 43, 1.9, 2.5);

  const floatDuration = seededRange(index + 53, 3.6, 5.4);
  const floatDelay = seededRange(index + 59, 0, 3);
  const doZoomPulse = index % 4 === 0;

  const variants = reducedMotion
    ? {
        hidden: { opacity: 0, x: target.x, y: target.y, rotate: finalTilt, scale: 0.9 },
        converge: {
          opacity: 1,
          x: target.x,
          y: target.y,
          rotate: finalTilt,
          scale: 1,
          transition: { duration: 0.5, delay: index * 0.03 },
        },
        formed: { opacity: 1, x: target.x, y: target.y, rotate: finalTilt, scale: 1 },
      }
    : {
        hidden: { opacity: 0, x: scatterX, y: scatterY, rotate: scatterRot, scale: 0.45 },
        converge: {
          opacity: [0, 1, 1, 1],
          x: [scatterX, midX, target.x],
          y: [scatterY, midY, target.y],
          rotate: [scatterRot, midRot, finalTilt],
          scale: [0.45, 1.15, 1],
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.6, 1],
          },
        },
        formed: {
          opacity: 1,
          x: target.x,
          y: target.y,
          rotate: finalTilt,
          scale: 1,
          transition: { duration: 0.6 },
        },
      };

  return (
    <motion.div
      className="photo-anim__item"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      variants={variants}
      initial="hidden"
      animate={phase === "hidden" ? "hidden" : phase}
    >
      <motion.div
        className="photo-anim__float"
        animate={
          reducedMotion || phase !== "formed"
            ? undefined
            : {
                y: [0, -7, 0],
                scale: doZoomPulse ? [1, 1.045, 1] : 1,
              }
        }
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {item.type === "photo" ? (
          <PhotoFrame src={item.src} alt="" />
        ) : (
          <MessageCard text={item.text} />
        )}
      </motion.div>
    </motion.div>
  );
}
