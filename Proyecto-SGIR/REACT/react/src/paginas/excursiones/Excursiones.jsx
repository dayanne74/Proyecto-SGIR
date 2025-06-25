import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../contexts/api';
import { MapPin, Clock, DollarSign, Car, Utensils, Activity, Edit2, Trash2, Plus, Save, X, Image, Users, Search } from 'lucide-react';
import './Excursiones.css';

const Loader = ({ size = 'md', color = 'blue' }) => <div className={`exc-loader exc-loader--${size} exc-loader--${color}`} />;

const InfoCard = ({ icon, title, value, color = 'blue' }) => (
  <div className={`exc-info-card exc-info-card--${color}`}>
    <div className="exc-info-card__icon">{React.cloneElement(icon, { size: 16 })}</div>
    <div className="exc-info-card__content">
      <p className="exc-info-card__title">{title}</p>
      <p className="exc-info-card__value">{value}</p>
    </div>
  </div>
);

const transportOptions = ['Bus turístico','Minivan privado','Autobús de lujo','Vehículo 4x4','Lancha/Barco','A pie'].map(v => ({ value: v, label: v }));
const foodOptions = ['Desayuno incluido','Almuerzo típico','Cena gourmet','Buffet libre','Snacks y bebidas','No incluye comida'].map(v => ({ value: v, label: v }));
const durationOptions = ['2 horas','4 horas','6 horas','8 horas','Día completo','Multi-día'].map(v => ({ value: v, label: v }));

