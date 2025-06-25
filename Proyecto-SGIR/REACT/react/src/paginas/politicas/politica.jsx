import React, { useState } from 'react';
import './politicas.css'; 

const PoliticaDePrivacidad = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      <div className="help-content">
        <section className="help-section">
          <h1>Actualizado: 07 De Julio De 2024</h1>
          <h2>Política de Privacidad</h2>
          <p>Bienvenido a Caminantes por Colombia. Aquí te explicamos cómo recopilamos, usamos y protegemos tu información personal.</p>

          <h2>1. Información que Recopilamos</h2>

          <div className="help-accordion">
            <h3 onClick={() => toggleAccordion(0)}>¿Qué tipo de información recopilamos?</h3>
            {activeIndex === 0 && (
              <p>Recopilamos información personal como nombre, correo electrónico, número de teléfono, detalles de pago y de reserva de viaje.</p>
            )}

            <h3 onClick={() => toggleAccordion(1)}>¿Cómo usamos tu información?</h3>
            {activeIndex === 1 && (
              <p>Utilizamos tu información para gestionar tus reservas, mejorar nuestros servicios, y mantenerte informado sobre actualizaciones y promociones.</p>
            )}

            <h3 onClick={() => toggleAccordion(2)}>¿Compartimos tu información con terceros?</h3>
            {activeIndex === 2 && (
              <p>No compartimos tu información personal, salvo en los casos de proveedores de servicios turísticos, pagos o cuando lo requiera la ley.</p>
            )}

            <h3 onClick={() => toggleAccordion(3)}>¿Cómo protegemos tu información?</h3>
            {activeIndex === 3 && (
              <p>Implementamos medidas de seguridad avanzadas, aunque no podemos garantizar una seguridad total debido a las limitaciones de la tecnología.</p>
            )}

            <h3 onClick={() => toggleAccordion(4)}>¿Cuánto tiempo retenemos tu información?</h3>
            {activeIndex === 4 && (
              <p>Retenemos tu información solo por el tiempo necesario para cumplir con los fines para los que fue recopilada, y conforme a los requisitos legales.</p>
            )}
          </div>

          <h2>2. Tus Derechos</h2>
          <h3>¿Cuáles son tus derechos sobre tu información personal?</h3>
          <p>Puedes acceder, rectificar, eliminar o restringir el uso de tu información personal, entre otros derechos.</p>

          <h3>3. Cookies y Tecnologías Similares</h3>
          <p>Usamos cookies para mejorar tu experiencia. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad de la plataforma.</p>

          <h2>4. Contacto</h2>
          <h3>¿Tienes más preguntas?</h3>
          <p>Si tienes alguna duda sobre nuestra política de privacidad, contáctanos:</p>
          <p>Email: caminantesporcolombia@gmail.com</p>
          <p>Teléfono: 312 2567578</p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidad;
