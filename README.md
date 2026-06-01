# 📱 iJanda Project 🍀
🌍 Explore La Janda. Discover. Experience.

iJanda is a full-stack tourism platform consisting of a mobile application and a backend API. It allows users to explore tourist locations, events, and places of interest in the "La Janda" region (Cádiz, Spain).

## 🧩 Project Architecture

This project is divided into three main parts:

### 📱 Mobile App (React Native)
- User interface for exploring places and events  
- Interactive map and favorites system  
- Category-based navigation  
- Authentication flow  

### 🧠 Backend API (PHP)
- REST API for managing data  
- User authentication  
- Place and event management  
- Database communication  

### 🗄️ Database
- MySQL relational database  
- Structured schema for places, users, and favorites  

## 📁 Project Structure

```text
ijanda/
├── App.js
├── AppNavigator.js
├── app.json
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   └── images/
├── src/
│   ├── components/
│   │   ├── CategoryGrid.js
│   │   └── PlaceItem.js
│   ├── context/
│   │   └── FavoriteContext.js
│   ├── screens/
│   │   ├── Welcome.js
│   │   ├── Home.js
│   │   ├── AuthScreen.js
│   │   └── app/
│   │       ├── MapInteractiveScreen.js
│   │       ├── PlaceListScreen.js
│   │       ├── PlaceScreen.js
│   │       ├── FavoritesScreen.js
│   │       └── EventsScreen.js
│   ├── services/
│   │   ├── authService.js
│   │   └── placeService.js
│   └── styles/

ijanda-php/
├── public/
│   └── index.php
├── src/
│   ├── db.php
│   └── routes.php
└── database/
    └── database_schema.sql
```

## 🚀 Features
- 🗺️ Interactive map with locations  
- ⭐ Favorites system  
- 🔎 Search & filtering by category  
- 📍 Detailed place information  
- 🔐 Authentication system  
- 🌐 Backend API integration  

## 🛠 Tech Stack
- React Native  
- JavaScript  
- PHP  
- MySQL  
- Git & GitHub  

## 🎯 Purpose

This project was developed as part of my Higher Degree in Multiplatform Application Development (DAM) with focus on:

Full-stack application development
Mobile app architecture
Backend API design
Database modeling
Real-world project structure

## 📸 Screenshots

### 🟢 Home Screen
<p align="center">
<img width="357" height="791" alt="Pantalla 1" src="https://github.com/user-attachments/assets/35c0f832-8489-41e7-a2d7-b8cd1de38623" width="300"/>
</p>

### 🔐 Login Screen
<p align="center">
<img width="353" height="789" alt="Pantalla 2" src="https://github.com/user-attachments/assets/9fd48253-32ee-4ced-9586-27b143a93c53" width="300"/>
</p>

### 👤 Create Account Screen
<p align="center">
<img width="351" height="782" alt="Pantalla 3" src="https://github.com/user-attachments/assets/f758f35c-8faa-4dd7-9613-554368dfffd0" width="300"/>
</p>

### 🟣 Welcome Screen
<p align="center">
<img width="350" height="782" alt="Pantalla 4" src="https://github.com/user-attachments/assets/bc5d8af4-1c36-4c85-9e2b-ceb08a2f4c4d" width="300"/>
</p>

### 📍 Place Detail
<p align="center">
<img width="362" height="813" alt="Pantalla 5" src="https://github.com/user-attachments/assets/4a36b003-c14d-4121-92c6-948a6025143c" width="300"/>
</p>

### ⭐ Favorites
<p align="center">
<img width="371" height="824" alt="Pantalla 7" src="https://github.com/user-attachments/assets/e2706042-9f77-485c-bafd-0a1fce5637b0" width="300"/>
</p>

### 🎉 Events Screen
<p align="center">
<img width="364" height="822" alt="Pantalla 8" src="https://github.com/user-attachments/assets/e98a02d8-74c7-4c6c-a316-0415adbf6cf6" width="300"/>
</p>

## 🔮 Future Improvements
- Backend migration to Node.js  
- JWT authentication  
- Offline mode support  
- Performance optimization  
- UI/UX improvements  

## 👨‍💻 Author

José Diego Ramos Manzanares

📧 Contact: ramosmanz.it@gmail.com  
🔗 LinkedIn: linkedin.com/in/josediegoramos
