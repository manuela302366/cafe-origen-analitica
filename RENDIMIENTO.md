# Informe de rendimiento — Motor de analítica Café Origen (v0.2)

## 1. Tabla de funciones del motor

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Operaciones o tiempo medido con 10.000 ventas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `totalVendido(ventas)` | Suma el valor total (`cantidad * precio`) de todas las ventas. | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` sobre `ventas` sumando `valorVenta(v)` en un acumulador escalar. | ~10.000 iteraciones (1 pasada lineal; tiempo sub-ms / pocos ms) |
| `unidadesVendidas(ventas)` | Suma el total de unidades (`v.cantidad`) vendidas. | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` acumulando `v.cantidad` en una variable numérica. | ~10.000 iteraciones (1 pasada lineal; tiempo sub-ms / pocos ms) |
| `ventaMayor(ventas)` | Devuelve el registro completo de venta con mayor valor (`cantidad * precio`). | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` comparando `valorVenta(v)` contra el mayor actual; devuelve `null` si está vacío. | ~10.000 comparaciones (1 pasada lineal) |
| `ticketPromedio(ventas)` | Calcula el promedio de valor en ventas válidas (`v.cantidad > 0`). | $O(n)$ | $O(1)$ | Un solo ciclo `for...of` acumulando valor y contando ventas válidas en dos variables escalares. | ~10.000 iteraciones (1 pasada lineal) |
| `ventasPorCiudad(ventas, ciudad)` | Suma el valor de ventas de una ciudad ignorando mayúsculas y espacios. | $O(n)$ | $O(1)$ | Normaliza `ciudad` una vez y recorre `ventas` con `for...of` acumulando en un acumulador numérico. | ~10.000 iteraciones (1 pasada lineal) |
| `totalVendidoM(ventasArray)` | Calcula el total vendido usando `.reduce(...)` y `valorVenta(v)`. | $O(n)$ | $O(1)$ | Un recorrido con `.reduce(...)` acumulando un número sin crear arreglos intermedios. | ~10.000 callbacks en `.reduce(...)` (1 pasada) |
| `unidadesVendidasM(ventasArray)` | Suma unidades usando `.reduce(...)` sobre `v.cantidad`. | $O(n)$ | $O(1)$ | Un recorrido con `.reduce(...)` acumulando unidades en un solo acumulador escalar. | ~10.000 callbacks en `.reduce(...)` (1 pasada) |
| `ventasPorCiudadM(ventasArray, ciudad)` | Filtra por ciudad normalizada y suma el valor con `.reduce(...)`. | $O(n)$ | $O(n)$ | `.filter(...)` crea un arreglo intermedio con las ventas filtradas y `.reduce(...)` acumula el total. | ~10.000 elementos en `.filter(...)` + subconjunto en `.reduce(...)` |
| `ventasDelDia(ventas, fecha)` | Devuelve un arreglo nuevo con las ventas de una fecha exacta. | $O(n)$ | $O(n)$ | `.filter(...)` recorre `ventas` y construye un nuevo arreglo que puede contener hasta `n` elementos. | ~10.000 evaluaciones en `.filter(...)` |
| `totalPorCiudad(ventasArray)` | Agrupa y suma el valor de ventas por ciudad formateada en un objeto. | $O(n)$ | $O(k)$ (hasta $O(n)$ en peor caso) | `.reduce(...)` recorre el arreglo y acumula valores por ciudad en un objeto auxiliar `grupos`. | ~10.000 iteraciones agrupando en 4 ciudades |
| `unidadesPorProducto(ventasArray)` | Agrupa y suma unidades vendidas por producto en un objeto. | $O(n)$ | $O(p)$ (hasta $O(n)$ en peor caso) | `.reduce(...)` recorre `ventasArray` y guarda acumulados por `v.producto` en un objeto auxiliar. | ~10.000 iteraciones agrupando por producto |
| `topProductosPorValor(ventasArray, k)` | Obtiene los `k` productos con mayor valor acumulado ordenados de mayor a menor. | $O(n + p \log p)$ (peor caso $O(n \log n)$) | $O(n)$ | Agrupa con `.reduce(...)`, crea entradas con `[...Object.entries(...)]`, ordena con `.sort(...)`, corta con `.slice(0, k)` y extrae nombres con `.map(...)`. | ~10.000 iteraciones de agrupación + ordenamiento de productos |
| `clientesRecurrentes(ventas)` | Devuelve los clientes que aparecen en más de una venta sin duplicados. | $O(n^2)$ | $O(n)$ | Dos ciclos `for` anidados (`i` y `j = i + 1`) comparan pares de ventas y verifican `!recurrentes.includes(...)`. | ~150–250 ms estimados en 10.000 ventas (entre `n=8000`: `92.062ms` y `n=16000`: `480.505ms`) |
| `totalCiudadCadena(ventas, ciudad)` | Suma el `precio` de una ciudad encadenando `map` → `filter` → `map` → `reduce`. | $O(n)$ (4 pasadas, $O(4n)$) | $O(n)$ | Hace 4 recorridos y crea 3 arreglos intermedios (objetos normalizados, filtrados y arreglo de precios). | 4 pasadas sobre 10.000 registros (resultado medido: `128508000`) |
| `totalCiudadUnaPasada(ventas, ciudad)` | Suma el `precio` de una ciudad en un solo recorrido sin arreglos intermedios. | $O(n)$ | $O(1)$ | Normaliza la ciudad fuera del ciclo y recorre con `for...of` sumando en una variable escalar. | 1 pasada sobre 10.000 registros (resultado medido: `128508000`, igual a cadena) |
| `generarVentas(n)` | Genera `n` registros de venta aleatorios a partir del catálogo y ciudades. | $O(n)$ | $O(n)$ (salida de `n` objetos; auxiliares $O(1)$) | Un ciclo `for` de `0` a `n - 1` crea cada venta con `aleatorioEntre` y la agrega a `ventasGeneradas`. | 10.000 objetos creados en 1 ciclo `for` |
| `totalVendidoInst(ventas, contador)` | Calcula el total de ventas válidas (`cantidad > 0` y `precio >= 0`) contando operaciones. | $O(n)$ | $O(1)$ | Ciclo `for` de `0` a `ventas.length - 1` que suma `contador.ops` al visitar cada elemento y validar datos en variables escalares. | Hasta ~20.000 `ops` (2 operaciones por elemento visitado) |
| `ventaMayorInst(ventas, contador)` | Encuentra la venta válida de mayor monto (`cantidad * precio`) contando operaciones. | $O(n)$ | $O(1)$ | Ciclo `for` sobre `ventas` que incrementa `contador.ops` por visita, validación de venta y comparación `monto > maxMonto`. | Hasta ~30.000 `ops` (3 operaciones por venta válida) |
| `totalPorCiudadInst(ventas, contador)` | Acumula montos de ventas válidas por ciudad con nombre no vacío contando operaciones. | $O(n)$ | $O(k)$ (hasta $O(n)$ en peor caso) | Ciclo `for` sobre `ventas` que suma `contador.ops` en visita, validación de venta y verificación de `ciudad.length > 0`, guardando en `totales`. | Hasta ~30.000 `ops` (3 operaciones por venta válida) |
| `primeraVentaInst(ventas, contador)` | Devuelve el primer elemento de `ventas` si es un arreglo no vacío, contando operaciones. | $O(1)$ | $O(1)$ | Valida `Array.isArray` y `length` y accede directamente a `ventas[0]` sin ciclos (`2` operaciones). | `2` `ops` fijas (independientes de las 10.000 ventas) |

## 2. Proyección para 1.000.000 de ventas

- **Base de cálculo:** escalamiento desde `10.000` a `1.000.000` de ventas (**100×** en volumen de registros) y mediciones reales de `clientesRecurrentes` (`n=8000`: `92.062ms`, `n=16000`: `480.505ms`).
- **Funciones constantes ($O(1)$):**
  - `primeraVentaInst`: sigue requiriendo `2` operaciones y tiempo constante sin importar que haya `1.000.000` de ventas.
- **Funciones lineales ($O(n)$):** al multiplicar `n` por **100** (de `10.000` a `1.000.000`), el tiempo y las iteraciones crecen aproximadamente **100×** frente a lo medido con `10.000` ventas, con mayor presión de memoria en las que crean arreglos intermedios o estructuras acumuladoras:
  - `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`: ~100× el tiempo/iteraciones de 10.000 ventas (~1.000.000 de iteraciones en 1 pasada).
  - `totalVendidoM`, `unidadesVendidasM`: ~100× el tiempo/iteraciones de 10.000 ventas (~1.000.000 de callbacks en `.reduce(...)`).
  - `ventasPorCiudadM`, `ventasDelDia`: ~100× el tiempo/iteraciones de 10.000 ventas, reservando arreglos filtrados de mayor tamaño en memoria.
  - `totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor`: ~100× en recorrido inicial, sumando agrupación y costo de ordenamiento (`.sort(...)`) en `topProductosPorValor`.
  - `totalCiudadCadena`: ~100× el tiempo/iteraciones de 10.000 ventas pero manteniendo 4 pasadas y 3 arreglos intermedios por consulta (mayor consumo de memoria que `totalCiudadUnaPasada`).
  - `totalCiudadUnaPasada`: ~100× el tiempo/iteraciones de 10.000 ventas (~1.000.000 de iteraciones) en 1 sola pasada y memoria $O(1)$.
  - `generarVentas`: ~100× de tiempo y creación de ~1.000.000 de objetos en memoria.
  - `totalVendidoInst`, `ventaMayorInst`, `totalPorCiudadInst`: ~100× las operaciones de 10.000 ventas (hasta ~2.000.000 a ~3.000.000 de `ops` según el caso).
- **Función cuadrática ($O(n^2)$):**
  - `clientesRecurrentes`: al escalar desde `n=16000` (`480.505ms`) hasta `1.000.000` (`62.5×` más registros), el factor cuadrático es $62.5^2 = 3.906.25\times$, lo que proyecta alrededor de **~1.877.000 ms (~31 minutos)** por ejecución.

## 3. Riesgos (de mayor a menor)

- **Criterio de priorización:** impacto combinado en **tiempo de ejecución** y **consumo de memoria adicional** cuando el volumen pase de decenas de registros a cientos de miles o un millón en un servidor con memoria limitada.
1. **`clientesRecurrentes` (Mayor riesgo — $O(n^2)$ tiempo / $O(n)$ espacio):** sus bucles anidados y `.includes(...)` hacen que el tiempo crezca de forma cuadrática (pasando de `92.062ms` en `n=8000` y `480.505ms` en `n=16000` a ~31 minutos proyectados en `1.000.000` de ventas).
2. **`topProductosPorValor` (Riesgo alto — $O(n + p \log p)$ o $O(n \log n)$ tiempo / $O(n)$ espacio):** agrupa por producto, crea arreglos intermedios y ordena (`.sort(...)`), aumentando el costo de CPU y memoria al crecer los productos y ventas.
3. **`totalCiudadCadena` (Riesgo medio-alto — $O(n)$ con 4 pasadas / $O(n)$ espacio):** genera 3 arreglos intermedios innecesarios frente a `totalCiudadUnaPasada` (ambas arrojaron `128508000` en 10.000 ventas), presionando más la memoria.
4. **`ventasPorCiudadM` y `ventasDelDia` (Riesgo medio — $O(n)$ tiempo / $O(n)$ espacio):** `.filter(...)` crea arreglos nuevos que pueden acercarse a `n` elementos en consultas amplias.
5. **`totalPorCiudad`, `totalPorCiudadInst` y `unidadesPorProducto` (Riesgo bajo-medio — $O(n)$ tiempo / espacio según categorías):** hacen una sola pasada, pero mantienen objetos acumuladores que crecen según la variedad de ciudades o productos.
6. **Funciones de un solo recorrido y espacio $O(1)$ (`totalCiudadUnaPasada`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalVendidoM`, `unidadesVendidasM`, `totalVendidoInst`, `ventaMayorInst`, `primeraVentaInst`):** el menor riesgo de memoria y crecimiento lineal directo o constante.

