# Todo App 

A full-stack **Todo Application** built using **React (Vite) for frontend** and **Node.js (Express, MongoDB) for backend**. The app allows users to register, log in, and manage their tasks efficiently.

Try here : https://todo-application-1-cvhe.onrender.com

## 🚀 Features
- User Authentication (Register, Login, Logout) using JWT
- Create, Read, Update, and Delete (CRUD) for Todos
- Automatic task expiration with a background scheduler
- Responsive UI with **Tailwind CSS**
- API secured with authentication middleware

## 🛠️ Tech Stack
### Frontend
- **React (Vite)**
- **React Router DOM** (Navigation)
- **Axios** (API Calls)
- **Tailwind CSS** (Styling)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Token) Authentication**
- **Nodemon** (for development)
- **CORS** (Cross-Origin Resource Sharing)
- **dotenv** (Environment variables management)

## 📂 Folder Structure
```
📦 todoApp
 ┣ 📂 backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 Config (Database connection)
 ┃ ┃ ┣ 📂 Routes (API routes)
 ┃ ┃ ┣ 📂 Middlewares (Auth & Task scheduler)
 ┃ ┣ 📜 index.js (Main entry point)
 ┃ ┣ 📜 .env (Environment variables)
 ┃
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 Components (React Components)
 ┃ ┃ ┣ 📂 Pages (Register, Login, Dashboard)
 ┃ ┣ 📜 main.jsx (React Entry point)
 ┃ ┣ 📜 vite.config.js (Vite Config)
 ┃
 ┣ 📜 README.md (This file)
```

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/gchittora/TODO-Application.git
cd todoApp
```

### 2️⃣ Setup Backend
```sh
cd backend
npm install
```
- Create a **.env** file in the `backend/` folder and add:
```sh
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```
- Start the backend server:
```sh
npm run dev
```

### 3️⃣ Setup Frontend
```sh
cd ../frontend
npm install
```
- Start the frontend:
```sh
npm run dev
```





