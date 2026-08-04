/**
 * Fuente única de todo el texto del sitio.
 *
 * Los valores entre [[DOBLES CORCHETES]] son marcadores. Se ven en pantalla a
 * propósito: es imposible publicar el sitio sin darse cuenta de que faltan.
 * Reemplazar por los datos reales de la escuela antes de publicar.
 */

export const site = {
  escuela: {
    nombre: "[[NOMBRE DE LA ESCUELA]]",
    ciudad: "Magdalena de Kino, Sonora",
    direccion: "[[CALLE Y NÚMERO, COLONIA, C.P.]]",
    telefono: "[[TELÉFONO A 10 DÍGITOS]]",
    whatsapp: "[[WHATSAPP A 10 DÍGITOS]]",
    correo: "[[CORREO@EJEMPLO.COM]]",
    horarios: "[[LUNES A VIERNES, 3:00 PM A 7:00 PM]]",
    facebook: "[[URL DE FACEBOOK]]",
    instagram: "[[URL DE INSTAGRAM]]",
    mapsUrl: "[[URL DE GOOGLE MAPS]]",
  },

  hero: {
    eyebrow: "Magdalena de Kino, Sonora",
    titulo: "Inglés para niñas y niños de 4 a 12 años",
    subtitulo:
      "Clases en grupos pequeños donde tu hija o hijo habla inglés desde el primer día. Sin libros aburridos, sin memorizar listas.",
    ctaPrimario: "Apartar un lugar",
    ctaSecundario: "Escribir por WhatsApp",
    datos: [
      { valor: "4 a 12", etiqueta: "años" },
      { valor: "[[8]]", etiqueta: "niños por grupo" },
      { valor: "[[2]]", etiqueta: "clases por semana" },
    ],
    imagenAlt:
      "[[DESCRIBIR LA FOTO: por ejemplo, niños trabajando en una mesa del salón]]",
  },

  beneficios: {
    titulo: "Por qué las familias nos eligen",
    items: [
      {
        titulo: "Grupos pequeños",
        texto:
          "Pocos niños por salón. La maestra alcanza a escuchar a cada uno hablar en cada clase.",
      },
      {
        titulo: "Se habla, no se memoriza",
        texto:
          "Las clases se dan en inglés desde el primer día, con juegos y actividades en lugar de listas de vocabulario.",
      },
      {
        titulo: "Maestras certificadas",
        texto:
          "[[DESCRIBIR LA CERTIFICACIÓN: por ejemplo, TKT o TOEFL, y los años de experiencia]]",
      },
      {
        titulo: "Reporte para los papás",
        texto:
          "Cada [[mes]] recibes un reporte de cómo va tu hija o hijo y en qué está trabajando.",
      },
    ],
  },

  programa: {
    eyebrow: "Qué aprenden",
    titulo: "Lo que tu hija o hijo se lleva del año",
    texto:
      "Las cuatro habilidades, en el orden en que un niño realmente las adquiere: primero entiende, luego habla, después lee y escribe.",
    habilidades: [
      {
        titulo: "Escuchar",
        texto:
          "Entiende instrucciones, preguntas y cuentos cortos en inglés sin que se los traduzcan.",
      },
      {
        titulo: "Hablar",
        texto:
          "Se presenta, pide lo que necesita, describe lo que ve y contesta preguntas sobre sí mismo.",
      },
      {
        titulo: "Leer",
        texto:
          "Reconoce palabras que ya usa y lee textos cortos apropiados para su edad.",
      },
      {
        titulo: "Escribir",
        texto:
          "Escribe palabras y frases sencillas: su nombre, los colores, los números, lo que le gusta.",
      },
    ],
    vocabularioTitulo: "Así se aprende el vocabulario",
    vocabularioTexto:
      "Trabajamos las palabras nuevas como lotería: la imagen, la palabra en español y la palabra en inglés juntas. El niño relaciona la carta con la palabra antes de escribirla.",
    pista: "Toca una carta",
    cartas: [
      { numero: 1, es: "El sol", en: "The sun", figura: "sol", color: "maiz" },
      { numero: 2, es: "La luna", en: "The moon", figura: "luna", color: "cielo" },
      { numero: 3, es: "El árbol", en: "The tree", figura: "arbol", color: "menta" },
      { numero: 4, es: "La estrella", en: "The star", figura: "estrella", color: "lavanda" },
      { numero: 5, es: "El pez", en: "The fish", figura: "pez", color: "turquesa" },
      { numero: 6, es: "La casa", en: "The house", figura: "casa", color: "durazno" },
      { numero: 7, es: "El corazón", en: "The heart", figura: "corazon", color: "ambar" },
      { numero: 8, es: "La nube", en: "The cloud", figura: "nube", color: "cielo" },
    ],
  },

  metodo: {
    titulo: "Cómo es una clase",
    pasos: [
      {
        titulo: "Calentamiento",
        texto: "Canción o juego en inglés para soltar la lengua. Nadie se sienta a leer todavía.",
      },
      {
        titulo: "Palabra nueva",
        texto: "Se presenta el vocabulario del día con cartas, imágenes y sonido.",
      },
      {
        titulo: "A usarla",
        texto: "Los niños usan lo nuevo en una actividad: pedir algo, describir, actuar.",
      },
      {
        titulo: "Cierre",
        texto: "Se repasa lo aprendido y se manda una actividad corta para casa.",
      },
    ],
  },

  nosotros: {
    titulo: "Quién les da clase",
    texto: "[[PÁRRAFO SOBRE LA ESCUELA: cuándo abrió, por qué, qué la hace distinta]]",
    maestras: [
      {
        nombre: "[[NOMBRE DE LA MAESTRA]]",
        rol: "[[DIRECTORA / MAESTRA]]",
        bio: "[[UNA O DOS FRASES: formación y años dando clase a niños]]",
      },
    ],
  },

  testimonios: {
    titulo: "Lo que dicen los papás",
    items: [
      {
        texto: "[[TESTIMONIO REAL DE UN PAPÁ O MAMÁ — pedir permiso antes de publicar]]",
        autor: "[[NOMBRE]]",
        detalle: "[[mamá de un alumno de 8 años]]",
      },
      {
        texto: "[[SEGUNDO TESTIMONIO REAL]]",
        autor: "[[NOMBRE]]",
        detalle: "[[papá de una alumna de 6 años]]",
      },
    ],
  },

  faq: {
    titulo: "Preguntas frecuentes",
    items: [
      {
        pregunta: "¿Mi hija o hijo necesita saber algo de inglés para entrar?",
        respuesta: "No. Recibimos niños que empiezan desde cero y los acomodamos en el grupo que les corresponde.",
      },
      {
        pregunta: "¿Cuánto cuesta?",
        respuesta: "[[COLEGIATURA MENSUAL, INSCRIPCIÓN Y QUÉ INCLUYE]]",
      },
      {
        pregunta: "¿Cuándo puedo inscribir?",
        respuesta: "[[EXPLICAR SI HAY FECHAS DE INSCRIPCIÓN O SI ES TODO EL AÑO]]",
      },
      {
        pregunta: "¿Puedo ver una clase antes de inscribir?",
        respuesta: "[[SÍ O NO, Y CÓMO SE AGENDA]]",
      },
      {
        pregunta: "¿Qué pasa si mi hija o hijo falta a una clase?",
        respuesta: "[[POLÍTICA DE FALTAS Y REPOSICIONES]]",
      },
    ],
  },

  inscripcion: {
    eyebrow: "Inscripciones abiertas",
    titulo: "Aparta el lugar de tu hija o hijo",
    texto:
      "Llena los datos y te contactamos para agendar una clase de prueba. Contestamos el mismo día.",
  },

  contacto: {
    titulo: "Dónde estamos",
    etiquetaDireccion: "Dirección",
    etiquetaTelefono: "Teléfono",
    etiquetaCorreo: "Correo",
    etiquetaHorario: "Horario",
  },

  privacidad: {
    razonSocial: "[[RAZÓN SOCIAL O NOMBRE COMPLETO DE LA RESPONSABLE]]",
    domicilio: "[[DOMICILIO FISCAL COMPLETO]]",
    correoContacto: "[[CORREO PARA EJERCER DERECHOS ARCO]]",
  },
} as const;
