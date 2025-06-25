import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container text-center mb-3">
            <h4 className="bg-light">Lista de Contactos</h4>
            <table className="table table-sm">
                <caption>Lista de mensajes enviados</caption>
                <thead className="table-light">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre y Apellido</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Asunto</th>
                        <th scope="col">Mensaje</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((contacto) => (
                        <tr key={contacto._id}>
                            <th scope="row">{contacto._id}</th>
                            <td>{contacto.nombre_apellido}</td>
                            <td>{contacto.correo}</td>
                            <td>{contacto.asunto}</td>
                            <td>{contacto.mensaje}</td>
                            <td>{new Date(contacto.fechaActual).toLocaleDateString()}</td> {/* Formato de fecha */}
                            <td>
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => eliminarContacto(contacto._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDeContactos;