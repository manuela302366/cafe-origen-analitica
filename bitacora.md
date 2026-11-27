
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

## MiniReto 5: ¿Cuánto cuesta cada reporte? (Café Origen)

### 1. Predicción antes de medir (Paso 3)
- Si `n` se multiplica por 10 (`100` -> `1.000` -> `10.000` -> `100.000`), esperaba que `totalVendidoInst`, `ventaMayorInst` y `totalPorCiudadInst` multiplicaran sus operaciones unas 10 veces (crecimiento lineal).
- En `primeraVentaInst`, esperaba que el número de operaciones se mantuviera igual sin importar el tamaño de `n` (crecimiento constante).

### 2. Resultados medidos (`node src/medir.js`)
| `n`    | `totalVendidoOps` | `ventaMayorOps` | `totalPorCiudadOps` | `primeraVentaOps` |
| 100    | 200               | 300             | 300                 | 2                 |
| 1000   | 2000              | 3000            | 3000                | 2                 |
| 10000  | 20000             | 30000           | 30000               | 2                 |
| 100000 | 200000            | 300000          | 300000              | 2                 |

### 3. Comparación, clasificación Big O y justificación (Paso 6)
- **Predicción vs. resultado:** Se cumplió lo esperado. Cada vez que `n` creció 10 veces, las operaciones de las funciones con recorrido subieron 10 veces, mientras que `primeraVentaInst` se mantuvo en `2` operaciones en todos los tamaños.
- **`primeraVentaInst` -> `O(1)` (constante):** No usa ciclos ni compara con el resto de ventas; valida una vez y retorna `ventas[0]` directamente (`2` operaciones para `n = 100` hasta `n = 100.000`).
- **`totalVendidoInst` -> `O(n)` (lineal):** Recorre `ventas` en un solo ciclo `for` realizando `2` operaciones por vuelta (`200` ops en `n = 100` y `200.000` ops en `n = 100.000`).
- **`ventaMayorInst` -> `O(n)` (lineal):** Usa un único ciclo `for` con `3` operaciones por venta válida (`300` ops en `n = 100` y `300.000` ops en `n = 100.000`). Hace más trabajo por elemento que `totalVendidoInst`, pero crece en la misma proporción (`×10` al multiplicar `n` por `10`).
- **`totalPorCiudadInst` -> `O(n)` (lineal):** Recorre `ventas` en un solo ciclo `for` y acumula por ciudad (`300` ops en `n = 100` y `300.000` ops en `n = 100.000`), con crecimiento proporcional a `n`.
- **`O(n²)`:** Ninguna de estas funciones es cuadrática; ese comportamiento aparece cuando hay ciclos anidados (comparar cada elemento con otros), como se verá en el MiniReto 6.

### Paso 2: Traza con 5 ventas y generalización para n ventas
Arreglo de prueba (`n = 5`):
- Índice 0: `C01`
- Índice 1: `C02`
- Índice 2: `C01`
- Índice 3: `C03`
- Índice 4: `C02`

Conteo de comparaciones `ventas[i].cliente === ventas[j].cliente` (`j = i + 1`):
- `i = 0` (`C01`) vs `j = 1, 2, 3, 4` -> 4 comparaciones
- `i = 1` (`C02`) vs `j = 2, 3, 4` -> 3 comparaciones
- `i = 2` (`C01`) vs `j = 3, 4` -> 2 comparaciones
- `i = 3` (`C03`) vs `j = 4` -> 1 comparación
- `i = 4` (`C02`) -> 0 comparaciones

Total con `n = 5`: `4 + 3 + 2 + 1 = 10` comparaciones.

Generalización para `n` ventas:
`n * (n - 1) / 2` comparaciones (complejidad cuadrática `O(n²)`).

Ventas (n)Tiempo real¿Qué pasó al subir?1.00012.876 msPrimer dato de referencia2.00012.578 msPrácticamente igual (en números tan chicos el reloj varía un poquito)4.00049.902 msSubió cerca de 4 veces frente a 2.0008.000280.579 msSubió unas 5.6 veces frente a 4.00016.0001.226 ms (1.226 s)Subió unas 4.4 veces frente a 8.000   

