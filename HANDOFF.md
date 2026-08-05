# Handoff — sitio de la escuela de inglés

Last updated: 2026-08-04. Read this first in a new session; it replaces the chat history.

Repo: `https://github.com/Babisimo/ceb_rainbow` (public).

---

## What this is

A Spanish-language marketing website for a children's English school in **Magdalena de Kino, Sonora, Mexico**, owned by the user's cousin. Students are **kids aged 4–12 only** — no adult learners anywhere in the copy.

The audience is **parents and guardians deciding whether to enroll**, not the kids. The site's one job is to get a working enrollment lead to the owner.

## Status: complete and merged

- Branch `feat/sitio-escuela` merged to `master` at `0c7a4bc`, branch deleted.
- **45 tests passing**, `tsc --noEmit` clean, `npm run build` succeeds (7 routes).
- Not deployed. Not launchable yet — see "Before launch" below.

```bash
npm install
npm run dev      # localhost:3000
npm test         # 45 tests
npm run build
```

---

## Stack

Next.js 15 (App Router) · TypeScript 5.9.3 · Tailwind CSS v4 · react-hook-form + zod v4 · vitest

**TypeScript is pinned to `^5.9.3` deliberately.** npm resolves TS 7.x, which breaks Next 15's `next.config.ts` loader with `Cannot read properties of undefined (reading 'fileExists')`. Do not "upgrade" it.

## Structure

```
src/
├── app/
│   ├── page.tsx                    ← composition only, ZERO copy
│   ├── layout.tsx                  ← Header, Footer, WhatsApp FAB, skip link
│   ├── globals.css                 ← palette tokens, @theme
│   ├── gracias/                    ← post-submit, noindex
│   ├── aviso-de-privacidad/        ← LFPDPPP notice
│   ├── not-found.tsx
│   └── api/inscripcion/route.ts    ← the security boundary
├── components/
│   ├── sections/   Hero Beneficios Programa Metodo Nosotros
│   │               Testimonios Preguntas Inscripcion Contacto
│   ├── layout/     Header Footer BotonWhatsApp
│   ├── form/       FormularioInscripcion
│   └── ui/         Boton Seccion Tarjeta Campo
│                   CartaLoteria TablaLoteria FiguraLoteria
├── content/site.ts                 ← ALL copy. Single source of truth.
└── lib/            schema.ts fonts.ts whatsapp.ts
```

Sections are **zero-prop** — each reads `site` directly. Splitting the landing page into multiple routes later is additive: create `app/programas/page.tsx`, import `<Programa />`, done. No component changes.

---

## Before launch — 3 blocking items

### 1. Replace the `[[MARCADORES]]`

Everything unknown is a visible `[[MARKER]]` in `src/content/site.ts` — **31 left**. They render on screen on purpose so the site cannot be published half-empty. Phone, WhatsApp, address, hours, socials, prices, testimonials, teacher bios, privacy-notice legal entity.

The school name is filled: **CEB Rainbow** (Centro Educativo Bilingüe Rainbow).

**Never invent values for these.** No plausible-looking fake phone numbers or testimonials.

### 2. Web3Forms access key

Sign up at web3forms.com with the school's email. Put the key in the **hosting provider's environment variables** as `WEB3FORMS_ACCESS_KEY` — not only in a local `.env.local`.

This is the silent-failure item. Wrong or missing key → every parent sees an error, the school hears nothing, and the only trace is a `console.error` nobody reads.

### 3. Send one real test submission after deploying

Confirm the email actually arrives. This is the only check that proves the chain works end to end.

---

## Invariants — do not break these

**No user-visible copy in components.** Every string lives in `src/content/site.ts`. This is load-bearing for the planned English/Spanish toggle. Accepted exceptions, already agreed: validation messages in `lib/schema.ts`, error strings in `api/inscripcion/route.ts`, the honeypot's `aria-hidden` "No llenar" label, and the two dashed developer placeholder boxes in Hero and Contacto.

**Contrast, verified against ink `#422F0E`:**

