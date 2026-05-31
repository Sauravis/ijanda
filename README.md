# Proyecto iJanda 🍀 

## 📱 iJanda Project 🍀
🌍 Explore La Janda. Discover. Experience.

iJanda is a full-stack tourism platform consisting of a mobile application and a backend API. It allows users to explore tourist locations, events, and places of interest in the La Janda region (Cádiz, Spain).

🧩 Project Architecture

This project is divided into three main parts:

📱 Mobile App (React Native)
User interface for exploring places and events
Interactive map and favorites system
Category-based navigation
Authentication flow

🧠 Backend API (PHP)
REST API for managing data
User authentication
Place and event management
Database communication

🗄️ Database
MySQL relational database
Structured schema for places, users, and favorites

📁 Project Structure
ijanda/
├── App.js
├── AppNavigator.js
├── src/
│   ├── components/
│   ├── screens/
│   ├── context/
│   ├── services/
│   └── styles/

ijanda-php/
├── public/
├── src/
├── database/

🚀 Features
🗺️ Interactive map with locations
⭐ Favorites system
🔎 Search & filtering by category
📍 Detailed place information
🔐 Authentication system
🌐 Backend API integration

🛠 Tech Stack
React Native
JavaScript
PHP
MySQL
Git & GitHub

🎯 Purpose

This project was developed as part of my Higher Degree in Multiplatform Application Development (DAM) with focus on:

Full-stack application development
Mobile app architecture
Backend API design
Database modeling
Real-world project structure

📸 Screenshots

Home screen <p align="center">
  <img src="https://i.imgur.com/iqXzkYo.png" alt="Pantalla de inicio de iJanda" width="300"/>
</p> 
Welcome screen 
<p align="center">
  <img width="355" height="785" alt="Welcome screen iJanda" src="https://github.com/user-attachments/assets/97ecbb2e-fd76-40ed-85c0-55d058291641" />
</p>
 
Place detail https://imgur.com/a/yJKx3Fa
Favorites
Login screen

🔮 Future Improvements
Migration to Node.js backend
Improved authentication (JWT)
Offline mode
Performance optimization
UI/UX improvements

👨‍💻 Author

José Diego Ramos Manzanares

LinkedIn: linkedin.com/in/josediegoramos
GitHub: github.com/Sauravis

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
