
import React, { useState } from 'react';
import api from '../api';


interface Ticket {
  id: number;
  bookingDate: string;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  customerFirstName: string;
  customerLastName: string;
}

const Bookings = () => {

  const [bookingId, setBookingId] = useState('');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTicket(null);

    if (!bookingId) {
      setError('Por favor, ingresa un número de reserva.');
      return;
    }

    try {
      const response = await api.get(`/flights/book/${bookingId}`);
      setTicket(response.data);
    } catch (err) {
      console.error("Error al buscar reserva:", err);
      setError('No se encontró ninguna reserva con ese ID. Verifica que sea correcto.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h2>Mis Reservas 🎫</h2>
      <p style={{ color: '#666' }}>Ingresa el número identificador de tu reserva para generar tu pase de abordar.</p>
      
      {/* Formulario de búsqueda en tiempo real */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="number" 
          placeholder="Ej: 1" 
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          style={{ padding: '10px', flexGrow: 1, borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Buscar Ticket
        </button>
      </form>

      {/* Renderizado de errores */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* Renderizado del ticket de simulación aérea */}
      {ticket && (
        <div style={{ border: '2px dashed #007BFF', padding: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa', marginTop: '25px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#007BFF', uppercase: 'true' }}>Pase de Abordar</h3>
          <p><strong>Pasajero:</strong> {ticket.customerFirstName} {ticket.customerLastName}</p>
          <p><strong>Vuelo:</strong> {ticket.flightNumber}</p>
          <p><strong>Salida:</strong> {new Date(ticket.estDepartureTime).toLocaleString()}</p>
          <p><strong>Llegada:</strong> {new Date(ticket.estArrivalTime).toLocaleString()}</p>
          <hr style={{ borderTop: '1px solid #ccc', margin: '15px 0' }} />
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
            Reserva #{ticket.id} realizada el {new Date(ticket.bookingDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookings;