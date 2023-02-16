# Dermanet

El proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5. con la instruccion ng new dermanet

## Development server

Para correr el servidor de prueba se corre la instruccion `ng serve`. Abrir en el navegador la direccion `http://localhost:4200/`.

## Codigo para generar nuevas interfaces, componentes y modulos
En la terminal se corren las siguientes instrucciones para generar interfaces estas corresponden a los modelos de datos:
ng g i ubicacion/nombre

Para generar modulos se ejecuta la instruccion, esta empaqueta modulos que tienen sus propios componentes 
ng g m ubicacion/nombre

Para generar un componente se ejecuta la instruccion:
ng g c ubicacion/nombre

Para generar un servicios se ejecuta la instruccion, estas sirven para accesar a los servicios como localstorage, los servicios de acceso a las api
ng g s ubicacion/nombre

## Construir

`ng build` para construir el proyecto y se guardara en el directorio dist/

## estructura
Se generaron componentes en el modulo raiz como el nav-bar, que siempre aparecera en pantalla, y el not found que es a donde va cuando no encuentra ninguna ruta

Se generaron los modelos de datos para recibir la informacion

Se generaron los distintos modulos como son: doctor, paciente, usuario y diagnostico y dentro cada uno tiene sus componentes como listar, ver, y nuevo

Se generaron los servicios para acceder al api generado en spring, al igual que el localstorage para guardar el JWT en la computadora, y poder acceder a los servicios que requieren autenticacion.

Se utiliza '@angular/router' para generar las rutas y acceso a cada uno de los modulos.

## Funcionamiento

![Login](/img/login.png)
![Login consulta al api](/img/loginConsulta.png)
![Local storage](/img/token.png)
![Pacientes](/img/pacientes.png)
![Pacientes consulta al api](/img/consulta_pacientes.png)
![Ver paciente](/img/ver_paciente.png)
![Nuevo Diagnostico](/img/diagnostico.png)
![Doctores](/img/doctor.png)
