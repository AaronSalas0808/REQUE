// Subservices.jsx - Mostrar precios y quitar funcionalidad de selección
import React from "react";

function Subservices({ service, onBack }) {
  const cardStyle = {
    background: "#ffffff",
    color: "#2c3e50",
    padding: "25px 20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    border: "1px solid #ecf0f1"
  };

  const priceStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#27ae60",
    margin: "10px 0"
  };

  return (
    <div style={{ padding: "40px 20px", background: "#f8f9fa", minHeight: "100vh" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "30px",
          background: "transparent",
          color: "#2c3e50",
          border: "1px solid #bdc3c7",
          padding: "10px 20px",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "14px",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#ecf0f1";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
        }}
      >
        ← Volver a servicios
      </button>
      
      <h2 style={{
        textAlign: "center",
        margin: "0 0 15px 0",
        color: "#2c3e50",
        fontSize: "32px",
        fontWeight: "600",
      }}>
        {service.name}
      </h2>
      
      <p style={{
        textAlign: "center",
        margin: "0 0 50px 0",
        color: "#7f8c8d",
        fontSize: "16px"
      }}>
        Consulta nuestras opciones y precios
      </p>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {service.subservices.map((sub, i) => (
          <div
            key={i}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
            }}
          >
            <div>
              <h3 style={{ 
                fontSize: "18px", 
                marginBottom: "12px",
                fontWeight: "500",
                color: "#2c3e50"
              }}>
                {sub.name}
              </h3>
              <p style={priceStyle}>
                {sub.price} €
              </p>
              {sub.duration && (
                <p style={{ 
                  fontSize: "14px", 
                  color: "#7f8c8d",
                  margin: "5px 0"
                }}>
                  Duración: {sub.duration}
                </p>
              )}
              {sub.description && (
                <p style={{ 
                  fontSize: "14px", 
                  color: "#7f8c8d",
                  margin: "10px 0 0 0",
                  fontStyle: "italic"
                }}>
                  {sub.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subservices;