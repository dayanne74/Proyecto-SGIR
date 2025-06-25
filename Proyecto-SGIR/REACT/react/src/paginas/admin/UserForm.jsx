// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import './userForm.css'

const UserForm = ({ currentUser, onSave }) => {
    const [usuario, setUsuario] = useState({ nombreCompleto: '', correo: '', nit: '', contraseña:'' });

    useEffect(() => {
        if (currentUser) {
            setUsuario(currentUser);
        } else {
            setUsuario({ nombreCompleto: '', correo: '', nit: '', contraseña:'' });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(usuario);
    };

    return (
        <form onSubmit={handleSubmit} className='user-form'>
            <input
                type="text"
                name="nombreCompleto"
                value={usuario.nombreCompleto}
                onChange={handleChange}
                placeholder="Nombre Completo"
                required
            />
            <input
                type="email"
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                placeholder="Correo"
                required
            />
            <input
                type="text"
                name="nit"
                value={usuario.nit}
                onChange={handleChange}
                placeholder="NIT"
                required
            />
            <input
                type="text"
                name="contraseña"
                value={usuario.contraseña}
                onChange={handleChange}
                placeholder="Contraseña"
                required
            />
            <button type="submit">{currentUser ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
};

export default UserForm;
