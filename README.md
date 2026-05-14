# Planora - AI Project Planning Assistant

Planora is a MERN stack application designed to help students and developers plan their projects using AI. It provides structured roadmaps, tech stack recommendations, and component lists for both hardware and software projects.

## 🚀 Features
- **AI Chatbot**: Powered by Google Gemini 1.5 Flash.
- **Project History**: Save and manage your generated project plans.
- **Authentication**: Secure Login/Register with JWT.
- **Voice Interaction**: Integrated speech-to-text for hands-free planning.
- **Premium UI**: Modern, dark-themed aesthetic with smooth animations.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Lucide Icons, CSS3.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **AI**: Google Generative AI (Gemini SDK).

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Planora
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```

---

## 🌍 Deployment Guide

### Backend (Render/Railway/Heroku)
1. Push the code to GitHub.
2. Create a new Web Service on Render/Railway.
3. Set the build command to `npm install`.
4. Set the start command to `node server.js`.
5. Add all environment variables from your backend `.env`.

### Frontend (Vercel/Netlify)
1. Push the code to GitHub.
2. Connect the repo to Vercel/Netlify.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Add the environment variable `VITE_API_URL` (set to your live backend URL + `/api`).

---

## 📄 License
ISC License
