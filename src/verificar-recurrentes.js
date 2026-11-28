const ventas = require('./datos');

const {
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesDesdeMap
} = require('./analitica');
const { generarVentas } = require('./generador');

const ordenar = (arr) =>
  [...arr].sort((a, b) => String(a).localeCompare(String(b)));

const ventas5k = generarVentas(5000);

const orig5k = ordenar(clientesRecurrentes(ventas5k));
const set5k = ordenar(clientesRecurrentesSet(ventas5k));
const map5k = ordenar(clientesRecurrentesDesdeMap(ventas5k));

console.log('\n--- 5k: original, Set y Map ---');
console.log('5k original vs Set:', JSON.stringify(orig5k) === JSON.stringify(set5k));
console.log('5k original vs Map:', JSON.stringify(orig5k) === JSON.stringify(map5k));
console.log('Total recurrentes en 5k:', set5k.length);

const soloEnOrig = orig5k.filter((x) => !set5k.includes(x));
const soloEnSet = set5k.filter((x) => !orig5k.includes(x));
console.log('Solo en original:', soloEnOrig.slice(0, 10));
console.log('Solo en Set:', soloEnSet.slice(0, 10));

const origDatos = ordenar(clientesRecurrentes(ventas));
const setDatos = ordenar(clientesRecurrentesSet(ventas));
const mapDatos = ordenar(clientesRecurrentesDesdeMap(ventas));

console.log('\n--- datos.js: original, Set y Map ---');
console.log('datos original vs Set:', JSON.stringify(origDatos) === JSON.stringify(setDatos));
console.log('datos original vs Map:', JSON.stringify(origDatos) === JSON.stringify(mapDatos));
console.log('Recurrentes en datos.js:', setDatos);