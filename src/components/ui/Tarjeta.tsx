import type { ReactNode } from "react";

type Relleno = "normal" | "compacto";

// Prop en vez de sobrescribir p-6 desde className: dos utilidades de padding en
// la misma lista de clases no se resuelven por orden de escritura, sino por el
// orden en la hoja compilada, y eso no es predecible.
const rellenos: Record<Relleno, string> = {
  normal: "p-6",
  compacto: "px-4 py-3",
};

type Props = {
  className?: string;
  relleno?: Relleno;
  children: ReactNode;
};

// text-tinta es explícito a propósito: dentro de una <Seccion fondo="teal"> el
// color heredado sería crema, y la tarjeta quedaría crema sobre crema.
export function Tarjeta({ className = "", relleno = "normal", children }: Props) {
  return (
    <div
      className={`rounded-carta border-2 border-tinta bg-crema ${rellenos[relleno]} text-tinta sombra-dura ${className}`}
    >
      {children}
    </div>
  );
}
