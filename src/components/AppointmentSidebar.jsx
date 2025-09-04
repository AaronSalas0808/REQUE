import React from "react";

function AppointmentSidebar({ user, onNavigate, onLogout, currentStep, onStepClick }) {
  const menuItems = [
    { id: "profile", label: "Mi Perfil", icon: "👤" },
    { id: "appointments", label: "Mis Citas", icon: "📅" },
    { id: "history", label: "Historial", icon: "📋" },
    { id: "notifications", label: "Notificaciones", icon: "🔔" },
    { id: "help", label: "Ayuda", icon: "❓" },
    { id: "contact", label: "Contacto", icon: "📞" },
    { id: "logout", label: "Cerrar Sesión", icon: "🚪" }
  ];

  const steps = [
    { number: 1, title: "Establecimiento" },
    { number: 2, title: "Servicio" },
    { number: 3, title: "Imagen y notas" },
    { number: 4, title: "Fecha y hora" },
    { number: 5, title: "Resumen" },
    { number: 6, title: "Confirmación" }
  ];

  const handleMenuItemClick = (itemId) => {
    if (itemId === "logout") {
      onLogout();
    } else if (itemId === "contact") {
      // Aquí puedes implementar la lógica de contacto
      alert("Sistema de contacto pronto disponible");
    } else {
      onNavigate(itemId);
    }
  };

  return (
    <div style={sidebarStyles.container}>
      {/* Header con perfil de usuario */}
      <div style={sidebarStyles.profileSection}>
        <div style={sidebarStyles.avatar}>
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div style={sidebarStyles.userInfo}>
          <h3 style={sidebarStyles.welcome}>¡Hola!</h3>
          <p style={sidebarStyles.userName}>{user?.email || "Usuario"}</p>
          <p style={sidebarStyles.userStatus}>⭐ Cliente Premium</p>
        </div>
      </div>

      {/* Progreso de la cita actual */}
      <div style={sidebarStyles.progressSection}>
        <h4 style={sidebarStyles.sectionTitle}>Tu Cita Actual</h4>
        <div style={sidebarStyles.stepsContainer}>
          {steps.map(step => (
            <div
              key={step.number}
              style={{
                ...sidebarStyles.stepItem,
                backgroundColor: currentStep === step.number ? "#ff6b95" : "transparent",
                color: currentStep === step.number ? "white" : "#666"
              }}
              onClick={() => onStepClick(step.number)}
            >
              <div style={sidebarStyles.stepNumber}>{step.number}</div>
              <span style={sidebarStyles.stepText}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menú de navegación */}
      <div style={sidebarStyles.menuSection}>
        <h4 style={sidebarStyles.sectionTitle}>Mi Cuenta</h4>
        <nav style={sidebarStyles.menu}>
          {menuItems.map(item => (
            <button
              key={item.id}
              style={sidebarStyles.menuItem}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <span style={sidebarStyles.menuIcon}>{item.icon}</span>
              <span style={sidebarStyles.menuLabel}>{item.label}</span>
              {item.id === "notifications" && (
                <span style={sidebarStyles.notificationBadge}>3</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Información de contacto rápido */}
      <div style={sidebarStyles.contactSection}>
        <h4 style={sidebarStyles.sectionTitle}>Contacto Rápido</h4>
        <div style={sidebarStyles.contactInfo}>
          <div style={sidebarStyles.contactItem}>
            <span style={sidebarStyles.contactIcon}>📞</span>
            <span style={sidebarStyles.contactText}>+34 123 456 789</span>
          </div>
          <div style={sidebarStyles.contactItem}>
            <span style={sidebarStyles.contactIcon}>✉️</span>
            <span style={sidebarStyles.contactText}>soporte@apolo.com</span>
          </div>
          <div style={sidebarStyles.contactItem}>
            <span style={sidebarStyles.contactIcon}>🕒</span>
            <span style={sidebarStyles.contactText}>Lun-Vie: 9:00-20:00</span>
          </div>
        </div>
      </div>

      {/* Footer del sidebar */}
      <div style={sidebarStyles.footer}>
        <p style={sidebarStyles.footerText}>Apolo Barber & Spa</p>
        <p style={sidebarStyles.footerSubtext}>Juventud, Fuerza y Estilo</p>
      </div>
    </div>
  );
}

// Estilos del sidebar
const sidebarStyles = {
  container: {
    width: "300px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    overflowY: "auto"
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#ff6b95",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginRight: "15px"
  },
  userInfo: {
    flex: 1
  },
  welcome: {
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 4px 0",
    color: "#ecf0f1"
  },
  userName: {
    fontSize: "14px",
    margin: "0 0 4px 0",
    color: "#bdc3c7",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  userStatus: {
    fontSize: "12px",
    margin: 0,
    color: "#f39c12",
    fontWeight: "500"
  },
  progressSection: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ecf0f1",
    margin: "0 0 15px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: 0.8
  },
  stepNumber: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    marginRight: "10px"
  },
  stepText: {
    fontSize: "13px",
    fontWeight: "500"
  },
  menuSection: {
    flex: 1,
    marginBottom: "30px"
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
    opacity: 0.8,
    position: "relative",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      opacity: 1
    }
  },
  menuIcon: {
    fontSize: "18px",
    marginRight: "12px",
    width: "20px",
    textAlign: "center"
  },
  menuLabel: {
    fontSize: "14px",
    fontWeight: "500",
    flex: 1
  },
  notificationBadge: {
    backgroundColor: "#e74c3c",
    color: "white",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center"
  },
  contactSection: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0"
  },
  contactIcon: {
    fontSize: "14px",
    marginRight: "10px",
    width: "20px",
    textAlign: "center",
    opacity: 0.7
  },
  contactText: {
    fontSize: "13px",
    color: "#bdc3c7",
    fontWeight: "400"
  },
  footer: {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },
  footerText: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 5px 0",
    color: "#ecf0f1"
  },
  footerSubtext: {
    fontSize: "12px",
    margin: 0,
    color: "#7f8c8d",
    fontStyle: "italic"
  }
};

export default AppointmentSidebar;