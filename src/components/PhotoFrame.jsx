import { useState } from "react";
import "./PhotoFrame.css";

/**
 * Marco de fotografía con borde luminoso blanco/rosado.
 * Si la imagen no carga (por ejemplo si todavía no reemplazaste los
 * placeholders), muestra un respaldo elegante en vez de un ícono roto.
 */
export default function PhotoFrame({ src, alt = "", className = "", onClick, rounded = true }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`photo-frame ${rounded ? "photo-frame--rounded" : ""} ${className}`}
      onClick={onClick}
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="photo-frame__fallback">
          <svg viewBox="0 0 32 32" fill="currentColor" width="28" height="28">
            <path d="M16 28S3 19.4 3 11.6C3 6.9 6.6 3.6 11 3.6c2.7 0 5 1.3 6.5 3.4 1.5-2.1 3.8-3.4 6.5-3.4 4.4 0 8 3.3 8 8 0 7.8-13 16.4-13 16.4z" />
          </svg>
        </div>
      )}
      <div className="photo-frame__sheen" />
    </div>
  );
}
