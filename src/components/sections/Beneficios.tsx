import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Beneficios() {
  const { beneficios } = site;
  return (
    <Seccion id="beneficios" fondo="maiz" titulo={beneficios.titulo}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {beneficios.items.map((b) => (
          <li key={b.titulo}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{b.titulo}</h3>
              <p className="mt-2 leading-relaxed">{b.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
