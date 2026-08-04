import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";

export function Testimonios() {
  const { testimonios } = site;
  return (
    <Seccion id="testimonios" fondo="teal" titulo={testimonios.titulo}>
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonios.items.map((t) => (
          <li key={t.autor}>
            <figure className="h-full rounded-carta border-2 border-tinta bg-crema p-6 text-tinta sombra-dura">
              <blockquote className="text-lg leading-relaxed">
                {t.texto}
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-mano text-2xl">{t.autor}</span>
                <span className="block text-sm">{t.detalle}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
