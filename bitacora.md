
Diccionario de datos :propiedad · tipo · significado 

## Diccionario de datos
| Propiedad  | Tipo      | Significado |

| `id`       | `number` | Identificador único y consecutivo de cada registro de venta (del 1 al 12). |
| `fecha`    | `string` | Fecha en la que se realizó la venta, en formato `AAAA-MM-DD`. |
| `cliente`  | `string` | Código identificador único del cliente que realizó la compra (ej. `'C01'`). |
| `producto` | `string` | Nombre y presentación del producto vendido (ej. `'Origen Huila 500 g'`). |
| `ciudad`   | `string` | Ciudad donde se efectuó la venta (ej. `'Medellín'`, `'Bogotá'`, `'Cali'`, `'Pereira'`). |
| `cantidad` | `number` | Número de unidades vendidas del producto en esa transacción. |
| `precio  ` | `number` | Valor unitario del producto en pesos colombianos (COP). |


   
| Problema                           | Decisión |
| venta 8 con cantidad 0             | no cuenta en el ticket |
| ciudades con espacios y minúsculas | normalizar antes de comparar |
| clientes repetidos                 | es válido: se usa en S5 y S6 |


## Casos borde detectados:Problemas en los datos
1.Inconsistencias en los nombres de las ciudades:En el registro con id: 5 aparece 'medellin' todo en minúscula.
2.Cantidades inválidas o en cero: En el registro con id: 8, el campo cantidad tiene el valor 0 ('Origen Huila 500 g', precio 42000).   Por qué es un problema: No tiene sentido lógico registrar una venta de cero unidades; además, si se calcula el promedio de ventas, ese registro afectará el resultado.
3.Clientes repetidos y sin nombre (solo códigos):Los clientes no tienen nombre, solo un código ('C01' a 'C08'), y varios se repiten en distintas compras (por ejemplo, 'C01' aparece 3 veces y 'C02' y 'C03' aparecen 2 veces cada uno).   Por qué es un problema: Al calcular cuántos clientes únicos compraron, si simplemente se cuenta la cantidad de filas (12), el resultado será incorrecto porque hay clientes repetidos. Además, sin una tabla que relacione cada código con su nombre real, no se sabe quién es cada cliente.

## Plan en pseudocódigo (Los números del día con ciclos)

### 1. `totalVendido(ventas)`
* **Inicio:** `total <- 0`
* **Recorrido:** `PARA CADA venta EN ventas HACER`
* **Condición:** Ninguna (recorre todas las ventas).
* **Acumulación:** `total <- total + valorVenta(venta)`
* **Fin:** `RETORNAR total`

### 2. `unidadesVendidas(ventas)`
* **Inicio:** `unidades <- 0`
* **Recorrido:** `PARA CADA venta EN ventas HACER`
* **Condición:** Ninguna.
* **Acumulación:** `unidades <- unidades + venta.cantidad`
* **Fin:** `RETORNAR unidades`

### 3. `ventaMayor(ventas)`
* **Inicio:** `SI ventas está vacía ENTONCES RETORNAR null`. Si no, `mayor <- ventas[0]`.
* **Recorrido:** `PARA CADA venta EN ventas HACER`
* **Condición:** `SI valorVenta(venta) > valorVenta(mayor) ENTONCES`
* **Acumulación (actualización):** `mayor <- venta`
* **Fin:** `RETORNAR mayor`

### 4. `ticketPromedio(ventas)`
* **Inicio:** `sumaTotal <- 0`, `cantidadValidas <- 0`
* **Recorrido:** `PARA CADA venta EN ventas HACER`
* **Condición:** `SI venta.cantidad > 0 ENTONCES`
* **Acumulación:** `sumaTotal <- sumaTotal + valorVenta(venta)` y `cantidadValidas <- cantidadValidas + 1`
* **Fin:** `SI cantidadValidas == 0 ENTONCES RETORNAR 0`, si no `RETORNAR sumaTotal / cantidadValidas`

