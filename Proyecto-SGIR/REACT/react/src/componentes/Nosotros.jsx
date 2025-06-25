import React from "react";
import { FaSuitcase, FaHandsHelping, FaGlobeAmericas } from "react-icons/fa"; 
import '../paginas/nosotros/nosotros.css'
function Nosotros() {
  return (
    <section id="about" className="py-5 text-center bg-light">
      <div className="container">
        <h2 className="display-4 mb-4">¿Por qué reservar con nosotros?</h2>
        <p className="lead mb-5">
          En nuestra agencia te ofrecemos los mejores destinos con un servicio
          personalizado para que disfrutes de una experiencia inolvidable. Con
          años de experiencia, nos encargamos de todo para que tu única
          preocupación sea disfrutar.
        </p>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 border rounded shadow-sm text-center">
              <FaSuitcase size={50} className="mb-3 text-primary" />
              <h3>Viajes Personalizados</h3>
              <p>
                Adaptamos cada viaje a tus necesidades y deseos, creando la
                experiencia perfecta solo para ti.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 border rounded shadow-sm text-center">
              <FaHandsHelping size={50} className="mb-3 text-success" />
              <h3>Asesoría Profesional</h3>
              <p>
                Te brindamos asistencia completa antes y durante tu viaje, para
                que te sientas acompañado en todo momento.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card p-4 border rounded shadow-sm text-center">
              <FaGlobeAmericas size={50} className="mb-3 text-info" />
              <h3>Destinos Únicos</h3>
              <p>
                Accede a los mejores y más exclusivos destinos turísticos, que
                solo nosotros te podemos ofrecer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;