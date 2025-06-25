import React, { useState, useEffect } from 'react';
import './PaqueteForm.css';

const PaqueteForm = ({ currentpaquete, onSave }) => {
    const [paquete, setpaquete] = useState({
        destino: '',
        actividad: '',
        numeroPersonas: '',
        nombre: '',
        precio: '',
        transporte: '',
        comida: '',
        descripcion: ''
    });

    useEffect(() => {
        if (currentpaquete) {
            setpaquete(currentpaquete);
        } else {
            setpaquete({
                destino: '',
                actividad: '',
                numeroPersonas: '',
                nombre: '',
                precio: '',
                transporte: '',
                comida: '',
                descripcion: ''
            });
        }
    }, [currentpaquete]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpaquete((prevpaquete) => ({
            ...prevpaquete,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paquete.destino || !paquete.actividad || !paquete.precio || !paquete.transporte || !paquete.comida || !paquete.descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        onSave(paquete);
    };

    return (
        <form onSubmit={handleSubmit} className='paquete-Form'>
            <select name="destino" value={paquete.destino} onChange={handleChange} required>
                <option value="">Seleccione Destino</option>
                <option value="Santa Marta">Santa Marta</option>
                <option value="Cartagena">Cartagena</option>
                <option value="Cali">Cali</option>
                <option value="San Andres">San Andres</option>
            </select>
            <select name="actividad" value={paquete.actividad} onChange={handleChange} required>
                <option value="">Seleccione Actividad</option>
                <option value="Buceo">Buceo</option>
                <option value="Caminata">Caminata</option>
                <option value="Senderismo">Senderismo</option>
                <option value="Surf">Surf</option>
            </select>
            <input
                type="text"
                name="numeroPersonas"
                value={paquete.numeroPersonas}
                onChange={handleChange}
                placeholder="Número de Personas"
                required
            />
            <input
                type="text"
                name="nombre"
                value={paquete.nombre}
                onChange={handleChange}
                placeholder="Nombre del Paquete"
                required
            />
            <div className="price-container">
                <span className="currency-symbol">$</span>
                <input
                    type="number"
                    name="precio"
                    value={paquete.precio}
                    onChange={handleChange}
                    placeholder="Precio"
                    required
                    min="0"
                />
            </div>
            <select name="transporte" value={paquete.transporte} onChange={handleChange} required>
                <option value="">Seleccione Transporte</option>
                <option value="bus">Bus</option>
                <option value="avion">Avion</option>
                <option value="tren">Tren</option>
                <option value="barco">Barco</option>
            </select>
            <select name="comida" value={paquete.comida} onChange={handleChange} required>
                <option value="">Seleccione Comida</option>
                <option value="todo incluido">Todo incluido</option>
                <option value="almuerzo incluido">Almuerzo incluido</option>
                <option value="sin comida">Sin comida</option>
            </select>
            <textarea
                name="descripcion"
                value={paquete.descripcion}
                onChange={handleChange}
                placeholder="Descripción del paquete"
                required
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default PaqueteForm;
