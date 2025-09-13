import React from "react";

function Header({ user, onLoginClick, onRegisterClick, onLogout, onMenuClick }) {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo y menú hamburguesa */}
        <div style={leftSectionStyle}>
          <button 
            style={menuButtonStyle}
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {/* Botones de usuario */}
        <div style={rightSectionStyle}>
          {user ? (
            <div style={userSectionStyle}>
              <span style={userWelcomeStyle}>Hola, {user.email}</span>
              <button 
                style={logoutButtonStyle}
                onClick={onLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={authButtonsStyle}>
              <button 
                style={loginButtonStyle}
                onClick={onLoginClick}
              >
                Iniciar Sesión
              </button>
              <button 
                style={registerButtonStyle}
                onClick={onRegisterClick}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Estilos
const headerStyle = {
  backgroundColor: "#2c3e50",
  color: "white",
  padding: "15px 0",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  width: "100%"
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px"
};

const leftSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const menuButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "10px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  color: "white",
  fontWeight: "500",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.1)"
  }
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center"
};

const userSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const userWelcomeStyle = {
  fontSize: "14px",
  color: "#ecf0f1",
  fontWeight: "500",
  display: { xs: "none", md: "block" } // Oculta en móviles, muestra en desktop
};

const logoutButtonStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.1)"
  }
};

const authButtonsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const loginButtonStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.1)"
  }
};

const registerButtonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "#2980b9",
    transform: "translateY(-1px)"
  }
};

// Aplicar estilos responsive
userWelcomeStyle.display = window.innerWidth < 768 ? "none" : "block";

export default Header;