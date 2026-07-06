// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  // 1. EL ESTADO (Memoria del componente)
  // Usamos useState para guardar lo que el usuario escribe en las cajas de texto.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Variables para mostrar mensajes de error o éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Herramienta para navegar a otra pantalla (ej. al login)
  const navigate = useNavigate();

  // 2. FUNCIÓN PARA ACTUALIZAR LA MEMORIA
  // Esta función se ejecuta cada vez que el usuario teclea algo.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Mantenemos los datos anteriores y solo actualizamos el campo que cambió
    setFormData({ ...formData, [name]: value });
  };

  // 3. FUNCIÓN PARA ENVIAR EL FORMULARIO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    setError('');       // Limpiamos errores previos
    setSuccess('');

    // Validación: Comprobar que no haya campos vacíos
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Intentamos enviar los datos al backend mediante un POST a la ruta /users/register
      await api.post('/users/register', formData);
      
      // Si todo sale bien, mostramos éxito
      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Esperamos 2 segundos y lo enviamos a la pantalla de login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      // 1. Imprimimos el error completo en la consola oculta del navegador
      console.error("Error detallado:", err);

      // 2. Revisamos qué nos respondió el backend
      if (err.response && err.response.data) {
        // Si el backend nos mandó un objeto con varios errores (ej. validaciones)
        if (typeof err.response.data === 'object') {
          // Lo convertimos a texto para poder leerlo en pantalla
          setError(JSON.stringify(err.response.data)); 
        } else {
          // Si es un texto simple
          setError(err.response.data);
        }
      } else {
        // Si no hay respuesta (ej. el servidor está apagado o bloqueó la conexión)
        setError('Error de conexión. ¿Está el backend encendido?');
      }
    }
  };

  // 4. LO QUE SE DIBUJA EN LA PANTALLA (HTML/JSX)
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