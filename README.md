# Valeria Salón de Belleza · sitio web

Sitio estático hecho con [Astro](https://astro.build). Sin backend: los turnos se piden por WhatsApp.

## Cómo correrlo

Necesitás **Node.js 22.12 o más nuevo** (https://nodejs.org).

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:4321 y se actualiza al guardar
npm run build    # genera la web final en /dist
npm run preview  # muestra /dist tal como quedaría publicada
```

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre, WhatsApp, dirección, horarios, redes, medios de pago | `src/data/site.json` |
| Servicios (texto, duración, precio, variantes, destacados) | `src/content/servicios/*.md` (un archivo por servicio) |
| Artículos de "Conocé tu cabello" | `src/content/consejos/*.md` |
| Galería (trabajos y categorías) | `src/data/galeria.json` |
| Preguntas y reglas de la guía "¿Qué tratamiento necesito?" | `src/data/guia.json` |
| Colores, tipografías, espaciados | `src/styles/global.css` (variables al principio) |
| Header, footer, tarjetas, barra de reserva | `src/components/` |
| Páginas | `src/pages/` |

- **Agregar un servicio:** copiar un `.md` de `src/content/servicios/`, renombrarlo (el nombre del archivo es la URL) y editar los datos. Aparece solo en Servicios, en Reservar y en el sitemap.
- **Precios:** campo `precioDesde` (número, sin puntos) o `null` para "a consultar". Actualizar también `preciosActualizados` en `site.json`.
- **Destacados del inicio:** `destacado: true` en el servicio; el orden lo da `orden`.

## Datos pendientes

- Lo que está entre `[corchetes]` en `site.json` falta completarlo.
- Los textos con recuadro amarillo punteado son **pendientes** (`<span class="pendiente">`). Para ocultarlos antes de publicar: `"mostrarPendientes": false` en `site.json`.
- Los artículos con `revisado: false` muestran "Borrador: falta la revisión de Valeria".
- **WhatsApp:** cargar el número en `site.json` → `whatsapp.numero` con formato `549` + código de área + número, sin espacios. Mientras esté vacío, WhatsApp abre el mensaje para elegir el contacto.
- **Fotos:** hoy son bloques grises (`Placeholder`). Cuando estén, guardarlas en `src/assets/` y reemplazar el `<Placeholder>` por `<Image>` de `astro:assets` (genera WebP y tamaños automáticos).
- **Logo:** hoy es el nombre escrito con la tipografía manuscrita (`src/components/Logo.astro`). Reemplazar por el SVG cuando llegue.
- **Dominio:** cambiar `site` en `astro.config.mjs` y la línea `Sitemap:` de `public/robots.txt`.

## Publicar

Subir el proyecto a GitHub y conectarlo con Netlify o Vercel (plan gratuito). Comando de build: `npm run build`, carpeta de salida: `dist`.
