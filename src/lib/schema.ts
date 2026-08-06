import { z } from "zod";

export const EDADES = [1, 2, 3, 4] as const;

export const GRUPOS = [
  { value: "nido", label: "Nido" },
  { value: "nido1", label: "Nido 1" },
  { value: "kinder1", label: "Kinder 1" },
] as const;

export const HORARIOS = [
  { value: "regular", label: "Regular (9:00 a 13:00)" },
  { value: "extendido", label: "Extendido (9:00 a 16:00)" },
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
      .min(1, "Recibimos niñas y niños a partir del año de edad.")
      .max(4, "Recibimos niñas y niños hasta los 4 años."),

    grupo: z.preprocess(
      vacioAIndefinido,
      z
        .enum(["nido", "nido1", "kinder1"], { message: "Selecciona una opción válida." })
        .optional()
    ),

    horario: z.preprocess(
      vacioAIndefinido,
      z
        .enum(["regular", "extendido"], { message: "Selecciona una opción válida." })
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
