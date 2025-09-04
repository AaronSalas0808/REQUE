// Register.js - Actualizado con fondo blanco como Login
import React, { useState } from "react";

function Register({ onRegister, onSwitchToLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      onRegister({ email });
    } else {
      alert("Completa todos los campos");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <button onClick={onClose} style={closeBtn}>✖</button>
        <h2 style={titleStyle}>Registro</h2>
        <form onSubmit={handleRegister} style={formStyle}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onMouseEnter={(e) => {
              e.target.style.border = "1px solid #0072ff";
            }}
            onMouseLeave={(e) => {
              e.target.style.border = "1px solid #cccccc";
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onMouseEnter={(e) => {
              e.target.style.border = "1px solid #0072ff";
            }}
            onMouseLeave={(e) => {
              e.target.style.border = "1px solid #cccccc";
            }}
          />
          <button 
            type="submit" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #005fcc, #00a8ff)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #0072ff, #00c6ff)";
            }}
          >
            Registrarse
          </button>
        </form>
        <p style={footerText}>
          ¿Ya tienes cuenta?{" "}
          <button 
            onClick={onSwitchToLogin} 
            style={linkBtn}
            onMouseEnter={(e) => {
              e.target.style.color = "#005fcc";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#0072ff";
            }}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const cardStyle = {
  background: "#ffffff",
  color: "#333333",
  padding: "40px 30px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
  position: "relative",
};

const titleStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "700",
  color: "#222222",
};

const formStyle = {
  marginTop: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #cccccc",
  background: "#f9f9f9",
  color: "#333",
  fontSize: "15px",
  textAlign: "center",
  outline: "none",
  transition: "border 0.3s ease",
  boxSizing: "border-box"
};

const buttonStyle = {
  background: "linear-gradient(135deg, #0072ff, #00c6ff)",
  color: "white",
  border: "none",
  padding: "14px",
  width: "100%",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  marginTop: "18px",
  transition: "all 0.3s ease",
};

const footerText = {
  marginTop: "25px",
  fontSize: "14px",
  color: "#666666",
  textAlign: "center",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#0072ff",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "color 0.3s ease",
  padding: "0",
  margin: "0"
};

const closeBtn = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "none",
  border: "none",
  color: "#444444",
  fontSize: "20px",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.3s ease"
};

// Efectos hover
closeBtn.onMouseEnter = {
  background: "#f0f0f0"
};

closeBtn.onMouseLeave = {
  background: "none"
};

export default Register;