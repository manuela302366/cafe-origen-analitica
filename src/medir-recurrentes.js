// Paso 3 minireto 6 semana 1 script de prueba de rendimiento   comparar las ventas entre sí para detectar qué clientes repiten compra
// tiempo que tardó clientesRecurrentes en buscar clientes repetidos comparando unas ventas con otras..
const { generarVentas } = require("./generador");
const { clientesRecurrentes } = require("./analitica");

const tamanos = [1000, 2000, 4000, 8000, 16000];

console.log("\n--- Clientes Recurrentes ---");
for (const n of tamanos) {
  const ventas = generarVentas(n);
  const etiqueta = `n=${n}`;
  

  console.time(etiqueta);
  clientesRecurrentes(ventas);
  console.timeEnd(etiqueta);
}