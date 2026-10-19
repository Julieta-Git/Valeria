import type { ImageMetadata } from 'astro';

// Todas las fotos cargadas en src/assets/fotos/ (cualquier subcarpeta).
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/fotos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const sinExtension = (ruta: string) => ruta.replace(/\.[a-z0-9]+$/i, '').toLowerCase();

/** Busca una foto por su ruta dentro de src/assets/fotos/, con o sin extensión. */
export function buscarFoto(src?: string | null): ImageMetadata | undefined {
  if (!src) return undefined;
  const clave = sinExtension(src);
  const encontrada = Object.entries(archivos).find(([ruta]) => sinExtension(ruta.replace('../assets/fotos/', '')) === clave);
  return encontrada?.[1].default;
}

const relativa = (ruta: string) => ruta.replace('../assets/fotos/', '');

// "antes.jpg", "despues-2.jpg", "después 3.jpg"… → ['antes' | 'despues', número de par]
const parteDePar = (ruta: string): ['antes' | 'despues', string] | null => {
  const m = ruta.match(/\/(antes|despu[eé]s)[\s_-]*(\d*)\.[a-z0-9]+$/i);
  if (!m) return null;
  return [m[1].toLowerCase().startsWith('antes') ? 'antes' : 'despues', m[2] || '1'];
};

const deCarpeta = (slug: string) => {
  const prefijo = `servicios/${slug}/`.toLowerCase();
  return Object.keys(archivos)
    .map(relativa)
    .filter((r) => r.toLowerCase().startsWith(prefijo))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
};

/**
 * Fotos sueltas de la carpeta src/assets/fotos/servicios/<slug>/, ordenadas
 * por nombre (1, 2, 10…). No incluye las de antes y después.
 */
export function fotosDeServicio(slug: string): string[] {
  return deCarpeta(slug).filter((r) => !parteDePar(r));
}

/**
 * Pares de antes y después de la carpeta del servicio: "antes" + "despues",
 * "antes-2" + "despues-2", etc. Un par se muestra solo si están las dos fotos.
 */
export function paresAntesDespues(slug: string): { antes: string; despues: string }[] {
  const pares = new Map<string, { antes?: string; despues?: string }>();
  for (const r of deCarpeta(slug)) {
    const parte = parteDePar(r);
    if (!parte) continue;
    const [lado, n] = parte;
    pares.set(n, { ...pares.get(n), [lado]: r });
  }
  return [...pares.entries()]
    .sort(([a], [b]) => Number(a) - Number(b))
    .flatMap(([, p]) => (p.antes && p.despues ? [{ antes: p.antes, despues: p.despues }] : []));
}

/**
 * Foto principal de un servicio: "portada.*" dentro de su carpeta; si no hay,
 * la primera de la carpeta; si solo hay antes y después, el después; si está
 * vacía, servicios/<slug>.* (forma anterior).
 */
export function portadaServicio(slug: string): string {
  const fotos = fotosDeServicio(slug);
  return fotos.find((f) => /\/portada\.[a-z0-9]+$/i.test(f)) ?? fotos[0] ?? paresAntesDespues(slug)[0]?.despues ?? `servicios/${slug}`;
}
