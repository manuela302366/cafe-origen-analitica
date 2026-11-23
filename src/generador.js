//Catálogo fijo: productos y precios base de Café Origen
const PRODUCTOS = [
  { producto: "Origen Huila 500 g", precio: 42000 },
  { producto: "Origen Nariño 250 g", precio: 28000 },
  { producto: "Origen Sierra 500 g", precio: 39000 },
  { producto: "Prensa francesa", precio: 65000 },
  { producto: "Molino manual", precio: 85000 },
];
//Ciudades válidas donde se registran las ventas
const CIUDADES = ["Medellín", "Bogotá", "Cali", "Pereira"];


//  Ayuda: devuelve un número entero aleatorio entre min y max (ambos incluidos)
function aleatorioEntre(min, max) {                                      
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarVentas(n) {  
  const ventasGeneradas = [];                              // Aquí se acumularán las n ventas generadas
  const maxClientes = Math.max(1, Math.floor(n / 3));    //Límite superior de clientes (alrededor de n/3, mínimo 1)



  for (let i = 0; i < n; i++) {                                              //El ciclo for que crea cada venta
    const item = PRODUCTOS[aleatorioEntre(0, PRODUCTOS.length - 1)];        // elige producto + precio
    const ciudad = CIUDADES[aleatorioEntre(0, CIUDADES.length - 1)];        // elige ciudad
    const cliente = aleatorioEntre(1, maxClientes);                        // elige cliente
    const cantidad = aleatorioEntre(1, 5);                                 // elige cantidad entre 1 y 5
    const dia = String(aleatorioEntre(1, 28)).padStart(2, "0");              // día con dos dígitos (01..28)


    //Armamos el objeto de venta con la misma estructura del Día 1 y lo guardamos
    ventasGeneradas.push({
      id: i + 1,
      fecha: `2026-09-${dia}`,
      cliente,
      ciudad,
      producto: item.producto,
      cantidad,
      precio: item.precio,
    });
  }
  return ventasGeneradas;
}

module.exports = { generarVentas };