import React, { useState } from 'react';
import './politicas.css'; 

const Ayuda = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      <div className="help-content">
        <section className="help-section">
          <h1>Actualizado: 07 De Julio De 2024</h1>
          <h2>Ayuda</h2>
          <p>Bienvenido a la Sección de Ayuda de Caminantes por Colombia. Aquí encontrarás respuestas a preguntas frecuentes y guías para ayudarte a utilizar nuestra plataforma de manera efectiva.</p>
          
          <h2>1. Preguntas Frecuentes</h2>

          <div className="help-accordion">
            <h3 onClick={() => toggleAccordion(0)}>¿Cómo puedo hacer una reserva?</h3>
            {activeIndex === 0 && <p>Para hacer una reserva, busca el destino o servicio turístico, selecciona las fechas y otros detalles, y luego haz clic en "Reservar".</p>}

            <h3 onClick={() => toggleAccordion(1)}>¿Cómo puedo cancelar o modificar mi reserva?</h3>
            {activeIndex === 1 && <p>Inicia sesión, ve a "Mis Reservas", selecciona la reserva y sigue las instrucciones para modificarla o cancelarla.</p>}

            <h3 onClick={() => toggleAccordion(2)}>¿Qué métodos de pago aceptan?</h3>
            {activeIndex === 2 && <p>Aceptamos tarjetas de crédito, débito y algunas opciones de pago en línea. Verifica en el momento del pago para más detalles.</p>}

            <h3 onClick={() => toggleAccordion(3)}>¿Es seguro hacer pagos en su plataforma?</h3>
            {activeIndex === 3 && <p>Sí, utilizamos medidas de seguridad avanzadas para proteger tus datos y transacciones.</p>}

            <h3 onClick={() => toggleAccordion(4)}>¿Cómo puedo crear una cuenta?</h3>
            {activeIndex === 4 && <p>Haz clic en "Registrarse" en la parte superior de la página, completa el formulario y activa tu cuenta.</p>}
          </div>

          <h2>Guias de Uso</h2>
          <h3>Buscar y Reservar Tours y Actividades</h3>
          <p>Utiliza la barra de búsqueda para encontrar tours, aplica filtros según tus preferencias y haz clic en "Reservar" para continuar.</p>

          <h3>Gestionar tu Cuenta</h3>
          <p>Inicia sesión, ve a "Mi Cuenta" para actualizar tu información o ver tus reservas.</p>

          <h2>Contacto y Soporte</h2>
          <h3>¿Necesitas más ayuda?</h3>
          <p>Si tienes más preguntas, contáctanos a través de:</p>
          <p>Email: caminantesporcolombia@gmail.com</p>
          <p>Teléfono: 312 2567578</p>
        </section>
      </div>
    </div>
  );
};

export default Ayuda;
