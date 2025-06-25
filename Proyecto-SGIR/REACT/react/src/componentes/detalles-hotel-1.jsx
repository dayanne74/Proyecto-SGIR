import React, { useState, useEffect } from 'react';

const HotelDetails = ({ hotelId, setPage }) => {
    const [hotel, setHotel] = useState({}); // Inicializamos hotel como un objeto vacío
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`);
                const data = await response.json();
                console.log(data);  // Verifica la estructura de los datos
                setHotel(data);     // Guardamos la respuesta en el estado 'hotel'
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [hotelId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <button 
                    onClick={() => setPage('hotelListing')} 
                    className="text-blue-600 mb-6"
                >
                    Volver a la lista de hoteles
                </button>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="relative">
                        <img 
                            src={`http://localhost:5000/${hotel.imagenPortada}`} 
                            alt={hotel.nombre}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{hotel.nombre}</h2>
                        <p className="text-lg text-gray-600 mb-4">{hotel.descripcion}</p>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span className="font-semibold">Ubicación:</span>
                            <span>{hotel.ubicacion}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span className="font-semibold">Precio por noche:</span>
                            <span>${hotel.precioPorNoche}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span className="font-semibold">Habitaciones:</span>
                            <span>{hotel.numeroHabitaciones}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span className="font-semibold">Capacidad:</span>
                            <span>{hotel.numeroPersonas} personas</span>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Servicios</h3>
                            <ul className="list-disc pl-5">
                                {hotel.servicios && hotel.servicios.length > 0 ? (  // Verificamos si existen los servicios
                                    hotel.servicios.map((servicio, index) => (
                                        <li key={index} className="text-gray-600">{servicio}</li>
                                    ))
                                ) : (
                                    <li>No hay servicios disponibles</li> 
                                )}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Galería de Imágenes</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {hotel.imagenes && hotel.imagenes.length > 0 ? (  // Verificamos si existen las imágenes
                                    hotel.imagenes.map((img, index) => (
                                        <img key={index} src={`http://localhost:5000/${img}`} alt={`imagen ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                                    ))
                                ) : (
                                    <p>No hay imágenes disponibles</p> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;