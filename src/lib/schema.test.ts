import { describe, expect, it } from "vitest";
import { inscripcionSchema } from "./schema";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 3,
  grupo: "kinder1",
  horario: "extendido",
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

  it("rechaza edades fuera de 1 a 4", () => {
    expect(inscripcionSchema.safeParse({ ...valido, edad: 0 }).success).toBe(false);
    expect(inscripcionSchema.safeParse({ ...valido, edad: 5 }).success).toBe(false);
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

  it("acepta un mensaje de exactamente 1000 caracteres", () => {
    const r = inscripcionSchema.safeParse({ ...valido, mensaje: "a".repeat(1000) });
    expect(r.success).toBe(true);
  });

  it("acepta las edades límite 1 y 4", () => {
    expect(inscripcionSchema.safeParse({ ...valido, edad: 1 }).success).toBe(true);
    expect(inscripcionSchema.safeParse({ ...valido, edad: 4 }).success).toBe(true);
  });

  it("rechaza la edad enviada como texto", () => {
    const r = inscripcionSchema.safeParse({ ...valido, edad: "3" });
    expect(r.success).toBe(false);
  });

  it("no deja escapar mensajes de error en inglés al faltar la privacidad", () => {
    const { privacidad: _privacidad, ...sinPrivacidad } = valido;
    const r = inscripcionSchema.safeParse(sinPrivacidad);
    expect(r.success).toBe(false);
    if (!r.success) {
      for (const issue of r.error.issues) {
        expect(issue.message).not.toMatch(/invalid|expected|required/i);
      }
    }
  });

  it("acepta grupo vacío y lo convierte en undefined", () => {
    const r = inscripcionSchema.safeParse({ ...valido, grupo: "" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.grupo).toBeUndefined();
  });

  it("acepta horario vacío y lo convierte en undefined", () => {
    const r = inscripcionSchema.safeParse({ ...valido, horario: "" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.horario).toBeUndefined();
  });

  it("acepta grupo y horario ausentes (undefined)", () => {
    const r = inscripcionSchema.safeParse({ ...valido, grupo: undefined, horario: undefined });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.grupo).toBeUndefined();
      expect(r.data.horario).toBeUndefined();
    }
  });

  it("rechaza un valor de grupo que no existe en el catálogo", () => {
    const r = inscripcionSchema.safeParse({ ...valido, grupo: "basura" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].message).toMatch(/opción válida/i);
    }
  });
});
