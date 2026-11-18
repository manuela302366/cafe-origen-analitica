const ventas = require('./datos');
const { 
    totalVendido, 
    totalVendidoM, 
    unidadesVendidas, 
    unidadesVendidasM, 
    totalPorCiudad, 
    unidadesPorProducto, 
    topProductosPorValor 
} = require('./analitica');

console.log("--- VERIFICACIÓN GENERAL DE INDICADORES ---\n");

// 1. Par: totalVendido vs totalVendidoM
const res1Ciclo = totalVendido(ventas);
const res1Metodo = totalVendidoM(ventas);
console.log("Total Vendido:", res1Ciclo === res1Metodo ? "OK" : "DIFERENTE");

// 2. Par: unidadesVendidas vs unidadesVendidasM
const res2Ciclo = unidadesVendidas(ventas);
const res2Metodo = unidadesVendidasM(ventas);
console.log("Unidades Vendidas:", res2Ciclo === res2Metodo ? "OK" : "DIFERENTE");

// 3. Verificación de Total por Ciudad
console.log("\n--- 3. TOTAL POR CIUDAD ---");
console.log(totalPorCiudad(ventas));

// 4. Verificación de Unidades por Producto
console.log("\n--- 4. UNIDADES POR PRODUCTO ---");
console.log(unidadesPorProducto(ventas));

// 5. Verificación de Top Productos por Valor (Top 3)
console.log("\n--- 5. TOP 3 PRODUCTOS POR VALOR ---");
console.log(topProductosPorValor(ventas, 3));
