import React from 'react';
import './comentarios.css';

const ComentariosList = ({ testimonials, testimonialImages }) => {
  const renderStars = (rating) => {
    const ratingNumber = parseInt(rating?.split(" ")[0] || 0, 10);
    return Array(5).fill(0).map((_, index) => (
      <i
        key={index}
        className={`testimonial-star ${index < ratingNumber ? 'star-filled' : 'star-empty'}`}
      >
        ★
      </i>
    ));
  };

  return (
    <section className="testimonial-area">
      <div className="container5">
        <div className="sec-title">
          <h1>Nuestros clientes opinan</h1>
        </div>
        <div className="testimonial-content">
          {testimonials.map((testimonial, idx) => {
            const imagePath = testimonialImages[idx % testimonialImages.length];
            return (
              <div className="single-testimonial" key={idx}>
                <p>{testimonial.opinion}</p>
                <div className="client-info">
                  <div className="client-pic">
                    <img src={imagePath} alt={testimonial.nombreCompleto || "Cliente"} />
                  </div>
                  <div className="client-details">
                    <h6>{testimonial.nombreCompleto || "Anónimo"}</h6>
                    <span>{testimonial.valoracion || "Sin valoración"}</span>
                    <div>{renderStars(testimonial.valoracion)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComentariosList;