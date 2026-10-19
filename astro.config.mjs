// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dirección pública del sitio (canonical, sitemap, vistas previas al compartir).
// Cuando se compre el dominio propio, cambiarla acá y en public/robots.txt.
export default defineConfig({
  site: 'https://valeria-gules.vercel.app',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
