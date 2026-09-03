# Para ti, mi amor ❤️

Una experiencia romántica interactiva de una sola página: pantalla de
bienvenida sobre un fondo espacial, fotografías que vuelan y se organizan
formando un corazón, un mensaje romántico, galería, línea del tiempo,
carta animada y cierre final.

Hecho con **React + Vite** y **Framer Motion**.

## Cómo verla en tu computadora

Necesitas tener [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).

## Cómo generar la versión final (para subir a un hosting)

```bash
npm run build
```

Esto genera una carpeta `dist/` con la página lista para publicar en
cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.).

## Cómo personalizar el contenido

**Todo el texto, nombres, fecha y referencias a las fotos se editan en un
solo archivo:**

```
src/config.js
```

Ahí encontrarás comentarios que indican exactamente qué cambiar: el mensaje
de bienvenida, el mensaje romántico, la línea del tiempo, el texto de la
carta final, etc.

## Cómo poner tus fotos reales

1. Abre la carpeta `public/images/`.
2. Verás 15 imágenes de ejemplo (`foto1.jpg` a `foto15.jpg`) — son
   placeholders generados automáticamente, **no son fotos reales**.
3. Reemplázalas por tus propias fotos, manteniendo el mismo nombre de
   archivo (o cambia las rutas en `src/config.js` si prefieres otros
   nombres).
4. Recomendado: fotos en formato retrato o cuadrado, buena resolución,
   pero no demasiado pesadas (ideal: menos de 1–2 MB cada una) para que la
   página cargue rápido.

## Cómo cambiar los colores

Todos los colores están centralizados como variables al inicio de:

```
src/index.css
```

Busca el bloque `:root { ... }` — cada variable tiene un comentario
explicando para qué se usa (fondo, rosas, texto, brillos, etc.).

## Estructura del proyecto

```
src/
  config.js              <- textos, nombres, fecha y fotos (edítalo aquí)
  index.css              <- colores y tipografías globales
  App.jsx                <- ensambla toda la experiencia
  hooks/
    usePrefersReducedMotion.js
  utils/
    heartShape.js         <- matemática de la curva del corazón
    random.js              <- aleatoriedad determinística (estable entre renders)
  components/
    StarBackground.jsx     <- fondo de estrellas animado (canvas)
    FloatingHearts.jsx     <- corazones flotando de fondo
    IntroScreen.jsx        <- pantalla de bienvenida
    PhotoAnimation.jsx     <- coreografía: fotos dispersas -> corazón
    PhotoHeart.jsx          <- brillo ambiental + subtítulo/botón del corazón
    PhotoFrame.jsx          <- marco de foto con borde luminoso (reutilizable)
    MessageCard.jsx         <- tarjetas decorativas dentro del corazón
    RomanticMessage.jsx     <- mensaje romántico principal
    Gallery.jsx              <- galería + modal de pantalla completa
    Timeline.jsx             <- línea del tiempo "Nuestros momentos"
    LoveLetter.jsx           <- sobre animado + carta final
    FinalSection.jsx         <- cierre de la página
```

## Notas técnicas

- Totalmente responsive (mobile-first); pruébala achicando la ventana o
  con las herramientas de desarrollador de tu navegador en modo móvil.
- Respeta `prefers-reduced-motion`: si el sistema del visitante tiene
  activado "reducir movimiento", las animaciones se simplifican
  automáticamente (sin desactivar la experiencia).
- Si una imagen no carga, se muestra un respaldo elegante en vez de un
  ícono roto, así que nunca se ve "vacía" mientras reemplazas las fotos.
- El corazón se arma matemáticamente (no son posiciones fijas a mano), así
  que si cambias la cantidad de fotos en `config.js`, ajusta también
  `TOTAL_ITEMS` y `CARD_SLOTS` al inicio de `PhotoAnimation.jsx` si quieres
  una distribución distinta (opcional).

Hecho con ❤️.
