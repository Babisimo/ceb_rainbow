"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import {
  EDADES,
  EXPERIENCIAS,
  HORARIOS,
  inscripcionSchema,
  type Inscripcion,
} from "@/lib/schema";
import { Campo, controlBase } from "@/components/ui/Campo";
import { Boton } from "@/components/ui/Boton";

/**
 * Los <select> de experiencia/horario usan z.preprocess ("" -> undefined), lo que
 * hace que el tipo de ENTRADA del schema (antes de parsear) sea distinto del tipo
 * de SALIDA (Inscripcion). react-hook-form debe registrarse con el tipo de entrada;
 * el resolver ya se encarga de entregar el tipo de salida en el callback de submit.
 */
type ValoresFormulario = z.input<typeof inscripcionSchema>;

export function FormularioInscripcion() {
  const router = useRouter();
  const iniciadoEn = useRef(Date.now());
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValoresFormulario, unknown, Inscripcion>({
    resolver: zodResolver(inscripcionSchema),
    mode: "onBlur",
  });

  const enviar = handleSubmit(async (datos) => {
    setErrorEnvio(null);
    try {
      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...datos,
          website: "",
          iniciadoEn: iniciadoEn.current,
        }),
      });
      const cuerpo = await res.json();
      if (!res.ok || !cuerpo.ok) {
        setErrorEnvio(cuerpo.error ?? "No pudimos enviar tu solicitud.");
        return;
      }
      router.push("/gracias");
    } catch {
      setErrorEnvio(
        "No pudimos enviar tu solicitud. Revisa tu conexión o escríbenos por WhatsApp.",
      );
    }
  });

  const props = (nombre: keyof ValoresFormulario) => ({
    id: nombre,
    className: controlBase,
    "aria-invalid": errors[nombre] ? true : undefined,
    "aria-describedby": errors[nombre] ? `${nombre}-error` : undefined,
  });

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      {/* Trampa para bots. Nadie que use el sitio lo ve ni lo tabula. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Campo id="tutor" etiqueta="Nombre del padre, madre o tutor" requerido error={errors.tutor?.message}>
        <input type="text" autoComplete="name" {...props("tutor")} {...register("tutor")} />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="telefono" etiqueta="Teléfono o WhatsApp" requerido error={errors.telefono?.message}>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="632 123 4567"
            {...props("telefono")}
            {...register("telefono")}
          />
        </Campo>

        <Campo id="correo" etiqueta="Correo electrónico" requerido error={errors.correo?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            {...props("correo")}
            {...register("correo")}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="nino" etiqueta="Nombre de la niña o el niño" requerido error={errors.nino?.message}>
          <input type="text" {...props("nino")} {...register("nino")} />
        </Campo>

        <Campo id="edad" etiqueta="Edad" requerido error={errors.edad?.message}>
          <select {...props("edad")} {...register("edad", { valueAsNumber: true })} defaultValue="">
            <option value="" disabled>
              Selecciona
            </option>
            {EDADES.map((e) => (
              <option key={e} value={e}>
                {e} años
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="experiencia" etiqueta="¿Ha estudiado inglés antes?" error={errors.experiencia?.message}>
          <select {...props("experiencia")} {...register("experiencia")} defaultValue="">
            <option value="">Sin especificar</option>
            {EXPERIENCIAS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="horario" etiqueta="Horario que les acomoda" error={errors.horario?.message}>
          <select {...props("horario")} {...register("horario")} defaultValue="">
            <option value="">Sin especificar</option>
            {HORARIOS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo id="mensaje" etiqueta="¿Algo que debamos saber?" error={errors.mensaje?.message}>
        <textarea rows={4} {...props("mensaje")} {...register("mensaje")} />
      </Campo>

      <div>
        <label htmlFor="privacidad" className="flex items-start gap-3">
          <input
            id="privacidad"
            type="checkbox"
            className="mt-1 h-6 w-6 shrink-0 rounded border-2 border-tinta accent-teal"
            aria-invalid={errors.privacidad ? true : undefined}
            aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
            {...register("privacidad")}
          />
          <span>
            Acepto que usen mis datos para contactarme sobre las clases. Leí el{" "}
            <a href="/aviso-de-privacidad" target="_blank" className="underline underline-offset-4">
              aviso de privacidad
            </a>
            .<span aria-hidden="true"> *</span>
          </span>
        </label>
        {errors.privacidad && (
          <p id="privacidad-error" role="alert" className="mt-1 text-sm font-semibold">
            {errors.privacidad.message}
          </p>
        )}
      </div>

      {errorEnvio && (
        <p role="alert" className="rounded-carta border-2 border-tinta bg-durazno p-4 font-semibold">
          {errorEnvio}
        </p>
      )}

      <Boton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </Boton>

      <p className="text-sm">
        Los campos con <span aria-hidden="true">*</span> son obligatorios.
      </p>
    </form>
  );
}
