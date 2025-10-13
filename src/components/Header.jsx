import React from "react";
import "./Header.css";

function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <h1>🗳️ Voto Electrónico Seguro</h1>
      {user && (
        <div className="user-info">
          <span>Bienvenido, {user.name}</span>
          <button onClick={onLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;