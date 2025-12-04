// Login.jsx - Versión Minimalista
import React from "react";
import "./Login.css";

function Login({ onLogin, error, onShowRegister, electionStatus, onShowCandidates }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="home-screen-container">
      <div className="login-wrapper">
        {/* Panel izquierdo - Información */}
        <div className="info-panel">
          <h2>Votación Electrónica</h2>
          <div className="election-status-indicator">
            <span className={`status-badge ${electionStatus}`}>
              {electionStatus === 'active' ? 'Votación Activa' : 'Votación Inactiva'}
            </span>
          </div>
          <p className="info-text">
            Sistema seguro y confiable para ejercer su derecho al voto de manera digital.
          </p>
          <button type="button" className="info-button" onClick={onShowCandidates}>
            Ver Candidatos
          </button>
        </div>

        {/* Panel derecho - Login */}
        <div className="login-panel">
          <div className="login-header">
            <h2>Iniciar Sesión</h2>
            <p>Ingrese sus credenciales para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="username">Identificador</label>
              <input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Ingrese su identificador"
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
                placeholder="Ingrese su contraseña"
                required 
              />
            </div>
            
            <button type="submit" className="login-button">
              Ingresar al Sistema
            </button>
            
            <button type="button" className="secondary-button" onClick={onShowRegister}>
              Registrar Candidatura
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <div className="footer-content">
          <div className="help-section">
            <h4>¿Tiene dudas o necesita ayuda?</h4>
            <p>Contacte a nuestra Mesa de Ayuda entre 06:00 y 16:30 hrs. (Hora Costa Rica)</p>
            <p>Email: soporte@votaelect.com | Teléfono: +506 4000 1673</p>
          </div>
          <div className="footer-links">
          <a href="#" className="footer-link">Revisar la participación</a>
            <a href="#" className="footer-link">Registrar observación</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;