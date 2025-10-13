// src/components/Login.jsx
import React, { useState } from "react";
import "./Login.css";

// Añade la prop 'onShowRegister'
function Login({ onLogin, error, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {/* ... (el resto del formulario no cambia) ... */}
        <div className="input-group">
          <label htmlFor="username">Identificador (DNI / Cédula)</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: 12345678A"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Ingresar</button>
        {/* 👇 AÑADIR ESTE BOTÓN 👇 */}
        <button type="button" className="secondary-button" onClick={onShowRegister}>
          Registrar Candidatura
        </button>
      </form>
    </div>
  );
}

export default Login;