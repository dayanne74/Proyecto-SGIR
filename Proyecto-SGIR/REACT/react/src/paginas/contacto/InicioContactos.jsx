import React, { useState, useEffect } from "react";
import axios from "axios";
import './InicioContactos.css';

const Contacto = ({ obtenerContactos }) => {
    const [formData, setFormData] = useState({
        nombre_apellido: "",
        correo: "",
        asunto: "",
        mensaje: "",
        fechaActual: new Date().toISOString().slice(0, 10)
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post("http://localhost:5000/api/contactos", {
                nombre_apellido: formData.nombre_apellido,
                correo: formData.correo,
                asunto: formData.asunto,
                mensaje: formData.mensaje,
                fechaActual: formData.fechaActual
            });
            console.log("Respuesta del servidor:", response.data);
            setIsSuccess(true);
            obtenerContactos();
            resetForm();
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setError(error.response ? error.response.data.message : "Ocurrió un error al enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre_apellido: "",
            correo: "",
            asunto: "",
            mensaje: "",
            fechaActual: new Date().toISOString().slice(0, 10)
        });
    };

    if (isSuccess) {
        return (
            <div className="contacto__confirmacion-container">
                <h2>¡Mensaje enviado con éxito!</h2>
                <button onClick={() => window.location.reload()}>Volver</button>
            </div>
        );
    }

    return (
        <div className="contacto__container">
            <div className="contacto__box-info">
                <h1>COMUNICATE CON NOSOTROS</h1>
                <div className="contacto__data">
                    <p><i className="fa-solid fa-phone"></i> +57 3219090547</p>
                    <p><i className="fa-solid fa-envelope"></i> leoncaminantes@gmail.com</p>
                    <p><i className="fa-solid fa-location-dot"></i> Calle 65 No. 79C - 04 Sur</p>
                </div>
            </div>
            <form className="contacto__form-group" onSubmit={handleSubmit}>
                <div className="contacto__input-box">
                    <input type="text" name="nombre_apellido" placeholder="Nombre y apellido"
                        value={formData.nombre_apellido} onChange={handleChange} required />
                </div>
                <div className="contacto__input-box">
                    <input type="email" name="correo" placeholder="Correo electrónico"
                        value={formData.correo} onChange={handleChange} required />
                </div>
                <div className="contacto__input-box">
                    <input type="text" name="asunto" placeholder="Asunto"
                        value={formData.asunto} onChange={handleChange} required />
                </div>
                <div className="contacto__input-box">
                    <textarea name="mensaje" placeholder="Escribe tu mensaje..."
                        value={formData.mensaje} onChange={handleChange} required />
                </div>
                <div className="contacto__input-box">
                    <input type="date" name="fechaActual"
                        value={formData.fechaActual} readOnly />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar mensaje'}</button>
                {error && <p className="contacto__error">{error}</p>}
            </form>
        </div>
    );
}

export default Contacto;
