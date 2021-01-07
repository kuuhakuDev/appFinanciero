# Finanzas Personales

## Funcionamiento
Este sistema gestionara las transacciones de los usuarios.

Tendra los siguientes funciones:
* Usuarios
* Cuentas
* Movimientos
* Plantillas
* Categorias

### Usuarios
Los usuarios tendran acceso a uno o varias cuentas, y una cuenta solo sera accedida por un solo usuario.

Los usuarios podran crear un numero ilimitado de:
* Cuentas
* Movimientos
* Plantillas
* Categorias

### Cuentas
Las cuentas tendran los siguentes campos:
* Id
* UserID
* Nombre
* Saldo

El saldo inicial de una cuenta siempre sera 0.

Las cuentas pueden tener uno o varios movimientos.

La manera en la que el saldo se ira actualizando es cuando el usuario ingrese un movimiento en esta cuenta.

La sumatoria de todos los movimientos en una cuenta, será el valor que se reflejará en el saldo de dicha cuenta.

### Movimientos
Los movimientos tendran los siguientes campos:


Un movimiento puede ser negativo o positivo.

Pueden contener uno o varias categorias.

### Plantillas
Las plantillas es un movimiento sin ingresar, o sea, tendra las misma caracteristicas que un movimiento pero esta no afectara el saldo de la cuenta y ni se mostrara como otro movimineto, sino que, sera guardado para ser utilizado mas adelante como un movimiento cuando esta se requiera.

### Categorias
Las categorias tendran los liguientes campos:

* Id
* IdCuenta
* Nombre

Esta pueden ser ingresadas en un movimiento para porder clasificarlor y tambien ser filtrados.