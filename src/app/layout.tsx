import type { Metadata } from "next";
import { fredoka, sueEllen, figtree } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inglés para niños en Magdalena de Kino",
  description:
    "Clases de inglés para niñas y niños de 4 a 12 años en Magdalena de Kino, Sonora. Grupos pequeños y maestras certificadas.",
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
      <body>{children}</body>
    </html>
  );
}
