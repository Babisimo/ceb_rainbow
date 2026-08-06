# CEB Rainbow — school website

Marketing site for **CEB Rainbow** (Centro Educativo Bilingüe Rainbow), a bilingual
preschool for kids aged 1–4 in Magdalena de Kino, Sonora. Full school day, roughly
60% English / 40% Spanish, groups Nido / Nido 1 / Kinder 1.

The site itself is in Spanish and stays that way — its audience is local parents.
This README is in English for whoever is maintaining the code.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · react-hook-form + zod · vitest

> For architecture, design decisions and the reasoning behind how things are
> built, read **[HANDOFF.md](./HANDOFF.md)** first. It is the authoritative doc.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then paste the real access key
npm run dev                        # localhost:3000
```

## Test

```bash
npm test          # 46 tests — form schema and API endpoint
npm run build     # must compile before you deploy
npx tsc --noEmit  # type check
```

## Deploying a preview to Vercel

Useful for showing work in progress to the owner before anything is final.

1. Go to [vercel.com/new](https://vercel.com/new), import `Babisimo/ceb_rainbow`.
2. Framework preset auto-detects as Next.js. Leave the build settings alone.
3. Deploy. You get a public `*.vercel.app` URL.

**Expect the preview to look unfinished, on purpose.** Anything still unknown
renders on screen as a visible `[[MARKER]]` — email, Facebook URL, per-group age
ranges, testimonials, teacher names. That is deliberate: it makes it impossible
to publish the site half-empty by accident. Tell the owner the brackets are
placeholders waiting on her, not bugs.

**The enrollment form will fail on a preview** unless you add the environment
variable below. With no key, every submission hits the error branch and shows a
fallback message pointing at the school's phone and email — which are themselves
still `[[MARKERS]]`. If you want the form working in the preview, set
`WEB3FORMS_ACCESS_KEY` in Vercel under *Settings › Environment Variables*, then
redeploy. Environment variables are not applied to existing deployments.

Every push to `master` triggers a new deployment, so the owner can keep the same
URL while updates land.

## Before going live

1. **Replace the markers.** Everything in `[[DOUBLE BRACKETS]]` lives in
   `src/content/site.ts`. That is the only file to edit for copy and contact
   details. **Never invent values** — no placeholder phone numbers, no made-up
   testimonials. 22 markers left.
   The most urgent one is `escuela.whatsapp`. The brochure lists a single number,
   632 112 0929, and it is unconfirmed whether that line takes WhatsApp. While it
   stays a marker, `urlWhatsApp()` returns `"#"` and every WhatsApp button hides
   itself — so the site currently has no WhatsApp channel at all. Confirm with the
   owner and paste the 10 digits.
2. **Get the Web3Forms access key.** Sign up at <https://web3forms.com> with the
   school's email; the key arrives by email. Put it in `.env.local` for local
   work **and** in the hosting provider's environment variables. This is the
   silent-failure item: a wrong or missing key means every parent sees an error,
   the school hears nothing, and the only trace is a `console.error` nobody reads.
3. **Send one real test submission after deploying.** Confirm the email actually
   arrives. It is the only check that proves the chain works end to end.
4. **Add the photos.** Drop them in `public/images/` and replace the dashed
   placeholder in `src/components/sections/Hero.tsx` with a `next/image`.
5. **Paste the map.** Google Maps › Share › Embed a map. The `iframe` goes in
   `src/components/sections/Contacto.tsx`.
6. **Have the privacy notice reviewed by a professional.** The site collects
   minors' names and ages and transmits them to Web3Forms, a third-party
   processor outside Mexico. LFPDPPP applies. Review before launch, not after.

## Editing content

All user-facing copy lives in `src/content/site.ts`. Components hold none of it.
This is load-bearing for the planned Spanish/English toggle — keep it that way.

## Changing the fonts

The current faces are free substitutes. To use the licensed Irene Florentina and
More Sugar: save the `.woff2` files in `public/fonts/` and switch
`src/lib/fonts.ts` over to `next/font/local`. The CSS variables do not change, so
no component is touched.

Two rules, both explained in HANDOFF.md: do not add a `weight` array to Fredoka
(it is a variable font, declaring weights makes it download a static file per
weight), and do not swap out Sue Ellen Francisco — it is the owner's own pick.
