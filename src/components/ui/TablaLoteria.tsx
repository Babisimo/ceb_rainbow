import { site } from "@/content/site";
import { CartaLoteria } from "./CartaLoteria";

export function TablaLoteria() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {site.programa.cartas.map((c) => (
        <li key={c.numero}>
          <CartaLoteria
            numero={c.numero}
            es={c.es}
            en={c.en}
            figura={c.figura}
            color={c.color}
          />
        </li>
      ))}
    </ul>
  );
}
