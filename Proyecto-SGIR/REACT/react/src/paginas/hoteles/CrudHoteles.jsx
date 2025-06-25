import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../contexts/api';
import {
  MapPin,
  Users,
  Home,
  Utensils,
  DollarSign,
  Star,
  Edit2,
  Trash2,
  Plus,
  Image,
  Search
} from 'lucide-react';
import './Hoteles.css';

const Loader = ({ size = 'md', color = 'blue' }) => (
  <div className={`hotel-loader hotel-loader--${size} hotel-loader--${color}`} />
);

const InfoCard = ({ icon, title, value, color = 'blue' }) => (
  <div className={`hotel-info-card hotel-info-card--${color}`}>
    <div className="hotel-info-card__icon">{React.cloneElement(icon, { size: 16 })}</div>
    <div className="hotel-info-card__content">
      <p className="hotel-info-card__title">{title}</p>
      <p className="hotel-info-card__value">{value}</p>
    </div>
  </div>
);

const comidaOptions = [
  { value: 'incluida', label: 'Incluida' },
  { value: 'no incluida', label: 'No Incluida' }
];
const categoriaOptions = [
  { value: 'baja', label: 'Categoría Baja' },
  { value: 'media', label: 'Categoría Media' }
];

function FormularioHotel({ hotelEditar, onGuardar, onCancelar }) {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    numeroHabitaciones: '',
    numeroPersonas: '',
    comida: '',
    precio: '',
    categoria: ''
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hotelEditar) {
      setFormData({
        nombre: hotelEditar.nombre || '',
        ubicacion: hotelEditar.ubicacion || '',
        numeroHabitaciones: hotelEditar.numeroHabitaciones ? `${hotelEditar.numeroHabitaciones} habitaciones` : '',
        numeroPersonas: hotelEditar.numeroPersonas ? `${hotelEditar.numeroPersonas} personas` : '',
        comida: hotelEditar.comida || '',
        precio: hotelEditar.precio || '',
        categoria: hotelEditar.categoria || ''
      });
      setPreview(hotelEditar.imagen || null);
      setImagen(null);
      setErrors({});
    } else {
      setFormData({
        nombre: '', ubicacion: '', numeroHabitaciones: '', numeroPersonas: '', comida: '', precio: '', categoria: ''
      });
      setPreview(null);
      setImagen(null);
      setErrors({});
    }
  }, [hotelEditar]);

  const validar = () => {
    const errs = {};
    if (!formData.nombre.trim()) errs.nombre = 'Requerido';
    else if (formData.nombre.length < 3) errs.nombre = 'Mínimo 3 caracteres';
    if (!formData.ubicacion.trim()) errs.ubicacion = 'Requerido';
    if (!formData.numeroHabitaciones.trim() || !/^\d+\s*habitaciones?$/i.test(formData.numeroHabitaciones)) errs.numeroHabitaciones = "Ej: '10 habitaciones'";
    if (!formData.numeroPersonas.trim() || !/^\d+\s*personas?$/i.test(formData.numeroPersonas)) errs.numeroPersonas = "Ej: '4 personas'";
    if (!formData.comida) errs.comida = 'Seleccione una opción';
    if (!formData.precio || isNaN(formData.precio) || formData.precio <= 0) errs.precio = 'Precio inválido';
    if (!formData.categoria) errs.categoria = 'Seleccione una categoría';
    if (!imagen && !hotelEditar) errs.imagen = 'Agrega una imagen';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Solo imágenes.');
    if (file.size > 2e6) return alert('Máx 2MB.');
    setImagen(file);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    if (errors.imagen) setErrors(prev => ({ ...prev, imagen: '' }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  if (!isAuthenticated) return alert('Acceso denegado');
  if (!validar()) {
   alert('Por favor corrige los campos marcados antes de continuar.');
   return;
 }

  setCargando(true);
  try {
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'numeroHabitaciones' || key === 'numeroPersonas') {
          // Extrae solo el número de ambas cadenas:
          const match = value.match(/\d+/);
          fd.append(key, match ? match[0] : '');
        } else {
          fd.append(key, value);
        }
      });

    if (imagen) {
      fd.append('imagen', imagen);
    }

    const res = hotelEditar
      ? await api.put(`/hoteles/${hotelEditar._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      : await api.post('/hoteles', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

    alert(res.data.mensaje || 'Operación exitosa');
    onGuardar();
  } catch (err) {
    if (err.response?.data?.errors) {
      err.response.data.errors.forEach(e => alert(`${e.path}: ${e.msg}`));
    } else {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    }
  } finally {
    setCargando(false);
  }
};

  return (
    <div className="hotel-form-container">
      <div className="hotel-form-box">
        <h2 className="hotel-form-title-inline">
          {hotelEditar ? '✏️ Editar Hotel' : '➕ Nuevo Hotel'}
        </h2>
        <form onSubmit={handleSubmit} className="hotel-form-fields">
          <div className="hotel-row">
            <div>
              <label>Nombre *</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} />
              {errors.nombre && <small>{errors.nombre}</small>}
            </div>
            <div>
              <label>Ubicación *</label>
              <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
              {errors.ubicacion && <small>{errors.ubicacion}</small>}
            </div>
          </div>

          <div className="hotel-row">
            <div>
              <label># Habitaciones *</label>
              <input name="numeroHabitaciones" value={formData.numeroHabitaciones} onChange={handleChange} placeholder="25 habitaciones" />
              {errors.numeroHabitaciones && <small>{errors.numeroHabitaciones}</small>}
            </div>
            <div>
              <label># Personas *</label>
              <input name="numeroPersonas" value={formData.numeroPersonas} onChange={handleChange} placeholder="50 personas" />
              {errors.numeroPersonas && <small>{errors.numeroPersonas}</small>}
            </div>
            <div>
              <label>Comida *</label>
              <select name="comida" value={formData.comida} onChange={handleChange}>
                <option value="">Seleccione...</option>
                {comidaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.comida && <small>{errors.comida}</small>}
            </div>
          </div>

          <div className="hotel-row">
            <div>
              <label>Precio COP *</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="150000" />
              {errors.precio && <small>{errors.precio}</small>}
            </div>
            <div>
              <label>Categoría *</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="">Seleccione...</option>
                {categoriaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.categoria && <small>{errors.categoria}</small>}
            </div>
            <div>
              <label>Imagen *</label>
              <input type="file" accept="image/*" onChange={handleFile} />
              {errors.imagen && <small>{errors.imagen}</small>}
              {preview && <img src={preview} alt="Preview" style={{ width: 80, marginTop: 4 }} />}
            </div>
          </div>

          <div className="hotel-form-actions-inline">
            <button type="submit" disabled={cargando}>{cargando ? 'Procesando...' : hotelEditar ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ListaHoteles({ hoteles, onEditar, onEliminar }) {
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('nombre');
  if (!hoteles.length) return <p>No hay hoteles.</p>;
  const list = hoteles
    .filter(h => h.nombre.toLowerCase().includes(filtro) || h.ubicacion.toLowerCase().includes(filtro))
    .sort((a, b) => orden === 'precio' ? a.precio - b.precio : a[orden].localeCompare(b[orden]));

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-controls">
        <input placeholder="Buscar..." value={filtro} onChange={e => setFiltro(e.target.value)} />
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="precio">Precio</option>
          <option value="categoria">Categoría</option>
        </select>
      </div>
      <div className="hotel-list-grid">
        {list.map(h => (
          <div key={h._id} className="hotel-card">
            <div className="hotel-card-header">
              <h3>{h.nombre}</h3>
              <span><MapPin size={14} /> {h.ubicacion}</span>
            </div>
            <div className="hotel-card-info">
              <InfoCard icon={<DollarSign />} title="Precio" value={h.precio.toLocaleString()} color="green" />
              <InfoCard icon={<Home />} title="Habitaciones" value={h.numeroHabitaciones} />
              <InfoCard icon={<Users />} title="Capacidad" value={`${h.numeroPersonas} personas`} />
              <InfoCard icon={<Star />} title="Categoría" value={h.categoria} color="purple" />
            </div>
            <div className="hotel-card-actions">
              <button onClick={() => onEditar(h)}><Edit2 /></button>
              <button onClick={() => onEliminar(h._id)}><Trash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminHoteles() {
  const { isAuthenticated } = useAuth();
  const [hoteles, setHoteles] = useState([]);
  const [editarItem, setEditarItem] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setCargando(true); setError(null);
    try { const { data } = await api.get('/hoteles'); setHoteles(data); }
    catch (e) { setError(e.message); }
    finally { setCargando(false); }
  };

  useEffect(() => { cargar(); }, []);
  const editar = hotel => { if (!isAuthenticated) return; setEditarItem(hotel); setMostrarForm(true); };
  const eliminar = async id => { if (!isAuthenticated) return; if (confirm('Eliminar?')) { await api.delete(`/hoteles/${id}`); cargar(); } };

  return (
    <div className="hotel-admin-panel">
      <header className="hotel-admin-header">
        <h1>Administración de Hoteles</h1>
        <div className="hotel-admin-buttons">
          <button onClick={() => setMostrarForm(f => !f)}>{mostrarForm ? 'Ocultar Form' : 'Mostrar Form'}</button>
          <button onClick={() => { setEditarItem(null); setMostrarForm(true); }}><Plus /> Nuevo</button>
        </div>
      </header>
      <main className="hotel-admin-main">
        {mostrarForm && <FormularioHotel hotelEditar={editarItem} onGuardar={() => { setEditarItem(null); cargar(); }} onCancelar={() => setMostrarForm(false)} />}
        {cargando ? <Loader size="lg" /> : error ? (<div><p>{error}</p><button onClick={cargar}>Reintentar</button></div>) : <ListaHoteles hoteles={hoteles} onEditar={editar} onEliminar={eliminar} />}
      </main>
    </div>
  );
}
