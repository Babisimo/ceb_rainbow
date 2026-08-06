import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Grupos() {
  const { grupos } = site;
  return (
    <Seccion
      id="grupos"
      fondo="crema"
      eyebrow={grupos.eyebrow}
      titulo={grupos.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {grupos.texto}
      </p>

      {/* Sin numerar: los tres grupos son un conjunto, no una secuencia de pasos. */}
      <ul className="grid gap-5 sm:grid-cols-3">
        {grupos.items.map((g) => (
          <li key={g.nombre}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{g.nombre}</h3>
              <p className="mt-2 font-mano text-2xl text-teal">{g.edades}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-5 md:grid-cols-[1.5fr_1fr]">
        <Tarjeta>
          <h3 className="text-xl">{grupos.horarioTitulo}</h3>
          {/* Ordenada porque el día sí ocurre en este orden, y la hora —no un
              número inventado— es lo que marca cada renglón. */}
          <ol className="mt-3 space-y-2">
            {grupos.horario.map((h) => (
              <li key={h.hora} className="flex flex-wrap gap-x-3 leading-relaxed">
                <span className="font-titulo font-semibold text-teal">{h.hora}</span>
                <span>{h.texto}</span>
              </li>
            ))}
          </ol>
        </Tarjeta>

        <Tarjeta>
          <h3 className="text-xl">{grupos.idiomasTitulo}</h3>
          <dl className="mt-3 flex gap-8">
            {grupos.idiomas.map((i) => (
              <div key={i.idioma}>
                <dt className="sr-only">{i.idioma}</dt>
                <dd className="font-titulo text-3xl font-bold text-teal">
                  {i.porcentaje}
                </dd>
                <p className="leading-relaxed">{i.idioma}</p>
              </div>
            ))}
          </dl>
        </Tarjeta>
      </div>
    </Seccion>
  );
}
