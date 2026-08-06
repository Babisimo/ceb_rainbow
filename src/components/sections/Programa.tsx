import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { TablaLoteria } from "@/components/ui/TablaLoteria";

export function Programa() {
  const { programa } = site;
  return (
    <Seccion
      id="programa"
      fondo="menta"
      eyebrow={programa.eyebrow}
      titulo={programa.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {programa.texto}
      </p>

      {/* Conjunto sin orden: sin numerar. Las áreas se cruzan entre sí, no se
          cursan una tras otra. */}
      <ul className="flex flex-wrap gap-3">
        {programa.areas.map((a) => (
          <li key={a}>
            <Tarjeta relleno="compacto">
              <span className="font-titulo text-lg font-semibold">{a}</span>
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
