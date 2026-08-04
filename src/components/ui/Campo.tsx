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
