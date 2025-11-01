# Proyecto iJanda 🍀 

## 📱 Vive La Janda. Explora. Descubre. Disfruta.

<p align="center">
  <img src="https://i.imgur.com/iqXzkYo.png" alt="Pantalla de inicio de iJanda" width="300"/>
</p>


```
├── README.md
├── generateImageMap.js
├── ijanda
│   ├── App.js
│   ├── AppNavigator.js
│   ├── app.json
│   ├── assets
│   │   ├── adaptive-icon.png
│   │   ├── category
│   │   │   ├── (contenido omitido)
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   ├── imageMap.js
│   │   ├── images
│   │   │   ├── (contenido omitido)
│   │   ├── logo.png
│   │   ├── placeholder.jpg
│   │   └── splash-icon.png
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── components
│       │   ├── CategoryGrid.js
│       │   └── PlaceItem.js
│       ├── context
│       │   └── FavoriteContext.js
│       ├── screens
│       │   ├── AuthScreen.js
│       │   ├── Home.js
│       │   ├── Layout.js
│       │   ├── Welcome.js
│       │   └── app
│       │       ├── EventsScreen.js
│       │       ├── FavoritesScreen.js
│       │       ├── MapInteractiveScreen.js
│       │       ├── PlaceListScreen.js
│       │       └── PlaceScreen.js
│       ├── services
│       │   ├── authService.js
│       │   └── placeService.js
│       └── styles
├── ijanda-php
│   ├── composer.json
│   ├── composer.lock
│   ├── database
│   │   └── database_schema.sql
│   ├── public
│   │   └── index.php
│   └── src
│       ├── db.php
│       └── routes.php
```

El siguiente paso sería hacer una copia del fichero ".env.example" y renombrarlo a .env

Añadiría las variables de entorno necesarias para conectar la base de datos con el backend.

Para tener la base de datos operativa y con registros tenemos que lanzar el comando "mysql" o "mysqlsh --sql -u root -p" (dependiendo de nuestro entorno) para poder ejecutar el comando SOURCE path_relative/database_schema.sql

Estando en la carpeta ijanda-php usar el comando "composer install" para instalar la paquetería necesaria para el backend.

Una vez instalados los paquetes del backend debemos lanzar el comando php -S localhost:8000 -t public/ para poder lanzar el servidor.

Una vez hecho ésto, hay que trasladarse a la carpeta ijanda para instalar la paquetería para el frontend usando el comando npm install.

Debemos lanzar el comando npm run start para poder tener levantado el frontend y así poder acceder a la aplicación web.
