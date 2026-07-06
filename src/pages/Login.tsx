
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  

  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, ingresa tu email y contraseña.');
      return;
    }

    try {

      const response = await api.post('/auth/login', formData);
      
      const token = response.data.token;
      
      localStorage.setItem('token', token);
      
      
      navigate('/home');

    } catch (err: any) {
      console.error("Error en login:", err);
      
      setError('Credenciales incorrectas. Revisa tu correo y contraseña e intenta nuevamente.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Iniciar Sesión 🎟️</h2>
      
      {/* Mostramos el mensaje de error si existe */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div>
          <label>Contraseña:</label><br />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            cursor: 'pointer', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          Entrar
        </button>
      </form>

      {/* Enlace para ir a la pantalla de registro si no tiene cuenta */}
      <p style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register" style={{ color: '#007BFF' }}>Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;