## Paso 4 — Análisis de la tabla y complejidad $O(n^2)$:
Al duplicar la cantidad de ventas (n) a partir de los tamaños medianos/grandes, el tiempo de ejecución de clientesRecurrentes crece aproximadamente unas 4 veces (por ejemplo, de 8.000 ventas con 280.579 ms a 16.000 ventas con 1.226 s, subiendo cerca de 4.4x). Esto coincide con el comportamiento de una complejidad cuadrática $O(n^2)$: como existen ciclos anidados comparando elementos entre sí, duplicar n multiplica el trabajo cerca de $2^2 = 4$ veces y hace que el tiempo crezca mucho más rápido que la cantidad de ventas.   

### Paso 5 — Estimación para 100.000 y 1.000.000 de ventas

A partir de las mediciones reales de `clientesRecurrentes` (`n = 8.000` con `280.579 ms` y `n = 16.000` con `1.226 s` / `1.226 ms`) y sabiendo que el crecimiento es cuadrático $O(n^2)$ (multiplicar `n` por $k$ multiplica el tiempo aproximadamente por $k^2$):

- **Estimación para 100.000 ventas:** tomando como referencia intermedia un tiempo cercano a ~`450–500 ms` (~`0.5 s`) para `10.000` ventas (o partiendo de `16.000` ventas con `1.226 s`, donde `n` crece `6.25` veces y el tiempo crece $6.25^2 \approx 39.06$ veces), el tiempo estimado ronda los **40 a 50 segundos** (`~0.7–0.8 minutos`). Como es menor a dos minutos (`120 s`), sí cumple la condición para probarlo si se desea.
- **Estimación para 1.000.000 de ventas:** multiplicar `n` por `100` frente a `10.000` implica multiplicar el tiempo por $100^2 = 10.000$ veces. Con la misma base de ~`450–500 ms` en `10.000` ventas, el tiempo estimado sube a unos **4.500–5.000 segundos**, es decir, alrededor de **75 a 85 minutos** (`~1.3 horas`), por lo que no conviene ejecutarlo con este algoritmo.



### Paso 6 — Costo oculto de `recurrentes.includes` en el peor caso

El método `recurrentes.includes(ventas[i].cliente)` no consulta el arreglo de forma instantánea: **recorre `recurrentes` elemento por elemento** para comprobar si el cliente ya fue registrado.

- **En el peor caso:** cuando el cliente aún no está en `recurrentes` (o está al final) y el arreglo `recurrentes` ha crecido con muchos clientes distintos (hasta $O(n)$ elementos), cada llamada a `.includes()` puede revisar hasta todos los elementos acumulados en `recurrentes`.
- **Efecto en la complejidad:** al estar dentro de los ciclos anidados que ya recorren las ventas con comportamiento cuadrático $O(n^2)$, este recorrido adicional suma operaciones extra cada vez que se evalúa la condición, aumentando el trabajo total en escenarios con muchos clientes y repeticiones (mientras que una estructura como `Set` permitiría comprobar pertenencia en tiempo constante promedio $O(1)$).

### Paso 7 — Conclusión para la gerente (sin tecnicismos)

El reporte de clientes recurrentes funciona rápido con volúmenes pequeños de ventas, pero a medida que el historial crece el tiempo de espera aumenta de forma mucho más acelerada que la cantidad de ventas. Esto ocurre porque, para detectar quiénes compran más de una vez, el proceso cruza y revisa repetidamente los registros entre sí y vuelve a comprobar la lista de clientes ya detectados. 

Con `16.000` ventas ya supera el segundo de espera, y si la operación escala a cientos de miles o a un millón de ventas con la llegada a grandes superficies y al marketplace nacional, este reporte podría tardar desde decenas de segundos hasta más de una hora. Por eso, es clave optimizar este reporte antes de manejar grandes volúmenes para que la gerencia obtenga información ágil sin cuellos de botella.

## MiniReto 7: Tiempo, memoria y cadenas de métodos

