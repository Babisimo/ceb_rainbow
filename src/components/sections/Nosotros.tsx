import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Nosotros() {
  const { nosotros } = site;
  return (
    <Seccion id="nosotros" fondo="crema" titulo={nosotros.titulo}>
      <p className="-mt-4 mb-10 max-w-prose text-lg leading-relaxed">
        {nosotros.texto}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Tarjeta>
          <h3 className="text-xl">{nosotros.misionTitulo}</h3>
          <p className="mt-2 leading-relaxed">{nosotros.mision}</p>
        </Tarjeta>
        <Tarjeta>
          <h3 className="text-xl">{nosotros.visionTitulo}</h3>
          <p className="mt-2 leading-relaxed">{nosotros.vision}</p>
        </Tarjeta>
      </div>

      <h3 className="mb-4 mt-12 text-2xl sm:text-3xl">
        {nosotros.valoresTitulo}
      </h3>
      {/* Conjunto sin orden: sin numerar. */}
      <ul className="flex flex-wrap gap-3">
        {nosotros.valores.map((v) => (
          <li key={v}>
            <Tarjeta relleno="compacto">
              <span className="font-titulo text-lg font-semibold">{v}</span>
            </Tarjeta>
          </li>
        ))}
      </ul>

      <h3 className="mb-4 mt-12 text-2xl sm:text-3xl">
        {nosotros.maestrasTitulo}
      </h3>
      <ul className="grid gap-5 sm:grid-cols-2">
        {nosotros.maestras.map((m) => (
          <li key={m.nombre}>
            <Tarjeta className="h-full">
              <h4 className="font-titulo text-xl font-semibold">{m.nombre}</h4>
              <p className="font-mano text-2xl text-teal">{m.rol}</p>
              <p className="mt-2 leading-relaxed">{m.bio}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
