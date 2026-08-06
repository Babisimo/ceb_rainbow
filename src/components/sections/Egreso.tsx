import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";

export function Egreso() {
  const { egreso } = site;
  return (
    // Sobre teal el texto es crema, a 4.6:1. Sin opacidad en ningún renglón:
    // no hay margen para bajarle.
    <Seccion id="egreso" fondo="teal" titulo={egreso.titulo}>
      <ul className="grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
        {egreso.items.map((i) => (
          <li key={i} className="flex gap-3 text-lg leading-relaxed">
            <span aria-hidden="true" className="font-titulo font-bold">
              ★
            </span>
            {i}
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
