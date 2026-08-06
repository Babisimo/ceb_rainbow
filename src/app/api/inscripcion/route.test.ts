import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const CLAVE = "clave-de-prueba";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 3,
  grupo: "kinder1",
  horario: "extendido",
  mensaje: "Quiero informes",
  privacidad: true,
  website: "",
  transcurrido: 5000, // más que MS_MINIMOS — pasa el control de tiempo
};

const pedir = (body: unknown) =>
  new Request("http://localhost/api/inscripcion", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

const pedirCrudo = (body: string) =>
  new Request("http://localhost/api/inscripcion", {
    method: "POST",
    body,
  });

beforeEach(() => {
  process.env.WEB3FORMS_ACCESS_KEY = CLAVE;
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
    expect(enviado.access_key).toBe(CLAVE);
    expect(enviado.nino).toBe("Sofía");
  });

  it("envía 'No especificado' cuando grupo y horario están ausentes", async () => {
    const { grupo: _g, horario: _h, ...sinOpcionales } = valido;
    await POST(pedir(sinOpcionales));
    const llamada = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const enviado = JSON.parse(llamada[1].body as string);
    expect(enviado.grupo).toBe("No especificado");
    expect(enviado.horario).toBe("No especificado");
  });

  it("traduce el grupo a su etiqueta antes de enviarlo", async () => {
    await POST(pedir(valido));
    const llamada = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const enviado = JSON.parse(llamada[1].body as string);
    expect(enviado.grupo).toBe("Kinder 1");
    expect(enviado.horario).toBe("Extendido (9:00 a 16:00)");
  });

  it("rechaza un payload inválido con 400 y no llama a Web3Forms", async () => {
    const res = await POST(pedir({ ...valido, correo: "malo" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza sin consentimiento de privacidad", async () => {
    const res = await POST(pedir({ ...valido, privacidad: false }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza cuando el honeypot viene lleno", async () => {
    const res = await POST(pedir({ ...valido, website: "http://spam.example" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza el honeypot cuando es un número", async () => {
    const res = await POST(pedir({ ...valido, website: 123 }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza el honeypot cuando es un objeto", async () => {
    const res = await POST(pedir({ ...valido, website: {} }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("acepta un envío con 5000ms transcurridos", async () => {
    const res = await POST(pedir({ ...valido, transcurrido: 5000 }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("rechaza envíos hechos en menos de 3 segundos", async () => {
    const res = await POST(pedir({ ...valido, transcurrido: 500 }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza cuando transcurrido está ausente", async () => {
    const { transcurrido: _transcurrido, ...sinTranscurrido } = valido;
    const res = await POST(pedir(sinTranscurrido));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza cuando transcurrido no es numérico", async () => {
    const res = await POST(pedir({ ...valido, transcurrido: "hace un rato" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza transcurrido negativo (desfase de reloj del cliente)", async () => {
    const res = await POST(pedir({ ...valido, transcurrido: -10000 }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza transcurrido enviado como cadena", async () => {
    const res = await POST(pedir({ ...valido, transcurrido: "5000" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza un cuerpo que no es JSON", async () => {
    const res = await POST(pedirCrudo("no soy json"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza un cuerpo JSON nulo sin lanzar", async () => {
    const res = await POST(pedirCrudo("null"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("rechaza un cuerpo JSON que es un arreglo sin lanzar", async () => {
    const res = await POST(pedirCrudo("[1,2,3]"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: expect.any(String) });
  });

  it("responde 502 si Web3Forms falla con un error HTTP", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("boom", { status: 500 })),
    );
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
    expect(await res.text()).not.toContain("boom");
  });

  it("responde 502 si Web3Forms responde 200 pero success:false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({ success: false, message: "Invalid access key" }),
          { status: 200 },
        ),
      ),
    );
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
    expect(await res.text()).not.toContain("Invalid access key");
  });

  it("responde 502 si falta la clave de acceso", async () => {
    delete process.env.WEB3FORMS_ACCESS_KEY;
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  describe("nunca devuelve la clave de acceso en la respuesta", () => {
    it("en 400 por validación inválida", async () => {
      const res = await POST(pedir({ ...valido, correo: "malo" }));
      expect(await res.text()).not.toContain(CLAVE);
    });

    it("en 400 por honeypot lleno", async () => {
      const res = await POST(pedir({ ...valido, website: "http://spam.example" }));
      expect(await res.text()).not.toContain(CLAVE);
    });

    it("en 400 por control de tiempo", async () => {
      const res = await POST(pedir({ ...valido, transcurrido: 500 }));
      expect(await res.text()).not.toContain(CLAVE);
    });

    it("en 502 por fallo de Web3Forms", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => new Response("boom", { status: 500 })),
      );
      const res = await POST(pedir(valido));
      expect(await res.text()).not.toContain(CLAVE);
    });

    it("en 502 por falta de clave de acceso", async () => {
      delete process.env.WEB3FORMS_ACCESS_KEY;
      const res = await POST(pedir(valido));
      expect(await res.text()).not.toContain(CLAVE);
    });

    it("en 200 exitoso", async () => {
      const res = await POST(pedir(valido));
      expect(await res.text()).not.toContain(CLAVE);
    });
  });
});
