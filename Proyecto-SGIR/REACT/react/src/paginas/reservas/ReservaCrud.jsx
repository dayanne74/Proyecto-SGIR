import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Users, Check, X, AlertCircle, Search, Edit, Trash } from 'lucide-react';

export default function ReservasAdmin() {
  const { token, isLoading } = useAuth();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    estado: '',
    tipoServicio: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isLoading) return;

    const fetchReservas = async () => {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (filters.search) params.append('buscar', filters.search);
      if (filters.estado) params.append('estado', filters.estado);
      if (filters.tipoServicio) params.append('tipoServicio', filters.tipoServicio);
      params.append('page', filters.page);
      params.append('limit', filters.limit);
      const queryParams = params.toString();

      const url = `http://localhost:5000/api/reservas${queryParams ? `?${queryParams}` : ''}`;
      console.log('Fetching:', url, 'Bearer', token);

      try {
        const response = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401 || response.status === 403) {
          const body = await response.json();
          throw new Error(body.message);
        }
        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }

        const { data } = await response.json();
        setReservas(data.reservas);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [filters, token, isLoading]);

  if (isLoading) return <div className="loading">Cargando usuario...</div>;

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = newPage => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleEdit = id => navigate(`/admin/reservas/editar/${id}`);
  const handleDelete = id => {
    if (!window.confirm('¿Estás seguro de eliminar permanentemente esta reserva?')) return;
    // Implementa la lógica de eliminación real aquí
    setReservas(prev => prev.filter(r => r._id !== id));
  };

  const formatDate = dateString => new Date(dateString).toLocaleDateString();
  const getEstadoBadge = estado => {
    const estados = {
      confirmada: { color: 'green', icon: <Check size={14} /> },
      pendiente: { color: 'orange', icon: <AlertCircle size={14} /> },
      cancelada: { color: 'red', icon: <X size={14} /> },
      completada: { color: 'blue', icon: <Check size={14} /> }
    };
    const cfg = estados[estado] || { color: 'gray', icon: null };
    return <span className={`badge ${cfg.color}`}>{cfg.icon} {estado}</span>;
  };

  return (
    <div className="admin-container">
      <h1>Gestión de Reservas</h1>
      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Buscar reservas..."
          />
        </div>
        <select name="estado" value={filters.estado} onChange={handleFilterChange}>
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
          <option value="completada">Completada</option>
        </select>
        <select name="tipoServicio" value={filters.tipoServicio} onChange={handleFilterChange}>
          <option value="">Todos los servicios</option>
          <option value="excursion">Excursión</option>
          <option value="hotel">Hotel</option>
          <option value="paquete">Paquete</option>
        </select>
      </div>

      {error && <div className="error">Error al obtener reservas: {error}</div>}

      {loading ? (
        <div className="loading">Cargando reservas...</div>
      ) : reservas.length > 0 ? (
        <div className="reservas-table">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Personas</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map(reserva => (
                <tr key={reserva._id}>
                  <td>{reserva.codigoConfirmacion}</td>
                  <td>{reserva.nombre} {reserva.apellido}</td>
                  <td>{reserva.servicio?.nombre || reserva.servicioInfo?.nombre}</td>
                  <td className="capitalize">{reserva.tipoServicio}</td>
                  <td>{formatDate(reserva.fechaReserva)}</td>
                  <td>{reserva.numeroPersonas}</td>
                  <td>${reserva.precioTotal.toLocaleString()}</td>
                  <td>{getEstadoBadge(reserva.estado)}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(reserva._id)} className="edit"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(reserva._id)} className="delete"><Trash size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-results">No se encontraron reservas</div>
      )}

      {!loading && reservas.length > 0 && (
        <div className="pagination">
          <button disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>Anterior</button>
          <span>Página {filters.page} de {totalPages}</span>
          <button disabled={filters.page >= totalPages} onClick={() => handlePageChange(filters.page + 1)}>Siguiente</button>
        </div>
      )}
    </div>
  );
}
