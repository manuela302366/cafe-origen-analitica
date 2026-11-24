// 1. Versión instrumentada de totalVendido. Recorrido lineal (O(n)) — totalVendidoInst,
//  ventaMayorInst, totalPorCiudadInst
//Qué hacen: entran a un ciclo (for) que pasa uno por uno por los n elementos del arreglo.
function totalVendidoInst(ventas, contador) {
  let total = 0;

  for (let i = 0; i < ventas.length; i++) {   
    // +1 operación: visitamos el elemento en la posición i
    contador.ops += 1;
    const venta = ventas[i];       //revisan cada venta (ventas[i]) y evalúan condiciones en cada vuelt
    // +1 operación: comparamos para verificar que la venta tenga datos válidos
    contador.ops += 1;
    if (venta && venta.cantidad > 0 && venta.precio >= 0) {
      total += venta.cantidad * venta.precio;
    }
  }

  return total;
}



// 2. Versión instrumentada de ventaMayor
//En cada vuelta del ciclo (por cada venta válida), ejecuta 3 operaciones: 1) visita el elemento en la posición i, 2) compara para verificar que la venta tenga datos válidos, y 3) compara el monto actual contra el mayor encontrado hasta ahora.
function ventaMayorInst(ventas, contador) {
  let mayor = null;
  let maxMonto = -Infinity;

  for (let i = 0; i < ventas.length; i++) {
    // +1 operación: visitamos el elemento en la posición i
    contador.ops += 1;
    const venta = ventas[i];

    // +1 operación: comparamos para verificar que la venta tenga datos válidos
    contador.ops += 1;
    if (venta && venta.cantidad > 0 && venta.precio >= 0) {
      const monto = venta.cantidad * venta.precio;

      // +1 operación: comparamos el monto actual contra el mayor encontrado hasta ahora
      contador.ops += 1;
      if (monto > maxMonto) {
        maxMonto = monto;
        mayor = venta;
      }
    }
  }

  return mayor;
}

// 3. Versión instrumentada de totalPorCiudad
function totalPorCiudadInst(ventas, contador) {
  const totales = {};

  for (let i = 0; i < ventas.length; i++) {
    // +1 operación: visitamos el elemento en la posición i
    contador.ops += 1;
    const venta = ventas[i];
    
    // +1 operación: comparamos para verificar que la venta tenga datos válidos
    contador.ops += 1;
    if (venta && venta.cantidad > 0 && venta.precio >= 0) {
      const ciudad = String(venta.ciudad || "").trim();

      // +1 operación: comparamos/verificamos si la ciudad tiene nombre válido
      contador.ops += 1;
      if (ciudad.length > 0) {
        totales[ciudad] = (totales[ciudad] || 0) + venta.cantidad * venta.precio;
      }
    }
  }

  return totales;
}
// 4. Versión constante de primeraVenta (O(1))va directo a una posición exacta (ventas[0]) si el arreglo tiene datos.
//queda en 2 (1 por validar si el arreglo está vacío o no es arreglo, y 1 por acceder directamente a ventas[0]).
function primeraVentaInst(ventas, contador) {
  contador.ops += 1;
  if (!Array.isArray(ventas) || ventas.length === 0) {
    return null;
  }

  contador.ops += 1;
  return ventas[0];
}

module.exports = {
  totalVendidoInst,
  ventaMayorInst,
  totalPorCiudadInst,
  primeraVentaInst
};
