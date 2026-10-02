import site from '../data/site.json';

/**
 * Enlace a WhatsApp con un mensaje ya escrito.
 * Si todavía no hay número cargado en site.json, WhatsApp abre el mensaje
 * para que la persona elija el contacto (útil para probar).
 */
export function enlaceWhatsApp(mensaje = ''): string {
  const numero = site.whatsapp.numero.replace(/\D/g, '');
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${numero}${texto}`;
}

/** Enlace de reserva para un servicio: siempre pasa por el formulario. */
export function enlaceReserva(slugServicio?: string): string {
  return slugServicio ? `/reservar?servicio=${slugServicio}` : '/reservar';
}
