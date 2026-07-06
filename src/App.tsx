
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <div>
                <Navbar />
                <Flights />
              </div>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute>
              <div>
                <Navbar />
                <Bookings />
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;