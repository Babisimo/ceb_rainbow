import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";
import { urlWhatsApp } from "@/lib/whatsapp";

export function Hero() {
  const { hero } = site;
  const wa = urlWhatsApp();

  return (
    <section className="bg-crema px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="font-mano text-2xl text-teal">{hero.eyebrow}</p>
          <h1 className="mt-2 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {hero.titulo}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed">
            {hero.subtitulo}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Boton href="#inscripcion">{hero.ctaPrimario}</Boton>
            {wa !== "#" && (
              <Boton href={wa} variante="secundario">
                {hero.ctaSecundario}
              </Boton>
            )}
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t-2 border-tinta pt-6">
            {hero.datos.map((d) => (
              <div key={d.etiqueta}>
                <dt className="sr-only">{d.etiqueta}</dt>
                <dd className="font-titulo text-3xl font-bold text-teal">
                  {d.valor}
                </dd>
                <p className="text-sm">{d.etiqueta}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Espacio para la foto real de la escuela. Reemplazar el div por
            <Image src="/images/salon.jpg" alt={hero.imagenAlt} ... /> */}
        <div className="aspect-[4/3] rounded-carta border-2 border-dashed border-tinta bg-maiz p-6 sombra-dura">
          <p className="font-mano text-2xl">Foto de la escuela</p>
          <p className="mt-2 text-sm">{hero.imagenAlt}</p>
          <p className="mt-4 text-sm">
            Guardar en <code>public/images/</code> y cambiar este bloque por
            un <code>next/image</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
