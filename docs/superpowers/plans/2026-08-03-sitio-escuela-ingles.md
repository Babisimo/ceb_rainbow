# Sitio escuela de inglés — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Spanish-language marketing site for a children's English school in Magdalena de Kino, Sonora, whose primary job is delivering enrollment leads to the owner via a working form.

**Architecture:** Next.js App Router. One landing page composed of self-contained section components that read all copy from a single `src/content/site.ts` module — no section takes content props, so splitting to multipage later is purely additive. The form posts to a Next.js route handler that re-validates with the same zod schema the client used, then forwards to Web3Forms with a server-only access key.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, react-hook-form, zod v4, vitest.

## Global Constraints

- All user-visible copy in Mexican Spanish. No English UI strings.
- Content is for children ages 4–12 only. No adult-learner copy, imagery, or programs.
- Unknown business data uses the visible marker format `[[NOMBRE EN MAYÚSCULAS]]`. Never invent plausible-looking real data (no fake phone numbers, no fake addresses, no fake testimonial names).
- Every text/background pair must meet WCAG AA: 4.5:1 for text under 24px, 3:1 for text 24px and above. The contrast table in Task 1 is the authority.
- `#EF6545` (tomato) and `#EA5E86` (baby shower) are **display-only** backgrounds — they reach only ~4.0:1 against ink. Text on them must be ≥24px. Never body copy.
- Focus rings are `#037F71` (teal), 3px, with a 2px cream offset. Never tomato — tomato hits 2.98:1 on cream and fails the 3:1 non-text minimum.
- All interactive controls have a minimum 44×44px touch target. Parents will use this on phones.
- Every animation is wrapped in `@media (prefers-reduced-motion: no-preference)` or has a reduced-motion fallback.
- `WEB3FORMS_ACCESS_KEY` is read server-side only. It must never appear in a `NEXT_PUBLIC_` variable or in any client component.
- Commit after every task.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/app/globals.css` | Tailwind import, `@theme` design tokens, base element styles, focus ring |
| `src/lib/fonts.ts` | The only place fonts are declared. Swapping to licensed `.woff2` files happens here. |
| `src/lib/schema.ts` | The zod schema for the enrollment form. Shared verbatim by client and server. |
| `src/lib/whatsapp.ts` | Builds the `wa.me` URL with prefilled message |
| `src/content/site.ts` | Every string on the site. Single source of truth. |
| `src/app/api/inscripcion/route.ts` | Validates, checks anti-spam, forwards to Web3Forms |
| `src/components/ui/*` | Presentational primitives with no business knowledge |
| `src/components/layout/*` | Header, Footer, WhatsApp floating button |
| `src/components/sections/*` | One file per landing section. Reads `site.ts`, takes no content props. |
| `src/components/form/InscripcionForm.tsx` | The form. Client component. |
| `src/app/page.tsx` | Composition only. Contains zero copy. |

---

### Task 1: Project scaffold, design tokens, fonts

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts`, `.gitignore` (already exists — verify), `.env.local.example`, `vitest.config.ts`
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/fonts.ts`
- Create: `public/images/.gitkeep`

**Interfaces:**
- Consumes: nothing
- Produces: `fredoka`, `sueEllen`, `figtree` font objects from `src/lib/fonts.ts`, each with a `.variable` string. Tailwind theme tokens named `--color-crema`, `--color-tinta`, `--color-teal`, `--color-tomate`, `--color-ambar`, `--color-rosa`, `--color-menta`, `--color-maiz`, `--color-lavanda`, `--color-turquesa`, `--color-durazno`, `--color-naranja`.

**Contrast table — this is the authority for the whole build:**

| Token | Hex | Ratio vs `#422F0E` ink | Allowed for |
|---|---|---|---|
| `crema` | `#FDF8F0` | 12.2:1 | any text |
| `maiz` | `#F7E9B2` | 10.6:1 | any text |
| `menta` | `#DDF2B8` | 10.6:1 | any text |
| `lavanda` | `#F9D4F8` | 9.7:1 | any text |
| `ambar` | `#FFD094` | 9.1:1 | any text — **primary CTA** |
| `durazno` | `#FCC4C0` | 8.4:1 | any text |
| `cielo` | `#AECFD0` | 7.7:1 | any text |
| `naranja` | `#F49625` | 5.7:1 | any text |
| `turquesa` | `#57B1A8` | 5.1:1 | any text |
| `tomate` | `#EF6545` | 4.1:1 | **≥24px only** |
| `rosa` | `#EA5E86` | 4.0:1 | **≥24px only** |
| `teal` | `#037F71` | — | cream text only (4.6:1) |

- [ ] **Step 1: Scaffold the project**

Run in `C:\Users\Oswaldo\pau_website`:

```bash
npm init -y
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/react @types/node @types/react-dom
npm install -D tailwindcss@4 @tailwindcss/postcss postcss
npm install -D vitest vite-tsconfig-paths
```

- [ ] **Step 2: Write the config files**

`package.json` — replace the `scripts` block:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`postcss.config.mjs`:

```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

`.env.local.example`:

```
# Obtener en https://web3forms.com — pegar el correo de la escuela, llega la clave por email.
# Copiar este archivo a .env.local y poner la clave real. .env.local NO se sube a git.
WEB3FORMS_ACCESS_KEY=pon-aqui-tu-access-key
```

- [ ] **Step 3: Write the fonts module**

`src/lib/fonts.ts`:

```ts
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
```

- [ ] **Step 4: Write the design tokens**

`src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Paleta — marketing_sources/color_scheme.jpeg.
     Ratios contra tinta #422F0E anotados. Ver la tabla del plan. */
  --color-crema: #fdf8f0;      /* 12.2:1 */
  --color-tinta: #422f0e;
  --color-teal: #037f71;       /* texto crema encima: 4.6:1 */
  --color-maiz: #f7e9b2;       /* 10.6:1 */
  --color-menta: #ddf2b8;      /* 10.6:1 */
  --color-lavanda: #f9d4f8;    /*  9.7:1 */
  --color-ambar: #ffd094;      /*  9.1:1 — botón principal */
  --color-durazno: #fcc4c0;    /*  8.4:1 */
  --color-cielo: #aecfd0;      /*  7.7:1 */
  --color-naranja: #f49625;    /*  5.7:1 */
  --color-turquesa: #57b1a8;   /*  5.1:1 */
  --color-tomate: #ef6545;     /*  4.1:1 — SOLO texto de 24px o más */
  --color-rosa: #ea5e86;       /*  4.0:1 — SOLO texto de 24px o más */

  --font-titulo: var(--fuente-titulo), system-ui, sans-serif;
  --font-mano: var(--fuente-mano), cursive;
  --font-texto: var(--fuente-texto), system-ui, sans-serif;

  --radius-carta: 1.25rem;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    background-color: var(--color-crema);
    color: var(--color-tinta);
    font-family: var(--font-texto);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: var(--font-titulo);
    font-weight: 700;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }

  p { text-wrap: pretty; }

  /* Anillo de foco: teal sobre cualquier fondo claro = 4.6:1.
     Tomate daría 2.98:1 y reprueba el mínimo de 3:1 para elementos no textuales. */
  :focus-visible {
    outline: 3px solid var(--color-teal);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

@utility sombra-dura {
  box-shadow: 4px 4px 0 0 var(--color-tinta);
}

@utility sombra-dura-sm {
  box-shadow: 2px 2px 0 0 var(--color-tinta);
}
```

- [ ] **Step 5: Write the root layout**

`src/app/layout.tsx`:

```tsx
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
```

- [ ] **Step 6: Write a temporary page and verify the dev server**

`src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="p-12">
      <h1 className="text-5xl text-teal">Prueba de tokens</h1>
      <p className="mt-4 font-mano text-2xl">Fuente manuscrita</p>
      <button className="mt-6 rounded-carta border-2 border-tinta bg-ambar px-6 py-3 sombra-dura">
        Botón de prueba
      </button>
    </main>
  );
}
```

Run: `npm run dev`
Expected: page loads at `localhost:3000`, the heading renders teal in a rounded font, the handwriting line renders in a script face, the button is amber with a hard offset shadow. If the fonts fall back to system sans, the `.variable` classes are not reaching `<html>`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js con tokens de diseño y fuentes"
```

