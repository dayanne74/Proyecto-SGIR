import { useState, useEffect } from "react";
import axios from "axios";
import "../paginas/css/comentarios.css";

function ComentariosCRUD() {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    nombreCompleto: "",
    valoracion: "",
    opinion: "",
  });
  const [comentarioEditando, setComentarioEditando] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/comentarios");
        setComentarios(response.data);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
    fetchComentarios();
  }, []);

  const agregarComentario = async () => {
    try {
      if (Object.values(nuevoComentario).some((field) => field === "")) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/comentarios",
        nuevoComentario
      );
      setComentarios([...comentarios, response.data]);
      setNuevoComentario({ nombreCompleto: "", valoracion: "", opinion: "" });
      alert("Comentario agregado correctamente");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      alert(`Error al agregar comentario: ${error.response?.data?.message || error.message}`);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comentarios/${id}`);
      setComentarios(comentarios.filter((comentario) => comentario._id !== id));
      alert("Comentario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      alert(`Error al eliminar comentario: ${error.response?.data?.message || error.message}`);
    }
  };

  const guardarEdicion = async () => {
    if (!comentarioEditando) return;

    const { _id, ...datosActualizar } = comentarioEditando;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/comentarios/${_id}`,
        datosActualizar
      );
      setComentarios(
        comentarios.map((comentario) =>
          comentario._id === _id ? response.data : comentario
        )
      );
      setComentarioEditando(null);
      alert("Comentario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar comentario:", error);
      alert(`Error: ${error.response?.data?.message || "No se pudo actualizar el comentario."}`);
    }
  };

  const editarComentario = (comentario) => {
    setComentarioEditando(comentario);
  };

  const cancelarEdicion = () => {
    setComentarioEditando(null);
  };

  return (
    <div className="comentarios-container">
      <h1 className="comentarios-titulo">Gestión de Comentarios</h1>

      <div className="comentarios-form">
        <h3>{comentarioEditando ? "Editar Comentario" : "Agregar Comentario"}</h3>
        <input
  placeholder="Nombre Completo"
  value={comentarioEditando ? comentarioEditando.nombreCompleto : nuevoComentario.nombreCompleto}
  onChange={(e) =>
    comentarioEditando
      ? setComentarioEditando({ ...comentarioEditando, nombreCompleto: e.target.value })
      : setNuevoComentario({ ...nuevoComentario, nombreCompleto: e.target.value })
  }
/>

<select
  value={comentarioEditando ? comentarioEditando.valoracion : nuevoComentario.valoracion}
  onChange={(e) =>
    comentarioEditando
      ? setComentarioEditando({ ...comentarioEditando, valoracion: e.target.value })
      : setNuevoComentario({ ...nuevoComentario, valoracion: e.target.value })
  }
>
  <option value="">Selecciona una valoración</option>
  <option value="1 estrella">1 estrella</option>
  <option value="2 estrellas">2 estrellas</option>
  <option value="3 estrellas">3 estrellas</option>
  <option value="4 estrellas">4 estrellas</option>
  <option value="5 estrellas">5 estrellas</option>
</select>

<input
  placeholder="Opinión"
  value={comentarioEditando ? comentarioEditando.opinion : nuevoComentario.opinion}
  onChange={(e) =>
    comentarioEditando
      ? setComentarioEditando({ ...comentarioEditando, opinion: e.target.value })
      : setNuevoComentario({ ...nuevoComentario, opinion: e.target.value })
  }
/>

        {comentarioEditando ? (
          <>
            <button className="comentarios-btn-editar" onClick={guardarEdicion}>
              Guardar Cambios
            </button>
            <button className="comentarios-btn-cancelar" onClick={cancelarEdicion}>
              Cancelar
            </button>
          </>
        ) : (
          <button className="comentarios-btn-agregar" onClick={agregarComentario}>
            Agregar
          </button>
        )}
      </div>

      <h3 className="comentarios-lista-titulo">Lista de Comentarios</h3>
      <ul className="comentarios-lista">
        {comentarios.map((comentario) => (
          <li key={comentario._id} className="comentarios-item">
            <span>
              <div><strong>Nombre:</strong><br /> {comentario.nombreCompleto}</div>
              <div><strong>Valoración:</strong><br />  {comentario.valoracion}</div>
              <div><strong>Opinión:</strong><br /> {comentario.opinion}</div>
            </span>
            <button
              className="comentarios-btn-editar"
              onClick={() => editarComentario(comentario)}
            >
              Editar
            </button>
            <button
              className="comentarios-btn-eliminar"
              onClick={() => eliminarComentario(comentario._id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComentariosCRUD;
