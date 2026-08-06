import { site } from "@/content/site";

const MENSAJE_POR_OMISION =
  "Hola, quiero informes sobre las inscripciones en CEB Rainbow.";

/**
 * Construye el enlace wa.me. México lleva lada país 52.
 * Si el número todavía es un marcador, devuelve "#" para no generar
 * un enlace roto que parezca funcional.
 */
export function urlWhatsApp(mensaje: string = MENSAJE_POR_OMISION): string {
  const digitos = site.escuela.whatsapp.replace(/\D/g, "");
  if (digitos.length !== 10) return "#";
  return `https://wa.me/52${digitos}?text=${encodeURIComponent(mensaje)}`;
}
