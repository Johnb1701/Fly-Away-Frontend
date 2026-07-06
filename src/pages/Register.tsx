
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');       
    setSuccess('');

    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await api.post('/users/register', formData);
      
      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      
      console.error("Error detallado:", err);

      
      if (err.response && err.response.data) {
        
        if (typeof err.response.data === 'object') {
      
          setError(JSON.stringify(err.response.data)); 
        } else {
          setError(err.response.data);
        }
      } else {
        setError('Error de conexión. ¿Está el backend encendido?');
      }
    }
  };

  
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Registro Super Importante ✈️</h2>
      
      {/* Si hay un error, lo mostramos en rojo */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Si hay éxito, lo mostramos en verde */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        
        <div>
          <label>Apellido:</label><br />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        
        <div>
          <label>Contraseña:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Register;