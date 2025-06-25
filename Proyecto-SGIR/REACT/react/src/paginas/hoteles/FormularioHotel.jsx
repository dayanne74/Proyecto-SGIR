import React, { useState } from 'react';
import axios from 'axios';
import './formulario.css';

const HotelForm = ({ setPage }) => {
    const [hotelData, setHotelData] = useState({
        nombre: '',
        ubicacion: '',
        numeroHabitaciones: '',
        numeroPersonas: '',
        comida: '',
        precio: '',
        categoria: '',
        precioPorNoche: '',
        descripcion: '',
        imagenPortada: null,
        galeriaImagenes: [],
        servicios: [{ nombre: '', icono: '' }],
    });

    // Manejador de cambios para campos de texto y select
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('servicio')) {
            const index = parseInt(name.split('-')[1]);
            const updatedServicios = [...hotelData.servicios];
            updatedServicios[index][e.target.dataset.field] = value;
            setHotelData({ ...hotelData, servicios: updatedServicios });
        } else {
            setHotelData({ ...hotelData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'imagenPortada') {
            setHotelData({ ...hotelData, imagenPortada: files[0] });
        } else if (name === 'galeriaImagenes') {
            setHotelData({ ...hotelData, galeriaImagenes: Array.from(files) });
        }
    };

    // Agregar un nuevo campo de servicio
    const addServiceField = () => {
        setHotelData({
            ...hotelData,
            servicios: [...hotelData.servicios, { nombre: '', icono: '' }],
        });
    };

    // Manejador de envío de formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Aquí estamos asegurándonos de que se envíe el arreglo de servicios tal cual
        Object.entries(hotelData).forEach(([key, value]) => {
            if (key === 'galeriaImagenes') {
                value.forEach((file) => formData.append(key, file));
            } else if (key === 'servicios') {
                value.forEach((servicio, index) => {
                    formData.append(`servicios[${index}][nombre]`, servicio.nombre);
                    formData.append(`servicios[${index}][icono]`, servicio.icono);
                });
            } else {
                formData.append(key, value);
            }
        });

        try {
            const response = await axios.post('http://localhost:5000/api/hotels', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Hotel agregado:', response.data);
            // Limpiar el formulario después del envío exitoso
            setHotelData({
                nombre: '',
                ubicacion: '',
                numeroHabitaciones: '',
                numeroPersonas: '',
                comida: '',
                precio: '',
                categoria: '',
                precioPorNoche: '',
                descripcion: '',
                imagenPortada: null,
                galeriaImagenes: [],
                servicios: [{ nombre: '', icono: '' }],
            });
            alert('Hotel agregado con éxito');
        } catch (error) {
            console.error("Error al agregar el hotel:", error.response?.data || error.message);
            alert('Hubo un error al agregar el hotel');
        }
    };

    return (
        <div>
            
            
           
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={hotelData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ubicacion"
                    placeholder="Ubicación"
                    value={hotelData.ubicacion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="numeroHabitaciones"
                    placeholder="Número de Habitaciones"
                    value={hotelData.numeroHabitaciones}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="numeroPersonas"
                    placeholder="Número de Personas"
                    value={hotelData.numeroPersonas}
                    onChange={handleChange}
                    required
                />
                <select
                    name="comida"
                    value={hotelData.comida}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione Comida</option>
                    <option value="incluida">Incluida</option>
                    <option value="no incluida">No incluida</option>
                </select>
                <select
                    name="categoria"
                    value={hotelData.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione Categoría</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={hotelData.precio}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="precioPorNoche"
                    placeholder="Precio por noche"
                    value={hotelData.precioPorNoche}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={hotelData.descripcion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="imagenPortada"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="file"
                    name="galeriaImagenes"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
                <h4>Servicios</h4>
                {hotelData.servicios.map((servicio, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            data-field="nombre"
                            placeholder={`Servicio ${index + 1} Nombre`}
                            value={servicio.nombre}
                            onChange={handleChange}
                            name={`servicio-${index}`}
                        />
                        <input
                            type="text"
                            data-field="icono"
                            placeholder={`Servicio ${index + 1} Icono`}
                            value={servicio.icono}
                            onChange={handleChange}
                            name={`servicio-${index}`}
                        />
                    </div>
                ))}
                <button type="button" onClick={addServiceField}>Agregar Servicio</button>
                <button type="submit">Agregar Hotel</button>
            </form>
        </div>
    );
};

export default HotelForm;