| Token | Hex | Ratio | Use |
|---|---|---|---|
| crema | `#FDF8F0` | 12.2:1 | page background |
| maiz | `#F7E9B2` | 10.6:1 | any text |
| menta | `#DDF2B8` | 10.6:1 | any text |
| lavanda | `#F9D4F8` | 9.7:1 | any text |
| ambar | `#FFD094` | 9.1:1 | **primary CTA** |
| durazno | `#FCC4C0` | 8.4:1 | any text |
| cielo | `#AECFD0` | 7.7:1 | any text |
| naranja | `#F49625` | 5.7:1 | any text |
| turquesa | `#57B1A8` | 5.1:1 | any text |
| **tomate** | `#EF6545` | **4.1:1** | **≥24px text only** |
| **rosa** | `#EA5E86` | **4.0:1** | **≥24px text only** |
| teal | `#037F71` | — | crema text only (4.6:1) |

- Tomato is **not** the CTA colour. White on tomato fails; chocolate on tomato fails at body size. The CTA is amber with ink text.
- **Never put opacity on text over teal.** It is at 4.6:1 with zero margin.
- Focus rings are teal, 3px, 2px offset. Never tomato — tomato is 2.98:1 on crema and fails the 3:1 non-text minimum.
- Error text uses default ink, **not red**. Red on crema fails contrast. Errors are signalled by border weight, `role="alert"`, and the message.

**Tailwind:** weights are `font-semibold` / `font-bold`. `font-600` and `font-700` are **not real utilities** and compile to nothing — that bug shipped 20 times in the original plan before it was caught. When adding a class you are unsure of, check the built stylesheet, don't trust the name.

`globals.css` uses `@import "tailwindcss" source("../");` to scope scanning to `src/`. A bare `@source` directive does **not** restrict the scan root — `@source` entries are concatenated, only `source()` on the import replaces the default.

**Fonts** are free substitutes for the cousin's requested paid faces (Irene Florentina, More Sugar are commercial). Currently Fredoka (display), Sue Ellen Francisco (handwriting accents, the one free face she asked for), Figtree (body). Swapping to licensed `.woff2` files is a change to `src/lib/fonts.ts` only — the CSS variables don't change, so no component is touched.

**Do not add a `weight` array to Fredoka.** It is a variable font (wght 300–700). Declaring weights forces next/font to download a static instance per weight — that shipped as 8 files, of which 400 and 500 were never used by anything. Removing the array cut the built stylesheet from 18 `@font-face` rules to 9. Figtree is also variable and correctly has no `weight`. Sue Ellen Francisco is single-weight static, so its `weight: "400"` is correct.

**Sue Ellen Francisco was trialled against Caveat 700 and kept.** Caveat has the heavier brush stroke that matches the logo, plus a bigger x-height so the `font-mano` accents actually read at 24px. It was rejected anyway: Sue Ellen is the owner's own pick, and that outranks the design argument. Do not re-propose the swap without asking her.

**Form ↔ route contract.** The form must send `website` (honeypot value) and `transcurrido` (elapsed ms since mount, computed **client-side**). The route rejects a non-empty honeypot and anything under 3000ms. Do not change this to send an absolute timestamp — that was a bug: comparing the phone's clock to the server's permanently blocked any parent whose phone ran fast.

---

## Design direction

Retro-print lotería aesthetic from the cousin's palette: flat saturated colours on cream, 2px ink borders, hard offset shadows with **zero blur**, chunky radius. No gradients anywhere, no soft-UI glows.

**Signature element:** in the Programa section, vocabulary is shown as a lotería board — 8 numbered cards that flip from Spanish to English on hover or tap. Lotería is the Mexican children's card game every family in Sonora knows, and teachers there use it to drill vocabulary. It demonstrates the method instead of describing it.

The reveal is a **cross-fade, not a 3D flip** — deliberate. Both faces stay in the DOM so a screen reader announces both words, which is the pedagogical point, and it avoids a class of `backface-visibility` bugs.

Card numbers are authentic (real lotería cards are numbered) so they carry information. **Do not add numbers to unordered sets** like Beneficios — that would be decoration. Metodo uses `<ol>` with numbers because a class genuinely happens in that order.

Hero deliberately plays it straight: headline, subhead, two CTAs, trust row, photo slot. The lotería board sits lower.

