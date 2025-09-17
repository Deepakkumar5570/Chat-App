# 💬 MERN Chat App (Socket.io)

**Real-time full-stack chat application** built with **MERN** (MongoDB, Express, React, Node.js) and **Socket.io**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![GitHub issues](https://img.shields.io/github/issues/Deepakkumar5570/Chat-App)](https://github.com/YOUR_USERNAME/Chat-App/issues)  
[![GitHub stars](https://img.shields.io/github/stars/Deepakkumar5570/Chat-App?style=social)](https://github.com/Deepakkumar5570/Chat-App/stargazers)  
[![GitHub forks](https://img.shields.io/github/forks/Deepakkumar5570/Chat-App?style=social)](https://github.com/Deepakkumar5570/Chat-App/network)

---

## 🌐 Live Demo

> Deployed link (replace with your URL):  
**https://your-app-url.example.com**

---

## ✨ Features

- 🔐 Authentication with **JWT** and password hashing (bcrypt)
- 👤 Profile management (name, email, bio, profile picture)
- 💬 Real-time 1:1 messaging using **Socket.io**
- 🟢 Online / Offline presence indicator
- 🖼️ Media & profile image support (local or Cloudinary)
- 📱 Responsive UI with Tailwind CSS
- ✅ Basic form validation (frontend + backend)

---

## 🛠 Tech Stack

- Frontend: **React**, **Tailwind CSS**
- Backend: **Node.js**, **Express**
- Database: **MongoDB** (Mongoose)
- Real-time: **Socket.io**
- Auth: **JWT**, **bcrypt**
- File uploads: **Multer** (optional Cloudinary)
- Dev: nodemon, concurrently (optional)

---

## 📂 Project Structure (suggested)
```
mern-chat-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── socket/
│ ├── config/
│ └── server.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.jsx
└── README.md

```
---

## ⚙️ Setup & Run (Local)

### 1. Clone repo
```bash
     git clone https://github.com/YOUR_USERNAME/mern-chat-app.git
     cd mern-chat-app
```
     cd backend
     npm install 
     PORT=5000
     CLIENT_URL=http://localhost:3000
```
 npm run dev
    # or
node server.js
```

    const server = require('http').createServer(app);
    const io = require('socket.io')(server, { cors: { origin: process.env.CLIENT_URL }});
    server.listen(process.env.PORT || 5000);
```
 
cd ../frontend
npm install
npm start
http://localhost:3000

```
- POST   /api/auth/signup       // Register user (name, email, password)
- POST   /api/auth/login        // Login (returns JWT)
- GET    /api/users             // List/search users
- GET    /api/users/:id         // Get user profile
- PUT    /api/users/:id         // Update user profile
- POST   /api/messages          // Save message to DB
- GET    /api/messages/:chatId  // Get messages for a chat

##
- connection        // socket connected
- join              // client joins a room (userId)
- send_message      // client -> server to send message
- receive_message   // server -> client to deliver message
- typing            // optional typing indicator
- stop_typing       // optional stop typing
- disconnect        // handle disconnect / offline
##
- Backend: Render / Railway / Heroku
- Frontend: Vercel / Netlify
- Database: MongoDB Atlas (managed)
- Image Hosting: Cloudinary or AWS S3 (avoid storing large binaries in DB)
- Set CLIENT_URL in backend .env to the deployed frontend URL
##
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}

## from repo root (if configured)
     npm run dev:all

- Use Postman / Insomnia to test API endpoints
- Use browser console or server logs to verify Socket.io message flow
- (Optional) Add Jest for backend tests and React Testing Library for frontend tests

![Login](frontend/public/screenshots/login.png)
![Chat](frontend/public/screenshots/chat.png)
![Profile](frontend/public/screenshots/profile.png)
##
1. Fork the repository
2. Create a feature branch: git checkout -b feature/your-feature
3. Commit your changes: git commit -m "Add some feature"
4. Push: git push origin feature/your-feature
5. Open a Pull Request
##
This project is licensed under the MIT License. See the LICENSE file for details.
If you need help integrating features or deploying, open an issue or contact: dk0778671@gmail.com

##
MIT License

Copyright (c) Deepak Kumar