function FormularioExcursion({ excursionEditar, onGuardar, onCancelar }) {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', destino: '', precio: '', duracion: '', transporte: '', comida: '', actividad: '' });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (excursionEditar) {
      setFormData({ nombre: excursionEditar.nombre || '', descripcion: excursionEditar.descripcion || '', destino: excursionEditar.destino || '', precio: excursionEditar.precio || '', duracion: excursionEditar.duracion || '', transporte: excursionEditar.transporte || '', comida: excursionEditar.comida || '', actividad: excursionEditar.actividad || '' });
      setPreview(excursionEditar.imagen || null);
      setImagen(null);
      setErrors({});
    } else {
      setFormData({ nombre:'', descripcion:'', destino:'', precio:'', duracion:'', transporte:'', comida:'', actividad:'' });
      setPreview(null);
      setImagen(null);
      setErrors({});
    }
  }, [excursionEditar]);

  const validar = () => {
    const errs = {};
    if (!formData.nombre.trim()) errs.nombre = 'El nombre es requerido';
    if (!formData.destino.trim()) errs.destino = 'El destino es requerido';
    if (!formData.precio || isNaN(formData.precio) || formData.precio <= 0) errs.precio = 'Precio inválido';
    if (!formData.duracion) errs.duracion = 'Seleccione una duración';
    if (!formData.transporte) errs.transporte = 'Seleccione un transporte';
    if (!formData.comida) errs.comida = 'Seleccione una opción de comida';
    if (!formData.actividad.trim()) errs.actividad = 'Las actividades son requeridas';
    if (!formData.descripcion.trim()) errs.descripcion = 'La descripción es requerida';
    if (!imagen && !excursionEditar) errs.imagen = 'La imagen es requerida';
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

    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no debe exceder los 2MB.');
      return;
    }

    setImagen(file);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    if (errors.imagen) setErrors(prev => ({ ...prev, imagen: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isAuthenticated) { alert('Acceso denegado - Privilegios insuficientes'); return; }
    if (!validar()) return;
    setCargando(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k,v]) => fd.append(k, v));
      if (imagen) {
       fd.append('imagen', imagen);
      }

      const res = excursionEditar
        ? await api.put(`/excursiones/${excursionEditar._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/excursiones', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert(res.data.mensaje || 'Operación exitosa');
      onGuardar();
    } catch (err) {
      if (err.response?.status === 403) alert('Acceso denegado - Privilegios insuficientes'); else alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally { setCargando(false); }
  };

  return (
    <div className="exc-form-container">
      <div className="exc-form-header">
        <div className="exc-form-header__content">
          <h2 className="exc-form-title">
            {excursionEditar ? (
              <>
                <Edit2 size={20} />
                Editar Excursión
              </>
            ) : (
              <>
                <Plus size={20} />
                Nueva Excursión
              </>
            )}
          </h2>
          <p className="exc-form-subtitle">
            {excursionEditar ? 'Actualiza los detalles de la excursión' : 'Completa todos los campos requeridos'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="exc-form">
        <div className="exc-form-section">
          <h3 className="exc-form-section__title">Información General</h3>
          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label">
                <Users size={16} />
                Nombre de la Excursión *
              </label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                className={`exc-form-input ${errors.nombre ? 'exc-form-input--error' : ''}`} 
                placeholder="Ej: Tour Ciudad Colonial"
              />
              {errors.nombre && <span className="exc-form-error">{errors.nombre}</span>}
            </div>

            <div className="exc-form-group">
              <label className="exc-form-label">
                <MapPin size={16} />
                Destino *
              </label>
              <input 
                type="text" 
                name="destino" 
                value={formData.destino} 
                onChange={handleChange} 
                className={`exc-form-input ${errors.destino ? 'exc-form-input--error' : ''}`} 
                placeholder="Ej: Cartagena, Colombia"
              />
              {errors.destino && <span className="exc-form-error">{errors.destino}</span>}
            </div>
          </div>
        </div>

        <div className="exc-form-section">
          <h3 className="exc-form-section__title">Detalles del Tour</h3>
          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label">
                <DollarSign size={16} />
                Precio (COP) *
              </label>
              <div className="exc-form-input-wrapper">
                <span className="exc-form-input-prefix">$</span>
                <input 
                  type="number" 
                  name="precio" 
                  value={formData.precio} 
                  onChange={handleChange} 
                  className={`exc-form-input exc-form-input--with-prefix ${errors.precio ? 'exc-form-input--error' : ''}`} 
                  placeholder="150000"
                />
              </div>
              {errors.precio && <span className="exc-form-error">{errors.precio}</span>}
            </div>

            <div className="exc-form-group">
              <label className="exc-form-label">
                <Clock size={16} />
                Duración *
              </label>
              <select 
                name="duracion" 
                value={formData.duracion} 
                onChange={handleChange} 
                className={`exc-form-select ${errors.duracion ? 'exc-form-input--error' : ''}`}
              >
                <option value="">Seleccionar duración</option>
                {durationOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.duracion && <span className="exc-form-error">{errors.duracion}</span>}
            </div>
          </div>

          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label">
                <Car size={16} />
                Transporte *
              </label>
              <select 
                name="transporte" 
                value={formData.transporte} 
                onChange={handleChange} 
                className={`exc-form-select ${errors.transporte ? 'exc-form-input--error' : ''}`}
              >
                <option value="">Seleccionar transporte</option>
                {transportOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.transporte && <span className="exc-form-error">{errors.transporte}</span>}
            </div>

            <div className="exc-form-group">
              <label className="exc-form-label">
                <Utensils size={16} />
                Comida Incluida *
              </label>
              <select 
                name="comida" 
                value={formData.comida} 
                onChange={handleChange} 
                className={`exc-form-select ${errors.comida ? 'exc-form-input--error' : ''}`}
              >
                <option value="">Seleccionar opción</option>
                {foodOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.comida && <span className="exc-form-error">{errors.comida}</span>}
            </div>
          </div>

          <div className="exc-form-group">
            <label className="exc-form-label">
              <Activity size={16} />
              Actividades Incluidas *
            </label>
            <input 
              type="text" 
              name="actividad" 
              value={formData.actividad} 
              onChange={handleChange} 
              className={`exc-form-input ${errors.actividad ? 'exc-form-input--error' : ''}`} 
              placeholder="Ej: Caminata histórica, fotografía, degustación"
            />
            {errors.actividad && <span className="exc-form-error">{errors.actividad}</span>}
          </div>
        </div>

        <div className="exc-form-section">
          <h3 className="exc-form-section__title">Descripción y Multimedia</h3>
          <div className="exc-form-group">
            <label className="exc-form-label">
              <Activity size={16} />
              Descripción Detallada *
            </label>
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange} 
              className={`exc-form-textarea ${errors.descripcion ? 'exc-form-input--error' : ''}`} 
              rows="4" 
              placeholder="Describe la experiencia que ofrecerás a tus clientes..."
            />
            {errors.descripcion && <span className="exc-form-error">{errors.descripcion}</span>}
          </div>

          <div className="exc-form-group">
            <label className="exc-form-label">
              <Image size={16} />
              Imagen Promocional *
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFile}
              className="exc-form-file"
            />
            {errors.imagen && <span className="exc-form-error">{errors.imagen}</span>}
            {preview && (
              <div className="exc-form-preview">
                <img src={preview} alt="Preview" className="exc-form-preview__image" />
              </div>
            )}
            {imagen && <p className="exc-form-file-name">Archivo: {imagen.name}</p>}
          </div>
        </div>

        <div className="exc-form-actions">
          <button type="submit" disabled={cargando} className="exc-btn exc-btn--primary">
            {cargando ? 'Procesando...' : (excursionEditar ? 'Actualizar Excursión' : 'Crear Excursión')}
          </button>
          <button type="button" onClick={onCancelar} className="exc-btn exc-btn--secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

function ListaExcursiones({ excursiones, onEditar, onEliminar }) {
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('nombre');
  
  if (!excursiones.length) {
    return (
      <div className="exc-empty-state">
        <MapPin size={48} />
        <h3 className="exc-empty-state__title">No hay excursiones registradas</h3>
        <p className="exc-empty-state__text">Comienza creando tu primera excursión</p>
      </div>
    );
  }

  const list = excursiones
    .filter(ex => 
      ex.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
      ex.destino.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => 
      orden === 'precio' ? a.precio - b.precio : a[orden].localeCompare(b[orden])
    );

  return (
    <div className="exc-list-container">
      <div className="exc-list-header">
        <div className="exc-list-search">
          <Search size={20} />
          <input 
            type="text"
            placeholder="Buscar excursiones..." 
            value={filtro} 
            onChange={e => setFiltro(e.target.value)}
            className="exc-list-search__input"
          />
        </div>
        <select 
          value={orden} 
          onChange={e => setOrden(e.target.value)}
          className="exc-list-sort"
        >
          <option value="nombre">Ordenar por Nombre</option>
          <option value="precio">Ordenar por Precio</option>
          <option value="destino">Ordenar por Destino</option>
        </select>
      </div>

      <div className="exc-list-grid">
        {list.map(ex => (
          <div key={ex._id} className="exc-list-card">
            <div className="exc-list-card__header">
              <div className="exc-list-card__title-section">
                <h3 className="exc-list-card__title">{ex.nombre}</h3>
                <p className="exc-list-card__destination">
                  <MapPin size={16} />
                  {ex.destino}
                </p>
              </div>
              <div className="exc-list-card__actions">
                <button 
                  onClick={() => onEditar(ex)}
                  className="exc-btn-icon exc-btn-icon--edit"
                  title="Editar excursión"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onEliminar(ex._id)}
                  className="exc-btn-icon exc-btn-icon--delete"
                  title="Eliminar excursión"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="exc-list-card__info">
              <InfoCard 
                icon={<DollarSign />} 
                title="Precio" 
                value={`$${ex.precio?.toLocaleString()}`} 
                color="green"
              />
              <InfoCard 
                icon={<Clock />} 
                title="Duración" 
                value={ex.duracion}
              />
              <InfoCard 
                icon={<Car />} 
                title="Transporte" 
                value={ex.transporte}
              />
              <InfoCard 
                icon={<Utensils />} 
                title="Comida" 
                value={ex.comida} 
                color="orange"
              />
            </div>

            {ex.descripcion && (
              <div className="exc-list-card__description">
                <p>{ex.descripcion}</p>
              </div>
            )}

            {ex.actividad && (
              <div className="exc-list-card__activities">
                <Activity size={14} />
                <span>{ex.actividad}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
   const { isAuthenticated, isLoading, token } = useAuth();
   const [excursiones, setExcursiones] = useState([]);
  const [editarItem, setEditarItem] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    if (!isAuthenticated || !token) {
      console.log('No autenticado o sin token');
      return;
    }

    setCargando(true);
    setError(null);
    try {
      console.log('Cargando excursiones con token:', token);
      const { data } = await api.get('/excursiones');
      setExcursiones(data);
    } catch (e) {
      console.error('Error cargando excursiones:', e);
      setError(e.response?.data?.mensaje || e.message);
    } finally {
      setCargando(false);
    }
  };

 useEffect(() => {
    // Esperar hasta que termine la carga inicial del auth
    if (!isLoading && isAuthenticated) {
      cargar();
    }
  }, [isAuthenticated, isLoading]);

  // Mostrar loading mientras se inicializa la autenticación
  if (isLoading) {
    return (
      <div className="exc-admin-loading">
        <Loader size="lg" />
        <p>Inicializando...</p>
      </div>
    );
  }
 if (!isAuthenticated) {
    return (
      <div className="exc-admin-error">
        <p>Acceso denegado. Por favor, inicia sesión.</p>
      </div>
    );
  }
  const editar = ex => {
    if (!isAuthenticated) return;
    setEditarItem(ex);
    setMostrarForm(true);
  };

  const eliminar = async id => {
    if (!isAuthenticated) return;
    if (window.confirm('¿Estás seguro de eliminar esta excursión?')) {
      try {
        await api.delete(`/excursiones/${id}`);
        cargar();
      } catch (error) {
        alert('Error al eliminar la excursión');
      }
    }
  };

  return (
    <div className="exc-admin-panel">
      <div className="exc-admin-header">
        <div className="exc-admin-header__content">
          <h1 className="exc-admin-title">Panel de Administración</h1>
          <p className="exc-admin-subtitle">Gestiona las excursiones de tu agencia</p>
        </div>
        <div className="exc-admin-header__actions">
          <button 
            onClick={() => setMostrarForm(f => !f)}
            className="exc-btn exc-btn--secondary"
          >
            {mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </button>
          <button 
            onClick={() => {
              setEditarItem(null);
              setMostrarForm(true);
            }}
            className="exc-btn exc-btn--primary"
          >
            <Plus size={16} />
            Nueva Excursión
          </button>
        </div>
      </div>

      <div className="exc-admin-content">
        <div className="exc-admin-layout">
          {mostrarForm && (
            <div className="exc-admin-form-section">
              <FormularioExcursion 
                excursionEditar={editarItem} 
                onGuardar={() => {
                  setEditarItem(null);
                  cargar();
                }} 
                onCancelar={() => setMostrarForm(false)}
              />
            </div>
          )}
          
          <div className="exc-admin-list-section">
            {cargando ? (
              <div className="exc-admin-loading">
                <Loader size="lg" />
                <p>Cargando excursiones...</p>
              </div>
            ) : error ? (
              <div className="exc-admin-error">
                <p>Error: {error}</p>
                <button onClick={cargar} className="exc-btn exc-btn--primary">
                  Reintentar
                </button>
              </div>
            ) : (
              <ListaExcursiones 
                excursiones={excursiones} 
                onEditar={editar} 
                onEliminar={eliminar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}