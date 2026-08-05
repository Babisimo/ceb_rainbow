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
import { site } from "@/content/site";
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
  const honeypot = useRef<HTMLInputElement>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const { formulario, escuela } = site;

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
          website: honeypot.current?.value ?? "",
          transcurrido: Date.now() - iniciadoEn.current,
        }),
      });
      const cuerpo = await res.json();
      if (!res.ok || !cuerpo.ok) {
        setErrorEnvio(cuerpo.error ?? formulario.errores.generico);
        return;
      }
      router.push("/gracias");
    } catch {
      setErrorEnvio(formulario.errores.red);
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
        <input
          ref={honeypot}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Campo id="tutor" etiqueta={formulario.etiquetas.tutor} requerido error={errors.tutor?.message}>
        <input type="text" autoComplete="name" {...props("tutor")} {...register("tutor")} />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="telefono" etiqueta={formulario.etiquetas.telefono} requerido error={errors.telefono?.message}>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder={formulario.placeholders.telefono}
            {...props("telefono")}
            {...register("telefono")}
          />
        </Campo>

        <Campo id="correo" etiqueta={formulario.etiquetas.correo} requerido error={errors.correo?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder={formulario.placeholders.correo}
            {...props("correo")}
            {...register("correo")}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="nino" etiqueta={formulario.etiquetas.nino} requerido error={errors.nino?.message}>
          <input type="text" {...props("nino")} {...register("nino")} />
        </Campo>

        <Campo id="edad" etiqueta={formulario.etiquetas.edad} requerido error={errors.edad?.message}>
          <select {...props("edad")} {...register("edad", { valueAsNumber: true })} defaultValue="">
            <option value="" disabled>
              {formulario.opciones.selecciona}
            </option>
            {EDADES.map((e) => (
              <option key={e} value={e}>
                {e} {formulario.opciones.anios}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="experiencia" etiqueta={formulario.etiquetas.experiencia} error={errors.experiencia?.message}>
          <select {...props("experiencia")} {...register("experiencia")} defaultValue="">
            <option value="">{formulario.opciones.sinEspecificar}</option>
            {EXPERIENCIAS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="horario" etiqueta={formulario.etiquetas.horario} error={errors.horario?.message}>
          <select {...props("horario")} {...register("horario")} defaultValue="">
            <option value="">{formulario.opciones.sinEspecificar}</option>
            {HORARIOS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo id="mensaje" etiqueta={formulario.etiquetas.mensaje} error={errors.mensaje?.message}>
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
            {formulario.privacidad.texto}{" "}
            {/*
              Lo que evita que este clic también marque el checkbox es que <a href> es
              "contenido interactivo" según la especificación de HTML: el comportamiento
              de activación de <label> no reenvía el clic a su control cuando el objetivo
              es contenido interactivo. stopPropagation no cancela ese comportamiento nativo
              (para eso haría falta preventDefault, que aquí mataría la navegación del
              enlace); se deja solo como protección adicional contra un futuro onClick en
              algún ancestro.
            */}
            <a
              href="/aviso-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
              onClick={(e) => e.stopPropagation()}
            >
              {formulario.privacidad.enlace}
            </a>
            .<span aria-hidden="true"> *</span>
          </span>
        </label>
        {errors.privacidad && (
          <p id="privacidad-error" role="alert" className="mt-1 font-semibold">
            {errors.privacidad.message}
          </p>
        )}
      </div>

      {errorEnvio && (
        <div role="alert" className="rounded-carta border-2 border-tinta bg-durazno p-4 font-semibold">
          <p>{errorEnvio}</p>
          <p className="mt-2 font-normal">
            {formulario.errores.contactoAlterno} {escuela.telefono} — {escuela.correo}
          </p>
        </div>
      )}

      <Boton type="submit" disabled={isSubmitting}>
        {isSubmitting ? formulario.botones.enviando : formulario.botones.enviar}
      </Boton>

      <p className="text-sm">{formulario.obligatorios}</p>
    </form>
  );
}
