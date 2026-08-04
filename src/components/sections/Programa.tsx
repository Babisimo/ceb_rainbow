import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { TablaLoteria } from "@/components/ui/TablaLoteria";

export function Programa() {
  const { programa } = site;
  return (
    <Seccion
      id="programa"
      fondo="crema"
      eyebrow={programa.eyebrow}
      titulo={programa.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {programa.texto}
      </p>

      {/* Las cuatro habilidades. Esto es lo que un papá quiere saber:
          qué va a poder hacer su hijo que hoy no puede. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programa.habilidades.map((h) => (
          <li key={h.titulo}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{h.titulo}</h3>
              <p className="mt-2 leading-relaxed">{h.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>

      <h3 className="mb-2 mt-16 text-2xl sm:text-3xl">
        {programa.vocabularioTitulo}
      </h3>
      <p className="mb-8 max-w-prose text-lg leading-relaxed">
        {programa.vocabularioTexto}
      </p>
      <TablaLoteria />
      <p className="mt-6 font-mano text-2xl text-teal">{programa.pista}</p>
    </Seccion>
  );
}
