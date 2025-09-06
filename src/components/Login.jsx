import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onLogin, onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Por favor ingresa tus credenciales");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Obtener el nombre del usuario (puede que necesites ajustar esto según tu estructura de datos)
      // Si no tienes el nombre en Firestore, puedes omitir esta parte
      onLogin({
        uid: user.uid,
        email: user.email,
        nombre: user.displayName || "Usuario" // Usar displayName o un valor por defecto
      });
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      switch (error.code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/user-disabled":
          setError("Esta cuenta ha sido deshabilitada");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo electrónico");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        default:
          setError("Ocurrió un error durante el inicio de sesión. Por favor intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Estilos (los mismos que ya tenías)
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
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
    boxSizing: "border-box",
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
    margin: "0 0 0 5px",
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
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    margin: "10px 0",
    textAlign: "center",
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <button
          style={closeBtn}
          onClick={onClose}
          onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
          onMouseLeave={(e) => (e.target.style.background = "none")}
          disabled={loading}
        >
          ×
        </button>
        <h2 style={titleStyle}>Iniciar Sesión</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <button
            type="submit"
            style={buttonStyle}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => !loading && (e.target.style.opacity = "1")}
          >
            {loading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>
        <div style={footerText}>
          ¿No tienes cuenta?
          <button
            style={linkBtn}
            onClick={onSwitchToRegister}
            onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.color = "#0072ff")}
            disabled={loading}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;