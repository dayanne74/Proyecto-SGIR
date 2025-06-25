import { useEffect, useState } from "react";
import axios from "axios";
import './ListarContactos.css'; // Asegúrate de tener este archivo CSS

const ListaDeContactos = () => {
    const [contactos, setContactos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const obtenerContactos = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/contactos");
            console.log("Mensajes obtenidos:", response.data);
            setContactos(response.data);
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
            setError("No se pudieron cargar los contactos.");
        } finally {
            setLoading(false);
        }
    };

    const eliminarContacto = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
            try {
                await axios.delete(`http://localhost:5000/api/contactos/${id}`);
                obtenerContactos(); // Volver a cargar los contactos después de eliminar
            } catch (error) {
                console.error("Error al eliminar el contacto:", error);
                setError("No se pudo eliminar el contacto.");
            }
        }
    };

    useEffect(() => {
        obtenerContactos();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="lista-contactos">
            <h4>Lista de Contactos</h4>
            <table>
                <caption>Lista de mensajes enviados</caption>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre y Apellido</th>
                        <th>Correo</th>
                        <th>Asunto</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((contacto) => (
                        <tr key={contacto._id}>
                            <td>{contacto._id}</td>
                            <td>{contacto.nombre_apellido}</td>
                            <td>{contacto.correo}</td>
                            <td>{contacto.asunto}</td>
                            <td>{contacto.mensaje}</td>
                            <td>{new Date(contacto.fechaActual).toLocaleDateString()}</td> {/* Formato de fecha */}
                            <td>
                                <button 
                                    onClick={() => eliminarContacto(contacto._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDeContactos;