# Fotos del sitio

Guardá cada foto con **el nombre exacto** que figura abajo y la web la muestra sola en su lugar.
No hace falta tocar código. Sirve `.jpg`, `.jpeg`, `.png` o `.webp` (la extensión no importa).
Astro la achica y la pasa a WebP al publicar, así que podés subir la foto original del celular
(idealmente de 1500 a 2500 px de ancho y menos de 5 MB).

Mientras una foto no esté, se ve el bloque gris "Foto pendiente".

## inicio/

| Archivo | Dónde aparece | Formato |
| --- | --- | --- |
| `hero` | Foto grande de la portada | Vertical 4:5 (en celular se recorta a 4:3, dejá aire arriba y abajo) |
| `rincon` | Bloque de El Rincón de Luciérnaga | Horizontal 4:3 |

## valeria/

| Archivo | Dónde aparece | Formato |
| --- | --- | --- |
| `retrato` | Inicio y "Sobre Valeria" | Vertical 4:5 |
| `trabajando` | "Sobre Valeria" | Vertical 4:5 |
| `salon` | "Sobre Valeria" | Vertical 4:5 |
| `detalle` | "Sobre Valeria" | Vertical 4:5 |

## servicios/

Una foto por servicio, vertical 4:5. El nombre es el del archivo del servicio en `src/content/servicios/`:

`alisado`, `balayage`, `botox-capilar`, `color`, `color-fantasia`, `corte`, `extensiones-de-pestanas`,
`hidratacion`, `lavado-brushing-planchado`, `maquillaje`, `mechas-localizadas`, `nutricion`, `peinados`,
`perfilado-de-cejas`, `reflejos`, `shock-de-keratina`.

Ejemplo: `servicios/balayage.jpg`.

## galeria/

Nombre libre (ej.: `balayage-espalda-1.jpg`). Después, en `src/data/galeria.json`, poné ese nombre en
`"foto"` del trabajo (y en `"antes"` si es un antes/después) y `"autorizada": true` **solo si la clienta
dio permiso**. Sin permiso la foto no se publica aunque el archivo esté.

## instagram/

`1` a `6`: cuadradas 1:1. Son las miniaturas de la sección "Seguí los trabajos en Instagram" (cada una
lleva al perfil). Pueden ser capturas de publicaciones reales del perfil.
