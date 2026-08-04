import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Metodo() {
  const { metodo } = site;
  return (
    <Seccion id="metodo" fondo="menta" titulo={metodo.titulo}>
      {/* Lista ordenada: una clase sí ocurre en este orden, así que la
          numeración carga información real. */}
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metodo.pasos.map((p, i) => (
          <li key={p.titulo}>
            <Tarjeta className="h-full">
              <span
                aria-hidden="true"
                className="font-titulo text-3xl font-bold text-teal"
              >
                {i + 1}
              </span>
              <h3 className="mt-1 text-xl">{p.titulo}</h3>
              <p className="mt-2 leading-relaxed">{p.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}
