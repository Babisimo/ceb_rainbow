import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variante = "primario" | "secundario" | "fantasma";

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-carta " +
  "border-2 border-tinta px-6 py-3 font-titulo text-base font-semibold " +
  "transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] " +
  "motion-reduce:transition-none";

// ámbar sobre tinta = 9.1:1. teal con texto crema = 4.6:1. Ambos pasan AA.
const variantes: Record<Variante, string> = {
  primario: "bg-ambar text-tinta sombra-dura hover:bg-naranja",
  secundario: "bg-teal text-crema sombra-dura",
  fantasma: "bg-crema text-tinta sombra-dura-sm hover:bg-maiz",
};

type Base = {
  variante?: Variante;
  children: ReactNode;
};

type PropsBoton = Base &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type PropsEnlace = Base &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

type Props = PropsBoton | PropsEnlace;

export function Boton({ variante = "primario", children, ...props }: Props) {
  const clases = `${base} ${variantes[variante]}`;

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const externo = href.startsWith("http");
    return (
      <Link
        href={href}
        className={clases}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { href: _href, ...rest } = props;
  return (
    <button className={clases} {...rest}>
      {children}
    </button>
  );
}