### 1. Comprobación con 10.000 ventas
- Se probaron `totalCiudadCadena` y `totalCiudadUnaPasada` sobre un conjunto de **10.000 ventas** generadas para una misma ciudad.
- Ambas funciones devolvieron exactamente el mismo resultado (**127827000**), confirmando que producen el mismo cálculo antes de comparar su consumo de tiempo y memoria.

### 2. Recorridos, arreglos intermedios y notación Big O
- **`totalCiudadCadena` (`map` → `filter` → `map` → `reduce`)**
  - **Recorridos completos:** 4 recorridos (`map` para normalizar ciudades, `filter` para filtrar la ciudad objetivo, `map` para extraer `precio` y `reduce` para sumar).
  - **Arreglos intermedios nuevos:** 3 arreglos nuevos en el camino (el arreglo con ciudad normalizada del primer `map`, el arreglo filtrado de `filter` y el arreglo de precios del segundo `map`; `reduce` devuelve un solo número).
  - **Complejidad temporal:** $O(4n) \rightarrow O(n)$.
  - **Complejidad espacial adicional:** $O(n)$, porque los arreglos intermedios crecen proporcionalmente al tamaño de entrada `n`.
- **`totalCiudadUnaPasada` (`for...of`)**
  - **Recorridos completos:** 1 solo recorrido sobre el arreglo de ventas.
  - **Arreglos intermedios nuevos:** 0 arreglos intermedios (solo variables escalares como el acumulador numérico y cadenas/números puntuales).
  - **Complejidad temporal:** $O(n)$.
  - **Complejidad espacial adicional:** $O(1)$, ya que la memoria extra usada no depende de cuántos registros entren.

### 3. ¿Por qué ambas son $O(n)$ en tiempo si una recorre 4 veces?
- En notación Big O se mide cómo crece el trabajo cuando `n` es grande y se **eliminan las constantes multiplicativas** (como el `4` en $O(4n)$).
- Recorrer el arreglo cuatro veces hace más trabajo real y crea más arreglos en memoria que recorrerlo una sola vez, pero su tasa de crecimiento sigue siendo **lineal** respecto a `n`.

