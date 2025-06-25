import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Transporte = () => {
    const [transportes, setTransportes] = useState([]);
    const [error, setError] = useState(null);

    const obtenerTransportes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/transporte");
            console.log("Transportes obtenidos:", response.data);
            setTransportes(response.data);
        } catch (error) {
            console.error("Error al obtener los transportes:", error);
            setError("No se pudieron cargar los transportes.");
        } 
    };

    useEffect(() => {
        obtenerTransportes();
    }, []);

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "nombre",
            label: "Nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "capacidad",
            label: "Capacidad",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "descripcion",
            label: "Descripción",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "placa",
            label: "Placa",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "categoria",
            label: "Categoría",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    return (
        <div>
            {error && <p>{error}</p>}
            <MUIDataTable
                title={"Lista de Transportes"}
                data={transportes}
                columns={columns}
                options={{
                    filterType: 'checkbox',
                    responsive: 'vertical',
                    selectableRowsHideCheckboxes: true,
                    rowsPerPageOptions: [5, 10, 15],
                }}
            />
        </div>
    );
};

export default Transporte;