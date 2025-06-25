import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../contexts/api';
import { MapPin, Clock, DollarSign, BedDouble, Utensils, Activity, Edit2, Trash2, Plus, Save, X, Image, Users } from 'lucide-react';
import './PaquetePage.css';

const duracionOptions = ['1 noche / 2 días', '2 noches / 3 días', '3 noches / 4 días', '5 noches', '1 semana', '10 días'].map(v => ({ value: v, label: v }));
const comidaOptions = ['Solo desayuno', 'Desayuno y cena', 'Pensión completa', 'Buffet libre', 'Todo incluido', 'Sin alimentación'].map(v => ({ value: v, label: v }));
const alojamientoOptions = ['Hotel 3 estrellas', 'Hotel 4 estrellas', 'Hotel 5 estrellas', 'Resort', 'Cabaña', 'Hostal económico'].map(v => ({ value: v, label: v }));

export default function PaquetePage() {
  const { isAuthenticated } = useAuth();

  const [paquetes, setPaquetes] = useState([]);
  const [paqueteEditar, setPaqueteEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', destino: '', descripcion: '', precio: '', duracion: '', alojamiento: '', comida: '', numeroPersonas: '', actividad: ''
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

  // Fetch paquetes
  useEffect(() => {
    fetchPaquetes();
  }, []);

  const fetchPaquetes = async () => {
    try {
      const res = await api.get('/paquetes');
      setPaquetes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const abrirFormulario = paquete => {
    if (paquete) {
      setPaqueteEditar(paquete);
      setFormData({
        nombre: paquete.nombre,
        destino: paquete.destino,
        descripcion: paquete.descripcion,
        precio: paquete.precio,
        duracion: paquete.duracion,
        alojamiento: paquete.alojamiento,
        comida: paquete.comida,
        numeroPersonas: paquete.numeroPersonas,
        actividad: paquete.actividad
      });
      setPreview(paquete.imagen);
    } else {
      setPaqueteEditar(null);
      setFormData({ nombre: '', destino: '', descripcion: '', precio: '', duracion: '', alojamiento: '', comida: '', numeroPersonas: '', actividad: '' });
      setPreview(null);
    }
    setErrors({});
    setImagen(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setPaqueteEditar(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImagen(file);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    if (errors.imagen) setErrors(prev => ({ ...prev, imagen: '' }));
  };

  const validar = () => {
    const errs = {};
    if (!formData.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!formData.destino.trim()) errs.destino = 'El destino es obligatorio';
    if (!formData.precio || isNaN(formData.precio) || formData.precio <= 0) errs.precio = 'Precio inválido';
    if (!formData.duracion) errs.duracion = 'Seleccione una duración';
    if (!formData.alojamiento) errs.alojamiento = 'Seleccione tipo de alojamiento';
    if (!formData.comida) errs.comida = 'Seleccione régimen de alimentación';
    if (!formData.numeroPersonas || isNaN(formData.numeroPersonas) || formData.numeroPersonas <= 0) errs.numeroPersonas = 'Número de personas inválido';
    if (!formData.actividad.trim()) errs.actividad = 'La actividad es obligatoria';
    if (!formData.descripcion.trim()) errs.descripcion = 'Ingrese una descripción';
    if (!imagen && !paqueteEditar) errs.imagen = 'Debe subir una imagen del paquete';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Acceso denegado');
    if (!validar()) return;
    setCargando(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (imagen) fd.append('imagen', imagen);

      if (paqueteEditar) {
        await api.put(`/paquetes/${paqueteEditar._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/paquetes', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      cerrarFormulario();
      fetchPaquetes();
    } catch (err) {
      console.error(err);
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  const eliminarPaquete = async id => {
    if (!confirm('¿Eliminar este paquete?')) return;
    try {
      await api.delete(`/paquetes/${id}`);
      fetchPaquetes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="paquete-page">
      <div className="paquete-header">
        <h1>Gestión de Paquetes</h1>
        <button className="btn" onClick={() => abrirFormulario(null)}><Plus size={16}/> Nuevo</button>
      </div>

      {mostrarFormulario ? (
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="exc-form">
            <div className="exc-form-section">
          <h3 className="exc-form-section__title">Información General</h3>
          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label"><Users size={16}/> Nombre *</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={`exc-form-input ${errors.nombre && 'exc-form-input--error'}`} placeholder="Ej: Aventura Caribeña" />
              {errors.nombre && <span className="exc-form-error">{errors.nombre}</span>}
            </div>
            <div className="exc-form-group">
              <label className="exc-form-label"><MapPin size={16}/> Destino *</label>
              <input type="text" name="destino" value={formData.destino} onChange={handleChange} className={`exc-form-input ${errors.destino && 'exc-form-input--error'}`} placeholder="Ej: San Andrés" />
              {errors.destino && <span className="exc-form-error">{errors.destino}</span>}
            </div>
          </div>
        </div>

        {/* Detalles del Paquete */}
        <div className="exc-form-section">
          <h3 className="exc-form-section__title">Detalles del Paquete</h3>
          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label"><DollarSign size={16}/> Precio (COP) *</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} className={`exc-form-input ${errors.precio && 'exc-form-input--error'}`} placeholder="2500000" />
              {errors.precio && <span className="exc-form-error">{errors.precio}</span>}
            </div>
            <div className="exc-form-group">
              <label className="exc-form-label"><Clock size={16}/> Duración *</label>
              <select name="duracion" value={formData.duracion} onChange={handleChange} className={`exc-form-select ${errors.duracion && 'exc-form-input--error'}`}>
                <option value="">Seleccionar duración</option>
                {duracionOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.duracion && <span className="exc-form-error">{errors.duracion}</span>}
            </div>
          </div>

          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label"><BedDouble size={16}/> Alojamiento *</label>
              <select name="alojamiento" value={formData.alojamiento} onChange={handleChange} className={`exc-form-select ${errors.alojamiento && 'exc-form-input--error'}`}>
                <option value="">Seleccionar alojamiento</option>
                {alojamientoOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.alojamiento && <span className="exc-form-error">{errors.alojamiento}</span>}
            </div>
            <div className="exc-form-group">
              <label className="exc-form-label"><Utensils size={16}/> Alimentación *</label>
              <select name="comida" value={formData.comida} onChange={handleChange} className={`exc-form-select ${errors.comida && 'exc-form-input--error'}`}>
                <option value="">Seleccionar opción</option>
                {comidaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.comida && <span className="exc-form-error">{errors.comida}</span>}
            </div>
          </div>

          <div className="exc-form-grid exc-form-grid--two">
            <div className="exc-form-group">
              <label className="exc-form-label">Número de personas *</label>
              <input type="number" name="numeroPersonas" value={formData.numeroPersonas} onChange={handleChange} className={`exc-form-input ${errors.numeroPersonas && 'exc-form-input--error'}`} placeholder="Ej: 4" />
              {errors.numeroPersonas && <span className="exc-form-error">{errors.numeroPersonas}</span>}
            </div>
            <div className="exc-form-group">
              <label className="exc-form-label">Transporte *</label>
              <input type="text" name="transporte" value={formData.transporte || ''} onChange={handleChange} className={`exc-form-input ${errors.transporte && 'exc-form-input--error'}`} placeholder="Ej: Bus, Avión…" />
              {errors.transporte && <span className="exc-form-error">{errors.transporte}</span>}
            </div>
          </div>

          <div className="exc-form-group">
            <label className="exc-form-label"><Activity size={16}/> Actividad *</label>
            <input type="text" name="actividad" value={formData.actividad} onChange={handleChange} className={`exc-form-input ${errors.actividad && 'exc-form-input--error'}`} placeholder="Snorkel, caminatas, tour cultural..." />
            {errors.actividad && <span className="exc-form-error">{errors.actividad}</span>}
          </div>

          <div className="exc-form-group">
            <label className="exc-form-label"><Image size={16}/> Imagen *</label>
            <input type="file" accept="image/*" onChange={handleFile} className="exc-form-input-file" />
            {preview && <img src={preview} alt="Preview" className="exc-form-preview" />}
            {errors.imagen && <span className="exc-form-error">{errors.imagen}</span>}
          </div>

          <div className="exc-form-group">
            <label className="exc-form-label">Descripción *</label>
            <textarea name="descripcion" rows={4} value={formData.descripcion} onChange={handleChange} className={`exc-form-textarea ${errors.descripcion && 'exc-form-input--error'}`} placeholder="Detalle completo del paquete..." />
            {errors.descripcion && <span className="exc-form-error">{errors.descripcion}</span>}
          </div>
        </div>
            <div className="exc-form-actions">
              <button type="submit" className="exc-form-btn exc-form-btn--primary" disabled={cargando}><Save size={16}/> {paqueteEditar ? 'Actualizar' : 'Guardar'}</button>
              <button type="button" className="exc-form-btn exc-form-btn--secondary" onClick={cerrarFormulario}><X size={16}/> Cancelar</button>
            </div>
          </form>
        </div>
      ) : (
        <table className="paquete-table">
          <thead>
            <tr>
              <th>Nombre</th><th>Destino</th><th>Precio</th><th>Duración</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paquetes.map(p => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>{p.destino}</td>
                <td>{p.precio}</td>
                <td>{p.duracion}</td>
                <td>
                  <button onClick={() => abrirFormulario(p)}><Edit2 size={14}/></button>
                  <button onClick={() => eliminarPaquete(p._id)}><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
