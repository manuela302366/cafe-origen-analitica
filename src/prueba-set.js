const { clientesRecurrentesSet } = require('./analitica');

console.log("\n--- clientes recurrentes set ---");
// Casos borde y casos normales
console.log('Vacío:', clientesRecurrentesSet([]));
console.log('Un solo registro:', clientesRecurrentesSet([{ cliente: 'C01' }]));
console.log('Sin recurrentes:', clientesRecurrentesSet([{ cliente: 'C01' }, { cliente: 'C02' }]));
console.log(
  'Recurrentes con repeticiones múltiples:',
  clientesRecurrentesSet([
    { cliente: 'C01' },
    { cliente: 'C02' },
    { cliente: 'C01' },
    { cliente: 'C03' },
    { cliente: 'C01' },
    { cliente: 'C02' }
  ])
);