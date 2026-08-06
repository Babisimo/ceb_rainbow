import type { Metadata } from "next";
import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";

export const metadata: Metadata = {
  title: "Solicitud enviada",
  robots: { index: false },
};

export default function Gracias() {
  return (
    <main id="contenido" className="px-5 py-20 sm:px-8 md:py-32">
      <div className="mx-auto max-w-2xl rounded-carta border-2 border-tinta bg-maiz p-8 sombra-dura md:p-12">
        <p className="font-mano text-2xl text-teal">Listo</p>
        <h1 className="mt-2 text-4xl md:text-5xl">Recibimos tu solicitud</h1>
        <p className="mt-5 text-lg leading-relaxed">
          Te contactamos al teléfono o correo que dejaste para agendar una
          visita y enviarte la lista de costos del ciclo. Si tienes prisa,
          escríbenos directo al {site.escuela.telefono}.
        </p>
        <div className="mt-8">
          <Boton href="/">Volver al inicio</Boton>
        </div>
      </div>
    </main>
  );
}
