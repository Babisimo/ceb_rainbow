# Diseño — Sitio web escuela de inglés (Magdalena de Kino, Sonora)

**Fecha:** 2026-08-03
**Estado:** Aprobado

## Propósito

Sitio web profesional en español para una escuela de inglés para niños de 4 a 12 años en
Magdalena de Kino, Sonora, México. El objetivo primario del sitio es la captación de
inscripciones: un formulario funcional que entrega los datos del prospecto a la dueña de la
escuela.

Éxito = un padre o tutor encuentra el sitio en su teléfono, entiende la propuesta en menos de
diez segundos, y envía el formulario o abre WhatsApp sin fricción.

## Restricciones

- Todo el contenido visible en español mexicano.
- Solo niños. Ninguna sección, imagen o copy dirigido a adultos.
- La dueña no tiene servidor ni conocimientos técnicos. El sitio debe desplegarse en hosting
  estático gratuito y el formulario debe funcionar sin backend propio.
- Conexiones móviles débiles en la región: peso de página bajo, sin dependencias pesadas.
- Los datos reales de la escuela (nombre, dirección, teléfono, horarios, redes) todavía no
  existen. Se construye con marcadores de posición evidentes, nunca con datos inventados que
  parezcan reales.

## Stack

- Next.js 15, App Router, TypeScript.
- Tailwind CSS v4. La paleta vive como tokens `@theme` en `globals.css`.
- `next/font/google` para las fuentes.
- `react-hook-form` + `zod` para el formulario.
- `vitest` para pruebas unitarias.

Se eligió Next.js sobre HTML estático por decisión del usuario, con la expectativa de que el
sitio crezca a multipágina.

## Arquitectura

### Estructura de directorios

```
pau_website/
├── docs/superpowers/specs/
├── marketing_sources/          (ya existe: paleta y fuentes)
├── public/images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    ← solo compone secciones
│   │   ├── globals.css                 ← tokens de paleta y tipografía
│   │   ├── gracias/page.tsx            ← confirmación post-envío
│   │   ├── aviso-de-privacidad/page.tsx
│   │   └── api/inscripcion/route.ts
│   ├── components/
│   │   ├── sections/   Hero Beneficios Programa Metodo Nosotros
│   │   │               Testimonios Faq Inscripcion Contacto
│   │   ├── layout/     Header Footer WhatsAppFab
│   │   ├── form/       InscripcionForm.tsx
│   │   └── ui/         Button Section Card Field
│   ├── content/site.ts                 ← toda la copia y los marcadores
│   └── lib/
│       ├── schema.ts                   ← esquema zod compartido
│       └── fonts.ts
└── .env.local.example
```

### Principio de aislamiento

Cada sección es un componente autocontenido que no recibe props de contenido: lee directamente
de `src/content/site.ts`. `page.tsx` no contiene texto, solo composición.

Esto hace que la migración a multipágina sea aditiva. Crear `app/programas/page.tsx` que
importe `<Programa />` no requiere tocar ningún componente existente.

### Fuente única de contenido

`src/content/site.ts` exporta un objeto tipado con toda la copia del sitio: nombre de la
escuela, datos de contacto, textos de cada sección, preguntas frecuentes, testimonios.

Los valores desconocidos se marcan con el prefijo `[[ ]]`, por ejemplo
`nombre: "[[NOMBRE DE LA ESCUELA]]"`. El marcador debe ser visible en pantalla para que sea
imposible publicar el sitio sin reemplazarlo.

## Formulario de inscripción

### Campos

| Campo | Tipo | Requerido |
|---|---|---|
| Nombre del padre, madre o tutor | texto | sí |
| Teléfono / WhatsApp | tel, 10 dígitos MX | sí |
| Correo electrónico | email | sí |
| Nombre del niño o niña | texto | sí |
| Edad del niño o niña | select 4–12 | sí |
| ¿Ha estudiado inglés antes? | select: no / un poco / sí | no |
| Horario preferido | select: mañana / tarde / sábado | no |
| Mensaje | textarea | no |
| Acepto el aviso de privacidad | checkbox | sí |
| `website` (honeypot) | hidden | — |

