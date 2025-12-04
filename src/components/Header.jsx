import React from "react";
import "./Header.css";

function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-section">
          <div className="logo-container">
            <span className="logo-icon">🔒</span>
          </div>
          <div className="title-section">
            <h1>ElecVote</h1>
            <p className="tagline">Líder En Votación Electrónica</p>
          </div>
        </div>
        
        {user && (
          <div className="user-section">
            <div className="user-welcome">
              <span className="welcome-text">Bienvenido,</span>
              <span className="user-name">{user.name}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              <span className="btn-text">Salir</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;