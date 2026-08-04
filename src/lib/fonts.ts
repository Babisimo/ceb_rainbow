import { Fredoka, Sue_Ellen_Francisco, Figtree } from "next/font/google";

// Sustitutos libres de Irene Florentina y More Sugar.
// Para cambiar a las fuentes con licencia: reemplazar estas tres declaraciones
// por next/font/local apuntando a los .woff2 en /public/fonts.
// Las variables CSS (--fuente-titulo, --fuente-mano, --fuente-texto) NO cambian,
// así que ningún componente se toca.

export const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--fuente-titulo",
  display: "swap",
});

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