---

## Deferred work

**English/Spanish toggle** — user asked for it "down the line", explicitly deferred. Currently ~85–90% ready: `site.ts` holds ~95% of copy. Remaining ~40 strings across 8 files: `Header.tsx` (nav labels, `aria-label`, CTA), `Footer.tsx` (section headings, prefixes), `layout.tsx` (skip link + 6 metadata strings), `gracias/page.tsx`, `not-found.tsx`, `whatsapp.ts` default message, and `schema.ts`'s `EXPERIENCIAS`/`HORARIOS` option labels (these are user-visible `<option>` text and are **not** covered by the validation-message exemption). Biggest item: `aviso-de-privacidad/page.tsx` has ~12 legal strings needing a human translator. Plumbing still needed: make `site` a function of locale (it's a flat `as const`), un-hardcode `lang="es-MX"`, add a locale route segment. Estimate ≈ 1 day plus translation turnaround.

**Logo** — `marketing_sources/CEB-RAINBOW.jpeg` is the art the owner supplied. It is **not usable on the site as-is**, for two reasons:

1. It is a JPEG. No alpha channel — the background is real black pixels, not transparency. Need SVG (it is flat vector art) or a transparent PNG.
2. The "RAINBOW" wordmark is knocked out in **white**. On the crema page background it disappears. It works on the teal header (`Header.tsx:14`) and the teal footer at 4.9:1, and nowhere else. A second lockup with the wordmark in ink `#422F0E` or teal is needed for the favicon, the OG image, print, and any crema placement.

Also unresolved: the logo's teal for "Centro Educativo Bilingüe" reads lighter and brighter than the site's `--color-teal #037F71`. Two teals side by side in the header will look like a mistake. Sample the exact value off the vector and either retoken the site or have the logo matched.

The logo's coral rays are near-identical to `--color-tomate #EF6545`. The blue and purple rainbow bands have no equivalent in the token set — fine, the logo is an image, not a token.

**Photos** — Hero has a dashed placeholder box. Drop images in `public/images/` and replace the box with `next/image`.

**Google Maps** — Contacto has a dashed placeholder. Paste the embed iframe once the real address exists. `site.escuela.mapsUrl` is where the URL belongs (currently unwired, intentionally kept).

**Privacy notice legal review** — the site collects **minors' names and ages** and transmits them to Web3Forms, a third-party processor **outside Mexico**. The notice covers third-party disclosure but does **not** mention international transfer. LFPDPPP applies. Have a professional review before launch, not after.

**SEO** — no structured data, no sitemap. Once the real address exists, a `LocalBusiness` JSON-LD block is worth adding; a small-town school gets found by search.

**Testing scope** — 45 tests cover `lib/schema.ts` and the API route only. No component or E2E tests. Deliberate scope decision for a site this size.

---

## Typography audit — 2026-08-04

Source-level pass over fonts, contrast, headings and body copy. Not a visual pass; nothing was checked in a browser.

**Contrast: no failures.** Every colour-on-colour pair actually shipping was recomputed. teal on crema 4.6:1 carries the eyebrows at 24px and the stat/step numbers at 30px bold — all qualify as large text. The teal section's cards hand-set `text-tinta`. The placeholder `text-tinta/70` blends to `#7A6B52` on crema = **4.91:1**, so the fix for bug 11 held.

**Fixed in this pass:**

- `lib/fonts.ts` — dropped Fredoka's `weight` array. 18 `@font-face` rules → 9.
- `ui/Tarjeta.tsx` — added explicit `text-tinta`. The card sets `bg-crema` but inherited its text colour, so dropping one inside a `<Seccion fondo="teal">` would have rendered crema on crema. Not live at the time — Testimonios is the only teal section and it bypasses `Tarjeta` — but it was a trap for the next teal section.
- `sections/Preguntas.tsx` — the FAQ `<summary>` was styled like a heading but wasn't one, so screen-reader users had no heading list to jump between questions. Now wraps an `<h3>` (valid: `summary`'s content model admits heading content).
- `ui/Campo.tsx`, `form/FormularioInscripcion.tsx` — form errors moved off `text-sm` to base size. Errors carry no colour by design, so the text is the primary signal and shouldn't be the smallest thing on the page.

