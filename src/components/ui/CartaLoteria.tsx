"use client";

import { useState } from "react";
import { FiguraLoteria } from "./FiguraLoteria";

const fondos: Record<string, string> = {
  maiz: "bg-maiz",
  cielo: "bg-cielo",
  menta: "bg-menta",
  lavanda: "bg-lavanda",
  turquesa: "bg-turquesa",
  durazno: "bg-durazno",
  ambar: "bg-ambar",
};

type Props = {
  numero: number;
  es: string;
  en: string;
  figura: string;
  color: string;
};

export function CartaLoteria({ numero, es, en, figura, color }: Props) {
  const [volteada, setVolteada] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={volteada}
      onClick={() => setVolteada((v) => !v)}
      onMouseEnter={() => setVolteada(true)}
      onMouseLeave={() => setVolteada(false)}
      className="group relative block aspect-[3/4] w-full rounded-carta border-2 border-tinta sombra-dura focus-visible:outline-3"
    >
      {/* Cara: español */}
      <span
        className={`absolute inset-0 flex flex-col items-center justify-center rounded-[calc(var(--radius-carta)-2px)] ${fondos[color] ?? "bg-maiz"} transition-opacity duration-200 motion-reduce:duration-0 ${
          volteada ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="absolute left-2 top-1 font-titulo text-sm font-bold text-tinta">
          {numero}
        </span>
        <FiguraLoteria nombre={figura} />
        <span className="absolute inset-x-0 bottom-0 rounded-b-[calc(var(--radius-carta)-2px)] border-t-2 border-tinta bg-crema px-1 py-1.5 font-titulo text-sm font-semibold text-tinta">
          {es}
        </span>
      </span>

      {/* Reverso: inglés. Tomate solo con texto de 24px o más. */}
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-[calc(var(--radius-carta)-2px)] bg-tomate px-2 transition-opacity duration-200 motion-reduce:duration-0 ${
          volteada ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-titulo text-2xl font-bold text-tinta">{en}</span>
      </span>
    </button>
  );
}
