// Services.jsx - Añadir botón de volver al inicio
import React from "react";
import { services } from "../data/services";

function Services({ onSelectService, onBackToHome }) {
  const cardStyle = {
    background: "#ffffff",
    color: "#2c3e50",
    padding: "25px 20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    border: "1px solid #ecf0f1"
  };

  const buttonStyle = {
    background: "transparent",
    color: "#3498db",
    border: "1px solid #3498db",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.3s ease",
    marginTop: "15px"
  };

  return (
    <div style={{ padding: "40px 20px", background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Botón de volver al inicio */}
      <button
        onClick={onBackToHome}
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
        ← Volver al inicio
      </button>
      
      <h2
        style={{
          textAlign: "center",
          margin: "0 0 50px 0",
          color: "#2c3e50",
          fontSize: "32px",
          fontWeight: "600",
        }}
      >
        Nuestros Servicios
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
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
              <h3 style={{ fontSize: "20px", marginBottom: "12px", color: "#2c3e50" }}>
                {service.name}
              </h3>
              <p
                style={{
                  color: "#7f8c8d",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {service.desc}
              </p>
            </div>
            <button
              onClick={() => onSelectService(service)}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#3498db";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#3498db";
              }}
            >
              Ver opciones y precios
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;