**Open, not fixed:**

- **Hole in the type scale.** h2 is 30/36/48px, h3 is 20px, nothing between. `Programa.tsx:32` already invents `text-2xl sm:text-3xl` for an h3 to fill the gap, so the same semantic level renders at two very different sizes on one page. Wants a real h3 token, not another one-off.
- **Sue Ellen Francisco is faint at `text-2xl`.** Tiny x-height, single 400 weight, hairline strokes; `-webkit-font-smoothing: antialiased` (`globals.css:48`) thins it further. Where it is also `text-teal` the 4.6:1 rides on hairlines — passes WCAG, reads weak. Bumping the eyebrows to `text-3xl` is the fix that doesn't touch her font choice.
- **Footer `<h2>` collides with section `<h2>`.** `Footer.tsx:15,25` — "Contacto" appears as an h2 twice on the page. Deliberately left: demoting to `<h3>` creates a level skip with no `<h2>` in the footer, which is worse. The real fix is renaming the footer column heading, and that is copy, so it belongs in `site.ts`.
- **`leading-relaxed` applied unevenly.** Present on card bodies, absent on `Contacto` dd, the `Footer` lists and `Hero.tsx:37` stat labels, which fall back to 1.5.
- **Fredoka and Figtree are both geometric sans.** Similar skeletons; display-vs-body separation rests on weight and size rather than letterform. Cosmetic, lowest priority, and it disappears if the licensed faces are ever bought.

## Bugs caught during the build

Context for why things are shaped the way they are. Every one of these was found by review, not by the code failing.

**Would have cost enrollments:**
1. Optional dropdowns (`experiencia`, `horario`) rejected their own default `""` value — `.optional()` accepts only `undefined`. Most parents skip those fields, so most submissions would have been blocked, in English. Fixed with `z.preprocess` normalizing `""` → `undefined`.
2. Web3Forms reports failure as `success: false` inside an **HTTP 200**. The route only checked `respuesta.ok`, so failed sends showed parents a thank-you page while nothing was emailed.
3. Anti-spam timer compared the phone's clock to the server's. A phone running fast was permanently blocked with no way to recover.
4. Every failure message said "escríbenos por WhatsApp" — but no WhatsApp button renders while the number is a placeholder, and with no access key **every** submission hits that branch. Now shows phone and email instead.

**Would have degraded the site:**
5. `font-600` / `font-700` — not real Tailwind utilities, 20 occurrences, all silently rendering at normal weight.
6. At 360px the header overflowed and pushed the "Inscribir" CTA off-screen entirely.
7. Click-to-flip on the lotería cards was dead on desktop — hover handlers stomped the clicked state on pointer-leave.
8. `Boton` dropped `onClick`/`aria-*` on its link variant; `...rest` was spread only onto the button branch.
9. Honeypot was decorative — the form always sent a literal `""` and never read the input.
10. Nav links were 40px tall against the stated 44px minimum.
11. Placeholder text at 2.84:1 contrast.
12. Moving form copy into `site.ts` flattened `<span aria-hidden>*</span>` into a bare `*`, so screen readers announced "asterisk" mid-sentence. Fixed by spelling the word.
13. Sticky header hid section headings on anchor navigation (no `scroll-mt`).

---

## Incident

A subagent ran `taskkill /F /IM chrome.exe` during cleanup and killed **all ~37 Chrome processes** on the machine, including the user's own browser and tabs. Tabs were recovered via session restore.

**Rule for any future browser automation:** never kill by image name. Launch with a dedicated `--user-data-dir`, record the PID, terminate only that PID.

---

## Reference docs

- `docs/superpowers/specs/2026-08-03-sitio-escuela-ingles-design.md` — the approved design/spec
- `docs/superpowers/plans/2026-08-03-sitio-escuela-ingles.md` — the 10-task implementation plan (note: its Task 3/4 code blocks are now stale relative to shipped `schema.ts` and `route.ts`)
- `README.md` — owner-facing deploy instructions, in Spanish
- `marketing_sources/` — the cousin's palette and font list
