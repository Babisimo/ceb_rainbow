import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Tarjeta({ className = "", children }: Props) {
  return (
    <div
      className={`rounded-carta border-2 border-tinta bg-crema p-6 sombra-dura ${className}`}
    >
      {children}
    </div>
  );
}
