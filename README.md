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
  <img src="https://i.imgur.com/iqXzkYo.png" width="300"/>
</p>

### 🟣 Welcome Screen
<p align="center">
  <img src="https://github.com/user-attachments/assets/97ecbb2e-fd76-40ed-85c0-55d058291641" width="300"/>
</p>

### 📍 Place Detail
(añadir imagen aquí)

### ⭐ Favorites
(añadir imagen aquí)

### 🔐 Login Screen
(añadir imagen aquí)

## 🔮 Future Improvements
- Backend migration to Node.js  
- JWT authentication  
- Offline mode support  
- Performance optimization  
- UI/UX improvements  

## 👨‍💻 Author

José Diego Ramos Manzanares

LinkedIn: linkedin.com/in/josediegoramos
GitHub: github.com/Sauravis
