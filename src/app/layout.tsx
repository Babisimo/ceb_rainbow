import type { Metadata } from "next";
import { fredoka, sueEllen, figtree } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BotonWhatsApp } from "@/components/layout/BotonWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Inglés para niños en Magdalena de Kino",
    template: "%s · Inglés para niños",
  },
  description:
    "Clases de inglés para niñas y niños de 4 a 12 años en Magdalena de Kino, Sonora. Grupos pequeños, maestras certificadas y clase de prueba sin costo.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Inglés para niños en Magdalena de Kino",
    description:
      "Clases de inglés para niñas y niños de 4 a 12 años. Grupos pequeños en Magdalena de Kino, Sonora.",
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
