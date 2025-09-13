import React, { useEffect, useState } from "react";

function Sidebar({ open, onClose, onNavigate }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "sobre-nosotros", label: "Sobre Nosotros" },
    { id: "contacto", label: "Contacto" },
    { id: "opiniones", label: "Opiniones" }
  ];

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    onClose();
  };

  // Formatear fecha de manera elegante
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Formatear hora de manera elegante
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <>
      {/* Overlay que cubre toda la pantalla - permite abrir/cerrar desde cualquier lugar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: open ? "rgba(0,0,0,0.4)" : "transparent",
          backdropFilter: open ? "blur(2px)" : "none",
          WebkitBackdropFilter: open ? "blur(2px)" : "none",
          zIndex: 998,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.3s ease",
        }}
        onClick={onClose}
      />
      
      {/* Sidebar minimalista */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-280px",
          width: "280px",
          height: "100%",
          background: "#ffffff",
          color: "#2c3e50",
          padding: "0",
          transition: "left 0.3s ease",
          zIndex: 999,
          boxShadow: "2px 0 15px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Encabezado con fecha y hora */}
        <div 
          style={{
            padding: "25px 20px",
            background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
            borderBottom: "1px solid #e0e0e0",
            textAlign: "center",
            cursor: "pointer",
            color: "white"
          }}
          onClick={open ? onClose : () => {}}
        >
          <div style={{ 
            fontSize: "36px", 
            color: "white",
            fontWeight: "400",
            marginBottom: "6px",
            letterSpacing: "-1px"
          }}>
            {formatTime(currentTime)}
          </div>
          <div style={{ 
            fontSize: "14px", 
            color: "rgba(255,255,255,0.9)",
            fontWeight: "400",
            letterSpacing: "0.3px"
          }}>
            {formatDate(currentTime)}
          </div>
        </div>

        {/* Logo y nombre */}
        <div style={{ 
          padding: "20px", 
          paddingBottom: "10px",
          textAlign: "center",
          borderBottom: "1px solid #f1f2f6"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 15px auto",
            boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)"
          }}>
            <span style={{ 
              fontSize: "24px", 
              fontWeight: "bold", 
              color: "white" 
            }}>
              A
            </span>
          </div>
          <h2 style={{ 
            margin: "0 0 5px 0", 
            color: "#2c3e50",
            fontSize: "18px",
            fontWeight: "600"
          }}>
            Apolo Barber & Spa
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: "12px", 
            color: "#7f8c8d" 
          }}>
            Juventud, fuerza y estilo
          </p>
        </div>
        
        {/* Menú de navegación minimalista */}
        <div style={{ 
          padding: "15px 0",
          flex: 1
        }}>
          <div style={{ 
            fontSize: "11px", 
            color: "#7f8c8d",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            padding: "0 20px 10px 20px",
            marginBottom: "10px"
          }}>
            Navegación
          </div>
          
          <ul style={{ 
            listStyle: "none", 
            padding: 0, 
            margin: 0
          }}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  style={{ 
                    color: "#2c3e50", 
                    fontWeight: "500", 
                    display: "block", 
                    padding: "12px 20px",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "15px",
                    background: "transparent",
                    border: "none",
                    transition: "all 0.2s ease",
                    borderLeft: "3px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f8f9fa";
                    e.target.style.borderLeftColor = "#3498db";
                    e.target.style.paddingLeft = "25px";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.borderLeftColor = "transparent";
                    e.target.style.paddingLeft = "20px";
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Información de contacto minimalista */}
        <div style={{ 
          padding: "20px",
          background: "#f8f9fa",
          borderTop: "1px solid #f1f2f6"
        }}>
          <div style={{ 
            fontSize: "11px", 
            color: "#7f8c8d",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "12px"
          }}>
            Contacto
          </div>
          
          <div style={{ marginBottom: "10px" }}>
            <div style={{ 
              fontSize: "13px", 
              color: "#2c3e50",
              display: "flex",
              alignItems: "center",
              marginBottom: "5px"
            }}>
              <span style={{ 
                width: "20px", 
                color: "#3498db",
                fontWeight: "bold",
                marginRight: "10px"
              }}>
                T
              </span>
              +34 123 456 789
            </div>
          </div>
          
          <div>
            <div style={{ 
              fontSize: "13px", 
              color: "#2c3e50",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ 
                width: "20px", 
                color: "#3498db",
                fontWeight: "bold",
                marginRight: "10px"
              }}>
                @
              </span>
              info@apolobarber.com
            </div>
          </div>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            color: "#3498db",
            fontSize: "20px",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#3498db";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.9)";
            e.target.style.color = "#3498db";
          }}
        >
          ×
        </button>
      </div>
    </>
  );
}

export default Sidebar;