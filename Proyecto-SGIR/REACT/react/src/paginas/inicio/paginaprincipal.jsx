import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './principal.css';
import Footer from '../../componentes/Footer';
import persona1 from '../../assets/inicio/persona1.jpg';
import persona2 from '../../assets/inicio/persona2.jpg';
import persona3 from '../../assets/inicio/persona3.jpg';
import ComentariosForm from '../../componentes/comentarios/ComentariosForm';
import ComentariosList from '../../componentes/comentarios/ComentariosList';
import api from '../../api/cliente'; 
const Principal = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const sliderImages = ["colombia2.jpeg", "colombia3.jpeg", "colombia5.jpg"];
    const testimonialImages = [persona1, persona2, persona3];
   

    // Cargar testimonios
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                api.get('/comentarios')
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error al obtener testimonios:', error);
            }
        };
        fetchTestimonials();
    }, []);

    // Slider automático
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % sliderImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [sliderImages.length]);

    const handleSliderNavigation = (direction) => {
        if (direction === 'next') {
            setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
        }
    };

    // Función para actualizar comentarios
    const refreshComments = async () => {
        try {
            api.get('/comentarios')
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error al actualizar comentarios:', error);
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <nav className="header-navigation">
                        <div className="logo">
                            <img src="../src/assets/logo.png" alt="Logo" />
                        </div>
                        <ul className="header-menu">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/nosotros">Nosotros</Link></li>
                            <li><Link to="/servicios">Servicios</Link></li>
                            <li><Link to="/registro">Registrarse</Link></li>
                            <li><Link to="/Login">Inicio Sesion</Link></li>
                            <li><Link to="/inicioContactos">Contactanos</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <div className="slide-container">
                    <div
                        className="slider-track"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            display: 'flex',
                            transition: 'transform 0.5s ease'
                        }}
                    >
                        {sliderImages.map((img, idx) => (
                            <div key={idx} className="slider-item">
                                <img src={`../src/assets/inicio/${img}`} alt={`Slide ${idx + 1}`} />
                                <div className="img-overlay">
                                    <h1>Explora Colombia</h1>
                                    <p>Descubre su magia y belleza con aventuras sin límites</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slider-controls">
                        <button className="slider-btn prev-btn" onClick={() => handleSliderNavigation('prev')}>
                            &#10094;
                        </button>
                        <button className="slider-btn next-btn" onClick={() => handleSliderNavigation('next')}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </main>

            <section className="about-content-wrapper">
                <div className="agency-left-side">
                    <p className="heading-normal-txt">SOBRE NOSOTROS</p>
                    <p className="headings">CAMINANTES POR COLOMBIA</p>
                    <p className="lead">
                    Caminantes por Colombia es una agencia de turismo dedicada a brindar experiencias únicas y memorables. Ofrece una amplia variedad de actividades, como caminatas escolares, excursiones, campamentos y deportes extremos, diseñadas para conectar a las personas con la naturaleza.
                    </p>
                </div>
                <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto", aspectRatio: "16 / 9" }}>
                    <iframe
                        src="https://www.facebook.com/plugins/video.php?height=316&href=https%3A%2F%2Fwww.facebook.com%2F100049091809294%2Fvideos%2F873038207694664%2F&show_text=false&width=560&t=0"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        title="Facebook Video"
                    ></iframe>
                </div>
            </section>

            <section className="servicios">
                <h2 className="titulo-servicios">Nuestros Servicios</h2>
                <div className="servicios-row">
                    <Link to="/hoteldesc" className="servicio-item">
                        <div className="servicio">
                            <div className="icon-wrapper servicio-icon">
                                <i className="fas fa-hotel"></i>
                            </div>
                            <h3 className="servicio-title">Hotel</h3>
                            <p className="servicio-description">Disfruta de un alojamiento cómodo y seguro en los mejores hoteles de Colombia.</p>
                        </div>
                    </Link>
                    <Link to="/paquetedesc" className="servicio-item">
                        <div className="servicio">
                            <div className="icon-wrapper servicio-icon">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3 className="servicio-title">Paquetes</h3>
                            <p className="servicio-description">Te ofrecemos paquetes turísticos personalizados según tus preferencias.</p>
                        </div>
                    </Link>
                    <Link to="/excursiondesc" className="servicio-item">
                        <div className="servicio">
                            <div className="icon-wrapper servicio-icon">
                                <i className="fas fa-tree"></i>
                            </div>
                            <h3 className="servicio-title">Excursiones</h3>
                            <p className="servicio-description">Vive la aventura con nuestras excursiones a destinos naturales únicos.</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Sección de comentarios modularizada */}
            <ComentariosList 
                testimonials={testimonials} 
                testimonialImages={testimonialImages} 
            />
            
            <ComentariosForm 
                onCommentSubmit={refreshComments} 
            />

            <Footer />
        </>
    );
};

export default Principal;