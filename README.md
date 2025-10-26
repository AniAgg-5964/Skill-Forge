# 🌆 Skill Forge – Urban Skill Exchange & Collaboration Platform

## 🚀 Project Overview
**Skill Forge** is a full-stack web platform designed to empower urban communities by enabling **skill exchange, learning, and collaboration**.  
It connects individuals within their **locality** — helping them **teach, learn, or collaborate** based on their unique talents and interests.

By leveraging **geo-location filtering**, **smart scheduling**, and **intelligent recommendations**, Skill Forge fosters **community-driven economic growth** through seamless skill sharing.

---

## 🧩 Problem Statement
In modern cities, countless individuals possess valuable skills — from **coding and design** to **fitness training or crafts** — yet lack a structured, **local and trusted platform** to share or monetize them.  
At the same time, learners seeking **affordable and reliable mentors nearby** struggle to find verified and compatible people.

**Skill Forge bridges this gap** by providing a secure ecosystem for **hyperlocal skill exchange and collaboration**.

---

## 💡 Our Solution
Skill Forge empowers users to:
- 🔍 **Discover** mentors and learners nearby  
- 🧠 **Exchange** skills through structured sessions  
- 🤝 **Form** project teams and collaborate  
- ⭐ **Build** reputation via community ratings and reviews  

---

## ⚙️ Core Features

### 1. 🧑‍💼 User Authentication & Profile Management
- Secure **JWT-based login/signup**  
- **Role-based access** for learners and mentors  
- Editable profiles with skills, bio, and social links  
- Optional **identity verification**

### 2. 📍 Geo-Location Matching
- Auto-detects user location via the **browser’s Geolocation API**  
- Connects residents with local help or learning opportunities nearby  

### 3. 🗓️ Booking & Scheduling
- **Book skill sessions** with real-time availability checks  
- **Calendar integration** and session reminders  
- Conflict-free scheduling system  

### 4. 💬 Chat & Communication
- **Real-time messaging** between mentors and learners  
- **Group chats** for collaborative projects  

### 5. ⭐ Ratings & Reputation System
- Peer **reviews and ratings** for trust building  
- **Endorsements** and testimonials for mentors  

### 6. 🧑‍🤝‍🧑 Community Collaboration
- Create and join **local community projects**  
- Track **team progress and contributions**

---

## 🌟 Bonus Features Implemented
- 🧭 **Skill Feed:** Highlights trending skills in the community  
- 📊 **Dynamic Dashboard:** Shows bookings, chats, and ongoing projects  
- 👨‍🏫 **Provider Dashboard:** Displays mentor profiles and details  

---

## 🧰 Tech Stack

### Frontend
- ⚛️ **React.js + Vite** – Fast and optimized UI  
- 🧭 **React Router** – Smooth client-side navigation  
- 🎨 **Vanilla CSS** – Modern, responsive UI (no Tailwind)

### Backend
- 🟢 **Node.js + Express.js** – RESTful API and server management  
- 🍃 **MongoDB + Mongoose** – Scalable NoSQL database  
- 🔐 **JWT Authentication** – Secure user sessions  

---

## 🤖 AI Tools Used
- 🧠 **Google Gemini API** – AI-driven idea generation and skill insights  
- 💻 **TRAE AI Code Editor** – Assisted intelligent code suggestions and structuring  
- 💬 **ChatGPT (OpenAI)** – Documentation, debugging, and feature ideation  

---

## 📁 Project Structure
Skill-Forge/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ └── server.js
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── assets/
│ ├── App.jsx
│ └── main.jsx
└── index.html

---

## ⚙️ Setup & Installation

### 🔧 Prerequisites
Ensure you have:
- **Node.js** (v16 or higher)
- **MongoDB** installed and running
- **Google Gemini API Key**

---

### 🖥️ Backend Setup
bash
cd backend
npm install

Create a .env file in the backend directory:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key
PORT=3000

Start the backend server:

npm run dev

💻 Frontend Setup
cd frontend
npm install
npm run dev

🧱 Challenges Faced

Handling browser geolocation permission issues
Deploying a full-stack web app
Designing a clean UI without Tailwind CSS
Ensuring secure JWT-based authentication

🔮 Future Scope

💳 In-app payment and wallet features
🎥 Live video sessions with mentors
📱 Mobile app (React Native) version
📈 AI-driven skill progression visualization
🤝 Partnerships with NGOs and institutions for verified mentorship programs
🧑‍💻 Contributors

Team Skill Forge – Urban Innovators Building Local Connections

Access the app at the Deployed URL:
https://skill-forge-rho.vercel.app/
