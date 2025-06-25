import React from 'react';
import './Listapaquete.css';
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Listapaquete = ({ paquete, onEdit, onDelete }) => {
    return (
        <div className='Lista-paquete'>
            <h2>Lista de Paquetes</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Destino</th>
                        <th>Actividad</th>
                        <th>Descripcion</th>
                        <th>No_personas</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Transporte</th>
                        <th>Comida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paquete.map((paquete, index) => (
                        <tr key={index}>
                            <td>{paquete.destino}</td>
                            <td>{paquete.actividad}</td>
                            <td>{paquete.descripcion}</td>
                            <td>{paquete.numeroPersonas}</td>
                            <td>{paquete.nombre}</td>
                            <td>{`$${paquete.precio.toLocaleString()}`}</td>
                            <td>{paquete.transporte}</td>
                            <td>{paquete.comida}</td>
                            <td>
                                <button className='add-button' onClick={() => onEdit(paquete)}><RxUpdate /></button>
                                <button className='delete-button' onClick={() => onDelete(paquete)}><MdDeleteForever /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => onEdit(null)}>Agregar Paquete</button>
        </div>
    );
};

export default Listapaquete;