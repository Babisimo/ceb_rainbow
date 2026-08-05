import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

// text-tinta es explícito a propósito: dentro de una <Seccion fondo="teal"> el
// color heredado sería crema, y la tarjeta quedaría crema sobre crema.
export function Tarjeta({ className = "", children }: Props) {
  return (
    <div
      className={`rounded-carta border-2 border-tinta bg-crema p-6 text-tinta sombra-dura ${className}`}
    >
      {children}
    </div>
  );
}
