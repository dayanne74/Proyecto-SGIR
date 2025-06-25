import { useState, useEffect } from "react";
import axios from "axios";
import "../paginas/css/crud.css";

function UsuariosCRUD() {
  const [usuarios, setUsuarios] = useState([]);
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    numeroDocumento: "",
    correo: "",
    contrasena: "",
    roles: [],
    estadoUsuario: true,
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  useEffect(() => {
    const fetchUsuariosYRoles = async () => {
      try {
        const usuariosRes = await axios.get(
          "http://localhost:5000/api/usuario",
          getAuthHeader()
        );
        setUsuarios(usuariosRes.data);

        const rolesRes = await axios.get(
          "http://localhost:5000/api/roles",
          getAuthHeader()
        );
        setRolesDisponibles(rolesRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar usuarios o roles.");
      }
    };
    fetchUsuariosYRoles();
  }, []);

  const handleChange = (e, campo) => {
    const valor = e.target.value;
    if (usuarioEditando) {
      setUsuarioEditando({ ...usuarioEditando, [campo]: valor });
    } else {
      setNuevoUsuario({ ...nuevoUsuario, [campo]: valor });
    }
  };

  const handleRolesChange = (e) => {
    const opciones = Array.from(e.target.selectedOptions).map((o) => o.value);
    if (usuarioEditando) {
      setUsuarioEditando({ ...usuarioEditando, roles: opciones });
    } else {
      setNuevoUsuario({ ...nuevoUsuario, roles: opciones });
    }
  };

  const guardarUsuario = async () => {
    try {
      setError("");
      setSuccess("");

      const datos = usuarioEditando || nuevoUsuario;

      if (Object.values(datos).some((val) => val === "" || val.length === 0)) {
        setError("Todos los campos son obligatorios.");
        return;
      }

      if (!usuarioEditando) {
        // Crear nuevo
        const existe = usuarios.some(
          (u) =>
            u.correo === datos.correo ||
            u.numeroDocumento === datos.numeroDocumento
        );
        if (existe) {
          setError("Correo o documento ya registrados.");
          return;
        }
        const res = await axios.post(
          "http://localhost:5000/api/usuario",
          datos,
          getAuthHeader()
        );
        setUsuarios((prev) => [...prev, res.data]);
        setNuevoUsuario({
          nombreUsuario: "",
          apellidoUsuario: "",
          numeroDocumento: "",
          correo: "",
          contrasena: "",
          roles: [],
          estadoUsuario: true,
        });
        setSuccess("Usuario registrado correctamente");
      } else {
        // Editar existente
        const { _id, ...actualizados } = usuarioEditando;
        if (!actualizados.contrasena) {
          delete actualizados.contrasena;
        }
        const res = await axios.put(
          `http://localhost:5000/api/usuario/${_id}`,
          actualizados,
          getAuthHeader()
        );
        setUsuarios((prev) =>
          prev.map((u) => (u._id === _id ? res.data : u))
        );
        setUsuarioEditando(null);
        setSuccess("Usuario actualizado correctamente");
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setError(error.response?.data?.message || "Error al guardar usuario");
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/usuario/${id}`, getAuthHeader());
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
      setSuccess("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setError("No se pudo eliminar el usuario");
    }
  };

  const cancelarEdicion = () => {
    setUsuarioEditando(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="clientes-crud-container">
      <h1 className="titulo">Gestión de Usuarios</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="crud-content">
        <div className="formulario-container">
          <h3>{usuarioEditando ? "Editar Usuario" : "Agregar Usuario"}</h3>

          {[
            ["numeroDocumento", "Número de Documento"],
            ["nombreUsuario", "Nombre"],
            ["apellidoUsuario", "Apellido"],
            ["correo", "Correo"],
          ].map(([campo, label]) => (
            <div className="formulario-campo" key={campo}>
              <label>{label}:</label>
              <input
                className="input-field"
                value={
                  usuarioEditando
                    ? usuarioEditando[campo]
                    : nuevoUsuario[campo]
                }
                onChange={(e) => handleChange(e, campo)}
                disabled={campo === "numeroDocumento" && usuarioEditando}
              />
            </div>
          ))}

          <div className="formulario-campo">
            <label>Contraseña:</label>
            <input
              className="input-field"
              type="password"
              placeholder={usuarioEditando ? "Dejar vacío si no cambia" : ""}
              value={
                usuarioEditando
                  ? usuarioEditando.contrasena || ""
                  : nuevoUsuario.contrasena
              }
              onChange={(e) => handleChange(e, "contrasena")}
            />
          </div>

          <div className="formulario-campo">
            <label>Roles:</label>
            <select
              multiple
              className="input-field"
              value={
                usuarioEditando ? usuarioEditando.roles : nuevoUsuario.roles
              }
              onChange={handleRolesChange}
            >
              {rolesDisponibles.map((rol) => (
                <option key={rol._id} value={rol._id}>
                  {rol.nombreRol}
                </option>
              ))}
            </select>
          </div>

          {usuarioEditando && (
            <div className="formulario-campo">
              <label>Estado del Usuario:</label>
              <select
                className="input-field"
                value={usuarioEditando.estadoUsuario}
                onChange={(e) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    estadoUsuario: e.target.value === "true",
                  })
                }
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          )}

          <div className="formulario-botones">
            <button className="btn-guardar" onClick={guardarUsuario}>
              {usuarioEditando ? "Guardar Cambios" : "Agregar Usuario"}
            </button>
            {usuarioEditando && (
              <button className="btn-cancelar" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="lista-container">
          <h3>Lista de Usuarios</h3>
          {usuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <div className="clientes-grid">
              {usuarios.map((usuario) => (
                <div key={usuario._id} className="cliente-card">
                  <div className="cliente-info">
                    <p><strong>Documento:</strong> {usuario.numeroDocumento}</p>
                    <p><strong>Nombre:</strong> {usuario.nombreUsuario} {usuario.apellidoUsuario}</p>
                    <p><strong>Correo:</strong> {usuario.correo}</p>
                    <p><strong>Roles:</strong> {usuario.roles?.map(r => r.nombreRol || r).join(", ")}</p>
                    <p><strong>Estado:</strong> {usuario.estadoUsuario ? "Activo" : "Inactivo"}</p>
                    <p><strong>Creado en:</strong> {new Date(usuario.creadoEn).toLocaleDateString()}</p>
                  </div>
                  <div className="cliente-actions">
                    <button className="btn-editar" onClick={() => setUsuarioEditando(usuario)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsuariosCRUD;
