import { getCollection } from 'astro:content';
import galeria from '../data/galeria.json';
import { fotosDeServicio } from './fotos';

export interface Trabajo {
  categoria: string;
  servicio: string | null;
  tipo: string; // 'resultado' | 'antes-despues' | 'salon'
  descripcion: string;
  foto: string | null; // archivo en fotos/galeria/ (trabajos de galeria.json)
  antes?: string | null;
  clave?: string; // ruta para <Foto src>
}

/**
 * Todos los trabajos que se publican: primero las fotos reales de galeria.json
 * (solo autorizadas), después las de las carpetas de cada servicio y al final
 * los lugares pendientes de galeria.json. Si un servicio ya tiene fotos en su
 * carpeta, sus lugares pendientes dejan de mostrarse.
 */
export async function trabajosPublicables(): Promise<Trabajo[]> {
  const servicios = (await getCollection('servicios')).sort((a, b) => a.data.orden - b.data.orden);
  const deCarpetas: Trabajo[] = servicios.flatMap((s) => {
    const categoria = galeria.items.find((g) => g.servicio === s.id)?.categoria ?? s.data.nombre;
    return fotosDeServicio(s.id).map((clave, i) => ({
      categoria,
      servicio: s.id,
      tipo: 'resultado',
      descripcion: `${s.data.nombre}, trabajo ${i + 1}`,
      foto: null,
      clave,
    }));
  });
  const conCarpeta = new Set(deCarpetas.map((t) => t.servicio));
  const items = galeria.items as Trabajo[];
  const reales = items.filter((g) => g.foto && (g as { autorizada?: boolean }).autorizada).map((g) => ({ ...g, clave: `galeria/${g.foto}` }));
  const pendientes = items.filter((g) => !g.foto && !(g.servicio && conCarpeta.has(g.servicio)));
  return [...reales, ...deCarpetas, ...pendientes];
}

/** Categorías con al menos un trabajo, en el orden de galeria.json. */
export function categoriasUsadas(trabajos: Trabajo[]): string[] {
  const todas = [...galeria.categorias, ...trabajos.map((t) => t.categoria)];
  return [...new Set(todas)].filter((c) => trabajos.some((t) => t.categoria === c));
}
