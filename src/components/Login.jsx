import React, { useState } from "react";

function Login({ onLogin, onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email });
    } else {
      alert("Por favor ingresa tus credenciales");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <button onClick={onClose} style={closeBtn}>✖</button>
        <h2 style={titleStyle}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Entrar
          </button>
        </form>
        <p style={footerText}>
          ¿No tienes cuenta?{" "}
          <button onClick={onSwitchToRegister} style={linkBtn}>
            Regístrate
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
  background: "#ffffff", // fondo blanco
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
};

const buttonStyle = {
  background: "linear-gradient(135deg, #0072ff, #00c6ff)", // degradado azul
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
  color: "#0072ff", // azul llamativo
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
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
};

export default Login;