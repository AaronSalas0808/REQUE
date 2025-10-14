import React from "react";
import "./Login.css";

// 👇 LA CORRECCIÓN ESTÁ EN ESTA LÍNEA 👇
function Login({ onLogin, error, onShowRegister, electionStatus, onShowCandidates }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="home-screen-container">
      <div className="info-card">
        <h2>Estado de la Votación</h2>
        <div className="election-status-indicator">
          <p>Actualmente la votación se encuentra:</p>
          <span className={`status-badge ${electionStatus}`}>
            {electionStatus === 'active' ? 'Activa' : 'Cerrada'}
          </span>
        </div>
        <p className="info-text">
          Consulte la información de los candidatos aprobados antes de participar.
        </p>
        <button type="button" className="info-button" onClick={onShowCandidates}>
          Ver Información de Candidatos
        </button>
      </div>
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Acceso al Sistema</h2>
          <div className="input-group"><label htmlFor="username">Identificador</label><input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
          <div className="input-group"><label htmlFor="password">Contraseña</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Ingresar</button>
          <button type="button" className="secondary-button" onClick={onShowRegister}>
            Registrar Candidatura
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;