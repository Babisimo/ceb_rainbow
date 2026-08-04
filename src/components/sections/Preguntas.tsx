import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";

export function Preguntas() {
  const { faq } = site;
  return (
    <Seccion id="preguntas" fondo="crema" titulo={faq.titulo}>
      <ul className="mx-auto max-w-3xl space-y-4">
        {faq.items.map((f) => (
          <li key={f.pregunta}>
            <details className="group rounded-carta border-2 border-tinta bg-crema sombra-dura open:bg-maiz">
              <summary className="cursor-pointer list-none px-6 py-4 font-titulo text-lg font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.pregunta}
                  <span
                    aria-hidden="true"
                    className="text-2xl transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="px-6 pb-5 leading-relaxed">{f.respuesta}</p>
            </details>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
