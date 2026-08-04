import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Nosotros() {
  const { nosotros } = site;
  return (
    <Seccion id="nosotros" fondo="crema" titulo={nosotros.titulo}>
      <div className="grid gap-8 md:grid-cols-2">
        <p className="max-w-prose text-lg leading-relaxed">{nosotros.texto}</p>
        <ul className="space-y-5">
          {nosotros.maestras.map((m) => (
            <li key={m.nombre}>
              <Tarjeta>
                <h3 className="text-xl">{m.nombre}</h3>
                <p className="font-mano text-2xl text-teal">{m.rol}</p>
                <p className="mt-2 leading-relaxed">{m.bio}</p>
              </Tarjeta>
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
