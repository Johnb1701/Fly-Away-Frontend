// src/pages/Flights.tsx
import React, { useState, useEffect } from 'react';
import api from '../api';

interface Flight {
  id: number;
  airlineName: string;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  availableSeats: number;
}

const Flights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');

  const fetchFlights = async () => {
    try {
      const response = await api.get('/flights'); 
      setFlights(response.data);
    } catch (err) {
      console.error("Error al traer vuelos:", err);
      setError('No se pudieron cargar los vuelos.');
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleBookFlight = async (flightId: number) => {
    setBookingError('');
    setBookingSuccess('');
    try {
      await api.post('/flights/book', { flightId: flightId });
      setBookingSuccess(`¡Reserva confirmada con éxito! 🎉`);
      fetchFlights();
    } catch (err: any) {
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        setBookingError(err.response.data);
      } else {
        setBookingError('Ocurrió un error al intentar reservar el vuelo.');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Explorar Vuelos</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bookingSuccess && <p style={{ color: 'green', fontWeight: 'bold' }}>{bookingSuccess}</p>}
      {bookingError && <p style={{ color: 'red', fontWeight: 'bold' }}>{bookingError}</p>}

      {flights.length === 0 && !error && (
        <p>Buscando vuelos disponibles en nuestra red...</p>
      )}

      <div className="flight-list">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-info">
              <h3>{flight.airlineName} - {flight.flightNumber}</h3>
              <p><strong>Salida:</strong> {new Date(flight.estDepartureTime).toLocaleString()}</p>
              <p><strong>Llegada:</strong> {new Date(flight.estArrivalTime).toLocaleString()}</p>
              <p><strong>Asientos disponibles:</strong> {flight.availableSeats}</p>
            </div>
            
            <div>
              <button 
                onClick={() => handleBookFlight(flight.id)}
                disabled={flight.availableSeats === 0}
                className="btn btn-success"
              >
                {flight.availableSeats === 0 ? 'Agotado' : 'Reservar Vuelo'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flights;