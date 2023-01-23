import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import './style/app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
