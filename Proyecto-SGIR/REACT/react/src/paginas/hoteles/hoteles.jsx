import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const HotelListing = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        // Fetch hotels from the backend
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hotels');
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();
    }, []);

    const handleOpenDetails = (hotel) => {
        setSelectedHotel(hotel);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedHotel(null);
        setOpenModal(false);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Nuestros Hoteles
            </Typography>
            <Grid container spacing={3}>
                {hotels.map((hotel) => (
                    <Grid item xs={12} sm={6} md={4} key={hotel._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`http://localhost:5000/${hotel.imagenPortada}`}
                                alt={hotel.nombre}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {hotel.ubicacion}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ${hotel.precioPorNoche} por noche
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleOpenDetails(hotel)}
                                >
                                    Ver Detalles
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Hotel Details Modal */}
            {selectedHotel && (
                <Dialog 
                    open={openModal} 
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>{selectedHotel.nombre}</DialogTitle>
                    <DialogContent>
                        {/* Galería de Imágenes */}
                        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                            {selectedHotel.galeriaImagenes.map((imagen, index) => (
                                <Grid item xs={4} key={index}>
                                    <img 
                                        src={`http://localhost:5000/${imagen}`} 
                                        alt={`Galería ${index + 1}`}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Detalles del Hotel */}
                        <Typography variant="h6">Descripción</Typography>
                        <Typography paragraph>{selectedHotel.descripcion}</Typography>

                        <Typography variant="h6">Información</Typography>
                        <Typography>
                            <strong>Ubicación:</strong> {selectedHotel.ubicacion}
                        </Typography>
                        <Typography>
                            <strong>Habitaciones:</strong> {selectedHotel.numeroHabitaciones}
                        </Typography>
                        <Typography>
                            <strong>Capacidad:</strong> {selectedHotel.numeroPersonas} personas
                        </Typography>
                        <Typography>
                            <strong>Categoría:</strong> {selectedHotel.categoria}
                        </Typography>
                        <Typography>
                            <strong>Comida:</strong> {selectedHotel.comida}
                        </Typography>

                        {/* Servicios */}
                        <Typography variant="h6" style={{ marginTop: '20px' }}>Servicios</Typography>
                        <Grid container spacing={2}>
                            {selectedHotel.servicios.map((servicio, index) => (
                                <Grid item xs={4} key={index}>
                                    <Typography>
                                        {servicio.icono} {servicio.nombre}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Precio */}
                        <Typography variant="h5" color="primary" style={{ marginTop: '20px' }}>
                            Precio: ${selectedHotel.precioPorNoche} por noche
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default HotelListing;