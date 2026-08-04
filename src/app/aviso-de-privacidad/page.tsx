import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
};

export default function AvisoDePrivacidad() {
  const { escuela, privacidad } = site;

  return (
    <main id="contenido" className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-3xl space-y-6 leading-relaxed">
        <h1 className="text-4xl md:text-5xl">Aviso de privacidad</h1>

        <p>
          {privacidad.razonSocial}, con domicilio en {privacidad.domicilio}, es
          responsable del tratamiento de sus datos personales conforme a la Ley
          Federal de Protección de Datos Personales en Posesión de los
          Particulares.
        </p>

        <h2 className="pt-4 text-2xl">Qué datos recabamos</h2>
        <p>
          A través del formulario de inscripción recabamos el nombre del padre,
          madre o tutor, teléfono, correo electrónico, y el nombre y la edad de
          la niña o el niño que se desea inscribir. Los datos de menores de edad
          se recaban únicamente a través de su padre, madre o tutor.
        </p>

        <h2 className="pt-4 text-2xl">Para qué los usamos</h2>
        <p>
          Únicamente para contactarle sobre las clases, agendar una clase de
          prueba, y darle seguimiento a su solicitud de inscripción. No usamos
          estos datos con fines publicitarios ni los compartimos con terceros,
          salvo el proveedor de correo que nos entrega el mensaje del
          formulario.
        </p>

        <h2 className="pt-4 text-2xl">Derechos ARCO</h2>
        <p>
          Puede solicitar el acceso, rectificación, cancelación u oposición al
          tratamiento de sus datos escribiendo a {privacidad.correoContacto}.
          Responderemos su solicitud en los plazos que marca la ley.
        </p>

        <h2 className="pt-4 text-2xl">Cambios a este aviso</h2>
        <p>
          Cualquier cambio a este aviso se publicará en esta misma página.
        </p>

        <p className="pt-4">
          {escuela.nombre} &middot; {escuela.ciudad}
        </p>
      </div>
    </main>
  );
}
