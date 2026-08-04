import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { FormularioInscripcion } from "@/components/form/FormularioInscripcion";

export function Inscripcion() {
  const { inscripcion } = site;
  return (
    <Seccion
      id="inscripcion"
      fondo="maiz"
      eyebrow={inscripcion.eyebrow}
      titulo={inscripcion.titulo}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <p className="max-w-prose text-lg leading-relaxed">{inscripcion.texto}</p>
        <div className="rounded-carta border-2 border-tinta bg-crema p-6 sombra-dura sm:p-8">
          <FormularioInscripcion />
        </div>
      </div>
    </Seccion>
  );
}