### 5. `ventasPorCiudad(ventas, ciudad)`
* **Inicio:** `totalCiudad <- 0`
* **Recorrido:** `PARA CADA venta EN ventas HACER`
* **Condición:** `SI venta.ciudad (limpia y en minúscula) == ciudad (limpia y en minúscula) ENTONCES`
* **Acumulación:** `totalCiudad <- totalCiudad + valorVenta(venta)`
* **Fin:** `RETORNAR totalCiudad`


## Casos borde (Arreglo vacío `[]`)

| Función               | Valor retornado con `[]`| Justificación |

| `totalVendido([])`    | `0`                     | Sin ventas registradas, el monto acumulado es cero pesos. |
| `unidadesVendidas([])`| `0`                     | Sin transacciones, salieron cero unidades. |
| `ventaMayor([])`      | `null`                  | No existe ningún objeto/registro de venta para devolver, por lo que `null` representa explícitamente la ausencia de registro. |
| `ticketPromedio([])`  | `0`                     | Evita una división entre cero (`0 / 0 = NaN`), devolviendo `0` como promedio neutro. |
| `ventasPorCiudad([], ciudad)` | `0`             | No hay ventas asociadas a la ciudad consultada. |


## Traza manual: `totalVendido(ventas)` (Primeras 4 iteraciones)

| Iteración | Registro (`v.id`) | Producto | Cálculo `valorVenta(v)` (`cantidad * precio`) | Acumulador `total` (antes) | Acumulador `total` (después) |

| Inicio  | - | - | - | `0` | `0` |
| 1       | `1` | Origen Huila 500 g | `2 * 42000 = 84000` | `0` | `84000` |
| 2       | `2` | Origen Nariño 250 g | `1 * 26000 = 26000` | `84000` | `110000` |
| 3       | `3` | Prensa francesa | `1 * 95000 = 95000` | `110000` | `205000` |
| 4       | `4` | Origen Huila 500 g | `1 * 42000 = 42000` | `205000` | `247000` |





## Bitácora - Sesión 4: Arreglos y Métodos en JavaScript

### 1. `totalVendidoM` / `unidadesVendidasM` (Acumulación con `.reduce()`)
* **¿Qué recorro?** El arreglo completo de `ventas`.
* **¿Qué filtro?** No aplica (se procesan todos los registros).
* **¿Qué transformo?** Cada objeto de venta en su valor monetario (`cantidad * precio`) o en su cantidad numérica.
* **¿Qué acumulo?** Un valor numérico inicializado en `0`, sumando el resultado de cada iteración.
* **¿Cómo agrupo?** No agrupa, reduce a un total escalar.

### 2. `totalPorCiudad` (Agrupación con `.reduce()`)
* **¿Qué recorro?** El arreglo de `ventas`.
* **¿Qué filtro?** No aplica directamente, pero normaliza el texto (`trim().toLowerCase()`) para asegurar consistencia.
* **¿Qué transformo?** Los nombres de las ciudades para estandarizarlas y el valor monetario de cada venta.
* **¿Qué acumulo?** Un objeto acumulador (`grupos`) que va almacenando sumas parciales.
* **¿Cómo agrupo?** Utiliza la ciudad normalizada como clave del objeto acumulador (`grupos[ciudadFormateada]`) para sumar el total vendido por zona.

### 3. `unidadesPorProducto` (Agrupación por producto)
* **¿Qué recorro?** El arreglo de `ventas`.
* **¿Qué filtro?** Ninguno.
* **¿Qué transformo?** Extrae el nombre del producto y la cantidad de unidades.
* **¿Qué acumulo?** Un objeto diccionario con las sumas acumuladas de unidades por cada producto.
* **¿Cómo agrupo?** Agrupa usando el nombre del producto (`v.producto`) como clave.

