/**
 * Curva paramétrica de corazón:
 *   x(t) = 16 sin³(t)
 *   y(t) = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
 *
 * Rango aproximado: x ∈ [-16, 16], y ∈ [-17, 12] (antes de invertir el eje Y).
 * Se usa para distribuir las fotografías y tarjetas a lo largo del contorno
 * del corazón, y también para rellenar el interior con puntos secundarios.
 */

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x, y: -y }; // invertimos Y para que la punta quede abajo en pantalla
}

/**
 * La parametrización estándar del corazón NO tiene velocidad constante:
 * hay muchos puntos "amontonados" cerca del pliegue superior y de la
 * punta inferior, y pocos a los lados. Para que las fotos queden
 * distribuidas de forma pareja (sin amontonarse), muestreamos la curva
 * con muchísima resolución y luego elegimos `count` puntos equiespaciados
 * por LONGITUD DE ARCO real, no por el parámetro `t`.
 */
function buildArcLengthTable(samples = 2000) {
  const raw = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    raw.push({ t, ...heartPoint(t) });
  }

  let acc = 0;
  const withLength = [{ ...raw[0], len: 0 }];
  for (let i = 1; i < raw.length; i++) {
    const dx = raw[i].x - raw[i - 1].x;
    const dy = raw[i].y - raw[i - 1].y;
    acc += Math.sqrt(dx * dx + dy * dy);
    withLength.push({ ...raw[i], len: acc });
  }
  return { points: withLength, total: acc };
}

/**
 * Devuelve `count` puntos distribuidos de forma PAREJA sobre el contorno
 * del corazón (por longitud de arco), con un leve "jitter" radial
 * determinístico hacia adentro/afuera para que se vea más orgánico y
 * menos como una fila perfecta de fotos.
 */
export function getHeartOutlinePoints(count, { jitter = 0.22, seedOffset = 0 } = {}) {
  const { points: table, total } = buildArcLengthTable();
  const results = [];

  for (let i = 0; i < count; i++) {
    const targetLen = (i / count) * total;
    // búsqueda del punto de la tabla cuya longitud acumulada más se acerca
    let lo = 0,
      hi = table.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (table[mid].len < targetLen) lo = mid + 1;
      else hi = mid;
    }
    const base = table[lo];

    // jitter determinístico (no random) basado en el índice
    const wiggle = Math.sin(i * 12.9898 + seedOffset) * 43758.5453;
    const frac = wiggle - Math.floor(wiggle); // 0..1 pseudo-random estable
    const radial = 1 + (frac - 0.5) * jitter;

    results.push({
      x: base.x * radial,
      y: base.y * radial,
      t: base.t,
      index: i,
    });
  }
  return results;
}

/** Escala un punto del espacio del corazón (~[-16,16] x [-18,13]) a píxeles,
 * centrado en (0,0), listo para usar como transform translate(x, y). */
export function heartPointToPixels(point, unitScale) {
  return {
    x: point.x * unitScale,
    y: point.y * unitScale,
  };
}
