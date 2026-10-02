// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: reemplazar por el dominio definitivo cuando esté comprado.
export default defineConfig({
  site: 'https://www.valeriasalon.com.ar',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
