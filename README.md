# Server Videogame

Este es un proyecto que esta realizado con Nodejs + ExpressJs en donde se realiza un CRUD sobre un catalogo de videojuegos, se utiliza una base de datos no relacional MongoDb y Redis para el almacenamiento en cache.

## Pre-Requisitos

Para correr el proyecto se necesita lo siguiente:

* Tener instalado un editor de codigo, por ejemplo Visual Studio Code
* Tener instalado MongoDB
* Tener instalado Redis
* Tener instalado Compass (No indispensable)
* Tener instalado Docker (No indispensable)

### Instalación

A continuación se muestran los pasos para que pueda correr el proyecto

Bajar el proyecto de git como se muestra a continuación

```
git clone https://github.com/LuisSic/proyectobackend.git
```

Correr el siguiente comando para instalar las dependencias del proyecto

```
npm install
```

Luego se debera tener el servicio de redis corriendo y el servicio de Mongo. Posteriomente con compass se debera conectar a la base de datos utilizando los siguientes datos:

* Host: localhost
* Puerto: 27017

Se deberá crear una base de datos llamada arcade y una colleción videogame.

Por ultimo para iniciar el Api se tendrá que ejecutar el siguiente comando, que esta corriendo en la siguiente url `http://localhost:3000/videogame`

```
npm start
```

## Docker

Si se quiere tener la aplicación en contenedores se debera ejecutar el siguiente comando

```
docker-compose up
```
El archivo docker compose realizara todo lo necesario para crear los contonedores necesarios del proyecto tanto del front end y del back end.

Se debe modificar el siguiente parametro del archivo dependiendo de las rutas de los proyectos

```
build: path
```

## Autor

* **Luis Antonio Sic**
