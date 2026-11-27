const {
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesDesdeMap
} = require('./analitica');
const { generarVentas } = require('./generador');

const ventas5k = generarVentas(5000);

const orig5k = [...clientesRecurrentes(ventas5k)].sort();
const set5k = [...clientesRecurrentesSet(ventas5k)].sort();
const map5k = [...clientesRecurrentesDesdeMap(ventas5k)].sort();

console.log("\n--- original, Set y Map ---");
console.log('5k original vs Set:', JSON.stringify(orig5k) === JSON.stringify(set5k));
console.log('5k original vs Map:', JSON.stringify(orig5k) === JSON.stringify(map5k));
console.log('Total recurrentes en 5k:', set5k.length);