---

### Task 2: Content module

**Files:**
- Create: `src/content/site.ts`

**Interfaces:**
- Consumes: nothing
- Produces: a default-exported `site` object. Every later task imports `import { site } from "@/content/site"`. Exact shape below — later tasks depend on these exact key names.

- [ ] **Step 1: Write the content module**

`src/content/site.ts`:

```ts
/**
 * Fuente única de todo el texto del sitio.
 *
 * Los valores entre [[DOBLES CORCHETES]] son marcadores. Se ven en pantalla a
 * propósito: es imposible publicar el sitio sin darse cuenta de que faltan.
 * Reemplazar por los datos reales de la escuela antes de publicar.
 */

export const site = {
  escuela: {
    nombre: "[[NOMBRE DE LA ESCUELA]]",
    ciudad: "Magdalena de Kino, Sonora",
    direccion: "[[CALLE Y NÚMERO, COLONIA, C.P.]]",
    telefono: "[[TELÉFONO A 10 DÍGITOS]]",
    whatsapp: "[[WHATSAPP A 10 DÍGITOS]]",
    correo: "[[CORREO@EJEMPLO.COM]]",
    horarios: "[[LUNES A VIERNES, 3:00 PM A 7:00 PM]]",
    facebook: "[[URL DE FACEBOOK]]",
    instagram: "[[URL DE INSTAGRAM]]",
    mapsUrl: "[[URL DE GOOGLE MAPS]]",
  },

  hero: {
    eyebrow: "Magdalena de Kino, Sonora",
    titulo: "Inglés para niñas y niños de 4 a 12 años",
    subtitulo:
      "Clases en grupos pequeños donde tu hija o hijo habla inglés desde el primer día. Sin libros aburridos, sin memorizar listas.",
    ctaPrimario: "Apartar un lugar",
    ctaSecundario: "Escribir por WhatsApp",
    datos: [
      { valor: "4 a 12", etiqueta: "años" },
      { valor: "[[8]]", etiqueta: "niños por grupo" },
      { valor: "[[2]]", etiqueta: "clases por semana" },
    ],
    imagenAlt:
      "[[DESCRIBIR LA FOTO: por ejemplo, niños trabajando en una mesa del salón]]",
  },

  beneficios: {
    titulo: "Por qué las familias nos eligen",
    items: [
      {
        titulo: "Grupos pequeños",
        texto:
          "Pocos niños por salón. La maestra alcanza a escuchar a cada uno hablar en cada clase.",
      },
      {
        titulo: "Se habla, no se memoriza",
        texto:
          "Las clases se dan en inglés desde el primer día, con juegos y actividades en lugar de listas de vocabulario.",
      },
      {
        titulo: "Maestras certificadas",
        texto:
          "[[DESCRIBIR LA CERTIFICACIÓN: por ejemplo, TKT o TOEFL, y los años de experiencia]]",
      },
      {
        titulo: "Reporte para los papás",
        texto:
          "Cada [[mes]] recibes un reporte de cómo va tu hija o hijo y en qué está trabajando.",
      },
    ],
  },

  programa: {
    eyebrow: "Qué aprenden",
    titulo: "Lo que tu hija o hijo se lleva del año",
    texto:
      "Las cuatro habilidades, en el orden en que un niño realmente las adquiere: primero entiende, luego habla, después lee y escribe.",
    habilidades: [
      {
        titulo: "Escuchar",
        texto:
          "Entiende instrucciones, preguntas y cuentos cortos en inglés sin que se los traduzcan.",
      },
      {
        titulo: "Hablar",
        texto:
          "Se presenta, pide lo que necesita, describe lo que ve y contesta preguntas sobre sí mismo.",
      },
      {
        titulo: "Leer",
        texto:
          "Reconoce palabras que ya usa y lee textos cortos apropiados para su edad.",
      },
      {
        titulo: "Escribir",
        texto:
          "Escribe palabras y frases sencillas: su nombre, los colores, los números, lo que le gusta.",
      },
    ],
    vocabularioTitulo: "Así se aprende el vocabulario",
    vocabularioTexto:
      "Trabajamos las palabras nuevas como lotería: la imagen, la palabra en español y la palabra en inglés juntas. El niño relaciona la carta con la palabra antes de escribirla.",
    pista: "Toca una carta",
    cartas: [
      { numero: 1, es: "El sol", en: "The sun", figura: "sol", color: "maiz" },
      { numero: 2, es: "La luna", en: "The moon", figura: "luna", color: "cielo" },
      { numero: 3, es: "El árbol", en: "The tree", figura: "arbol", color: "menta" },
      { numero: 4, es: "La estrella", en: "The star", figura: "estrella", color: "lavanda" },
      { numero: 5, es: "El pez", en: "The fish", figura: "pez", color: "turquesa" },
      { numero: 6, es: "La casa", en: "The house", figura: "casa", color: "durazno" },
      { numero: 7, es: "El corazón", en: "The heart", figura: "corazon", color: "ambar" },
      { numero: 8, es: "La nube", en: "The cloud", figura: "nube", color: "cielo" },
    ],
  },

  metodo: {
    titulo: "Cómo es una clase",
    pasos: [
      {
        titulo: "Calentamiento",
        texto: "Canción o juego en inglés para soltar la lengua. Nadie se sienta a leer todavía.",
      },
      {
        titulo: "Palabra nueva",
        texto: "Se presenta el vocabulario del día con cartas, imágenes y sonido.",
      },
      {
        titulo: "A usarla",
        texto: "Los niños usan lo nuevo en una actividad: pedir algo, describir, actuar.",
      },
      {
        titulo: "Cierre",
        texto: "Se repasa lo aprendido y se manda una actividad corta para casa.",
      },
    ],
  },

  nosotros: {
    titulo: "Quién les da clase",
    texto: "[[PÁRRAFO SOBRE LA ESCUELA: cuándo abrió, por qué, qué la hace distinta]]",
    maestras: [
      {
        nombre: "[[NOMBRE DE LA MAESTRA]]",
        rol: "[[DIRECTORA / MAESTRA]]",
        bio: "[[UNA O DOS FRASES: formación y años dando clase a niños]]",
      },
    ],
  },

  testimonios: {
    titulo: "Lo que dicen los papás",
    items: [
      {
        texto: "[[TESTIMONIO REAL DE UN PAPÁ O MAMÁ — pedir permiso antes de publicar]]",
        autor: "[[NOMBRE]]",
        detalle: "[[mamá de un alumno de 8 años]]",
      },
      {
        texto: "[[SEGUNDO TESTIMONIO REAL]]",
        autor: "[[NOMBRE]]",
        detalle: "[[papá de una alumna de 6 años]]",
      },
    ],
  },

  faq: {
    titulo: "Preguntas frecuentes",
    items: [
      {
        pregunta: "¿Mi hija o hijo necesita saber algo de inglés para entrar?",
        respuesta: "No. Recibimos niños que empiezan desde cero y los acomodamos en el grupo que les corresponde.",
      },
      {
        pregunta: "¿Cuánto cuesta?",
        respuesta: "[[COLEGIATURA MENSUAL, INSCRIPCIÓN Y QUÉ INCLUYE]]",
      },
      {
        pregunta: "¿Cuándo puedo inscribir?",
        respuesta: "[[EXPLICAR SI HAY FECHAS DE INSCRIPCIÓN O SI ES TODO EL AÑO]]",
      },
      {
        pregunta: "¿Puedo ver una clase antes de inscribir?",
        respuesta: "[[SÍ O NO, Y CÓMO SE AGENDA]]",
      },
      {
        pregunta: "¿Qué pasa si mi hija o hijo falta a una clase?",
        respuesta: "[[POLÍTICA DE FALTAS Y REPOSICIONES]]",
      },
    ],
  },

  inscripcion: {
    eyebrow: "Inscripciones abiertas",
    titulo: "Aparta el lugar de tu hija o hijo",
    texto:
      "Llena los datos y te contactamos para agendar una clase de prueba. Contestamos el mismo día.",
  },

  contacto: {
    titulo: "Dónde estamos",
  },

  privacidad: {
    razonSocial: "[[RAZÓN SOCIAL O NOMBRE COMPLETO DE LA RESPONSABLE]]",
    domicilio: "[[DOMICILIO FISCAL COMPLETO]]",
    correoContacto: "[[CORREO PARA EJERCER DERECHOS ARCO]]",
  },
} as const;
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat: módulo de contenido con marcadores visibles"
```

