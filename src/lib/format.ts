const pesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

/** 35000 → "$ 35.000" · null → "A consultar" */
export function precio(valor: number | null | undefined): string {
  return typeof valor === 'number' ? pesos.format(valor) : 'A consultar';
}

/** Precio "desde" para tarjetas y fichas. */
export function precioDesde(valor: number | null | undefined): string {
  return typeof valor === 'number' ? `Desde ${pesos.format(valor)}` : 'Precio a consultar';
}

export const categorias = {
  cabello: 'Cabello',
  peinados: 'Peinados',
  belleza: 'Belleza',
} as const;

export type Categoria = keyof typeof categorias;
