const { totalCiudadCadena, totalCiudadUnaPasada } = require("./analitica");
// Cambia la ruta y el nombre según el archivo de tu generador de ventas:
const { generarVentas } = require("./generador");

// 1. Creamos 10.000 ventas de prueba con el generador
const ventas10k = generarVentas(10000);
const ciudadPrueba = "Medellín";

// 2. Calculamos con ambas funciones sobre el mismo arreglo
const resultadoCadena = totalCiudadCadena(ventas10k, ciudadPrueba);
const resultadoUnaPasada = totalCiudadUnaPasada(ventas10k, ciudadPrueba);

// 3. Mostramos resultados y comprobamos igualdad exacta
console.log("\n--- para 10000 ventas ---");
console.log("Cadena (10.000):", resultadoCadena);
console.log("Una pasada (10.000):", resultadoUnaPasada);
console.log("¿Son exactamente iguales?:", resultadoCadena === resultadoUnaPasada);