### 4. `topProductosPorValor` (Ordenamiento y segmentación)
* **¿Qué recorro?** Primero el arreglo de ventas para sumar totales por producto, luego las entradas del objeto resultante.
* **¿Qué filtro?** Ninguno.
* **¿Qué transformo?** Transforma el objeto de productos a un arreglo de pares clave-valor (`Object.entries`), y al final mapea para extraer solo los nombres de los productos.
* **¿Qué acumulo?** Los valores monetarios totales generados por cada producto específico.
* **¿Cómo agrupo?** Ordena de mayor a menor con `.sort()` de forma segura (sin mutar el arreglo original gracias al operador de propagación `[...]`) y corta los primeros $k$ elementos con `.slice(0, k)`.

mini reto 3 dia 1 semana 1
## totalVendidoM(ventas)

¿Qué recorro? El arreglo ventas (cada registro de venta).

¿Qué filtro? Nada (incluye todos los registros del arreglo).

¿Qué transformo? Cada venta a su valor monetario mediante valorVenta(v) (cantidad * precio).

¿Qué acumulo? El total en dinero sumando cada valorVenta(v) en un acumulador iniciado en 0 con reduce.

¿Cómo agrupo? No agrupa; devuelve un único número total.

## unidadesVendidasM(ventas)

¿Qué recorro? El arreglo ventas.

¿Qué filtro? Nada (recorre todas las ventas).

¿Qué transformo? Cada venta a su propiedad v.cantidad.

¿Qué acumulo? La suma total de unidades vendidas iniciando en 0 con reduce.

¿Cómo agrupo? No agrupa; devuelve un único número de unidades.

## ventasPorCiudadM(ventas, ciudad)

¿Qué recorro? El arreglo ventas.

¿Qué filtro? Solo las ventas cuya ciudad normalizada (v.ciudad.trim().toLowerCase()) coincida con ciudad.trim().toLowerCase().

¿Qué transformo? Las ventas filtradas a su valor (valorVenta(v)).

¿Qué acumulo? La suma del dinero vendido en esa ciudad específica, iniciando en 0.

¿Cómo agrupo? No devuelve grupos separadados; devuelve el acumulado de una sola ciudad.

## totalPorCiudad(ventas)

¿Qué recorro? El arreglo ventas.

¿Qué filtro? Nada (considera todas las ventas).

¿Qué transformo? El nombre de cada ciudad con .trim().toLowerCase() como clave normalizada y calcula valorVenta(v).

¿Qué acumulo? El dinero vendido por ciudad sumando sobre el valor previo (o 0) dentro del objeto acumulador.

¿Cómo agrupo? En un objeto diccionario ({}) donde cada clave es una ciudad normalizada sin duplicados y su valor es el total vendido allí.

## unidadesPorProducto(ventas)

¿Qué recorro? El arreglo ventas.

¿Qué filtro? Nada (recorre todas las ventas).

¿Qué transformo? Cada venta se asocia a su v.producto y su v.cantidad.

¿Qué acumulo? Las unidades vendidas por producto sumando v.cantidad sobre el acumulado anterior (o 0).

¿Cómo agrupo? En un objeto diccionario ({}) donde cada clave es el nombre del producto y su valor es el total de unidades.

## topProductosPorValor(ventas, k)

¿Qué recorro? Primero el arreglo ventas para acumular por producto y luego el arreglo de pares generado con Object.entries(...).

¿Qué filtro? Recorta los primeros k elementos del ranking ordenado usando .slice(0, k).

¿Qué transformo? Calcula cantidad * precio para agrupar, ordena de mayor a menor valor con .sort((a, b) => b[1] - a[1]) y finalmente extrae solo los nombres con .map(([producto]) => producto).

¿Qué acumulo? El valor monetario total generado por cada producto en un objeto auxiliar antes de ordenar.

¿Cómo agrupo? Primero agrupa por v.producto en un objeto y luego ordena las entradas en un arreglo nuevo sin mutar ventas.


## Registro de depuración — MiniReto 4 (v0.1) sema 1 dia 1

