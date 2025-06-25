import React, { useState } from 'react';
import axios from 'axios';
import '../paginas/css/registro.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contrasena: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', credentials);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
      setSuccess('');
    }
  };

  return (
    <main className="registro-main">
      <div className="registro-form-container">
        {/* Imagen centrada arriba */}
        <img
          src="/logo.png" // Asegúrate de que esta imagen exista en tu carpeta public
          alt="Logo"
          className="registro-imagen"
        />
        <h1 className="registro-titulo">Iniciar Sesión</h1>
        <form className="registro-form" onSubmit={handleSubmit}>
          <label htmlFor="correo" className="registro-label sr-only">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            id="correo"
            className="registro-input"
            placeholder="Correo electrónico"
            value={credentials.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasena" className="registro-label sr-only">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            id="contrasena"
            className="registro-input"
            placeholder="Contraseña"
            value={credentials.contrasena}
            onChange={handleChange}
            required
          />

          <button type="submit" className="registro-button">Iniciar Sesión</button>
        </form>

        {error && <p className="registro-error">{error}</p>}
        {success && <p className="registro-p">{success}</p>}

        <p className="registro-p">
          ¿No tienes cuenta? - <a href="/registro" className="registro-link">Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;

