import type { ReactNode } from "react";

type Fondo = "crema" | "maiz" | "menta" | "teal";

const fondos: Record<Fondo, string> = {
  crema: "bg-crema text-tinta",
  maiz: "bg-maiz text-tinta",
  menta: "bg-menta text-tinta",
  teal: "bg-teal text-crema",
};

type Props = {
  id?: string;
  fondo?: Fondo;
  eyebrow?: string;
  titulo?: string;
  children: ReactNode;
};

export function Seccion({ id, fondo = "crema", eyebrow, titulo, children }: Props) {
  return (
    <section id={id} className={`${fondos[fondo]} px-5 py-16 sm:px-8 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-2 font-mano text-2xl">{eyebrow}</p>
        )}
        {titulo && (
          <h2 className="mb-10 text-3xl sm:text-4xl md:text-5xl">{titulo}</h2>
        )}
        {children}
      </div>
    </section>
  );
}
