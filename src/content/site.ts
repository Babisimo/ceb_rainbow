/**
 * Fuente única de todo el texto del sitio.
 *
 * Los valores entre [[DOBLES CORCHETES]] son marcadores. Se ven en pantalla a
 * propósito: es imposible publicar el sitio sin darse cuenta de que faltan.
 * Reemplazar por los datos reales de la escuela antes de publicar.
 *
 * Origen del contenido real: los folletos de la escuela en marketing_sources/.
 * "CICLO ESOCLAR 26 27 INFOR.pdf" es la fuente principal (ciclo 2026-2027).
 * "CICLO ESCOLAR 2024-2025.pdf" es referencia: de ahí salen misión, visión,
 * valores, horario y el reparto 60/40 de idiomas. Sus costos y sus grados
 * son de un ciclo anterior y NO se usan.
 */

export const site = {
  escuela: {
    nombre: "CEB Rainbow",
    nombreLargo: "Centro Educativo Bilingüe Rainbow",
    ciudad: "Magdalena de Kino, Sonora",
    direccion: "Dr. Lanz 400, esq. 16 de Septiembre",
    telefono: "632 112 0929",
    // El folleto trae un solo número. Falta confirmar que ese número reciba
    // WhatsApp: mientras siga siendo marcador, urlWhatsApp() devuelve "#" y
    // los botones de WhatsApp no se muestran. Ver README.
    whatsapp: "[[CONFIRMAR SI EL 632 112 0929 TIENE WHATSAPP Y ESCRIBIRLO AQUÍ]]",
    ctaWhatsApp: "Escribir por WhatsApp",
    correo: "[[CORREO@EJEMPLO.COM]]",
    horarios: "Lunes a viernes. Ingreso de 8:30 a 9:00, clases de 9:00 a 13:00 y horario extendido hasta las 16:00.",
    facebook: "[[URL DE FACEBOOK]]",
    instagram: "https://www.instagram.com/ceb_rainbow",
    instagramUsuario: "@ceb_rainbow",
    // Aún no está conectado a ningún componente. Ver README: este es el lugar
    // para guardar la URL del iframe de Google Maps que se pegará en la
    // sección de contacto (src/components/sections/Contacto.tsx).
    mapsUrl: "[[URL DE GOOGLE MAPS]]",
  },

  hero: {
    eyebrow: "Magdalena de Kino, Sonora",
    titulo: "Preescolar bilingüe para niñas y niños de 1 a 4 años",
    subtitulo:
      "Donde cada pequeño aprende, juega y crece con amor. Grupos reducidos, atención personalizada y más de la mitad del día en inglés.",
    ctaPrimario: "Apartar un lugar",
    datos: [
      { valor: "1 a 4", etiqueta: "años" },
      { valor: "60%", etiqueta: "del día en inglés" },
      { valor: "2026-2027", etiqueta: "ciclo escolar" },
    ],
    imagenAlt:
      "[[DESCRIBIR LA FOTO: por ejemplo, niños trabajando en el huerto escolar]]",
  },

  beneficios: {
    titulo: "Por qué las familias nos eligen",
    items: [
      {
        titulo: "Atención personalizada",
        texto:
          "Cada niño aprende a su propio ritmo, y aquí se le respeta ese ritmo en lugar de apurarlo para alcanzar al grupo.",
      },
      {
        titulo: "Grupos reducidos",
        texto:
          "Pocos niños por salón. La maestra alcanza a acompañar a cada uno todos los días, no solo a los que levantan la mano.",
      },
      {
        titulo: "Programa bilingüe",
        texto:
          "El inglés no es una clase aparte: es el idioma en el que se juega, se pide agua y se cuentan los cuentos.",
      },
      {
        titulo: "Aprendizaje basado en proyectos",
        texto:
          "Los temas se trabajan haciendo: sembrar en el huerto, cocinar, experimentar. Lo que se hace con las manos se recuerda.",
      },
    ],
  },

  grupos: {
    eyebrow: "Ciclo escolar 2026-2027",
    titulo: "Grupos y horarios",
    texto:
      "Recibimos niñas y niños de 1 a 4 años en tres grupos. La maestra ubica a cada niño en el grupo que le corresponde según su edad y su etapa.",
    items: [
      { nombre: "Nido", edades: "[[EDADES EXACTAS DE ESTE GRUPO]]" },
      { nombre: "Nido 1", edades: "[[EDADES EXACTAS DE ESTE GRUPO]]" },
      { nombre: "Kinder 1", edades: "[[EDADES EXACTAS DE ESTE GRUPO]]" },
    ],
    horarioTitulo: "Horario",
    horario: [
      { hora: "8:30 a 9:00", texto: "Ingreso" },
      { hora: "9:00 a 13:00", texto: "Clases" },
      { hora: "13:00 a 16:00", texto: "Horario extendido" },
    ],
    idiomasTitulo: "Idiomas",
    idiomas: [
      { porcentaje: "60%", idioma: "Inglés" },
      { porcentaje: "40%", idioma: "Español" },
    ],
  },

  programa: {
    eyebrow: "Qué trabajamos cada día",
    titulo: "Áreas de aprendizaje",
    texto:
      "El programa cubre las áreas de la educación preescolar y suma inglés todos los días. No son materias sueltas: se cruzan entre sí en un mismo proyecto.",
    areas: [
      "Lenguaje",
      "Inglés diario",
      "Pensamiento matemático",
      "Arte",
      "Música",
      "Educación física",
      "Educación socioemocional",
      "Ciencia y experimentos",
      "Valores y ciudadanía",
      "Habilidades de vida diaria",
    ],
    vocabularioTitulo: "Así se aprende el vocabulario",
    vocabularioTexto:
      "Las palabras nuevas se trabajan como lotería: la imagen, la palabra en español y la palabra en inglés, juntas. El niño ve la carta, la nombra en los dos idiomas y la juega. No memoriza una lista.",
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
    eyebrow: "Cómo damos clase",
    titulo: "Nuestras metodologías",
    texto:
      "Priorizamos el bienestar y el crecimiento de cada alumno, potenciando sus habilidades cognitivas y socioemocionales desde los primeros años. Combinamos el programa de la SEP con enfoque Montessori, Waldorf y Reggio Emilia, el aprendizaje basado en competencias, el juego, las inteligencias múltiples y el constructivismo.",
    items: [
      {
        titulo: "Aprendizaje basado en el juego",
        texto:
          "A esta edad el juego no es el premio después de trabajar: es la forma en que se trabaja.",
      },
      {
        titulo: "Montessori",
        texto:
          "Material concreto al alcance del niño y libertad para elegir en qué se concentra. La maestra acompaña, no dicta.",
      },
      {
        titulo: "Reggio Emilia",
        texto:
          "Se parte de la pregunta que hace el niño. El proyecto sale de su curiosidad, no de un calendario.",
      },
      {
        titulo: "Waldorf",
        texto:
          "Rutina, ritmo y arte. El día tiene una forma que el niño reconoce, y eso le da seguridad.",
      },
      {
        titulo: "Aprendizaje activo",
        texto:
          "Se aprende haciendo, moviéndose y equivocándose. Nadie se queda sentado escuchando una hora.",
      },
    ],
  },

  extracurriculares: {
    eyebrow: "Además de la currícula",
    titulo: "Programas extracurriculares",
    texto:
      "Talleres incluidos en el programa, distribuidos a lo largo de la semana.",
    items: [
      "Yoga",
      "Paleontología",
      "Biología y ciencias",
      "Huerto escolar",
      "Arte",
      "Psicomotricidad y educación física",
      "Ritmo musical",
      "Mini chef",
      "Control de esfínteres",
    ],
  },

  egreso: {
    titulo: "Cuando tu hija o hijo egrese de Rainbow, será capaz de:",
    items: [
      "Comunicarse en español e inglés.",
      "Resolver problemas.",
      "Trabajar en equipo.",
      "Expresar sus emociones.",
      "Ser autónomo.",
      "Tener pensamiento creativo.",
      "Cuidar su entorno.",
      "Mostrar empatía y respeto.",
    ],
  },

  nosotros: {
    titulo: "Quiénes somos",
    texto:
      "En Rainbow creemos que cada niño aprende a su propio ritmo. Nuestro objetivo es desarrollar pequeños felices, seguros y preparados para enfrentar nuevos retos mediante experiencias significativas, juego y aprendizaje bilingüe.",
    misionTitulo: "Misión",
    mision:
      "Formar niños felices, que se sientan capaces, amados y brillantes; que construyan su conocimiento a través de su experiencia y su propio descubrimiento, respetando sus etapas y protegiendo el ritmo de aprendizaje de cada uno.",
    visionTitulo: "Visión",
    vision:
      "Ser un espacio que dé a las niñas y los niños de nuestra ciudad las herramientas necesarias para lograr el éxito en las distintas etapas de su educación y en la vida diaria, con una enseñanza basada en el verdadero amor por la infancia.",
    valoresTitulo: "Nuestros valores",
    valores: [
      "Autonomía",
      "Libertad",
      "Disciplina",
      "Respeto",
      "Tolerancia",
      "Convivencia",
      "Sentido de pertenencia",
      "Civismo",
    ],
    maestrasTitulo: "Quién les da clase",
    maestras: [
      {
        nombre: "[[NOMBRE DE LA MAESTRA]]",
        rol: "[[DIRECTORA / MAESTRA]]",
        bio: "[[UNA O DOS FRASES: formación y años trabajando con preescolares]]",
      },
    ],
  },

  testimonios: {
    titulo: "Lo que dicen los papás",
    items: [
      {
        texto: "[[TESTIMONIO REAL DE UN PAPÁ O MAMÁ — pedir permiso antes de publicar]]",
        autor: "[[NOMBRE]]",
        detalle: "[[mamá de un alumno de Kinder 1]]",
      },
      {
        texto: "[[SEGUNDO TESTIMONIO REAL]]",
        autor: "[[NOMBRE]]",
        detalle: "[[papá de una alumna de Nido]]",
      },
    ],
  },

  faq: {
    titulo: "Preguntas frecuentes",
    items: [
      {
        pregunta: "¿Desde qué edad reciben niños?",
        respuesta:
          "Desde el año de edad y hasta los cuatro, en los grupos de Nido, Nido 1 y Kinder 1.",
      },
      {
        pregunta: "¿Cuál es el horario?",
        respuesta:
          "El ingreso es de 8:30 a 9:00 y las clases van de 9:00 a 13:00. Quien lo necesite puede quedarse en horario extendido hasta las 16:00.",
      },
      {
        pregunta: "¿Cuánto cuesta?",
        respuesta:
          "Te enviamos la lista completa del ciclo 2026-2027 —inscripción, colegiatura, uniformes y lonchera— en cuanto nos escribas. Déjanos tus datos en el formulario y te la mandamos.",
      },
      {
        pregunta: "¿Todo el día es en inglés?",
        respuesta:
          "Alrededor del 60% del día es en inglés y el 40% en español. Las dos lenguas conviven durante toda la jornada.",
      },
      {
        pregunta: "¿Mi hija o hijo necesita saber inglés para entrar?",
        respuesta:
          "No. La mayoría llega sin nada de inglés y lo va tomando del día a día, igual que aprendió el español.",
      },
      {
        pregunta: "¿Y si todavía usa pañal?",
        respuesta:
          "No es requisito dejar el pañal para entrar. El control de esfínteres es uno de nuestros programas y lo trabajamos junto con la familia.",
      },
      {
        pregunta: "¿Puedo conocer la escuela antes de inscribir?",
        respuesta: "[[SÍ O NO, Y CÓMO SE AGENDA LA VISITA]]",
      },
      {
        pregunta: "¿Qué papeles necesito para inscribir?",
        respuesta: "[[LISTA DE DOCUMENTOS: acta de nacimiento, CURP, cartilla, etc.]]",
      },
    ],
  },

  inscripcion: {
    eyebrow: "Inscripciones abiertas",
    titulo: "Aparta el lugar de tu hija o hijo",
    texto:
      "Llena los datos y te contactamos para agendar una visita y enviarte la lista de costos del ciclo. Contestamos el mismo día.",
  },

  formulario: {
    etiquetas: {
      tutor: "Nombre del padre, madre o tutor",
      telefono: "Teléfono o WhatsApp",
      correo: "Correo electrónico",
      nino: "Nombre de la niña o el niño",
      edad: "Edad",
      grupo: "Grupo que te interesa",
      horario: "Horario que les acomoda",
      mensaje: "¿Algo que debamos saber?",
    },
    placeholders: {
      telefono: "632 123 4567",
      correo: "nombre@correo.com",
    },
    opciones: {
      selecciona: "Selecciona",
      sinEspecificar: "No estoy seguro",
      anios: "años",
    },
    privacidad: {
      texto: "Acepto que usen mis datos para contactarme sobre la inscripción. Leí el",
      enlace: "aviso de privacidad",
    },
    botones: {
      enviar: "Enviar solicitud",
      enviando: "Enviando…",
    },
    errores: {
      generico: "No pudimos enviar tu solicitud.",
      red: "No pudimos enviar tu solicitud.",
      contactoAlterno: "Mientras tanto, puedes contactarnos directamente:",
    },
    obligatorios: "Los campos con asterisco son obligatorios.",
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
