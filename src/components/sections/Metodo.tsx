import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Metodo() {
  const { metodo } = site;
  return (
    <Seccion
      id="metodo"
      fondo="crema"
      eyebrow={metodo.eyebrow}
      titulo={metodo.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {metodo.texto}
      </p>

      {/* Lista sin numerar: las cinco metodologías conviven en el mismo día,
          no son pasos que ocurran uno después de otro. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metodo.items.map((m) => (
          <li key={m.titulo}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{m.titulo}</h3>
              <p className="mt-2 leading-relaxed">{m.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