### Flujo

1. Cliente valida con `zod` vía `react-hook-form`. Mensajes de error en español, anunciados a
   lectores de pantalla con `aria-describedby` y `aria-invalid`.
2. `POST /api/inscripcion` con el payload en JSON.
3. El route handler **vuelve a validar** con el mismo esquema `zod`. La validación del cliente
   se trata como conveniencia de UX, nunca como control de seguridad.
4. Rechaza si el honeypot `website` trae valor, o si el formulario se envió en menos de tres
   segundos desde su montaje.
5. Reenvía a la API de Web3Forms con `WEB3FORMS_ACCESS_KEY` leída de variable de entorno del
   servidor. La clave nunca llega al navegador.
6. Respuesta 200 → el cliente navega a `/gracias`. Error → mensaje inline, el formulario
   conserva lo capturado.

### Privacidad

Los datos recabados corresponden a menores de edad. Aplica la Ley Federal de Protección de
Datos Personales en Posesión de los Particulares.

El sitio incluye `/aviso-de-privacidad` con la estructura legal requerida y marcadores para
que la dueña complete razón social, domicilio y responsable de datos. El checkbox del
formulario enlaza a esa página y es obligatorio.

Esto es un requisito, no un adorno. El formulario no se envía sin el consentimiento marcado.

### WhatsApp

Botón flotante en todas las páginas. Enlace `wa.me` con mensaje prellenado. Segundo canal de
contacto, no reemplaza al formulario.

## Diseño visual

### Paleta

Tomada de `marketing_sources/color_scheme.jpeg`.

| Rol | Color | Hex |
|---|---|---|
| Marca / navegación / pie | Bali Pool | `#037F71` |
| Llamado a la acción | Canned Tomato | `#EF6545` |
| Texto de cuerpo | Valentine Chocolate | `#422F0E` |
| Fondo | Crema | `#FDF8F0` |
| Acentos | Buttered Corn `#F7E9B2`, Beach Umbrella `#FFD094`, Baby Shower `#EA5E86`, Mint No Chip `#DDF2B8`, Bahamas Beach `#57B1A8`, Baby Lavender `#F9D4F8` | |

Contraste: texto blanco sobre `#EF6545` no alcanza 4.5:1. Los botones de llamado a la acción
usan texto `#422F0E` sobre tomate. Blanco sobre `#037F71` sí cumple y se usa libremente.

### Tipografía

Las fuentes solicitadas — Irene Florentina y More Sugar — son comerciales y no están en Google
Fonts. Sue Ellen Francisco sí lo está.

Se envía con sustitutos libres de vibra equivalente:

- Display: Baloo 2
- Acentos manuscritos: Sue Ellen Francisco
- Cuerpo: Nunito

Toda declaración de fuente pasa por `src/lib/fonts.ts`. Sustituir por los archivos `.woff2`
originales cuando se adquieran es un cambio localizado en ese archivo más un bloque
`@font-face`.

### Secciones de la landing

Hero → Beneficios → Programa → Método → Nosotros → Testimonios → Preguntas frecuentes →
Inscripción → Contacto y pie.

El programa se presenta como una oferta única para "niños de 4 a 12 años", sin niveles
separados, hasta conocer el currículo real.

## Pruebas

`vitest`, alcance deliberadamente estrecho:

- `lib/schema.ts` — acepta un payload válido; rechaza teléfono corto, edad fuera de 4–12,
  correo malformado, y consentimiento sin marcar.
- `api/inscripcion/route.ts` — responde 400 a payload inválido; responde 400 con honeypot
  lleno; llama a Web3Forms con payload válido (fetch simulado).

Sin pruebas end-to-end. El costo de mantenerlas supera el valor en un sitio de esta escala.

## Fuera de alcance

- Portal de alumnos, inicio de sesión, pagos en línea.
- Blog o gestor de contenido.
- Versión en inglés.
- Analítica y píxeles de seguimiento.
