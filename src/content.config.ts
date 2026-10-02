import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Servicios: un archivo .md por servicio en src/content/servicios/.
 * El nombre del archivo es la URL: balayage.md → /servicios/balayage
 * El cuerpo del .md es la "información ampliada" de la página del servicio.
 */
const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    nombre: z.string(),
    categoria: z.enum(['cabello', 'peinados', 'belleza']),
    resumen: z.string(),
    // Duración que se muestra (texto) y en minutos (para una futura agenda).
    duracion: z.string().optional(),
    duracionMin: z.number().optional(),
    frecuencia: z.string().optional(),
    // Precio "desde", en pesos. null = se consulta.
    precioDesde: z.number().nullable().default(null),
    // Variantes con su propio precio (ej.: pestañas clásico / 2D / 3D).
    variantes: z
      .array(z.object({ nombre: z.string(), precio: z.number().nullable() }))
      .default([]),
    destacado: z.boolean().default(false),
    orden: z.number().default(100),
    // Texto descriptivo de la foto que falta (se muestra en el placeholder).
    foto: z.string().default('Resultado del servicio'),
    relacionados: z.array(z.string()).default([]),
    consejos: z.array(z.string()).default([]),
    seoDescripcion: z.string().optional(),
    // Datos que todavía hay que confirmar con Valeria.
    pendiente: z.string().optional(),
  }),
});

/** Artículos de "Conocé tu cabello". */
const consejos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/consejos' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    tema: z.string(),
    fecha: z.coerce.date(),
    servicios: z.array(z.string()).default([]),
    // false = borrador que Valeria todavía no revisó (se marca en la web).
    revisado: z.boolean().default(false),
  }),
});

export const collections = { servicios, consejos };
