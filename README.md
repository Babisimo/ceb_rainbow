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
