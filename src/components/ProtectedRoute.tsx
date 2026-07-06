// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

// Este componente recibe a la pantalla que queremos proteger (children)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Buscamos el token en la memoria del navegador
  const token = localStorage.getItem('token');

  // Si no hay token, redirigimos inmediatamente a la pantalla de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, dejamos que el usuario vea la pantalla
  return children;
};

export default ProtectedRoute;