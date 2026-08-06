import type { Metadata } from "next";
import { fredoka, sueEllen, figtree } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BotonWhatsApp } from "@/components/layout/BotonWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CEB Rainbow · Preescolar bilingüe en Magdalena de Kino",
    template: "%s · CEB Rainbow",
  },
  description:
    "Centro Educativo Bilingüe Rainbow: preescolar para niñas y niños de 1 a 4 años en Magdalena de Kino, Sonora. Grupos reducidos, 60% del día en inglés, enfoque Montessori, Waldorf y Reggio Emilia.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "CEB Rainbow · Preescolar bilingüe en Magdalena de Kino",
    description:
      "Preescolar bilingüe de 1 a 4 años en Magdalena de Kino, Sonora. Donde cada pequeño aprende, juega y crece con amor.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-MX"
      className={`${fredoka.variable} ${sueEllen.variable} ${figtree.variable}`}
    >
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-carta focus:border-2 focus:border-tinta focus:bg-crema focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
