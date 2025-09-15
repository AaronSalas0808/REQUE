import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";

export default function Register({ onRegister, onSwitchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const validateForm = () => {
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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

      // Guardar datos del usuario en Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        nombre: formData.nombre,
        email: formData.email,
        fechaRegistro: new Date().toISOString(),
      });

      // Pasar user al estado principal
      onRegister({
        uid: user.uid,
        nombre: formData.nombre,
        email: user.email,
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
          setError(
            "Ocurrió un error durante el registro. Por favor intenta nuevamente."
          );
      }
      setLoading(false);
    }
  };

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
    fontSize: "24px",
    fontWeight: "700",
    color: "#222222",
    marginBottom: "20px",
  };
  const formStyle = { display: "flex", flexDirection: "column", gap: "1px" };
  const inputStyle = {
  width: "100%",              // Ocupa lo mismo que el botón
  padding: "14px",            // Igual al botón
  margin: "10px 0",
  borderRadius: "8px",        // Igual al botón
  border: "1px solid #ccc",
  background: "#f9f9f9",
  fontSize: "15px",
  textAlign: "center",
  outline: "none",
  transition: "all 0.3s ease",
  boxSizing: "border-box",    // 🔹 Hace que el padding y border no rompan el width
  };
  const buttonStyle = {
    marginTop: "15px",
    padding: "14px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg,#0072ff,#00c6ff)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  };
  const footerText = { marginTop: "20px", fontSize: "14px", color: "#666" };
  const linkBtn = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#0072ff",
    fontWeight: "600",
  };


  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Registro de Usuario</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={loading}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <div style={footerText}>
          ¿Ya tienes una cuenta?{" "}
          <button style={linkBtn} onClick={onSwitchToLogin} disabled={loading}>
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}