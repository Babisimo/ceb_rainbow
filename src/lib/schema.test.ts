import { describe, expect, it } from "vitest";
import { inscripcionSchema } from "./schema";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 7,
  experiencia: "nada",
  horario: "tarde",
  mensaje: "",
  privacidad: true,
};

describe("inscripcionSchema", () => {
  it("acepta un envío válido", () => {
    const r = inscripcionSchema.safeParse(valido);
    expect(r.success).toBe(true);
  });

  it("acepta el teléfono con espacios, guiones y paréntesis", () => {
    const r = inscripcionSchema.safeParse({
      ...valido,
      telefono: "(632) 123-45 67",
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.telefono).toBe("6321234567");
  });

  it("rechaza un teléfono de menos de 10 dígitos", () => {
    const r = inscripcionSchema.safeParse({ ...valido, telefono: "63212345" });
    expect(r.success).toBe(false);
  });

  it("rechaza un teléfono de más de 10 dígitos", () => {
    const r = inscripcionSchema.safeParse({ ...valido, telefono: "521234567890" });
    expect(r.success).toBe(false);
  });

  it("rechaza un correo mal formado", () => {
    const r = inscripcionSchema.safeParse({ ...valido, correo: "maria@" });
    expect(r.success).toBe(false);
  });

  it("rechaza edades fuera de 4 a 12", () => {
    expect(inscripcionSchema.safeParse({ ...valido, edad: 3 }).success).toBe(false);
    expect(inscripcionSchema.safeParse({ ...valido, edad: 13 }).success).toBe(false);
  });

  it("rechaza el envío sin aceptar el aviso de privacidad", () => {
    const r = inscripcionSchema.safeParse({ ...valido, privacidad: false });
    expect(r.success).toBe(false);
  });

  it("rechaza nombres vacíos o de un solo carácter", () => {
    expect(inscripcionSchema.safeParse({ ...valido, tutor: "" }).success).toBe(false);
    expect(inscripcionSchema.safeParse({ ...valido, nino: "A" }).success).toBe(false);
  });

  it("da mensajes de error en español", () => {
    const r = inscripcionSchema.safeParse({ ...valido, correo: "no-es-correo" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].message).toMatch(/correo/i);
    }
  });

  it("recorta espacios de los nombres", () => {
    const r = inscripcionSchema.safeParse({ ...valido, tutor: "  María  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.tutor).toBe("María");
  });

  it("rechaza un mensaje larguísimo", () => {
    const r = inscripcionSchema.safeParse({ ...valido, mensaje: "a".repeat(1001) });
    expect(r.success).toBe(false);
  });
});
