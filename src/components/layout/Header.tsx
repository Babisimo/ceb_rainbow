import Link from "next/link";
import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";

const enlaces = [
  { href: "#programa", texto: "Programa" },
  { href: "#metodo", texto: "Método" },
  { href: "#nosotros", texto: "Nosotros" },
  { href: "#preguntas", texto: "Preguntas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-tinta bg-teal text-crema">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* truncate es a propósito: si el nombre real de la escuela es muy
            largo, se recorta con puntos suspensivos en teléfonos angostos.
            Revisar que se vea bien al reemplazar el marcador. */}
        <Link
          href="/"
          className="min-w-0 truncate font-titulo text-base font-bold sm:text-xl"
        >
          {site.escuela.nombre}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="inline-block rounded px-2 py-3 underline-offset-4 hover:underline"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0">
          <Boton href="#inscripcion" variante="primario">
            Inscribir
          </Boton>
        </div>
      </div>
    </header>
  );
}
