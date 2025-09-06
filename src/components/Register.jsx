import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Register({ onRegister, onSwitchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: formData.nombre,
        email: formData.email,
        fechaRegistro: new Date()
      });

      
      onRegister({ 
        uid: user.uid, 
        nombre: formData.nombre, 
        email: formData.email 
      });
      
      
    } catch (error) {
      console.error("Error en registro:", error);
      
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Este correo electrónico ya está en uso");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/operation-not-allowed":
          setError("La operación no está permitida");
          break;
        case "auth/weak-password":
          setError("La contraseña es demasiado débil");
          break;
        default:
          setError("Ocurrió un error durante el registro. Por favor intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Estilos
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
    marginBottom: "20px"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
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
    margin: "0 0 0 5px"
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
    textAlign: "center"
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <button 
          style={closeBtn} 
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
          onMouseLeave={(e) => e.target.style.background = "none"}
          disabled={loading}
        >
          ×
        </button>
        
        <h2 style={titleStyle}>Registro de Usuario</h2>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={handleChange}
            required
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
            Registrar
          </button>
        </form>
        
        <div style={footerText}>
          ¿Ya tienes una cuenta?
          <button 
            style={linkBtn} 
            onClick={onSwitchToLogin}
            onMouseEnter={(e) => e.target.style.color = "#0056b3"}
            onMouseLeave={(e) => e.target.style.color = "#0072ff"}
            disabled={loading}
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
} 