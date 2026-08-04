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
