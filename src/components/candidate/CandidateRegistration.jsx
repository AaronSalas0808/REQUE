import React, { useState } from "react";
import "./CandidateRegistration.css";

// ... (la función countWords no cambia)
const countWords = (text) => (text ? text.trim().split(/\s+/).length : 0);

function CandidateRegistration({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    id: "", name: "", email: "", party: "",
    biography: "", proposal: "", password: "",
  });
  const [partyLogoFile, setPartyLogoFile] = useState(null); // 👈 Nuevo estado para el archivo
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    // ... (la validación no cambia mucho, solo añadimos la del archivo)
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "La cédula es requerida.";
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido.";
    if (!formData.party.trim()) newErrors.party = "El partido es requerido.";
    if (!formData.password) newErrors.password = "La contraseña es requerida.";
    if (countWords(formData.biography) > 300) newErrors.biography = "Máximo 300 palabras.";
    if (countWords(formData.proposal) > 500) newErrors.proposal = "Máximo 500 palabras.";
    if (!partyLogoFile) newErrors.partyLogo = "La foto del partido es requerida."; // 👈 Validar archivo
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPartyLogoFile(e.target.files[0]); // 👈 Guardamos el archivo en el estado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;

    // 👇 USAMOS FormData PARA ENVIAR ARCHIVOS Y TEXTO
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }
    dataToSend.append("partyLogo", partyLogoFile);

    try {
      const response = await fetch("http://localhost:3001/api/register-candidate", {
        method: "POST",
        body: dataToSend, // 👈 Enviamos FormData, no JSON
        // 🚨 No agregar el header 'Content-Type', el navegador lo hace automáticamente
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("¡Registro exitoso! Su candidatura está pendiente de aprobación.");
      } else {
        setErrors({ form: data.message || "Ocurrió un error." });
      }
    } catch (err) {
      setErrors({ form: "No se pudo conectar con el servidor." });
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Registrar Candidatura</h2>
        {/* ... (el resto de campos de texto no cambian) ... */}
        <div className="input-group">
          <label htmlFor="id">Número de Cédula</label>
          <input type="text" name="id" onChange={handleChange} />
          {errors.id && <span className="error-text">{errors.id}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="name">Nombre Completo</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="party">Nombre del Partido Político</label>
          <input type="text" name="party" onChange={handleChange} />
          {errors.party && <span className="error-text">{errors.party}</span>}
        </div>
        {/* 👇 NUEVO CAMPO PARA SUBIR LA FOTO DEL PARTIDO 👇 */}
        <div className="input-group">
          <label htmlFor="partyLogo">Foto del Partido (Logo)</label>
          <input type="file" name="partyLogo" accept="image/*" onChange={handleFileChange} />
          {errors.partyLogo && <span className="error-text">{errors.partyLogo}</span>}
        </div>

        <div className="input-group">
          <label>Biografía ({countWords(formData.biography)}/300 palabras)</label>
          <textarea name="biography" rows="5" onChange={handleChange}></textarea>
          {errors.biography && <span className="error-text">{errors.biography}</span>}
        </div>
        <div className="input-group">
          <label>Propuesta de Campaña ({countWords(formData.proposal)}/500 palabras)</label>
          <textarea name="proposal" rows="8" onChange={handleChange}></textarea>
          {errors.proposal && <span className="error-text">{errors.proposal}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" onChange={handleChange} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {message && <p className="success-message">{message}</p>}
        {errors.form && <p className="error-message">{errors.form}</p>}
        <button type="submit">Enviar Registro</button>
        <button type="button" className="back-button" onClick={onBackToLogin}>
          Volver al Login
        </button>
      </form>
    </div>
  );
}

export default CandidateRegistration;