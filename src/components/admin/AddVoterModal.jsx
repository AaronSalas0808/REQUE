import React, { useState } from "react";
import "./AdminDashboard.css"; // Reutilizamos estilos

function AddVoterModal({ isOpen, onClose, onVoterAdded }) {
  const [formData, setFormData] = useState({ id: "", name: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/admin/add-voter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        onVoterAdded(); // Llama a la función para refrescar la lista
        onClose();      // Cierra el modal
      } else {
        setError(data.message || "Ocurrió un error.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Agregar Nuevo Votante</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Número de Cédula</label>
            <input type="text" name="id" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nombre Completo</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Correo Electronico</label>
            <input type="text" name="password" onChange={handleChange} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="approve-btn" disabled={isSubmitting}>
              {isSubmitting ? "Agregando..." : "Agregar Votante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVoterModal;