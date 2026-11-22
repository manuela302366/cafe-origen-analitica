# Café Origen — Motor de Analítica (v0.1)

Motor de analítica en Node.js para **Café Origen** (tostadora de café de especialidad de Medellín) desarrollado dentro del trayecto de [Algoritmia 2](https://moodle.riwi.io/mod/page/view.php?id=7614) (`cafe-origen-analitica`). Permite analizar el historial de ventas desde consola con funciones puras, formato en pesos colombianos (`es-CO`) y manejo de casos borde.

## Estructura del proyecto

* `src/datos.js`: historial de ventas modelado como arreglo de objetos.
* `src/analitica.js`: funciones de cálculo, filtrado, agrupación y ranking (`totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, sus versiones con métodos `M`, `totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor` y `ventasDelDia`).
* `src/explorar.js`: exploración inicial de la estructura y los casos borde de los datos.
* `src/verificar.js`: comprobación de equivalencia entre ciclos y métodos de arreglo, agrupaciones, top $k$ y no mutación del arreglo original.
* `src/reporte.js`: reporte ejecutivo por consola con formato `es-CO` y resumen diario.
* `bitacora.md`: diccionario de datos, casos borde, pseudocódigo, trazas, relaciones con las preguntas sobre colecciones y registro de depuración.

## Preguntas de negocio que responde
Ingresos y volumen general: ¿cuál es el total vendido en pesos colombianos y cuántas unidades totales se han vendido?

Ticket promedio y venta máxima: ¿cuál es el ticket promedio considerando solo ventas válidas (cantidad > 0) sin arrojar NaN cuando no hay ventas, y cuál fue la venta de mayor valor?

Desempeño por ciudad: ¿cuánto dinero se ha vendido en cada ciudad normalizando mayúsculas y espacios para evitar grupos duplicados?

Productos: ¿cuántas unidades se vendieron por producto y cuáles son los top 3 productos que más dinero generaron?

Ventas por día: ¿qué ventas, ingresos totales y ticket promedio hubo en una fecha específica (tanto en un día con ventas como en un día sin ventas)?