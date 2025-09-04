// ServiceModal.js - Actualizado
import React from "react";

function ServiceModal({ service, onClose, onSelectSubservice }) {
  if (!service) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContent}>
        <button onClick={onClose} style={closeBtn}>
          ✖
        </button>
        <h2 style={titleStyle}>{service.name}</h2>
        <p style={descriptionStyle}>Elige una opción:</p>
        <div style={optionsContainer}>
          {service.subservices.map((sub, i) => (
            <button
              key={i}
              onClick={() => onSelectSubservice(sub)}
              style={btnStyle}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modalContent = {
  background: "#2d2d2d",
  padding: "30px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  position: "relative",
  color: "#f5f5f5"
};

const titleStyle = {
  margin: "0 0 15px 0",
  fontSize: "22px",
  fontWeight: "400",
};

const descriptionStyle = {
  margin: "0 0 20px 0",
  color: "#cccccc",
  fontSize: "15px"
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const btnStyle = {
  background: "transparent",
  color: "#f5f5f5",
  border: "1px solid #404040",
  padding: "12px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "400",
  fontSize: "15px",
  transition: "all 0.2s ease",
};

const closeBtn = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "none",
  border: "none",
  color: "#cccccc",
  fontSize: "20px",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s ease"
};

// Efectos hover
btnStyle.onHover = {
  background: "#3a7bd5",
  borderColor: "#3a7bd5"
};

closeBtn.onHover = {
  background: "#404040"
};

export default ServiceModal;