---

### Task 3: Form schema (TDD)

**Files:**
- Create: `src/lib/schema.ts`
- Test: `src/lib/schema.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `inscripcionSchema` — a zod object schema
  - `type Inscripcion = z.infer<typeof inscripcionSchema>` with fields `tutor`, `telefono`, `correo`, `nino`, `edad`, `experiencia`, `horario`, `mensaje`, `privacidad`
  - `EDADES: readonly number[]` (4 through 12)
  - `EXPERIENCIAS` and `HORARIOS` — readonly arrays of `{ value: string; label: string }`

- [ ] **Step 1: Install dependencies**

```bash
npm install zod@^4 react-hook-form @hookform/resolvers
```

- [ ] **Step 2: Write the failing tests**

`src/lib/schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { inscripcionSchema } from "./schema";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 7,
  experiencia: "nada",
  horario: "tarde",
  mensaje: "",
  privacidad: true,
};

describe("inscripcionSchema", () => {
  it("acepta un envío válido", () => {
    const r = inscripcionSchema.safeParse(valido);
    expect(r.success).toBe(true);
  });

  it("acepta el teléfono con espacios, guiones y paréntesis", () => {
    const r = inscripcionSchema.safeParse({
      ...valido,
      telefono: "(632) 123-45 67",
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.telefono).toBe("6321234567");
  });

  it("rechaza un teléfono de menos de 10 dígitos", () => {
    const r = inscripcionSchema.safeParse({ ...valido, telefono: "63212345" });
    expect(r.success).toBe(false);
  });

  it("rechaza un teléfono de más de 10 dígitos", () => {
    const r = inscripcionSchema.safeParse({ ...valido, telefono: "521234567890" });
    expect(r.success).toBe(false);
  });

  it("rechaza un correo mal formado", () => {
    const r = inscripcionSchema.safeParse({ ...valido, correo: "maria@" });
    expect(r.success).toBe(false);
  });

  it("rechaza edades fuera de 4 a 12", () => {
    expect(inscripcionSchema.safeParse({ ...valido, edad: 3 }).success).toBe(false);
    expect(inscripcionSchema.safeParse({ ...valido, edad: 13 }).success).toBe(false);
  });

  it("rechaza el envío sin aceptar el aviso de privacidad", () => {
    const r = inscripcionSchema.safeParse({ ...valido, privacidad: false });
    expect(r.success).toBe(false);
  });

  it("rechaza nombres vacíos o de un solo carácter", () => {
    expect(inscripcionSchema.safeParse({ ...valido, tutor: "" }).success).toBe(false);
    expect(inscripcionSchema.safeParse({ ...valido, nino: "A" }).success).toBe(false);
  });

  it("da mensajes de error en español", () => {
    const r = inscripcionSchema.safeParse({ ...valido, correo: "no-es-correo" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].message).toMatch(/correo/i);
    }
  });

  it("recorta espacios de los nombres", () => {
    const r = inscripcionSchema.safeParse({ ...valido, tutor: "  María  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.tutor).toBe("María");
  });

  it("rechaza un mensaje larguísimo", () => {
    const r = inscripcionSchema.safeParse({ ...valido, mensaje: "a".repeat(1001) });
    expect(r.success).toBe(false);
  });
});
```

- [ ] **Step 3: Run the tests and verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './schema'`

- [ ] **Step 4: Write the schema**

`src/lib/schema.ts`:

```ts
import { z } from "zod";

export const EDADES = [4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export const EXPERIENCIAS = [
  { value: "nada", label: "No ha estudiado inglés" },
  { value: "poco", label: "Un poco, en la escuela" },
  { value: "si", label: "Sí, ha tomado clases antes" },
] as const;

export const HORARIOS = [
  { value: "manana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "sabado", label: "Sábado" },
] as const;

/** Deja solo dígitos: "(632) 123-45 67" -> "6321234567" */
const soloDigitos = (v: string) => v.replace(/\D/g, "");

export const inscripcionSchema = z.object({
  tutor: z
    .string()
    .trim()
    .min(2, "Escribe el nombre del padre, madre o tutor.")
    .max(80, "El nombre es demasiado largo."),

  telefono: z
    .string()
    .transform(soloDigitos)
    .refine((v) => v.length === 10, {
      message: "El teléfono debe tener 10 dígitos, con lada. Ejemplo: 632 123 4567",
    }),

  correo: z
    .string()
    .trim()
    .pipe(z.email("Escribe un correo válido. Ejemplo: nombre@correo.com")),

  nino: z
    .string()
    .trim()
    .min(2, "Escribe el nombre de la niña o el niño.")
    .max(80, "El nombre es demasiado largo."),

  edad: z
    .number({ message: "Selecciona la edad." })
    .int()
    .min(4, "Damos clases a partir de los 4 años.")
    .max(12, "Damos clases hasta los 12 años."),

  experiencia: z
    .enum(["nada", "poco", "si"])
    .optional(),

  horario: z
    .enum(["manana", "tarde", "sabado"])
    .optional(),

  mensaje: z
    .string()
    .trim()
    .max(1000, "El mensaje es demasiado largo.")
    .optional(),

  privacidad: z
    .boolean()
    .refine((v) => v === true, {
      message: "Necesitamos tu consentimiento para poder contactarte.",
    }),
});

export type Inscripcion = z.infer<typeof inscripcionSchema>;
```

- [ ] **Step 5: Run the tests and verify they pass**

Run: `npm test`
Expected: PASS, 11 tests.

If `z.email` is not a function, the installed zod is v3. Run `npm install zod@^4` again and confirm `package.json` shows `"zod": "^4"`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema.ts src/lib/schema.test.ts package.json package-lock.json
git commit -m "feat: esquema de validación del formulario de inscripción"
```

---

### Task 4: API route (TDD)

**Files:**
- Create: `src/app/api/inscripcion/route.ts`
- Test: `src/app/api/inscripcion/route.test.ts`

**Interfaces:**
- Consumes: `inscripcionSchema` from `@/lib/schema`
- Produces: `POST(request: Request): Promise<Response>`. Responds `{ ok: true }` with 200, or `{ ok: false, error: string }` with 400 or 502.

**Anti-spam contract the client must honor (Task 9 depends on this):**
- The client sends `website: ""` — a honeypot. Bots fill it. Any non-empty value is rejected.
- The client sends `iniciadoEn: number` — `Date.now()` captured when the form mounted. Submissions faster than 3000ms are rejected.

- [ ] **Step 1: Write the failing tests**

`src/app/api/inscripcion/route.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const valido = {
  tutor: "María González",
  telefono: "6321234567",
  correo: "maria@ejemplo.com",
  nino: "Sofía",
  edad: 7,
  experiencia: "nada",
  horario: "tarde",
  mensaje: "Quiero informes",
  privacidad: true,
  website: "",
  iniciadoEn: 0, // hace mucho — pasa el control de tiempo
};

const pedir = (body: unknown) =>
  new Request("http://localhost/api/inscripcion", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  process.env.WEB3FORMS_ACCESS_KEY = "clave-de-prueba";
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/inscripcion", () => {
  it("acepta un envío válido y responde 200", async () => {
    const res = await POST(pedir(valido));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("reenvía a Web3Forms con la clave del servidor", async () => {
    await POST(pedir(valido));
    const llamada = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(llamada[0]).toBe("https://api.web3forms.com/submit");
    const enviado = JSON.parse(llamada[1].body as string);
    expect(enviado.access_key).toBe("clave-de-prueba");
    expect(enviado.nino).toBe("Sofía");
  });

  it("rechaza un payload inválido con 400 y no llama a Web3Forms", async () => {
    const res = await POST(pedir({ ...valido, correo: "malo" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza sin consentimiento de privacidad", async () => {
    const res = await POST(pedir({ ...valido, privacidad: false }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza cuando el honeypot viene lleno", async () => {
    const res = await POST(pedir({ ...valido, website: "http://spam.example" }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza envíos hechos en menos de 3 segundos", async () => {
    const res = await POST(pedir({ ...valido, iniciadoEn: Date.now() - 500 }));
    expect(res.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("rechaza un cuerpo que no es JSON", async () => {
    const res = await POST(
      new Request("http://localhost/api/inscripcion", {
        method: "POST",
        body: "no soy json",
      }),
    );
    expect(res.status).toBe(400);
  });

  it("responde 502 si Web3Forms falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("boom", { status: 500 })),
    );
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
  });

  it("responde 502 si falta la clave de acceso", async () => {
    delete process.env.WEB3FORMS_ACCESS_KEY;
    const res = await POST(pedir(valido));
    expect(res.status).toBe(502);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("nunca devuelve la clave de acceso en la respuesta", async () => {
    const res = await POST(pedir(valido));
    const texto = await res.text();
    expect(texto).not.toContain("clave-de-prueba");
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './route'`

- [ ] **Step 3: Write the route handler**

`src/app/api/inscripcion/route.ts`:

```ts
import { inscripcionSchema } from "@/lib/schema";
import { EXPERIENCIAS, HORARIOS } from "@/lib/schema";

/** Un humano no llena este formulario en menos de 3 segundos. Un bot sí. */
const MS_MINIMOS = 3000;

const etiqueta = (
  lista: readonly { value: string; label: string }[],
  value: string | undefined,
) => lista.find((o) => o.value === value)?.label ?? "No especificado";

const malo = (error: string) =>
  Response.json({ ok: false, error }, { status: 400 });

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return malo("No pudimos leer el formulario.");
  }

  if (typeof cuerpo !== "object" || cuerpo === null) {
    return malo("No pudimos leer el formulario.");
  }

  const { website, iniciadoEn, ...campos } = cuerpo as Record<string, unknown>;

  // Honeypot: campo oculto que solo un bot llena.
  if (typeof website === "string" && website.length > 0) {
    return malo("No pudimos procesar el envío.");
  }

  // Control de tiempo. Ausente o no numérico se trata como sospechoso.
  if (typeof iniciadoEn !== "number" || Date.now() - iniciadoEn < MS_MINIMOS) {
    return malo("Tómate un momento para revisar los datos y vuelve a enviar.");
  }

  const resultado = inscripcionSchema.safeParse(campos);
  if (!resultado.success) {
    return malo("Revisa los datos del formulario.");
  }

  const d = resultado.data;

  const clave = process.env.WEB3FORMS_ACCESS_KEY;
  if (!clave) {
    console.error("Falta WEB3FORMS_ACCESS_KEY en el entorno.");
    return Response.json(
      { ok: false, error: "No pudimos enviar tu solicitud. Escríbenos por WhatsApp." },
      { status: 502 },
    );
  }

  let respuesta: Response;
  try {
    respuesta = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        access_key: clave,
        subject: `Nueva inscripción: ${d.nino} (${d.edad} años)`,
        from_name: "Sitio web de la escuela",
        replyto: d.correo,
        tutor: d.tutor,
        telefono: d.telefono,
        correo: d.correo,
        nino: d.nino,
        edad: String(d.edad),
        experiencia: etiqueta(EXPERIENCIAS, d.experiencia),
        horario: etiqueta(HORARIOS, d.horario),
        mensaje: d.mensaje || "Sin mensaje",
      }),
    });
  } catch {
    return Response.json(
      { ok: false, error: "No pudimos enviar tu solicitud. Escríbenos por WhatsApp." },
      { status: 502 },
    );
  }

  if (!respuesta.ok) {
    return Response.json(
      { ok: false, error: "No pudimos enviar tu solicitud. Escríbenos por WhatsApp." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `npm test`
Expected: PASS, 21 tests total across both files.

- [ ] **Step 5: Commit**

```bash
git add src/app/api
git commit -m "feat: endpoint de inscripción con validación y anti-spam"
```

---

### Task 5: UI primitives

**Files:**
- Create: `src/components/ui/Boton.tsx`, `src/components/ui/Seccion.tsx`, `src/components/ui/Tarjeta.tsx`
- Create: `src/lib/whatsapp.ts`

**Interfaces:**
- Consumes: `site` from `@/content/site`
- Produces:
  - `<Boton variante="primario" | "secundario" | "fantasma" href?={string} {...ButtonHTMLAttributes}>` — renders `<a>` when `href` is present, otherwise `<button>`
  - `<Seccion id?={string} fondo="crema" | "maiz" | "menta" | "teal" titulo?={string} eyebrow?={string}>`
  - `<Tarjeta className?={string}>` — bordered card with hard shadow. Takes `className` (sections need `h-full` for grid alignment), not a color prop.
  - `urlWhatsApp(mensaje?: string): string`

- [ ] **Step 1: Write the WhatsApp helper**

`src/lib/whatsapp.ts`:

```ts
import { site } from "@/content/site";

const MENSAJE_POR_OMISION =
  "Hola, quiero informes sobre las clases de inglés para niños.";

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
```

- [ ] **Step 2: Write the button**

`src/components/ui/Boton.tsx`:

```tsx
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "fantasma";

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-carta " +
  "border-2 border-tinta px-6 py-3 font-titulo text-base font-semibold " +
  "transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] " +
  "motion-reduce:transition-none";

// ámbar sobre tinta = 9.1:1. teal con texto crema = 4.6:1. Ambos pasan AA.
const variantes: Record<Variante, string> = {
  primario: "bg-ambar text-tinta sombra-dura hover:bg-naranja",
  secundario: "bg-teal text-crema sombra-dura",
  fantasma: "bg-crema text-tinta sombra-dura-sm hover:bg-maiz",
};

type Props = {
  variante?: Variante;
  href?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Boton({
  variante = "primario",
  href,
  children,
  ...rest
}: Props) {
  const clases = `${base} ${variantes[variante]}`;

  if (href) {
    const externo = href.startsWith("http");
    return (
      <Link
        href={href}
        className={clases}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={clases} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Write the section wrapper**

`src/components/ui/Seccion.tsx`:

```tsx
import type { ReactNode } from "react";

type Fondo = "crema" | "maiz" | "menta" | "teal";

const fondos: Record<Fondo, string> = {
  crema: "bg-crema text-tinta",
  maiz: "bg-maiz text-tinta",
  menta: "bg-menta text-tinta",
  teal: "bg-teal text-crema",
};

type Props = {
  id?: string;
  fondo?: Fondo;
  eyebrow?: string;
  titulo?: string;
  children: ReactNode;
};

export function Seccion({ id, fondo = "crema", eyebrow, titulo, children }: Props) {
  return (
    <section id={id} className={`${fondos[fondo]} px-5 py-16 sm:px-8 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-2 font-mano text-2xl">{eyebrow}</p>
        )}
        {titulo && (
          <h2 className="mb-10 text-3xl sm:text-4xl md:text-5xl">{titulo}</h2>
        )}
        {children}
      </div>
    </section>
  );
}
```

Note on the eyebrow: it is `text-2xl` (24px) because the handwriting face is low-contrast at small sizes. Do not shrink it.

- [ ] **Step 4: Write the card**

`src/components/ui/Tarjeta.tsx`:

```tsx
import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Tarjeta({ className = "", children }: Props) {
  return (
    <div
      className={`rounded-carta border-2 border-tinta bg-crema p-6 sombra-dura ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui src/lib/whatsapp.ts
git commit -m "feat: primitivas de interfaz y ayudante de WhatsApp"
```

---

### Task 6: Header, footer, WhatsApp button

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/BotonWhatsApp.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `site`, `Boton`, `urlWhatsApp`
- Produces: `<Header />`, `<Footer />`, `<BotonWhatsApp />` — all zero-prop

- [ ] **Step 1: Write the header**

`src/components/layout/Header.tsx`:

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";

const enlaces = [
  { href: "#programa", texto: "Programa" },
  { href: "#metodo", texto: "Método" },
  { href: "#nosotros", texto: "Nosotros" },
  { href: "#preguntas", texto: "Preguntas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-tinta bg-teal text-crema">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="font-titulo text-lg font-bold sm:text-xl">
          {site.escuela.nombre}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="rounded px-1 py-2 underline-offset-4 hover:underline"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Boton href="#inscripcion" variante="primario">
          Inscribir
        </Boton>
      </div>
    </header>
  );
}
```

The nav links hide below `md`. That is deliberate — the enrollment button stays visible at every width, and the page is a single scroll, so a hamburger menu would add a control without adding a destination.

- [ ] **Step 2: Write the footer**

`src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const { escuela } = site;
  return (
    <footer className="border-t-2 border-tinta bg-teal px-5 py-12 text-crema sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-titulo text-xl font-bold">{escuela.nombre}</p>
          <p className="mt-2">{escuela.ciudad}</p>
        </div>

        <div>
          <h2 className="font-titulo text-lg font-semibold">Contacto</h2>
          <ul className="mt-2 space-y-1">
            <li>{escuela.direccion}</li>
            <li>Tel. {escuela.telefono}</li>
            <li>{escuela.correo}</li>
            <li>{escuela.horarios}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-titulo text-lg font-semibold">Redes</h2>
          <ul className="mt-2 space-y-1">
            <li>Facebook: {escuela.facebook}</li>
            <li>Instagram: {escuela.instagram}</li>
          </ul>
          <Link
            href="/aviso-de-privacidad"
            className="mt-4 inline-block underline underline-offset-4"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

Social links render as plain text while the values are markers. Once real URLs replace the markers, convert those two list items to anchors.

- [ ] **Step 3: Write the WhatsApp floating button**

`src/components/layout/BotonWhatsApp.tsx`:

```tsx
import { urlWhatsApp } from "@/lib/whatsapp";

export function BotonWhatsApp() {
  const url = urlWhatsApp();
  if (url === "#") return null; // sin número real, no se muestra un enlace roto

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-tinta bg-menta sombra-dura transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <span className="sr-only">Escribir por WhatsApp</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-7 w-7 fill-tinta"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 4: Wire them into the root layout**

Replace the `<body>` contents in `src/app/layout.tsx`:

```tsx
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
```

Add the three imports at the top of the file.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: teal header sticks to the top with the school name marker visible, teal footer at the bottom, no floating WhatsApp button yet (the number is still a marker — that is correct behavior). Press Tab on load: the "Saltar al contenido" link appears with a teal focus ring.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout src/app/layout.tsx
git commit -m "feat: encabezado, pie y botón de WhatsApp"
```

---

### Task 7: Lotería cards

**Files:**
- Create: `src/components/ui/FiguraLoteria.tsx`, `src/components/ui/CartaLoteria.tsx`, `src/components/ui/TablaLoteria.tsx`

**Interfaces:**
- Consumes: `site.programa.cartas`
- Produces:
  - `<FiguraLoteria nombre={string} />` — flat SVG, `aria-hidden`
  - `<CartaLoteria numero={number} es={string} en={string} figura={string} color={string} />` — client component, flips on click/Enter/Space and on hover
  - `<TablaLoteria />` — zero-prop, renders the grid from content

Card design: number in the top-left corner, flat figure centered, word banner across the bottom. Face shows the Spanish word; the flip reveals the English word on a tomato back. The English word sits at `text-2xl`, which is exactly why tomato is permitted there.

- [ ] **Step 1: Write the figures**

`src/components/ui/FiguraLoteria.tsx`:

```tsx
/** Figuras planas, geométricas. Sin degradados: se imprimen como una carta. */
const figuras: Record<string, React.ReactNode> = {
  sol: (
    <>
      <circle cx="32" cy="32" r="13" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="30.5" y="4" width="3" height="9" rx="1.5"
          transform={`rotate(${a} 32 32)`} />
      ))}
    </>
  ),
  luna: <path d="M40 8a24 24 0 1 0 16 40A26 26 0 0 1 40 8Z" />,
  arbol: (
    <>
      <circle cx="32" cy="24" r="16" />
      <rect x="28" y="36" width="8" height="22" rx="2" />
    </>
  ),
  estrella: (
    <path d="M32 6 39 25l20 1-15.5 13 5 19.5L32 47 15.5 58.5l5-19.5L5 26l20-1Z" />
  ),
  pez: (
    <>
      <ellipse cx="28" cy="32" rx="20" ry="12" />
      <path d="M48 32 60 22v20Z" />
    </>
  ),
  casa: (
    <>
      <path d="M32 8 58 30H6Z" />
      <rect x="14" y="30" width="36" height="26" rx="2" />
    </>
  ),
  corazon: (
    <path d="M32 56S6 40 6 24A13 13 0 0 1 32 18 13 13 0 0 1 58 24c0 16-26 32-26 32Z" />
  ),
  nube: (
    <path d="M18 46a12 12 0 0 1 1-24 16 16 0 0 1 30 4 10 10 0 0 1-3 20Z" />
  ),
};

export function FiguraLoteria({ nombre }: { nombre: string }) {
  const figura = figuras[nombre];
  if (!figura) return null;
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-16 w-16 fill-tinta">
      {figura}
    </svg>
  );
}
```

- [ ] **Step 2: Write the card**

`src/components/ui/CartaLoteria.tsx`:

```tsx
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
```

Cross-fade rather than a 3D flip: it degrades cleanly under `prefers-reduced-motion` (the global rule collapses the duration to near zero), and it avoids a `backface-visibility` bug class entirely. Both faces stay in the DOM, so a screen reader announces both the Spanish and English word — which is the point of the component.

- [ ] **Step 3: Write the board**

`src/components/ui/TablaLoteria.tsx`:

```tsx
import { site } from "@/content/site";
import { CartaLoteria } from "./CartaLoteria";

export function TablaLoteria() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {site.programa.cartas.map((c) => (
        <li key={c.numero}>
          <CartaLoteria
            numero={c.numero}
            es={c.es}
            en={c.en}
            figura={c.figura}
            color={c.color}
          />
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Verify in the browser**

Temporarily render `<TablaLoteria />` in `src/app/page.tsx` and run `npm run dev`.

Expected: 8 cards, 2 columns on mobile and 4 on desktop, each with a number, a flat figure, and a Spanish banner. Hovering fades in the English word on tomato. Tab reaches each card and Enter toggles it. Enable "Reduce motion" in the OS and confirm the change is instant rather than faded.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: cartas de lotería para el vocabulario"
```

---

### Task 8: Landing sections

**Files:**
- Create: `src/components/sections/Hero.tsx`, `Beneficios.tsx`, `Programa.tsx`, `Metodo.tsx`, `Nosotros.tsx`, `Testimonios.tsx`, `Preguntas.tsx`, `Contacto.tsx`

**Interfaces:**
- Consumes: `site`, `Seccion`, `Tarjeta`, `Boton`, `TablaLoteria`, `urlWhatsApp`
- Produces: eight zero-prop components, each a named export matching its filename

- [ ] **Step 1: Write the hero**

`src/components/sections/Hero.tsx`:

```tsx
import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";
import { urlWhatsApp } from "@/lib/whatsapp";

export function Hero() {
  const { hero } = site;
  const wa = urlWhatsApp();

  return (
    <section className="bg-crema px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="font-mano text-2xl text-teal">{hero.eyebrow}</p>
          <h1 className="mt-2 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {hero.titulo}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed">
            {hero.subtitulo}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Boton href="#inscripcion">{hero.ctaPrimario}</Boton>
            {wa !== "#" && (
              <Boton href={wa} variante="secundario">
                {hero.ctaSecundario}
              </Boton>
            )}
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t-2 border-tinta pt-6">
            {hero.datos.map((d) => (
              <div key={d.etiqueta}>
                <dt className="sr-only">{d.etiqueta}</dt>
                <dd className="font-titulo text-3xl font-bold text-teal">
                  {d.valor}
                </dd>
                <p className="text-sm">{d.etiqueta}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Espacio para la foto real de la escuela. Reemplazar el div por
            <Image src="/images/salon.jpg" alt={hero.imagenAlt} ... /> */}
        <div className="aspect-[4/3] rounded-carta border-2 border-dashed border-tinta bg-maiz p-6 sombra-dura">
          <p className="font-mano text-2xl">Foto de la escuela</p>
          <p className="mt-2 text-sm">{hero.imagenAlt}</p>
          <p className="mt-4 text-sm">
            Guardar en <code>public/images/</code> y cambiar este bloque por
            un <code>next/image</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write the benefits section**

`src/components/sections/Beneficios.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Beneficios() {
  const { beneficios } = site;
  return (
    <Seccion id="beneficios" fondo="maiz" titulo={beneficios.titulo}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {beneficios.items.map((b) => (
          <li key={b.titulo}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{b.titulo}</h3>
              <p className="mt-2 leading-relaxed">{b.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
```

- [ ] **Step 3: Write the program section**

`src/components/sections/Programa.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { TablaLoteria } from "@/components/ui/TablaLoteria";

export function Programa() {
  const { programa } = site;
  return (
    <Seccion
      id="programa"
      fondo="crema"
      eyebrow={programa.eyebrow}
      titulo={programa.titulo}
    >
      <p className="-mt-4 mb-8 max-w-prose text-lg leading-relaxed">
        {programa.texto}
      </p>

      {/* Las cuatro habilidades. Esto es lo que un papá quiere saber:
          qué va a poder hacer su hijo que hoy no puede. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programa.habilidades.map((h) => (
          <li key={h.titulo}>
            <Tarjeta className="h-full">
              <h3 className="text-xl">{h.titulo}</h3>
              <p className="mt-2 leading-relaxed">{h.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ul>

      <h3 className="mb-2 mt-16 text-2xl sm:text-3xl">
        {programa.vocabularioTitulo}
      </h3>
      <p className="mb-8 max-w-prose text-lg leading-relaxed">
        {programa.vocabularioTexto}
      </p>
      <TablaLoteria />
      <p className="mt-6 font-mano text-2xl text-teal">{programa.pista}</p>
    </Seccion>
  );
}
```

- [ ] **Step 4: Write the method section**

`src/components/sections/Metodo.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Metodo() {
  const { metodo } = site;
  return (
    <Seccion id="metodo" fondo="menta" titulo={metodo.titulo}>
      {/* Lista ordenada: una clase sí ocurre en este orden, así que la
          numeración carga información real. */}
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metodo.pasos.map((p, i) => (
          <li key={p.titulo}>
            <Tarjeta className="h-full">
              <span
                aria-hidden="true"
                className="font-titulo text-3xl font-bold text-teal"
              >
                {i + 1}
              </span>
              <h3 className="mt-1 text-xl">{p.titulo}</h3>
              <p className="mt-2 leading-relaxed">{p.texto}</p>
            </Tarjeta>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}
```

- [ ] **Step 5: Write the about section**

`src/components/sections/Nosotros.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";

export function Nosotros() {
  const { nosotros } = site;
  return (
    <Seccion id="nosotros" fondo="crema" titulo={nosotros.titulo}>
      <div className="grid gap-8 md:grid-cols-2">
        <p className="max-w-prose text-lg leading-relaxed">{nosotros.texto}</p>
        <ul className="space-y-5">
          {nosotros.maestras.map((m) => (
            <li key={m.nombre}>
              <Tarjeta>
                <h3 className="text-xl">{m.nombre}</h3>
                <p className="font-mano text-2xl text-teal">{m.rol}</p>
                <p className="mt-2 leading-relaxed">{m.bio}</p>
              </Tarjeta>
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
```

- [ ] **Step 6: Write the testimonials section**

`src/components/sections/Testimonios.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";

export function Testimonios() {
  const { testimonios } = site;
  return (
    <Seccion id="testimonios" fondo="teal" titulo={testimonios.titulo}>
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonios.items.map((t) => (
          <li key={t.autor}>
            <figure className="h-full rounded-carta border-2 border-tinta bg-crema p-6 text-tinta sombra-dura">
              <blockquote className="text-lg leading-relaxed">
                {t.texto}
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-mano text-2xl">{t.autor}</span>
                <span className="block text-sm">{t.detalle}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
```

- [ ] **Step 7: Write the FAQ section**

`src/components/sections/Preguntas.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";

export function Preguntas() {
  const { faq } = site;
  return (
    <Seccion id="preguntas" fondo="crema" titulo={faq.titulo}>
      <ul className="mx-auto max-w-3xl space-y-4">
        {faq.items.map((f) => (
          <li key={f.pregunta}>
            <details className="group rounded-carta border-2 border-tinta bg-crema sombra-dura open:bg-maiz">
              <summary className="cursor-pointer list-none px-6 py-4 font-titulo text-lg font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.pregunta}
                  <span
                    aria-hidden="true"
                    className="text-2xl transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="px-6 pb-5 leading-relaxed">{f.respuesta}</p>
            </details>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
```

Native `<details>` gives keyboard support and screen reader semantics for free. No JavaScript accordion.

- [ ] **Step 8: Write the contact section**

`src/components/sections/Contacto.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { Tarjeta } from "@/components/ui/Tarjeta";
import { Boton } from "@/components/ui/Boton";
import { urlWhatsApp } from "@/lib/whatsapp";

export function Contacto() {
  const { escuela, contacto } = site;
  const wa = urlWhatsApp();

  return (
    <Seccion id="contacto" fondo="menta" titulo={contacto.titulo}>
      <div className="grid gap-6 md:grid-cols-2">
        <Tarjeta>
          <dl className="space-y-3">
            <div>
              <dt className="font-titulo font-semibold">Dirección</dt>
              <dd>{escuela.direccion}</dd>
              <dd>{escuela.ciudad}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">Teléfono</dt>
              <dd>{escuela.telefono}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">Correo</dt>
              <dd>{escuela.correo}</dd>
            </div>
            <div>
              <dt className="font-titulo font-semibold">Horario</dt>
              <dd>{escuela.horarios}</dd>
            </div>
          </dl>
          {wa !== "#" && (
            <div className="mt-6">
              <Boton href={wa} variante="secundario">
                Escribir por WhatsApp
              </Boton>
            </div>
          )}
        </Tarjeta>

        {/* Mapa: pegar el iframe de Google Maps cuando exista la dirección real. */}
        <div className="flex min-h-[16rem] items-center justify-center rounded-carta border-2 border-dashed border-tinta bg-crema p-6 text-center sombra-dura">
          <p>
            Mapa de Google. Pegar aquí el <code>iframe</code> de
            &laquo;Compartir &rsaquo; Insertar un mapa&raquo;.
          </p>
        </div>
      </div>
    </Seccion>
  );
}
```

- [ ] **Step 9: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/components/sections
git commit -m "feat: secciones de la landing"
```

---

### Task 9: The enrollment form

**Files:**
- Create: `src/components/ui/Campo.tsx`, `src/components/form/FormularioInscripcion.tsx`, `src/components/sections/Inscripcion.tsx`

**Interfaces:**
- Consumes: `inscripcionSchema`, `Inscripcion`, `EDADES`, `EXPERIENCIAS`, `HORARIOS` from `@/lib/schema`; `POST /api/inscripcion`
- Produces: `<Inscripcion />` — zero-prop section wrapping the client form

The form must send `website` (honeypot, empty) and `iniciadoEn` (mount timestamp) alongside the schema fields. Task 4's route rejects submissions missing either.

- [ ] **Step 1: Write the field wrapper**

`src/components/ui/Campo.tsx`:

```tsx
import type { ReactNode } from "react";

type Props = {
  id: string;
  etiqueta: string;
  error?: string;
  requerido?: boolean;
  children: ReactNode;
};

export function Campo({ id, etiqueta, error, requerido, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block font-titulo font-semibold">
        {etiqueta}
        {requerido && (
          <span className="text-tinta" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

/** Clases compartidas por input, select y textarea. */
export const controlBase =
  "mt-1 block w-full min-h-[48px] rounded-carta border-2 border-tinta bg-crema px-4 py-3 " +
  "text-base placeholder:text-tinta/50 aria-[invalid=true]:border-4";
```

Labels are always visible. Placeholders never carry the label — they disappear the moment someone types, and a parent filling this on a phone should be able to check what they entered.

The error text uses the default ink color rather than tomato: tomato text on cream is 2.98:1 and fails. The error is signalled by the thicker border, the `role="alert"`, and the message itself.

- [ ] **Step 2: Write the form**

`src/components/form/FormularioInscripcion.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import {
  EDADES,
  EXPERIENCIAS,
  HORARIOS,
  inscripcionSchema,
  type Inscripcion,
} from "@/lib/schema";
import { Campo, controlBase } from "@/components/ui/Campo";
import { Boton } from "@/components/ui/Boton";

export function FormularioInscripcion() {
  const router = useRouter();
  const iniciadoEn = useRef(Date.now());
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inscripcion>({
    resolver: standardSchemaResolver(inscripcionSchema),
    mode: "onBlur",
  });

  const enviar = handleSubmit(async (datos) => {
    setErrorEnvio(null);
    try {
      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...datos,
          website: "",
          iniciadoEn: iniciadoEn.current,
        }),
      });
      const cuerpo = await res.json();
      if (!res.ok || !cuerpo.ok) {
        setErrorEnvio(cuerpo.error ?? "No pudimos enviar tu solicitud.");
        return;
      }
      router.push("/gracias");
    } catch {
      setErrorEnvio(
        "No pudimos enviar tu solicitud. Revisa tu conexión o escríbenos por WhatsApp.",
      );
    }
  });

  const props = (nombre: keyof Inscripcion) => ({
    id: nombre,
    className: controlBase,
    "aria-invalid": errors[nombre] ? true : undefined,
    "aria-describedby": errors[nombre] ? `${nombre}-error` : undefined,
  });

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      {/* Trampa para bots. Nadie que use el sitio lo ve ni lo tabula. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Campo id="tutor" etiqueta="Nombre del padre, madre o tutor" requerido error={errors.tutor?.message}>
        <input type="text" autoComplete="name" {...props("tutor")} {...register("tutor")} />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="telefono" etiqueta="Teléfono o WhatsApp" requerido error={errors.telefono?.message}>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="632 123 4567"
            {...props("telefono")}
            {...register("telefono")}
          />
        </Campo>

        <Campo id="correo" etiqueta="Correo electrónico" requerido error={errors.correo?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            {...props("correo")}
            {...register("correo")}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="nino" etiqueta="Nombre de la niña o el niño" requerido error={errors.nino?.message}>
          <input type="text" {...props("nino")} {...register("nino")} />
        </Campo>

        <Campo id="edad" etiqueta="Edad" requerido error={errors.edad?.message}>
          <select {...props("edad")} {...register("edad", { valueAsNumber: true })} defaultValue="">
            <option value="" disabled>
              Selecciona
            </option>
            {EDADES.map((e) => (
              <option key={e} value={e}>
                {e} años
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="experiencia" etiqueta="¿Ha estudiado inglés antes?" error={errors.experiencia?.message}>
          <select {...props("experiencia")} {...register("experiencia")} defaultValue="">
            <option value="">Sin especificar</option>
            {EXPERIENCIAS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="horario" etiqueta="Horario que les acomoda" error={errors.horario?.message}>
          <select {...props("horario")} {...register("horario")} defaultValue="">
            <option value="">Sin especificar</option>
            {HORARIOS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo id="mensaje" etiqueta="¿Algo que debamos saber?" error={errors.mensaje?.message}>
        <textarea rows={4} {...props("mensaje")} {...register("mensaje")} />
      </Campo>

      <div>
        <label htmlFor="privacidad" className="flex items-start gap-3">
          <input
            id="privacidad"
            type="checkbox"
            className="mt-1 h-6 w-6 shrink-0 rounded border-2 border-tinta accent-teal"
            aria-invalid={errors.privacidad ? true : undefined}
            aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
            {...register("privacidad")}
          />
          <span>
            Acepto que usen mis datos para contactarme sobre las clases. Leí el{" "}
            <a href="/aviso-de-privacidad" target="_blank" className="underline underline-offset-4">
              aviso de privacidad
            </a>
            .<span aria-hidden="true"> *</span>
          </span>
        </label>
        {errors.privacidad && (
          <p id="privacidad-error" role="alert" className="mt-1 text-sm font-semibold">
            {errors.privacidad.message}
          </p>
        )}
      </div>

      {errorEnvio && (
        <p role="alert" className="rounded-carta border-2 border-tinta bg-durazno p-4 font-semibold">
          {errorEnvio}
        </p>
      )}

      <Boton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </Boton>

      <p className="text-sm">
        Los campos con <span aria-hidden="true">*</span> son obligatorios.
      </p>
    </form>
  );
}
```

- [ ] **Step 3: Write the section**

`src/components/sections/Inscripcion.tsx`:

```tsx
import { site } from "@/content/site";
import { Seccion } from "@/components/ui/Seccion";
import { FormularioInscripcion } from "@/components/form/FormularioInscripcion";

export function Inscripcion() {
  const { inscripcion } = site;
  return (
    <Seccion
      id="inscripcion"
      fondo="maiz"
      eyebrow={inscripcion.eyebrow}
      titulo={inscripcion.titulo}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <p className="max-w-prose text-lg leading-relaxed">{inscripcion.texto}</p>
        <div className="rounded-carta border-2 border-tinta bg-crema p-6 sombra-dura sm:p-8">
          <FormularioInscripcion />
        </div>
      </div>
    </Seccion>
  );
}
```

- [ ] **Step 4: Verify the resolver import**

Run: `npx tsc --noEmit`

If `@hookform/resolvers/standard-schema` does not resolve, the installed version predates Standard Schema support. Fall back to the zod resolver:

```ts
import { zodResolver } from "@hookform/resolvers/zod";
// ...
resolver: zodResolver(inscripcionSchema),
```

Expected: no errors either way.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Campo.tsx src/components/form src/components/sections/Inscripcion.tsx
git commit -m "feat: formulario de inscripción"
```

---

### Task 10: Pages, composition, metadata, final verification

**Files:**
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`
- Create: `src/app/gracias/page.tsx`, `src/app/aviso-de-privacidad/page.tsx`, `src/app/not-found.tsx`
- Create: `public/robots.txt`
- Create: `README.md`

- [ ] **Step 1: Compose the landing page**

`src/app/page.tsx`:

```tsx
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
```

Zero copy in this file. To split to multipage later, move a section import into its own `app/<ruta>/page.tsx` — the component itself does not change.

- [ ] **Step 2: Write the thank-you page**

`src/app/gracias/page.tsx`:

```tsx
import type { Metadata } from "next";
import { site } from "@/content/site";
import { Boton } from "@/components/ui/Boton";

export const metadata: Metadata = {
  title: "Solicitud enviada",
  robots: { index: false },
};

export default function Gracias() {
  return (
    <main id="contenido" className="px-5 py-20 sm:px-8 md:py-32">
      <div className="mx-auto max-w-2xl rounded-carta border-2 border-tinta bg-maiz p-8 sombra-dura md:p-12">
        <p className="font-mano text-2xl text-teal">Listo</p>
        <h1 className="mt-2 text-4xl md:text-5xl">Recibimos tu solicitud</h1>
        <p className="mt-5 text-lg leading-relaxed">
          Te contactamos al teléfono o correo que dejaste para agendar la clase
          de prueba. Si tienes prisa, escríbenos directo al{" "}
          {site.escuela.telefono}.
        </p>
        <div className="mt-8">
          <Boton href="/">Volver al inicio</Boton>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Write the privacy notice**

`src/app/aviso-de-privacidad/page.tsx`:

```tsx
import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
};

export default function AvisoDePrivacidad() {
  const { escuela, privacidad } = site;

  return (
    <main id="contenido" className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-3xl space-y-6 leading-relaxed">
        <h1 className="text-4xl md:text-5xl">Aviso de privacidad</h1>

        <p>
          {privacidad.razonSocial}, con domicilio en {privacidad.domicilio}, es
          responsable del tratamiento de sus datos personales conforme a la Ley
          Federal de Protección de Datos Personales en Posesión de los
          Particulares.
        </p>

        <h2 className="pt-4 text-2xl">Qué datos recabamos</h2>
        <p>
          A través del formulario de inscripción recabamos el nombre del padre,
          madre o tutor, teléfono, correo electrónico, y el nombre y la edad de
          la niña o el niño que se desea inscribir. Los datos de menores de edad
          se recaban únicamente a través de su padre, madre o tutor.
        </p>

        <h2 className="pt-4 text-2xl">Para qué los usamos</h2>
        <p>
          Únicamente para contactarle sobre las clases, agendar una clase de
          prueba, y darle seguimiento a su solicitud de inscripción. No usamos
          estos datos con fines publicitarios ni los compartimos con terceros,
          salvo el proveedor de correo que nos entrega el mensaje del
          formulario.
        </p>

        <h2 className="pt-4 text-2xl">Derechos ARCO</h2>
        <p>
          Puede solicitar el acceso, rectificación, cancelación u oposición al
          tratamiento de sus datos escribiendo a {privacidad.correoContacto}.
          Responderemos su solicitud en los plazos que marca la ley.
        </p>

        <h2 className="pt-4 text-2xl">Cambios a este aviso</h2>
        <p>
          Cualquier cambio a este aviso se publicará en esta misma página.
        </p>

        <p className="pt-4">
          {escuela.nombre} &middot; {escuela.ciudad}
        </p>
      </div>
    </main>
  );
}
```

This is a working structure with the school's specifics marked. It is not legal advice — the owner should have someone confirm it matches how she actually handles the data.

- [ ] **Step 4: Write the not-found page**

`src/app/not-found.tsx`:

```tsx
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
```

- [ ] **Step 5: Finish metadata and robots**

Replace the `metadata` export in `src/app/layout.tsx`:

```tsx
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
```

`public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /gracias
```

- [ ] **Step 6: Write the README**

`README.md`:

```markdown
# Sitio de la escuela de inglés

Next.js + Tailwind. Español, para niñas y niños de 4 a 12 años.

## Correr en local

```bash
npm install
cp .env.local.example .env.local   # y pegar la access key real
npm run dev
```

## Antes de publicar

1. **Reemplazar los marcadores.** Todo lo que aparezca entre `[[DOBLES CORCHETES]]`
   está en `src/content/site.ts`. Ese es el único archivo que hay que editar
   para cambiar textos y datos de contacto.
2. **Sacar la access key de Web3Forms.** Ir a https://web3forms.com, poner el
   correo de la escuela, llega la clave por email. Pegarla en `.env.local` y
   también en las variables de entorno del hosting.
3. **Poner las fotos.** Guardarlas en `public/images/` y cambiar el bloque
   punteado del hero (`src/components/sections/Hero.tsx`) por un `next/image`.
4. **Pegar el mapa.** En Google Maps: Compartir › Insertar un mapa. El `iframe`
   va en `src/components/sections/Contacto.tsx`.
5. **Revisar el aviso de privacidad** con alguien que sepa. Están recabando
   datos de menores.

## Probar

```bash
npm test          # esquema del formulario y endpoint
npm run build     # que compile antes de publicar
```

## Publicar

Cualquier hosting que corra Next.js. Vercel o Netlify tienen plan gratis que
alcanza de sobra. Subir el repo, conectar, y agregar `WEB3FORMS_ACCESS_KEY`
en la configuración de variables de entorno del proyecto.

## Cambiar las fuentes

Las que están son sustitutos libres. Para poner Irene Florentina y More Sugar:
guardar los `.woff2` en `public/fonts/` y cambiar `src/lib/fonts.ts` a
`next/font/local`. Las variables CSS no cambian, así que ningún componente se toca.
```

- [ ] **Step 7: Full verification**

Run each and confirm:

```bash
npm test           # esperado: 21 pruebas en verde
npx tsc --noEmit   # esperado: sin errores
npm run build      # esperado: build exitoso
npm run dev
```

In the browser at `localhost:3000`, confirm:

1. All nine sections render top to bottom in order.
2. Every `[[MARCADOR]]` is visible on screen — none silently rendered as empty.
3. Header nav anchors scroll to the right sections; "Inscribir" reaches the form.
4. Resize to 360px wide: nothing overflows horizontally, all buttons stay tappable.
5. Tab through the whole page: every interactive element shows a teal focus ring, and the tab order is top to bottom. The honeypot input is never reached.
6. Submit the form empty: each required field shows a Spanish error, focus is not lost, and no network request fires.
7. Submit with a 9-digit phone: the phone error appears and nothing is sent.
8. Submit valid data immediately after page load: the request is rejected by the 3-second rule. Wait 3 seconds and submit again — with a real access key in `.env.local` it redirects to `/gracias` and an email arrives.
9. Turn on OS "Reduce motion": the lotería cards change instantly, the FAQ `+` does not rotate smoothly, and anchor scrolling jumps.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: páginas, composición de la landing y metadatos"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| Next.js + Tailwind v4 + TypeScript | 1 |
| Palette as `@theme` tokens | 1 |
| Free font substitutes, swappable in one file | 1 |
| Single content source with visible markers | 2 |
| Form fields and Spanish validation | 3 |
| Server re-validation, honeypot, timing check | 4 |
| Web3Forms forwarding with server-only key | 4 |
| WhatsApp floating button | 5, 6 |
| Nine landing sections | 8 |
| Working form with accessible errors | 9 |
| `/gracias` page | 10 |
| `/aviso-de-privacidad` with required consent | 9, 10 |
| Vitest on schema and route | 3, 4 |
| Multipage-ready composition | 8, 10 |

**Type consistency:** `site.programa.cartas` entries use keys `numero`, `es`, `en`, `figura`, `color` (Task 2) and `CartaLoteria` takes exactly those props (Task 7). `inscripcionSchema` field names (Task 3) match the `register()` calls (Task 9) and the destructuring in the route (Task 4). `EXPERIENCIAS` and `HORARIOS` are consumed by both the route's `etiqueta()` helper and the form's selects.

**Known risk:** Task 3 uses zod v4's top-level `z.email()`, and Task 9 uses `@hookform/resolvers/standard-schema`. Both tasks carry an explicit fallback if the installed version differs.
