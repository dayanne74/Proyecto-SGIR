import React, { useState } from 'react';
import axios from 'axios';
import './comentarios.css';

const ComentariosForm = ({ onCommentSubmit }) => {
  const [nuevoComentario, setNuevoComentario] = useState({
    nombreCompleto: "",
    valoracion: "5 estrellas",
    opinion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!nuevoComentario.nombreCompleto || !nuevoComentario.opinion) {
        alert("Por favor completa todos los campos");
        return;
      }

      await axios.post("http://localhost:5000/api/comentarios", nuevoComentario);
      onCommentSubmit();
      
      setNuevoComentario({
        nombreCompleto: "",
        valoracion: "5 estrellas",
        opinion: "",
      });
      
      alert("¡Gracias por tu comentario!");
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      alert("Ocurrió un error al enviar tu comentario");
    }
  };

  return (
    <section className="comentarios-section">
      <div className="container">
        <h2>Deja tu experiencia con nosotros</h2>
        <form onSubmit={handleSubmit} className="comentario-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={nuevoComentario.nombreCompleto}
              onChange={(e) => setNuevoComentario({...nuevoComentario, nombreCompleto: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <select
              value={nuevoComentario.valoracion}
              onChange={(e) => setNuevoComentario({...nuevoComentario, valoracion: e.target.value})}
            >
              <option value="5 estrellas">⭐⭐⭐⭐⭐ Excelente</option>
              <option value="4 estrellas">⭐⭐⭐⭐ Muy bueno</option>
              <option value="3 estrellas">⭐⭐⭐ Bueno</option>
              <option value="2 estrellas">⭐⭐ Regular</option>
              <option value="1 estrella">⭐ Malo</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Cuéntanos tu experiencia..."
              value={nuevoComentario.opinion}
              onChange={(e) => setNuevoComentario({...nuevoComentario, opinion: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn-enviar">Enviar Comentario</button>
        </form>
      </div>
    </section>
  );
};

export default ComentariosForm;