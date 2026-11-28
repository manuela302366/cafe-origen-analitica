const {
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesDesdeMap
} = require('./analitica');
const { generarVentas } = require('./generador');

const tamanos = [1000, 10000, 100000];

for (const n of tamanos) {
  const ventas = generarVentas(n);
  console.log(`\n=== Tamaño: ${n} ventas ===`);

  if (n <= 10000) {
    const etiquetaOrig = `original (${n})`;
    console.time(etiquetaOrig);
    clientesRecurrentes(ventas);
    console.timeEnd(etiquetaOrig);
  } else {
    console.log('original (100000): omitida para evitar esperas largas por su escala cuadrática');
  }

  const etiquetaSet = `Set (${n})`;
  console.time(etiquetaSet);
  clientesRecurrentesSet(ventas);
  console.timeEnd(etiquetaSet);

  const etiquetaMap = `Map (${n})`;
  console.time(etiquetaMap);
  clientesRecurrentesDesdeMap(ventas);
  console.timeEnd(etiquetaMap);
}