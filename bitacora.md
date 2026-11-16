
Diccionario de datos :propiedad · tipo · significado 

   
| Problema                           | Decisión |
| venta 8 con cantidad 0             | no cuenta en el ticket |
| ciudades con espacios y minúsculas | normalizar antes de comparar |
| clientes repetidos                 | es válido: se usa en S5 y S6 |


Casos borde detectados:Problemas en los datos
1.Inconsistencias en los nombres de las ciudades:En el registro con id: 5 aparece 'medellin' todo en minúscula.
2.Cantidades inválidas o en cero: En el registro con id: 8, el campo cantidad tiene el valor 0 ('Origen Huila 500 g', precio 42000).   Por qué es un problema: No tiene sentido lógico registrar una venta de cero unidades; además, si se calcula el promedio de ventas, ese registro afectará el resultado.
3.Clientes repetidos y sin nombre (solo códigos):Los clientes no tienen nombre, solo un código ('C01' a 'C08'), y varios se repiten en distintas compras (por ejemplo, 'C01' aparece 3 veces y 'C02' y 'C03' aparecen 2 veces cada uno).   Por qué es un problema: Al calcular cuántos clientes únicos compraron, si simplemente se cuenta la cantidad de filas (12), el resultado será incorrecto porque hay clientes repetidos. Además, sin una tabla que relacione cada código con su nombre real, no se sabe quién es cada cliente.