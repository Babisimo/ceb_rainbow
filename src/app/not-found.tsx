import { Boton } from "@/components/ui/Boton";

export default function NoEncontrado() {
  return (
    <main id="contenido" className="px-5 py-20 sm:px-8 md:py-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl">No encontramos esta página</h1>
        <p className="mt-4 text-lg">
          El enlace puede estar mal escrito o la página ya no existe.
        </p>
        <div className="mt-8">
          <Boton href="/">Ir al inicio</Boton>
        </div>
      </div>
    </main>
  );
}
