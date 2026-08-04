import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { Boton } from "@/components/ui/Boton";
import { urlWhatsApp } from "@/lib/whatsapp";

export function Contacto() {
  const { escuela, contacto, hero } = site;
  const wa = urlWhatsApp();

  return (
    <Seccion id="contacto" fondo="menta" titulo={contacto.titulo}>
      <div className="grid gap-6 md:grid-cols-2">
        <Tarjeta>
          <dl className="space-y-3">
            <div>
              <dt className="font-titulo font-semibold">
                {contacto.etiquetaDireccion}
              </dt>
              <dd>{escuela.direccion}</dd>
              <dd>{escuela.ciudad}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">
                {contacto.etiquetaTelefono}
              </dt>
              <dd>{escuela.telefono}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">
                {contacto.etiquetaCorreo}
              </dt>
              <dd>{escuela.correo}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">
                {contacto.etiquetaHorario}
              </dt>
              <dd>{escuela.horarios}</dd>
            </div>
          </dl>
          {wa !== "#" && (
            <div className="mt-6">
              <Boton href={wa} variante="secundario">
                {hero.ctaSecundario}
              </Boton>
            </div>
          )}
        </Tarjeta>

        {/* Mapa: pegar el iframe de Google Maps cuando exista la dirección real. */}
        <div className="flex min-h-[16rem] items-center justify-center rounded-carta border-2 border-dashed border-tinta bg-crema p-6 text-center sombra-dura">
          <p>
            Mapa de Google. Pegar aquí el <code>iframe</code> de
            &laquo;Compartir &rsaquo; Insertar un mapa&raquo;.
          </p>
        </div>
      </div>
    </Seccion>
  );
}
