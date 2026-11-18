const ventas = require('./datos');
const { 
    totalVendidoM, 
    unidadesVendidasM, 
    totalPorCiudad, 
    unidadesPorProducto, 
    topProductosPorValor 
} = require('./analitica');

console.log("==========================================");
console.log("      INFORME DE NEGOCIO - CAFÉ ORIGEN    ");
console.log("==========================================\n");

// 1. Resumen General
console.log("--- RESUMEN GENERAL ---");
const totalGeneral = totalVendidoM(ventas);
const totalUnidades = unidadesVendidasM(ventas);
console.log(`Total General Vendido: $${totalGeneral}`);
console.log(`Total Unidades Vendidas: ${totalUnidades}`);

// 2. Ventas por Ciudad
console.log("\n--- VENTAS POR CIUDAD ---");
const porCiudad = totalPorCiudad(ventas);
for (const [ciudad, valor] of Object.entries(porCiudad)) {
    console.log(`- ${ciudad}: $${valor}`);
}

// 3. Unidades por Producto
console.log("\n--- UNIDADES POR PRODUCTO ---");
const prodUnidades = unidadesPorProducto(ventas);
for (const [producto, cant] of Object.entries(prodUnidades)) {
    console.log(`- ${producto}: ${cant} unidades`);
}

// 4. Top 3 Productos por Valor
console.log("\n--- TOP 3 PRODUCTOS POR VALOR ---");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((prod, index) => {
    console.log(`${index + 1}. ${prod}`);
});