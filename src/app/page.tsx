import { Hero } from "@/components/sections/Hero";
import { Beneficios } from "@/components/sections/Beneficios";
import { Programa } from "@/components/sections/Programa";
import { Metodo } from "@/components/sections/Metodo";
import { Nosotros } from "@/components/sections/Nosotros";
import { Testimonios } from "@/components/sections/Testimonios";
import { Preguntas } from "@/components/sections/Preguntas";
import { Inscripcion } from "@/components/sections/Inscripcion";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Beneficios />
      <Programa />
      <Metodo />
      <Nosotros />
      <Testimonios />
      <Preguntas />
      <Inscripcion />
      <Contacto />
    </main>
  );
}
