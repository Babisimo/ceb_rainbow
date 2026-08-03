import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 7,
  experiencia: "nada",
  horario: "tarde",
  mensaje: "Quiero informes",
  privacidad: true,
  website: "",
  iniciadoEn: 0, // hace mucho — pasa el control de tiempo
};

const pedir = (body: unknown) =>
  new Request("http://localhost/api/inscripcion", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  process.env.WEB3FORMS_ACCESS_KEY = "clave-de-prueba";
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/inscripcion", () => {
  it("acepta un envío válido y responde 200", async () => {
    const res = await POST(pedir(valido));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("reenvía a Web3Forms con la clave del servidor", async () => {
    await POST(pedir(valido));
    const llamada = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(llamada[0]).toBe("https://api.web3forms.com/submit");
    const enviado = JSON.parse(llamada[1].body as string);
    expect(enviado.access_key).toBe("clave-de-prueba");
    expect(enviado.nino).toBe("Sofía");
  });

  it("rechaza un payload inválido con 400 y no llama a Web3Forms", async () => {
    const res = await POST(pedir({ ...valido, correo: "malo" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza sin consentimiento de privacidad", async () => {
    const res = await POST(pedir({ ...valido, privacidad: false }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza cuando el honeypot viene lleno", async () => {
    const res = await POST(pedir({ ...valido, website: "http://spam.example" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza envíos hechos en menos de 3 segundos", async () => {
    const res = await POST(pedir({ ...valido, iniciadoEn: Date.now() - 500 }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza un cuerpo que no es JSON", async () => {
    const res = await POST(
      new Request("http://localhost/api/inscripcion", {
        method: "POST",
        body: "no soy json",
      }),
    );
    expect(res.status).toBe(400);
  });

  it("responde 502 si Web3Forms falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("boom", { status: 500 })),
    );
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
  });

  it("responde 502 si falta la clave de acceso", async () => {
    delete process.env.WEB3FORMS_ACCESS_KEY;
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("nunca devuelve la clave de acceso en la respuesta", async () => {
    const res = await POST(pedir(valido));
    const texto = await res.text();
    expect(texto).not.toContain("clave-de-prueba");
  });
});
