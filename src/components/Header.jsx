import React from "react";

function Header({ user, onLoginClick, onRegisterClick, onLogout, onMenuClick }) {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "white",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efecto de partículas sutiles en el fondo */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 30%, rgba(67, 118, 160, 0.15) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      {/* Botón menú hamburguesa con diseño moderno */}
      <button
        onClick={onMenuClick}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255,255,255,0.2)";
          e.target.style.transform = "rotate(90deg)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255,255,255,0.1)";
          e.target.style.transform = "rotate(0deg)";
        }}
      >
        ☰
      </button>

      {/* Espacio vacío donde antes estaba el logo */}
      <div style={{ width: '50px' }}></div>

      <nav style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            <div style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.1)",
              padding: "8px 16px",
              borderRadius: "25px",
              marginRight: "10px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#4CAF50",
                marginRight: "10px",
                boxShadow: "0 0 10px #4CAF50"
              }}></div>
              <span style={{ fontSize: "14px" }}>
                {user.email.split('@')[0]}
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span>🚪</span>
              Salir
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.borderColor = "rgba(255,255,255,0.5)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(255,255,255,0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              
              Entrar
            </button>
            <button
              onClick={onRegisterClick}
              style={{
                background: "linear-gradient(135deg, #4376a0ff, #5c9bd5)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(67, 118, 160, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(67, 118, 160, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(67, 118, 160, 0.3)";
              }}
            >
              
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;