import { z } from "zod";

export const EDADES = [4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export const EXPERIENCIAS = [
  { value: "nada", label: "No ha estudiado inglés" },
  { value: "poco", label: "Un poco, en la escuela" },
  { value: "si", label: "Sí, ha tomado clases antes" },
] as const;

export const HORARIOS = [
  { value: "manana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "sabado", label: "Sábado" },
] as const;

/** Deja solo dígitos: "(632) 123-45 67" -> "6321234567" */
const soloDigitos = (v: string) => v.replace(/\D/g, "");

/** "" (select sin elegir) -> undefined, para que .optional() lo acepte. */
const vacioAIndefinido = (v: unknown) => (v === "" ? undefined : v);

export const inscripcionSchema = z.object(
  {
    tutor: z
      .string({ message: "Escribe el nombre del padre, madre o tutor." })
      .trim()
      .min(2, "Escribe el nombre del padre, madre o tutor.")
      .max(80, "El nombre es demasiado largo."),

    telefono: z
      .string({
        message: "El teléfono debe tener 10 dígitos, con lada. Ejemplo: 632 123 4567",
      })
      .transform(soloDigitos)
      .refine((v) => v.length === 10, {
        message: "El teléfono debe tener 10 dígitos, con lada. Ejemplo: 632 123 4567",
      }),

    correo: z
      .string({ message: "Escribe un correo válido. Ejemplo: nombre@correo.com" })
      .trim()
      .pipe(z.email("Escribe un correo válido. Ejemplo: nombre@correo.com")),

    nino: z
      .string({ message: "Escribe el nombre de la niña o el niño." })
      .trim()
      .min(2, "Escribe el nombre de la niña o el niño.")
      .max(80, "El nombre es demasiado largo."),

    edad: z
      .number({ message: "Selecciona la edad." })
      .int("Selecciona una edad válida.")
      .min(4, "Damos clases a partir de los 4 años.")
      .max(12, "Damos clases hasta los 12 años."),

    experiencia: z.preprocess(
      vacioAIndefinido,
      z
        .enum(["nada", "poco", "si"], { message: "Selecciona una opción válida." })
        .optional()
    ),

    horario: z.preprocess(
      vacioAIndefinido,
      z
        .enum(["manana", "tarde", "sabado"], { message: "Selecciona una opción válida." })
        .optional()
    ),

    mensaje: z
      .string({ message: "El mensaje es demasiado largo." })
      .trim()
      .max(1000, "El mensaje es demasiado largo.")
      .optional(),

    privacidad: z
      .boolean({ message: "Necesitamos tu consentimiento para poder contactarte." })
      .refine((v) => v === true, {
        message: "Necesitamos tu consentimiento para poder contactarte.",
      }),
  },
  { message: "Revisa los datos del formulario." }
);

export type Inscripcion = z.infer<typeof inscripcionSchema>;
