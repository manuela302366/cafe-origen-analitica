# Informe de rendimiento — Motor de analítica Café Origen (v0.2)

## 1. Tabla de funciones del motor

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Operaciones o tiempo medido con 10.000 ventas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `totalVendido(ventas)` | Suma el valor total (`cantidad * precio`) de todas las ventas. | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` sobre `ventas` sumando `valorVenta(v)` en un acumulador escalar. | `[completar con tu medición de 10.000 ventas]` |
| `unidadesVendidas(ventas)` | Suma el total de unidades (`v.cantidad`) vendidas. | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` acumulando `v.cantidad` en una variable numérica. | `[completar con tu medición de 10.000 ventas]` |
| `ventaMayor(ventas)` | Devuelve el registro completo de venta con mayor valor (`cantidad * precio`). | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` comparando `valorVenta(v)` contra el mayor actual; devuelve `null` si está vacío. | `[completar con tu medición de 10.000 ventas]` |
| `ticketPromedio(ventas)` | Calcula el promedio de valor en ventas válidas (`v.cantidad > 0`). | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` acumulando valor y contando ventas válidas en dos variables escalares. | `[completar con tu medición de 10.000 ventas]` |
| `ventasPorCiudad(ventas, ciudad)` | Suma el valor de ventas de una ciudad ignorando mayúsculas y espacios. | $O(n)$ | $O(1)$ | Normaliza `ciudad` una vez y recorre `ventas` con `for...of` acumulando en un acumulador numérico. | `[completar con tu medición de 10.000 ventas]` |
| `totalVendidoM(ventasArray)` | Calcula el total vendido usando `.reduce(...)` y `valorVenta(v)`. | $O(n)$ | $O(1)$ | Un recorrido con `.reduce(...)` acumulando un número sin crear arreglos intermedios. | `[completar con tu medición de 10.000 ventas]` |
| `unidadesVendidasM(ventasArray)` | Suma unidades usando `.reduce(...)` sobre `v.cantidad`. | $O(n)$ | $O(1)$ | Un recorrido con `.reduce(...)` acumulando unidades en un solo acumulador escalar. | `[completar con tu medición de 10.000 ventas]` |
| `ventasPorCiudadM(ventasArray, ciudad)` | Filtra por ciudad normalizada y suma el valor con `.reduce(...)`. | $O(n)$ | $O(n)$ | `.filter(...)` crea un arreglo intermedio con las ventas filtradas y `.reduce(...)` acumula el total. | `[completar con tu medición de 10.000 ventas]` |
| `ventasDelDia(ventas, fecha)` | Devuelve un arreglo nuevo con las ventas de una fecha exacta. | $O(n)$ | $O(n)$ | `.filter(...)` recorre `ventas` y construye un nuevo arreglo que puede contener hasta `n` elementos. | `[completar con tu medición de 10.000 ventas]` |
| `totalPorCiudad(ventasArray)` | Agrupa y suma el valor de ventas por ciudad formateada en un objeto. | $O(n)$ | $O(k)$ (hasta $O(n)$ en peor caso) | `.reduce(...)` recorre el arreglo y acumula valores por ciudad en un objeto auxiliar `grupos`. | `[completar con tu medición de 10.000 ventas]` |
| `unidadesPorProducto(ventasArray)` | Agrupa y suma unidades vendidas por producto en un objeto. | $O(n)$ | $O(p)$ (hasta $O(n)$ en peor caso) | `.reduce(...)` recorre `ventasArray` y guarda acumulados por `v.producto` en un objeto auxiliar. | `[completar con tu medición de 10.000 ventas]` |
| `topProductosPorValor(ventasArray, k)` | Obtiene los `k` productos con mayor valor acumulado ordenados de mayor a menor. | $O(n + p \log p)$ (peor caso $O(n \log n)$) | $O(n)$ | Agrupa con `.reduce(...)`, crea entradas con `[...Object.entries(...)]`, ordena con `.sort(...)`, corta con `.slice(0, k)` y extrae nombres con `.map(...)`. | `[completar con tu medición de 10.000 ventas]` |
| `clientesRecurrentes(ventas)` | Devuelve los clientes que aparecen en más de una venta sin duplicados. | $O(n^2)$ | $O(n)$ | Dos ciclos `for` anidados (`i` y `j = i + 1`) comparan pares de ventas y verifican `!recurrentes.includes(...)`. | `[completar con tu medición de 10.000 ventas]` |
| `totalCiudadCadena(ventas, ciudad)` | Suma el `precio` de una ciudad encadenando `map` → `filter` → `map` → `reduce`. | $O(n)$ (4 pasadas, $O(4n)$) | $O(n)$ | Hace 4 recorridos y crea 3 arreglos intermedios (objetos normalizados, filtrados y arreglo de precios). | `[completar con tu medición de 10.000 ventas]` |
| `totalCiudadUnaPasada(ventas, ciudad)` | Suma el `precio` de una ciudad en un solo recorrido sin arreglos intermedios. | $O(n)$ | $O(1)$ | Normaliza la ciudad fuera del ciclo y recorre con `for...of` sumando en una variable escalar. | `[completar con tu medición de 10.000 ventas]` |
| `generarVentas(n)` | Genera `n` registros de venta aleatorios a partir del catálogo y ciudades. | $O(n)$ | $O(n)$ (salida de `n` objetos; auxiliares $O(1)$) | Un ciclo `for` de `0` a `n - 1` crea cada venta con `aleatorioEntre` y la agrega a `ventasGeneradas`. | `[completar con tu medición de 10.000 ventas]` |
| `totalVendidoInst(ventas, contador)` | Calcula el total de ventas válidas (`cantidad > 0` y `precio >= 0`) contando operaciones. | $O(n)$ | $O(1)$ | Ciclo `for` de `0` a `ventas.length - 1` que suma `contador.ops` al visitar cada elemento y validar datos en variables escalares. | `[completar con tu medición de 10.000 ventas]` |
| `ventaMayorInst(ventas, contador)` | Encuentra la venta válida de mayor monto (`cantidad * precio`) contando operaciones. | $O(n)$ | $O(1)$ | Ciclo `for` sobre `ventas` que incrementa `contador.ops` por visita, validación de venta y comparación `monto > maxMonto`. | `[completar con tu medición de 10.000 ventas]` |
| `totalPorCiudadInst(ventas, contador)` | Acumula montos de ventas válidas por ciudad con nombre no vacío contando operaciones. | $O(n)$ | $O(k)$ (hasta $O(n)$ en peor caso) | Ciclo `for` sobre `ventas` que suma `contador.ops` en visita, validación de venta y verificación de `ciudad.length > 0`, guardando en `totales`. | `[completar con tu medición de 10.000 ventas]` |
| `primeraVentaInst(ventas, contador)` | Devuelve el primer elemento de `ventas` si es un arreglo no vacío, contando operaciones. | $O(1)$ | $O(1)$ | Valida `Array.isArray` y `length` y accede directamente a `ventas[0]` sin ciclos (`2` operaciones). | `[completar con tu medición de 10.000 ventas]` |

