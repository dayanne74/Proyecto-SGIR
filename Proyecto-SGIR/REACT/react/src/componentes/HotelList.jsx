import { useEffect, useState } from "react";
import axios from "axios";

function HotelList({ setHotelSeleccionado }) {
    const [hoteles, setHoteles] = useState([]);

    useEffect(() => {
        const obtenerHoteles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hotels");
                setHoteles(response.data);
            } catch (error) {
                console.error(`Error al obtener hoteles: ${error}`);
            }
        };
        obtenerHoteles();
    }, []);

    const eliminarHotel = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`);
            alert("Hotel eliminado con éxito");
            setHoteles(hoteles.filter((hotel) => hotel._id !== id));
        } catch (error) {
            console.error(`Error al eliminar el hotel: ${error}`);
        }
    };

    return (
        <div className="container">
            <h3>Lista de Hoteles</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Servicios</th>
                        <th>Imagen Portada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {hoteles.map((hotel) => (
                        <tr key={hotel._id}>
                            <td>{hotel.nombre}</td>
                            <td>{hotel.ubicacion}</td>
                            <td>{hotel.descripcion}</td>
                            <td>${hotel.precioPorNoche}</td>
                            <td>
                                <ul>
                                    {hotel.servicios.map((servicio, index) => (
                                        <li key={index}>{servicio.nombre}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <img
                                    src={hotel.imagenPortada}
                                    alt={hotel.nombre}
                                    style={{ width: "100px", height: "auto" }}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => setHotelSeleccionado(hotel)}
                                    className="btn btn-info btn-sm"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarHotel(hotel._id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HotelList;