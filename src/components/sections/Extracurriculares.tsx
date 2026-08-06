import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Extracurriculares() {
  const { extracurriculares } = site;
  return (
    <Seccion
      id="extracurriculares"
      fondo="maiz"
      eyebrow={extracurriculares.eyebrow}
      titulo={extracurriculares.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {extracurriculares.texto}
      </p>

      {/* Conjunto sin orden: sin numerar. Tarjetas compactas porque cada
          entrada es un nombre, no un párrafo. */}
      <ul className="flex flex-wrap gap-3">
        {extracurriculares.items.map((t) => (
          <li key={t}>
            <Tarjeta relleno="compacto">
              <span className="font-titulo text-lg font-semibold">{t}</span>
            </Tarjeta>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
