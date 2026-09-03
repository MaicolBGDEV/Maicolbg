import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./StarBackground.css";

/**
 * Fondo de estrellas parpadeantes, dibujado en <canvas> para que sea
 * fluido incluso con cientos de estrellas en pantallas grandes.
 * Es un solo fondo fijo detrás de TODA la página (no se repite por sección).
 */
export default function StarBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const area = width * height;
      const count = Math.min(220, Math.max(90, Math.floor(area / 9000)));
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.05,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      // Dibujo estático, una sola vez, sin animación continua
      ctx.clearRect(0, 0, width, height);
      starsRef.current.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.baseAlpha})`;
        ctx.fill();
      });
      return () => window.removeEventListener("resize", resize);
    }

    let t = 0;
    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      for (const s of starsRef.current) {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.baseAlpha * twinkle})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div className="star-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="star-bg__vignette" />
    </div>
  );
}
