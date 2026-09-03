/**
 * ============================================================
 *  CONFIGURACIÓN DE LA EXPERIENCIA ROMÁNTICA
 * ============================================================
 *  Este es el ÚNICO archivo que necesitas tocar para personalizar
 *  todo el contenido: nombres, mensajes, fecha, fotos y textos
 *  de los botones.
 *
 *  Para cambiar COLORES, edita las variables CSS al inicio de
 *  "src/index.css" (busca el bloque ":root { ... }").
 *
 *  Para cambiar las FOTOS reales:
 *  1. Coloca tus imágenes dentro de "public/images/"
 *  2. Reemplaza los nombres de archivo abajo en PHOTOS (o simplemente
 *     sobrescribe foto1.jpg ... foto15.jpg con tus propias fotos).
 *  3. Puedes usar entre 8 y 15 fotos sin romper el diseño.
 * ============================================================
 */

export const CONFIG = {
  // ---------- NOMBRES Y FECHA ----------
  // Estos 3 valores arman automáticamente el título del "Mensaje romántico"
  // (por ejemplo: "Feliz cumpleaños, Mi Amor Gaisha ❤️") y la fecha que
  // aparece justo arriba de ese título. Cámbialos aquí y se actualizan solos.
  personName: "Mi Amor Gaisha",
  occasion: "cumpleaños", // "cumpleaños" | "aniversario" | lo que quieras
  date: "04 de septiembre",

  // ---------- MÚSICA DE FONDO ----------
  // Coloca tu canción dentro de "public/music/" (mp3) y escribe aquí el
  // nombre del archivo. Empieza a sonar justo cuando tocan "Comenzar".
  music: {
    src: "/music/cancion.mp3",
  },

  // ---------- PANTALLA DE BIENVENIDA ----------
  welcome: {
    eyebrow: "Para alguien muy especial",
    startButton: "Comenzar ✨",
  },

  // ---------- CORAZÓN DE FOTOS ----------
  heart: {
    subtitle: "Mi lugar favorito siempre será a tu lado ❤️",
    continueButton: "Hay algo más... ✨",
    // Pequeñas tarjetas decorativas que se mezclan entre las fotos
    // dentro del corazón. Puedes agregar, quitar o cambiar el texto.
    decorativeCards: ["❤️", "Mi persona favorita", "Siempre tú", "Te Amo"],
  },

  // ---------- MENSAJE ROMÁNTICO ----------
  romanticMessage: {
    // El título ("Feliz [occasion], [personName] ❤️") se arma solo, arriba,
    // a partir de personName y occasion. No hace falta escribirlo aquí.
    // Usa "\n\n" para separar párrafos.
    body:
      "Hoy quiero recordarte lo especial que eres para mí.\n\n" +
      "Gracias por cada momento, cada sonrisa y cada recuerdo que estamos construyendo juntos.\n\n" +
      "Espero que este nuevo año más de vida esté lleno de momentos increíbles, sueños cumplidos y muchas razones para sonreír.\n\n" +
      "Te quiero muchísimo y deseo seguir compartiendo muchos momentos contigo mi Chinita preciosa. ❤️",
  },

  // ---------- GALERÍA ----------
  gallery: {
    title: "Mi niña preciosa!!",
    subtitle: "Cada foto, un momento que quiero recordar contigo",
  },

  // ---------- LÍNEA DEL TIEMPO ----------
  timeline: {
    title: "Nuestros momentos(QUEDA PENDIENTE) ❤️",
    items: [
      {
        title: "El comienzo",
        date: "El día que todo empezó",
        message: "Nunca imaginé que ese día cambiaría mi vida para siempre.",
        photo: "/images/foto11.jpg",
      },
      {
        title: "Nuestro primer recuerdo",
        date: "Un momento inolvidable",
        message: "Todavía recuerdo cada detalle como si fuera ayer.",
        photo: "/images/foto12.jpg",
      },
      {
        title: "Momentos inolvidables",
        date: "Tantas risas juntos",
        message: "Contigo hasta lo más simple se convierte en mi momento favorito del día.",
        photo: "/images/foto13.jpg",
      },
      {
        title: "Todas nuestras aventuras",
        date: "Y seguimos sumando",
        message: "Cada aventura contigo es una nueva razón para quererte más.",
        photo: "/images/foto14.jpg",
      },
      {
        title: "Y todo lo que todavía nos falta vivir...",
        date: "El futuro",
        message: "Esto apenas comienza. Lo mejor todavía está por venir.",
        photo: "/images/foto15.jpg",
      },
    ],
  },

  // ---------- CARTA FINAL ----------
  letter: {
    intro: "Una última cosa...",
    tapHint: "Toca el sobre para abrirlo",
    body:
      "Si pudiera elegir nuevamente a una persona para compartir todos estos momentos, te elegiría a ti una y otra vez.\n\n" +
      "Sé que llevamos poco tiempo juntos, pero en este tiempo has logrado convertirte en alguien demasiado especial para mí. Me hace muy feliz saber que eres mi chica, poder compartir mis días contigo y tener la oportunidad de conocerte cada vez más. ❤️\n\n" +
      "Quiero que sepas que, aunque exista distancia entre nosotros, para mí eso nunca será un impedimento para quererte, respetarte y demostrarte lo importante que eres para mí. La distancia puede hacer que no podamos estar juntos físicamente todo el tiempo, pero jamás va a impedir que esté para ti, que te cuide desde donde esté y que haga las cosas bien contigo.\n\n" +
      "No quiero que tengas que preocuparte por nada cuando se trate de mí. Quiero que confíes en mis intenciones, porque lo que siento por ti es sincero y mis intenciones contigo son buenas. Quiero construir algo bonito, llevar las cosas con calma, respeto y sinceridad, y demostrarte con hechos que puedes sentirte tranquila conmigo.\n\n" +
      "Quiero que nunca olvides que me tienes a tu disposición para lo que necesites. Si algún día estás feliz, quiero estar para celebrar contigo; si estás triste, quiero escucharte; si tienes algún problema, quiero que sepas que puedes contar conmigo. No tienes que enfrentar nada sola mientras yo pueda estar ahí para ti.\n\n" +
      "Hoy es un día muy especial porque celebramos tu vida, y quiero que recuerdes lo mucho que vales. Deseo de corazón que este nuevo año de tu vida esté lleno de momentos bonitos, sueños cumplidos, muchas sonrisas y personas que te quieran de verdad. Y espero poder seguir siendo parte de esos momentos y hacerte feliz de todas las maneras que pueda. 🥺❤️\n\n" +
      "Gracias por llegar a mi vida, por cada conversación, cada sonrisa, cada momento que hemos compartido y por hacerme sentir tan feliz simplemente por saber que estás ahí.\n\n" +
      "Te amo muchísimo, mi niña preciosa. ❤️\n\n" +
      "Feliz cumpleaños, mi amor. Espero que hoy puedas sentir aunque sea un poquito de todo el cariño que tengo por ti. Y recuerda siempre que aquí tienes a alguien que te quiere, te respeta, confía en ti y tiene las mejores intenciones para los dos.\n\n" +
      "Te elegiría una y otra vez. ❤️",
    signature: "Con todo mi amor",
  },

  // ---------- SECCIÓN FINAL ----------
  final: {
    title: "Fin... por ahora ❤️",
    subtitle: "Porque nuestra historia recién empieza.",
  },

  // ---------- FOTOS ----------
  // Reemplaza estos archivos dentro de public/images/ por tus fotos reales.
  // "caption" es opcional y aparece en la galería al hacer clic en la foto.
  photos: [
    { src: "/images/foto1.jpeg", caption: "Uno de mis momentos favoritos" },
    { src: "/images/foto2.jpeg", caption: "" },
    { src: "/images/foto3.jpeg", caption: "Nunca olvidaré este día" },
    { src: "/images/foto4.jpeg", caption: "" },
    { src: "/images/foto5.jpeg", caption: "Tu sonrisa favorita" },
    { src: "/images/foto6.jpeg", caption: "" },
    { src: "/images/foto7.jpeg", caption: "Uno de tantos recuerdos" },
    { src: "/images/foto8.jpeg", caption: "" },
    { src: "/images/foto9.jpeg", caption: "Contigo, siempre" },
    { src: "/images/foto10.jpeg", caption: "" },
    { src: "/images/foto11.jpeg", caption: "" },
    { src: "/images/foto12.jpeg", caption: "" },
    { src: "/images/foto13.jpeg", caption: "" },
    { src: "/images/foto14.jpeg", caption: "" },
    { src: "/images/foto15.jpeg", caption: "" },
  ],
};