// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/users/current');
        const email = response.data.username;
        if (email) {
          const namePart = email.split('@')[0];
          const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          setUserName(formattedName);
        }
      } catch (err) {
        console.error("Error al traer los datos del usuario:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <h2>Fly Away ✈️</h2>
        <Link to="/home" className="nav-link">Vuelos</Link>
        <Link to="/bookings" className="nav-link">Mis Reservas</Link>
      </div>
      
      <div className="nav-user">
        {userName && <span>Hola, <strong>{userName}</strong></span>}
        <button onClick={handleLogout} className="btn btn-outline">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;