// 1. Versión instrumentada de totalVendido
function totalVendidoInst(ventas, contador) {
  let total = 0;

  for (let i = 0; i < ventas.length; i++) {
    // +1 operación: visitamos el elemento en la posición i
    contador.ops += 1;
    const venta = ventas[i];

    // +1 operación: comparamos para verificar que la venta tenga datos válidos
    contador.ops += 1;
    if (venta && venta.cantidad > 0 && venta.precio >= 0) {
      total += venta.cantidad * venta.precio;
    }
  }

  return total;
}
// 2. Versión instrumentada de ventaMayor
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

module.exports = {
  totalVendidoInst,
  ventaMayorInst,
  totalPorCiudadInst,
};