### Error 1: "Bogotá aparecía dos veces"
* **Síntoma:** Al agrupar o consultar ventas por ciudad en una versión preliminar, `"Bogotá"` aparecía como dos grupos separados (o no se sumaban registros que correspondían a la misma ciudad).
* **Entrada que lo produce:** Registros con variaciones de texto como `"Bogotá"` y `"Bogotá "` (con espacio al final), o `"Medellín"` y `"medellín"`.
* **Hipótesis:** La agrupación o comparación de ciudades compara directamente `v.ciudad` sin normalizar mayúsculas/minúsculas ni eliminar espacios sobrantes.
* **Prueba realizada:** Probar la agrupación/búsqueda sobre entradas con espacios en blanco o distinta capitalización y revisar las claves resultantes.
* **Causa:** Falta de normalización de cadenas (`.trim().toLowerCase()`) al crear la clave o comparar la ciudad.
* **Corrección:** Normalizar con `v.ciudad.trim().toLowerCase()` antes de agrupar o comparar, manteniendo una sola clave/etiqueta por ciudad. En la versión v0.1 actual (`node src/reporte.js`), `totalPorCiudad` agrupa las 4 ciudades (`Medellín`, `Bogotá`, `Cali`, `Pereira`) sin duplicados.

### Error 2: Ticket promedio daba `NaN` al filtrar un día sin ventas
* **Síntoma:** Al calcular el ticket promedio sobre las ventas de un día sin registros, el resultado devolvía `NaN`.
* **Entrada que lo produce:** `ticketPromedio(ventasDelDia(ventas, "2026-09-10"))` (un arreglo vacío `[]`, donde hay `0` ventas válidas).
* **Hipótesis:** La función calcula `total / cantidad` asumiendo que siempre existe al menos una venta válida (`0 / 0` produce `NaN`).
* **Prueba realizada:** Ejecutar `ticketPromedio([])` y `ticketPromedio(ventasDelDia(ventas, "2026-09-10"))` y observar el valor retornado.
* **Causa:** División entre cero (`0 / 0`) cuando no hay ventas con `cantidad > 0` o el arreglo filtrado está vacío.
* **Corrección:** Verificar si `validas === 0` (o si no hay ventas válidas) y retornar `0` antes de dividir. En la versión v0.1 actual (`node src/reporte.js`), el día `"2026-09-10"` muestra `0 ventas`, `Total: $ 0` y `Ticket prom.: $ 0`, sin `NaN` ni errores.

## MiniReto 5 — Paso 3: Predicción antes de medir (n × 10)

Si el tamaño de entrada `n` se multiplica por **10**:
- `totalVendidoInst`: las operaciones se multiplicarán aprox. por **10** (crecimiento lineal).
- `ventaMayorInst`: las operaciones se multiplicarán aprox. por **10** (crecimiento lineal).
- `totalPorCiudadInst`: las operaciones se multiplicarán aprox. por **10** (crecimiento lineal).
- `primeraVenta` (referencia): las operaciones se multiplicarán por **1** (se mantienen constantes).

totalVendidoInst: su número de operaciones se multiplica aproximadamente por 10 (crecimiento lineal). Como recorre las n ventas y hace una cantidad fija de operaciones contadas por venta, si hay 10 veces más ventas hace ~10 veces más operaciones.

ventaMayorInst: su número de operaciones también se multiplica aproximadamente por 10 (crecimiento lineal), ya que revisa las n ventas para ir comparando y encontrando el monto mayor.

totalPorCiudadInst: su número de operaciones también se multiplica aproximadamente por 10 (crecimiento lineal), porque visita cada una de las n ventas y evalúa sus condiciones para acumular por ciudad.

primeraVenta (si la incluyes como comparación constante): su número de operaciones se multiplica por 1 (se mantiene igual, alrededor de 1 operación), porque solo accede al primer elemento (ventas[0]) sin importar qué tan grande sea n.