## 2. Proyección para 1.000.000 de ventas

- **Base de cálculo:** escalamiento a partir de las mediciones obtenidas para `10.000` ventas (un factor de **100×** en cantidad de registros).
- **Funciones constantes ($O(1)$):** `primeraVentaInst` mantiene un costo fijo independientemente del tamaño de entrada (`[completar con estimación para 1.000.000]`).
- **Funciones lineales ($O(n)$):** al pasar de `10.000` a `1.000.000` de ventas (`100×` más datos), las operaciones y el tiempo estimado escalan aproximadamente **100×** frente a lo medido con `10.000` ventas (con mayor consumo de memoria en las que generan arreglos intermedios o estructuras auxiliares como `totalCiudadCadena`, `ventasPorCiudadM`, `ventasDelDia`, `totalPorCiudad`, `unidadesPorProducto`, `totalPorCiudadInst` y `topProductosPorValor`):
  - `totalVendido`: `[completar con estimación para 1.000.000]`
  - `unidadesVendidas`: `[completar con estimación para 1.000.000]`
  - `ventaMayor`: `[completar con estimación para 1.000.000]`
  - `ticketPromedio`: `[completar con estimación para 1.000.000]`
  - `ventasPorCiudad`: `[completar con estimación para 1.000.000]`
  - `totalVendidoM`: `[completar con estimación para 1.000.000]`
  - `unidadesVendidasM`: `[completar con estimación para 1.000.000]`
  - `ventasPorCiudadM`: `[completar con estimación para 1.000.000]`
  - `ventasDelDia`: `[completar con estimación para 1.000.000]`
  - `totalPorCiudad`: `[completar con estimación para 1.000.000]`
  - `unidadesPorProducto`: `[completar con estimación para 1.000.000]`
  - `topProductosPorValor`: `[completar con estimación para 1.000.000]`
  - `totalCiudadCadena`: `[completar con estimación para 1.000.000]`
  - `totalCiudadUnaPasada`: `[completar con estimación para 1.000.000]`
  - `generarVentas`: `[completar con estimación para 1.000.000]`
  - `totalVendidoInst`: `[completar con estimación para 1.000.000]`
  - `ventaMayorInst`: `[completar con estimación para 1.000.000]`
  - `totalPorCiudadInst`: `[completar con estimación para 1.000.000]`
