import React, { useState, useEffect } from "react";
import "./CandidateRegistration.css";

const countWords = (text) => (text ? text.trim().split(/\s+/).length : 0);

function CandidateRegistration({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    id: "", name: "", email: "", party: "",
    biography: "", proposal: "", password: "",
  });
  const [partyLogoFile, setPartyLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Para la previsualización de la imagen
  const [isSubmitting, setIsSubmitting] = useState(false); // Para el estado de carga
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Efecto para limpiar el objeto URL y evitar memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateForm = () => { /* ... (la validación no cambia) ... */ 
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "La cédula es requerida.";
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido.";
    if (!formData.party.trim()) newErrors.party = "El partido es requerido.";
    if (!formData.password) newErrors.password = "La contraseña es requerida.";
    if (countWords(formData.biography) > 300) newErrors.biography = "Máximo 300 palabras.";
    if (countWords(formData.proposal) > 500) newErrors.proposal = "Máximo 500 palabras.";
    if (!partyLogoFile) newErrors.partyLogo = "La foto del partido es requerida.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartyLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;
    setIsSubmitting(true); // Activa el estado de carga

    const dataToSend = new FormData();
    for (const key in formData) { dataToSend.append(key, formData[key]); }
    dataToSend.append("partyLogo", partyLogoFile);

    try {
      const response = await fetch("http://localhost:3001/api/register-candidate", {
        method: "POST",
        body: dataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("¡Registro exitoso! Su candidatura está pendiente de aprobación.");
        // Opcional: limpiar el formulario aquí
      } else {
        setErrors({ form: data.message || "Ocurrió un error." });
      }
    } catch (err) {
      setErrors({ form: "No se pudo conectar con el servidor." });
    } finally {
      setIsSubmitting(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Registrar Candidatura</h2>
        <p className="form-description">Complete todos los campos para postular su candidatura. Será revisada por un administrador.</p>
        
        <div className="form-grid">
          <div className="input-group"><label>Número de Cédula</label><input type="text" name="id" onChange={handleChange} />{errors.id && <span className="error-text">{errors.id}</span>}</div>
          <div className="input-group"><label>Nombre Completo</label><input type="text" name="name" onChange={handleChange} />{errors.name && <span className="error-text">{errors.name}</span>}</div>
          <div className="input-group"><label>Correo Electrónico</label><input type="email" name="email" onChange={handleChange} />{errors.email && <span className="error-text">{errors.email}</span>}</div>
          <div className="input-group"><label>Contraseña</label><input type="password" name="password" onChange={handleChange} />{errors.password && <span className="error-text">{errors.password}</span>}</div>
        </div>
        
        <div className="input-group"><label>Nombre del Partido Político</label><input type="text" name="party" onChange={handleChange} />{errors.party && <span className="error-text">{errors.party}</span>}</div>

        <div className="input-group">
          <label>Logo del Partido</label>
          <div className="file-drop-area">
            <input type="file" id="partyLogo" name="partyLogo" accept="image/*" onChange={handleFileChange} />
            {previewUrl ? (
              <img src={previewUrl} alt="Vista previa del logo" className="image-preview" />
            ) : (
              <div className="file-drop-placeholder">
                <span className="file-drop-icon">🖼️</span>
                <p>Arrastre y suelte una imagen aquí, o haga clic para seleccionar</p>
              </div>
            )}
          </div>
          {errors.partyLogo && <span className="error-text">{errors.partyLogo}</span>}
        </div>

        <div className="input-group"><label>Biografía ({countWords(formData.biography)}/300)</label><textarea name="biography" rows="5" onChange={handleChange}></textarea>{errors.biography && <span className="error-text">{errors.biography}</span>}</div>
        <div className="input-group"><label>Propuesta de Campaña ({countWords(formData.proposal)}/500)</label><textarea name="proposal" rows="8" onChange={handleChange}></textarea>{errors.proposal && <span className="error-text">{errors.proposal}</span>}</div>

        {message && <p className="success-message">{message}</p>}
        {errors.form && <p className="error-message">{errors.form}</p>}
        
        <div className="form-actions">
          <button type="button" className="back-button" onClick={onBackToLogin} disabled={isSubmitting}>Volver al Login</button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Registro"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CandidateRegistration;