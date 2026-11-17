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

    for (const v of ventas)
        if (v.ciudad.trim().toLowerCase() === buscada)
            total += valorVenta(v);


    return total;
}

console.log("--- 1. ARREGLO COMPLETO ---");
console.log("Total vendido:", totalVendido(ventas));
console.log("Unidades:", unidadesVendidas(ventas));
console.log("Venta mayor:", ventaMayor(ventas));
console.log("Ticket promedio:", ticketPromedio(ventas));
console.log("Ventas Medellín:", ventasPorCiudad(ventas, "medellín")); // o "medellín" según esté en datos.js

console.log("\n--- 2. UN SOLO ELEMENTO ---");
const unaVenta = [ventas[0]];
console.log("Total vendido:", totalVendido(unaVenta));
console.log("Unidades:", unidadesVendidas(unaVenta));
console.log("Venta mayor:", ventaMayor(unaVenta));
console.log("Ticket promedio:", ticketPromedio(unaVenta));
console.log("Ventas ciudad:", ventasPorCiudad(unaVenta, ventas[0].ciudad));

console.log("\n--- 3. ARREGLO VACÍO ---");
console.log("Total vendido:", totalVendido([]));
console.log("Unidades:", unidadesVendidas([]));
console.log("Venta mayor:", ventaMayor([]));
console.log("Ticket promedio:", ticketPromedio([]));
console.log("Ventas Medellín:", ventasPorCiudad([], "Medellín"));
