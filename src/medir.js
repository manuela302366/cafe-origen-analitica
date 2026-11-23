const { generarVentas } = require("./generador");
const {
  totalVendidoInst,
  ventaMayorInst,
  totalPorCiudadInst,
  primeraVentaInst,
} = require("./instrumentadas");

const tamanos = [100, 1000, 10000, 100000];   //define los cuatro escenarios de volumen de ventas que vas a probar.
const resultados = [];                     //Crea un arreglo vacío donde iremos guardando un objeto por cada tamaño n con sus respectivas cantidades de operaciones (ops).

for (const n of tamanos) {            //Inicia un ciclo que toma un valor de tamanos a la vez: primero n = 100, luego n = 1000, después n = 10000 y al final n = 100000.
//Crear contadores independientes para cada función
  const ventas = generarVentas(n);       //Genera un arreglo nuevo de n ventas aleatorias para ese tamaño y lo guarda en ventas. Hacerlo una vez por n garantiza que todas las funciones prueben sobre el mismo lote de datos en esa vuelta.
  const contadorTotal = { ops: 0 };        //ops: 0: cada función recibe su propio objeto contador para que las operaciones de una no se mezclen con las de otra.
  const contadorMayor = { ops: 0 };
  const contadorCiudad = { ops: 0 };
  const contadorPrimera = { ops: 0 };

//lama a cada función pasándole ventas y su propio objeto contador... por referencia.
  totalVendidoInst(ventas, contadorTotal);
  ventaMayorInst(ventas, contadorMayor);
  totalPorCiudadInst(ventas, contadorCiudad);
  primeraVentaInst(ventas, contadorPrimera);


  //Guardar la fila de resultados y mostrar la tabla
  resultados.push({
    n,
    totalVendidoOps: contadorTotal.ops,
    ventaMayorOps: contadorMayor.ops,
    totalPorCiudadOps: contadorCiudad.ops,
    primeraVentaOps: contadorPrimera.ops,
  });
}

console.table(resultados);




