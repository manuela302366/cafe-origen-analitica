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


// ==========================================
// TUS FUNCIONES NUEVAS CON MÉTODOS DE ARREGLO
// ==========================================

// 1. Reemplaza totalVendido por totalVendidoM usando reduce:
const totalVendidoM = (ventasArray) => 
    ventasArray.reduce((acumulador, v) => acumulador + valorVenta(v), 0);

// 2. Reemplaza unidadesVendidas por unidadesVendidasM usando reduce:
const unidadesVendidasM = (ventasArray) => 
    ventasArray.reduce((acumulador, v) => acumulador + v.cantidad, 0);

// 3. Reemplaza ventasPorCiudad por ventasPorCiudadM usando reduce (con normalización):

   const ventasPorCiudadM = (ventasArray, ciudad) => {
  const buscada = ciudad.trim().toLowerCase();
  return ventasArray
    .filter((v) => v.ciudad.trim().toLowerCase() === buscada)
    .reduce((acumulador, v) => acumulador + valorVenta(v), 0);
};


// Filtra las ventas de una fecha exacta (devuelve un arreglo nuevo sin mutar)
function ventasDelDia(ventas, fecha) {
  const fechaBuscada = String(fecha || "").trim();
  return ventas.filter((v) => String(v.fecha || "").trim() === fechaBuscada);
}


function totalPorCiudad(ventasArray) {
    return ventasArray.reduce((grupos, v) => {
        const clave = v.ciudad.trim().toLowerCase();
      
        const ciudadFormateada = 
            clave === 'medellín' ? 'Medellín' :
            clave === 'bogotá' ? 'Bogotá' :
            clave === 'cali' ? 'Cali' : 'Pereira';

        grupos[ciudadFormateada] = (grupos[ciudadFormateada] || 0) + valorVenta(v);
        return grupos;
    }, {});
}

// 4. unidadesPorProducto: Agrupa y suma unidades por producto usando reduce
function unidadesPorProducto(ventasArray) {
    return ventasArray.reduce((grupos, v) => {
        const prod = v.producto;
        grupos[prod] = (grupos[prod] || 0) + v.cantidad;
        return grupos;
    }, {});
}

// 5. topProductosPorValor: Top k productos ordenados de mayor a menor valor
function topProductosPorValor(ventasArray, k) {
    const porProducto = ventasArray.reduce((g, v) => {   //g es el acumulador y v es la venta actual
        const valor = v.cantidad * v.precio;
        g[v.producto] = (g[v.producto] || 0) + valor;
        return g;
    }, {});

    return [...Object.entries(porProducto)] 
        .sort((a, b) => b[1] - a[1]) // Orden descendente (mayor a menor)
        .slice(0, k)                 // Tomamos solo los primeros k
        .map(([producto]) => producto); // Extraemos solo el nombre del producto
}


//Esta función recibe un arreglo de objetos llamado ventas y devuelve un arreglo (recurrentes)
function clientesRecurrentes(ventas) {
  const recurrentes = [];     //Crea un arreglo vacío donde se irán guardando los clientes recurrentes que se encuentren.


  //Comparar cada venta con las siguientes (for anidados)
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (
        ventas[i].cliente === ventas[j].cliente &&    //Detectar recurrencia y evitar repetidos.: Comprueba si el mismo cliente aparece en dos ventas distintas. Si es así, ese cliente es recurrente.
        !recurrentes.includes(ventas[i].cliente)   //Verifica que todavía no esté agregado a recurrentes
      ) {
        recurrentes.push(ventas[i].cliente);         //Si cumple ambas condiciones, lo agrega al arreglo recurrentes.
      }
    }
  }

  return recurrentes;
}


// Calcula el total de ventas de una ciudad usando una cadena de métodos de arreglos:
// map (normalizar) -> filter (filtrar ciudad) -> map (obtener precio) -> reduce (sumar)
function totalCiudadCadena(ventas, ciudad) {
  // Limpiamos la ciudad buscada (sin espacios extra y en minúsculas) para comparar sin errores
  const ciudadObjetivo = String(ciudad).trim().toLowerCase();

  return ventas
    // 1. map: recorre todas las ventas y crea un nuevo arreglo agregando la ciudad normalizada
    .map((venta) => ({
      ...venta, // Conserva las propiedades originales de cada venta
      ciudadNormalizada: String(venta.ciudad ?? "").trim().toLowerCase(), // Normaliza la ciudad
    }))
    // 2. filter: recorre el arreglo anterior y deja solo las ventas de la ciudad objetivo
    .filter((venta) => venta.ciudadNormalizada === ciudadObjetivo)
    // 3. map: recorre las ventas filtradas y extrae el precio numérico de cada una
    .map((venta) => Number(venta.precio ?? 0))
    // 4. reduce: recorre los precios y los acumula en una sola suma total (inicia en 0)
    .reduce((acumulado, precio) => acumulado + precio, 0);
}



// Calcula el total de ventas de una ciudad en una sola pasada
// y sin crear arreglos intermedios
function totalCiudadUnaPasada(ventas, ciudad) { 
  const ciudadObjetivo = String(ciudad ?? "").trim().toLowerCase();      // Normalizamos la ciudad buscada una sola vez fuera del ciclo (sin espacios y en minúsculas
  let total = 0;                                                         // Variable acumuladora numérica: ocupa memoria constante O(1)
  
  
  for (const venta of ventas) {                                       // Recorremos el arreglo de ventas una sola vez sin crear arreglos nuevos en el camino
 const ciudadVenta = String(venta.ciudad ?? "").trim().toLowerCase();         // Normalizamos la ciudad de la venta actual para compararla sin errores de formato

    // Si coincide con la ciudad objetivo, sumamos su precio directamente al acumulador
    if (ciudadVenta === ciudadObjetivo) {
      total += Number(venta.precio ?? 0);
    }
  }

  return total;
}

// Exportamos las funciones 
module.exports = {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
};

