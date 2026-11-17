
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