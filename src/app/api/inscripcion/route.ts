import { EXPERIENCIAS, HORARIOS, inscripcionSchema } from "@/lib/schema";

/** Un humano no llena este formulario en menos de 3 segundos. Un bot sí. */
const MS_MINIMOS = 3000;

const etiqueta = (
  lista: readonly { value: string; label: string }[],
  value: string | undefined,
) => lista.find((o) => o.value === value)?.label ?? "No especificado";

const malo = (error: string) =>
  Response.json({ ok: false, error }, { status: 400 });

const noDisponible = () =>
  Response.json(
    { ok: false, error: "No pudimos enviar tu solicitud." },
    { status: 502 },
  );

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return malo("No pudimos leer el formulario.");
  }

  if (typeof cuerpo !== "object" || cuerpo === null) {
    return malo("No pudimos leer el formulario.");
  }

  const { website, transcurrido, ...campos } = cuerpo as Record<string, unknown>;

  // Honeypot: campo oculto que solo un bot llena.
  if (website !== undefined && website !== "") {
    return malo("No pudimos procesar el envío.");
  }

  // Control de tiempo. Se mide el tiempo TRANSCURRIDO, calculado enteramente
  // en el cliente, para no depender de comparar contra el reloj del servidor
  // (un celular con la hora mal puesta nunca debe bloquear el envío).
  // Ausente, no numérico, no finito o negativo se trata como sospechoso.
  if (!Number.isFinite(transcurrido) || (transcurrido as number) < MS_MINIMOS) {
    return malo("Tómate un momento para revisar los datos y vuelve a enviar.");
  }

  const resultado = inscripcionSchema.safeParse(campos);
  if (!resultado.success) {
    return malo("Revisa los datos del formulario.");
  }

  const d = resultado.data;

  const clave = process.env.WEB3FORMS_ACCESS_KEY;
  if (!clave) {
    console.error("Falta WEB3FORMS_ACCESS_KEY en el entorno.");
    return noDisponible();
  }

  let respuesta: Response;
  try {
    respuesta = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        access_key: clave,
        subject: `Nueva inscripción: ${d.nino} (${d.edad} años)`,
        from_name: "Sitio web de la escuela",
        replyto: d.correo,
        tutor: d.tutor,
        telefono: d.telefono,
        correo: d.correo,
        nino: d.nino,
        edad: String(d.edad),
        experiencia: etiqueta(EXPERIENCIAS, d.experiencia),
        horario: etiqueta(HORARIOS, d.horario),
        mensaje: d.mensaje || "Sin mensaje",
      }),
    });
  } catch {
    return noDisponible();
  }

  const cuerpoW3 = await respuesta.json().catch(() => null);
  if (!respuesta.ok || (cuerpoW3 as { success?: unknown } | null)?.success !== true) {
    return noDisponible();
  }

  return Response.json({ ok: true });
}
