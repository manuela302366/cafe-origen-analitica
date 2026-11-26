const ventas = require("./datos");
const {
  totalVendidoM,
  unidadesVendidasM,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,

} = require("./analitica");

const formatoCOP = (valor) =>
  Number(valor || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const totalGeneral = totalVendidoM(ventas);
const totalUnidades = unidadesVendidasM(ventas);
const promedioTicket = ticketPromedio(ventas);
const mayorVenta = ventaMayor(ventas);
const porCiudad = totalPorCiudad(ventas);
const porProducto = unidadesPorProducto(ventas);
const top3 = topProductosPorValor(ventas, 3);

console.log("==========================================================");
console.log("         CAFÉ ORIGEN - REPORTE DE NEGOCIO (v0.1)");
console.log("==========================================================\n");

// 1. Resumen general
console.log("--- 1. RESUMEN GENERAL ---");
console.log(`${"Total vendido:".padEnd(24)} ${formatoCOP(totalGeneral)}`);
console.log(`${"Unidades vendidas:".padEnd(24)} ${totalUnidades}`);
console.log(`${"Ticket promedio:".padEnd(24)} ${formatoCOP(promedioTicket)}`);
console.log(
  `${"Venta mayor:".padEnd(24)} ${
    mayorVenta
      ? `${mayorVenta.producto} (${formatoCOP(mayorVenta.cantidad * mayorVenta.precio)})`
      : "Sin ventas"
  }`
);

// 2. Ventas por ciudad
console.log("\n--- 2. VENTAS POR CIUDAD ---");
for (const [ciudad, valor] of Object.entries(porCiudad)) {
  console.log(`${ciudad.padEnd(24)} ${formatoCOP(valor)}`);
}

// 3. Unidades por producto
console.log("\n--- 3. UNIDADES POR PRODUCTO ---");
for (const [producto, cantidad] of Object.entries(porProducto)) {
  console.log(`${producto.padEnd(24)} ${cantidad} unidades`);
}

// 4. Top 3 de productos por valor
console.log("\n--- 4. TOP 3 PRODUCTOS POR VALOR ---");
top3.forEach((producto, indice) => {
  console.log(`${`${indice + 1}. ${producto}`.padEnd(24)}`);
});

// 5. Resumen por día (día con ventas vs. día sin ventas)
console.log("\n--- 5. RESUMEN POR DÍA ---");
const fechaConVentas = "2026-09-01";
const ventasDiaCon = ventasDelDia(ventas, fechaConVentas);
console.log(
  `Día ${fechaConVentas} (con ventas) : ${ventasDiaCon.length} ventas | Total: ${formatoCOP(
    totalVendidoM(ventasDiaCon)
  )} | Ticket prom.: ${formatoCOP(ticketPromedio(ventasDiaCon))}`
);

const fechaSinVentas = "2026-09-10";
const ventasDiaSin = ventasDelDia(ventas, fechaSinVentas);
console.log(
  `Día ${fechaSinVentas} (sin ventas) : ${ventasDiaSin.length} ventas | Total: ${formatoCOP(
    totalVendidoM(ventasDiaSin)
  )} | Ticket prom.: ${formatoCOP(ticketPromedio(ventasDiaSin))}`
);
console.log("\n--- Clientes Recurrentes ---");
console.log("Clientes recurrentes:", clientesRecurrentes(ventas));

console.log("\n--- Total ciudad cadena ---");
console.log("Total ciudad (cadena):", totalCiudadCadena(ventas, "Medellín"));

console.log("--- Total ciudad una pasada ---");
console.log("Total ciudad (una pasada):", totalCiudadUnaPasada(ventas, "Medellín"));