## 4. Plan de optimización (`clientesRecurrentes`)

- **Idea de mejora (sin implementar aún en v0.2):** sustituir los ciclos anidados y `.includes(...)` por un solo recorrido apoyado en estructuras de consulta rápida (`Set` / `Map`) para registrar clientes ya vistos y marcar los recurrentes en tiempo constante promedio por venta.
- **¿Qué trabajo se repite hoy?**
  - Comparar cada venta `i` con todas las ventas siguientes `j` (`i + 1` hasta el final), repitiendo comparaciones sobre el mismo cliente.
  - Buscar linealmente con `!recurrentes.includes(ventas[i].cliente)` dentro del arreglo acumulado en cada coincidencia.
- **¿Qué información se podría guardar para no buscarla de nuevo?**
  - Guardar un conjunto (`Set`) con los clientes ya vistos durante un único recorrido del arreglo y otro conjunto (`Set`) con los clientes ya identificados como recurrentes para evitar duplicados sin volver a recorrer el arreglo ni buscar en `recurrentes`.
```[cite: 2, 3, 4, 5]

### Para cerrar `RENDIMIENTO.md` y hacer el commit `v0.2`
1. Pega este contenido en `RENDIMIENTO.md` y guárdalo (`Ctrl + S`).
2. Si obtuviste algún tiempo exacto en `probar-10k.js` para las demás funciones, puedes reemplazar ahí la estimación lineal; si no, ya queda coherente y sin marcadores pendientes.
3. Haz el commit de versión `v0.2` y súbelo al repositorio:
   ```bash
   git add .
   git commit -m "feat(v0.2): agrega informe RENDIMIENTO.md del MiniReto 8"
   git push
   ```[cite: 2]

¿Ya quedó guardado `RENDIMIENTO.md` o necesitas ajustar algún detalle antes de hacer el commit `v0.2`?