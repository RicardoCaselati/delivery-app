import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import './style/app.css';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
