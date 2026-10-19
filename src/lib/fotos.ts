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

/** Fotos de la carpeta src/assets/fotos/servicios/<slug>/, ordenadas por nombre (1, 2, 10…). */
export function fotosDeServicio(slug: string): string[] {
  const prefijo = `servicios/${slug}/`.toLowerCase();
  return Object.keys(archivos)
    .map(relativa)
    .filter((r) => r.toLowerCase().startsWith(prefijo))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
}

/**
 * Foto principal de un servicio: "portada.*" dentro de su carpeta; si no hay,
 * la primera de la carpeta; si la carpeta está vacía, servicios/<slug>.* (forma anterior).
 */
export function portadaServicio(slug: string): string {
  const fotos = fotosDeServicio(slug);
  return fotos.find((f) => /\/portada\.[a-z0-9]+$/i.test(f)) ?? fotos[0] ?? `servicios/${slug}`;
}