### 4. Clasificación espacial del motor
- **Memoria adicional constante $O(1)$:** funciones que solo mantienen acumuladores o variables simples sin crear estructuras proporcionales al volumen de ventas (por ejemplo, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio` y `totalCiudadUnaPasada`).
- **Memoria adicional proporcional $O(n)$:** funciones que crean arreglos, mapas o agrupaciones que crecen con los datos de entrada:
  - `totalCiudadCadena`: crea arreglos intermedios (`map` y `filter`) que escalan con `n`.
  - `totalPorCiudad`: acumula totales por ciudad en una estructura auxiliar que crece según la cantidad de ciudades presentes en los datos (en el peor caso, hasta $O(n)$ si cada registro tiene una ciudad distinta).
  - `topProductosPorValor`: agrupa por producto y construye/ordena arreglos de productos para obtener el ranking, lo cual también escala con la cantidad de productos/ventas ($O(n)$ en espacio adicional).

### 5. Decisión final para `totalCiudad`
- Dejaré **`totalCiudadUnaPasada`** como implementación principal en el motor.
- **Justificación:** aunque `totalCiudadCadena` es muy legible y expresiva, en un entorno de marketplace con cientos de miles de ventas y memoria limitada en servidor es preferible evitar los 3 arreglos intermedios y los 4 recorridos; `totalCiudadUnaPasada` mantiene la misma complejidad temporal asintótica $O(n)$ pero reduce el trabajo real y usa memoria adicional constante $O(1)$.

### Decisión final: cuál versión de `totalCiudad` dejar en el motor
- **Versión elegida:** `totalCiudadUnaPasada` (con `for...of`).
- **Justificación:** aunque `totalCiudadCadena` resulta más expresiva y fácil de leer, encadena métodos que realizan 4 recorridos y generan 3 arreglos intermedios ($O(n)$ en espacio adicional). Dado que el proyecto escalará a cientos de miles de ventas en un servidor con memoria limitada, `totalCiudadUnaPasada` mantiene la complejidad temporal lineal $O(n)$ evitando arreglos intermedios y trabajando con memoria adicional constante $O(1)$.


## Optimización de `clientesRecurrentes` — Método de la sesión

### 1. Entender (Entradas, salidas y restricciones)
- **Entrada:** un arreglo `ventas` compuesto por objetos de venta, donde cada registro contiene la propiedad `cliente` (cadena de texto con el nombre o identificador del cliente).
- **Salida:** un nuevo arreglo de cadenas de texto con los nombres de los clientes que aparecen en **más de una venta** (`>= 2` compras), sin elementos duplicados.
- **Restricciones:**
  - Si `ventas` no es un arreglo o está vacío (`[]`), la función debe devolver `[]`.
  - Si un registro es nulo o tiene un `cliente` vacío o solo con espacios, se ignora.
  - Un cliente que compró 2, 3 o más veces debe aparecer **una sola vez** en el arreglo final (el orden de los elementos no es estricto, siempre que estén todos los recurrentes sin repetir).

### 2. Ejemplos y casos borde
- **Caso normal:**
  - Entrada: `[{ cliente: "Ana" }, { cliente: "Luis" }, { cliente: "Ana" }, { cliente: "Marta" }, { cliente: "Ana" }]`
  - Salida esperada: `["Ana"]`
- **Caso borde 1 — Arreglo vacío o entrada inválida:**
  - Entrada: `[]` o `null`
  - Salida esperada: `[]`
- **Caso borde 2 — Sin clientes recurrentes (todos únicos):**
  - Entrada: `[{ cliente: "Ana" }, { cliente: "Luis" }, { cliente: "Pedro" }]`
  - Salida esperada: `[]`
- **Caso borde 3 — Un solo registro en el arreglo:**
  - Entrada: `[{ cliente: "Ana" }]`
  - Salida esperada: `[]`
- **Caso borde 4 — Todos los registros pertenecen al mismo cliente:**
  - Entrada: `[{ cliente: "Ana" }, { cliente: "Ana" }, { cliente: "Ana" }]`
  - Salida esperada: `["Ana"]`

### 3. Fuerza bruta y su complejidad
- **Cómo funciona la solución actual:** utiliza dos ciclos `for` anidados (`i` desde `0` hasta `n - 1`, y `j` desde `i + 1` hasta `n - 1`) para comparar cada venta contra todas las siguientes. Cuando encuentra una coincidencia, verifica además si el cliente ya está en el arreglo de salida usando `!recurrentes.includes(...)`.
- **Complejidad temporal:** $O(n^2)$ en el peor caso, ya que por cada elemento recorre el resto del arreglo haciendo hasta $\frac{n(n-1)}{2}$ comparaciones (más la búsqueda lineal de `.includes(...)`). Como medimos antes, al duplicar `n` el tiempo crece de forma cuadrática (`n=8000`: `92.062ms` $\rightarrow$ `n=16000`: `480.505ms`).
- **Complejidad espacial:** $O(k)$ (hasta $O(n)$ en el peor caso, donde $k$ es el número de clientes recurrentes almacenados en el arreglo de respuesta).

### 4. Idea de optimización
- **Trabajo repetido que vamos a eliminar:** volver a recorrer el arreglo buscando el mismo cliente una y otra vez, y revisar linealmente con `.includes(...)` si ya fue agregado.
- **Estrategia con `Set` (un solo recorrido):** mantener un `Set` llamado `vistos` y otro `Set` llamado `recurrentes`. En una sola pasada por `ventas`, si el cliente ya está en `vistos`, se añade a `recurrentes`; si no, se guarda en `vistos`. Como `.has()` y `.add()` en un `Set` toman tiempo constante promedio $O(1)$, el algoritmo baja a **$O(n)$**.
- **Estrategia con `Map` (conteo en un recorrido):** usar un `Map` (`comprasPorCliente`) donde la clave es el cliente y el valor es cuántas veces ha comprado, incrementando el contador en una sola pasada ($O(n)$) y filtrando al final los clientes con conteo `> 1`.