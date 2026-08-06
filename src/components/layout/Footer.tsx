import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const { escuela } = site;
  return (
    <footer className="border-t-2 border-tinta bg-teal px-5 py-12 text-crema sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-titulo text-xl font-bold">{escuela.nombre}</p>
          <p className="mt-2">{escuela.ciudad}</p>
        </div>

        <div>
          <h2 className="font-titulo text-lg font-semibold">Contacto</h2>
          <ul className="mt-2 space-y-1">
            <li>{escuela.direccion}</li>
            <li>Tel. {escuela.telefono}</li>
            <li>{escuela.correo}</li>
            <li>{escuela.horarios}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-titulo text-lg font-semibold">Redes</h2>
          <ul className="mt-2 space-y-1">
            <li>Facebook: {escuela.facebook}</li>
            <li>
              Instagram:{" "}
              <a
                href={escuela.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {escuela.instagramUsuario}
              </a>
            </li>
          </ul>
          <Link
            href="/aviso-de-privacidad"
            className="mt-4 inline-block py-3 underline underline-offset-4"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
