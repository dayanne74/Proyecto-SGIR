import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; 
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // extraemos login del contexto
  const { login } = useAuth();  // 2️⃣

  // Decodifica el payload del JWT
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Error decodificando token:", err);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/autentificaciones/login",
        { correo, contrasena }
      );
      const { token } = res.data;
      // 3️⃣ Decodificamos y sacamos roles
      const decoded = decodeToken(token);
      const roles = (decoded?.roles || []).map((r) => r.toLowerCase());
      // 4️⃣ Llamamos a login para que el contexto actualice su estado
      login(token, roles);  
      // 5️⃣ Redirigimos según rol
      if (roles.includes("administrador")) {
        navigate("/AdminPage");
      } else if (roles.includes("cliente")) {
        navigate("/cliente/ReservasGestion");
      } else {
        setError("Rol no reconocido.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error al conectar con el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>Bienvenido</h1>
            <p>Inicie sesión para acceder a su cuenta</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="error-box">
                <AlertCircle />
                <p>{error}</p>
              </div>
            )}
            
            <label>Correo electrónico</label>
            <div className="input-group">
              <Mail />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="correo electronica"
              />
            </div>
            
            <label>Contraseña</label>
            <div className="input-group password-wrapper">
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                placeholder="contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">
                Recordar sesión
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="login-btn"
            >
              {isLoading ? (
                "Iniciando sesión..."
              ) : (
                "Iniciar Sesión"
              )}
            </button>
            
            <div className="login-footer">
              <p>
                ¿No tiene una cuenta? <a href="/registro">Registrarse</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;