- **Función cuadrática ($O(n^2)$):**
  - `clientesRecurrentes`: `[completar con estimación para 1.000.000]` — al multiplicar `n` por `100`, las comparaciones crecen cerca de **10.000×** (`100²`), convirtiéndose en el cuello de botella crítico al crecer el volumen.

## 3. Riesgos (de mayor a menor)

- **Criterio de priorización:** impacto combinado en **tiempo de ejecución** y **uso de memoria adicional** cuando el historial pase de decenas de registros a cientos de miles o un millón en un servidor con memoria limitada.
1. **`clientesRecurrentes` (Mayor riesgo — $O(n^2)$ tiempo / $O(n)$ espacio):** los bucles anidados y `.includes(...)` hacen que el trabajo crezca de forma cuadrática; es la función que se degrada primero al escalar.
2. **`topProductosPorValor` (Riesgo alto — $O(n + p \log p)$ o $O(n \log n)$ tiempo / $O(n)$ espacio):** agrupa por producto, crea arreglos intermedios y ordena (`.sort(...)`), sumando costo de ordenamiento y memoria.
3. **`totalCiudadCadena` (Riesgo medio-alto — $O(n)$ con 4 recorridos / $O(n)$ espacio):** genera 3 arreglos intermedios innecesarios en cada consulta frente a `totalCiudadUnaPasada`.
4. **`ventasPorCiudadM` y `ventasDelDia` (Riesgo medio — $O(n)$ tiempo / $O(n)$ espacio):** `.filter(...)` reserva arreglos nuevos cuyo tamaño puede acercarse a `n`.
5. **`totalPorCiudad`, `totalPorCiudadInst` y `unidadesPorProducto` (Riesgo bajo-medio — $O(n)$ tiempo / espacio según categorías):** hacen una pasada, pero mantienen diccionarios acumuladores que crecen según la variedad de ciudades o productos.
6. **Funciones de un solo recorrido y espacio $O(1)$ (`totalCiudadUnaPasada`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalVendidoM`, `unidadesVendidasM`, `totalVendidoInst`, `ventaMayorInst`, `primeraVentaInst`):** bajo riesgo relativo de memoria y crecimiento lineal directo o constante.

## 4. Plan de optimización (`clientesRecurrentes`)

- **Idea de mejora (sin implementar aún en v0.2):** sustituir la comparación anidada con `.includes(...)` por un recorrido único apoyado en estructuras de consulta rápida (`Set` / `Map`) para registrar clientes ya vistos y marcar los recurrentes en tiempo constante promedio por elemento.
- **¿Qué trabajo se repite hoy?**
  - Comparar cada venta `i` con todas las ventas siguientes `j` (`i + 1` en adelante), repitiendo comparaciones sobre el mismo cliente.
  - Buscar linealmente con `!recurrentes.includes(ventas[i].cliente)` dentro del arreglo acumulado en cada coincidencia.
- **¿Qué información se podría guardar para no buscarla de nuevo?**
  - Guardar un conjunto (`Set`) de clientes ya vistos durante un único recorrido del arreglo y otro conjunto (`Set`) de clientes ya identificados como recurrentes, evitando tanto los ciclos anidados como las búsquedas repetidas en `recurrentes`.



  ## MiniReto 8: Analítica v0.2 — Informe de rendimiento

### Predicciones antes de medir y comparación con resultados
- **Predicción:** esperaba que la mayoría de funciones crecieran de forma lineal con `10.000` ventas, que las cadenas de métodos (`totalCiudadCadena`, `ventasPorCiudadM`) y agrupaciones (`totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor`) consumieran más memoria adicional, y que `clientesRecurrentes` fuera la más lenta al crecer `n`.
- **Resultado real:** `[completa aquí lo que observaste en probar-10k.js y medir-recurrentes.js]`.

### Revisión de compañero y respuesta
- **Observación recibida:** `[escribe aquí el comentario o sugerencia de tu compañero/a]`.
- **Mi respuesta:** `[responde aquí a la observación, explicando qué ajustaste o por qué mantuviste tu criterio en RENDIMIENTO.md]`.