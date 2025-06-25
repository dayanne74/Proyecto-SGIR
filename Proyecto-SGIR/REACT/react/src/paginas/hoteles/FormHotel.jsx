import React, { useState, useEffect } from "react";
import axios from "axios";
import './Hoteles.css'; // Asegúrate de que la ruta sea correcta

const FormHotel = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        ubicacion: "",
        numeroPersonas: 0,
        numeroHabitaciones: 0,
        comida: "",
        precio: 0,
        categoria: "baja" // Valor predeterminado
    });

    const [hoteles, setHoteles] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                // Actualización de un hotel existente
                await axios.put(`http://localhost:5000/api/hotels/${editingId}`, formData);
            } else {
                // Creación de un nuevo hotel
                await axios.post("http://localhost:5000/api/hotels", formData, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setIsSuccess(true);
            obtenerHoteles();
            resetForm();
        } catch (error) {
            console.error("Error al guardar el hotel:", error);
            setError("Ocurrió un error al guardar el hotel.");
        } finally {
            setLoading(false);
        }
    };

    // Obtener la lista de hoteles
    const obtenerHoteles = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/hotels");
            setHoteles(response.data);
        } catch (error) {
            console.error("Error al obtener los hoteles:", error);
            setError("No se pudieron cargar los hoteles.");
        }
    };

    // Editar un hotel
    const editHotel = (hotel) => {
        setFormData({ ...hotel });
        setEditingId(hotel._id);
    };

    // Eliminar un hotel
    const deleteHotel = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este hotel?")) {
            try {
                await axios.delete(`http://localhost:5000/api/hotels/${id}`);
                obtenerHoteles();
            } catch (error) {
                console.error("Error al eliminar el hotel:", error);
                setError("No se pudo eliminar el hotel.");
            }
        }
    };

    // Reinicia el formulario
    const resetForm = () => {
        setFormData({
            nombre: "",
            ubicacion: "",
            numeroPersonas: 0,
            numeroHabitaciones: 0,
            comida: "",
            precio: 0,
            categoria: "baja"
        });
        setEditingId(null);
    };

    // Formatear precio
    const formatPrice = (value) => {
        return `$${Number(value).toLocaleString("es-CO")}`;
    };

    // Carga inicial de los hoteles
    useEffect(() => {
        obtenerHoteles();
    }, []);

    return (
        <div className="container3">
            <div className="formulario-hotel-container">
                <h1>{editingId ? "Editar Hotel" : "Crear Hotel"}</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input 
                            type="text" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <label>
                        Ubicación:
                        <input 
                            type="text" 
                            name="ubicacion" 
                            value={formData.ubicacion} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <label>
                        Capacidad (Número de Personas):
                        <input 
                            type="text" 
                            name="numeroPersonas" 
                            value={formData.numeroPersonas} 
                            onChange={handleChange} 
                            placeholder="Ejemplo: 10 personas"
                            required 
                        />
                    </label>
                    <label>
                        Número de Habitaciones:
                        <input 
                            type="text" 
                            name="numeroHabitaciones" 
                            value={formData.numeroHabitaciones} 
                            onChange={handleChange} 
                            placeholder="Ejemplo: 10 habitaciones"
                            required 
                        />
                    </label>

                    <label>
                        Comida:
                        <input 
                            type="text" 
                            name="comida" 
                            value={formData.comida} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <label>
                        Precio:
                        <div className="input-group">
                            <span className="input-prefix">$</span>
                            <input 
                                type="number" 
                                name="precio" 
                                value={formData.precio} 
                                onChange={handleChange} 
                                required 
                                min="0" 
                            />
                        </div>
                    </label>

                    <button className="agregar-button" type="submit" disabled={loading}>
                        {loading ? "Cargando..." : (editingId ? "Actualizar Hotel" : "Agregar Hotel")}
                    </button>
                </form>
            </div>

            <div className="hoteles-container">
                <h2>Hoteles Creados</h2>
                {hoteles.length > 0 ? (
                    <ul>
                        {hoteles.map((hotel) => (
                            <li key={hotel._id}>
                                <h3>{hotel.nombre}</h3>
                                <p><strong>Ubicación:</strong> {hotel.ubicacion}</p>
                                <p><strong>Capacidad:</strong> {hotel.numeroPersonas} personas</p>
                                <p><strong>Habitaciones:</strong> {hotel.numeroHabitaciones}</p>
                                <p><strong>Comida:</strong> {hotel.comida}</p>
                                <p><strong>Precio:</strong> {formatPrice(hotel.precio)}</p>
                                <button className="edit-button" onClick={() => editHotel(hotel)}>Editar</button>
                                <button className="delete-button" onClick={() => deleteHotel(hotel._id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay hoteles creados aún.</p>
                )}
            </div>
        </div>
    );
};

export default FormHotel;

