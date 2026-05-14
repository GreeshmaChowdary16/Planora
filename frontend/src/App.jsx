import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <div className="app-layout">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
