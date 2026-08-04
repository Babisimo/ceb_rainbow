import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "fantasma";

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-carta " +
  "border-2 border-tinta px-6 py-3 font-titulo text-base font-600 " +
  "transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] " +
  "motion-reduce:transition-none";

// ámbar sobre tinta = 9.1:1. teal con texto crema = 4.6:1. Ambos pasan AA.
const variantes: Record<Variante, string> = {
  primario: "bg-ambar text-tinta sombra-dura hover:bg-naranja",
  secundario: "bg-teal text-crema sombra-dura",
  fantasma: "bg-crema text-tinta sombra-dura-sm hover:bg-maiz",
};

type Props = {
  variante?: Variante;
  href?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Boton({
  variante = "primario",
  href,
  children,
  ...rest
}: Props) {
  const clases = `${base} ${variantes[variante]}`;

  if (href) {
    const externo = href.startsWith("http");
    return (
      <Link
        href={href}
        className={clases}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={clases} {...rest}>
      {children}
    </button>
  );
}
