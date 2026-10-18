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
