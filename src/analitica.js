const ventas = require('./datos');



const valorVenta = (venta) => venta.cantidad * venta.precio;


function totalVendido(ventas) {
  let total = 0;
  for (const v of ventas) total += valorVenta(v);
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const v of ventas) unidades += v.cantidad;
  return unidades;
}

// Devuelve el registro completo, no solo el valor
function ventaMayor(ventas) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas)
   if (valorVenta(v) > valorVenta(mayor)) mayor = v;
  return mayor;
}

// Total ÷ cantidad de ventas válidas (cantidad > 0)
function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVenta(v);
      validas++;
    }
  }
  return validas === 0 ? 0 : total / validas;
}

// Ignora mayúsculas y espacios sobrantes
function ventasPorCiudad(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const v of ventas) if (v.ciudad.trim().toLowerCase() === buscada) total += valorVenta(v);
  return total;
}

