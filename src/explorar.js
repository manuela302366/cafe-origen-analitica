const ventas = require('./datos.js');

console.log("cantidad de registros:", ventas.length);
console.log("primer registro:", ventas[0]);
console.log("ultimo registro:", ventas[ventas.length - 1]);
console.log("producto del registro en la posicion 4:", ventas[4].producto);

console.log("Tabla completa:");
console.table(ventas);
