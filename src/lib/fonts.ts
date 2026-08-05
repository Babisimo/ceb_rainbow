import { Fredoka, Sue_Ellen_Francisco, Figtree } from "next/font/google";

// Sustitutos libres de Irene Florentina y More Sugar.
// Para cambiar a las fuentes con licencia: reemplazar estas tres declaraciones
// por next/font/local apuntando a los .woff2 en /public/fonts.
// Las variables CSS (--fuente-titulo, --fuente-mano, --fuente-texto) NO cambian,
// así que ningún componente se toca.

// Fredoka es una fuente variable (wght 300–700). Sin `weight`, next/font
// descarga un solo archivo variable por subset. Declarar los pesos la obliga
// a bajar una instancia estática por peso — antes eran 8 archivos, de los
// cuales 400 y 500 no se usaban en ningún lado.
export const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--fuente-titulo",
  display: "swap",
});

// Sue Ellen Francisco es la única fuente libre que la dueña pidió por nombre.
// Se probó cambiarla por Caveat 700 (trazo más grueso, mejor altura-x, más
// afín al pincel del logo) y se descartó: la elección de la dueña manda.
export const sueEllen = Sue_Ellen_Francisco({
  subsets: ["latin"],
  weight: "400",
  variable: "--fuente-mano",
  display: "swap",
});

export const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--fuente-texto",
  display: "swap",
});
