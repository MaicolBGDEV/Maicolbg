/** Pseudo-random determinístico basado en un número semilla (índice).
 * Se usa para que las posiciones iniciales "dispersas" de las fotos
 * sean siempre las mismas entre renders, en vez de saltar en cada
 * re-render como pasaría con Math.random(). */
export function seededRandom(seed) {
  const x = Math.sin(seed * 999.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Devuelve un número entre min y max, determinístico según seed. */
export function seededRange(seed, min, max) {
  return min + seededRandom(seed) * (max - min);
}
