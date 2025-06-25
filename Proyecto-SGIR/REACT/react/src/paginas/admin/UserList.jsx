import React from 'react';
import './UserList.css'
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const UserList = ({ usuarios, onEdit, onDelete }) => {
    return (
        <div className='lista-usuarios'>
            <h2>Lista de admins</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>NIT</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nombreCompleto}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.nit}</td>
                            <td>
                                <button className='add-button' onClick={() => onEdit(usuario)}><RxUpdate /></button>
                                <button className='delete-button' onClick={() => onDelete(usuario)}><MdDeleteForever /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => onEdit(null)}>Agregar Usuario</button>
        </div>
    );
};

export default UserList;
