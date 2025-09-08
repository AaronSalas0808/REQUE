import React from "react";

function AppointmentHeader({ user, onBackToHome, onLogout, currentStep, onNewAppointment }) {
  const steps = [
    { number: 1, title: "Establecimiento" },
    { number: 2, title: "Servicio" },
    { number: 3, title: "Imagen y notas" },
    { number: 4, title: "Fecha y hora" },
    { number: 5, title: "Resumen" },
    { number: 6, title: "Confirmación" }
  ];

  return (
    <div style={headerStyles.container}>
      {/* Logo y navegación */}
      <div style={headerStyles.leftSection}>
        <button style={headerStyles.backButton} onClick={onBackToHome}>
          ← Volver al Inicio
        </button>
      </div>

      {/* Progreso de la cita (solo visible en desktop) */}
      <div style={headerStyles.centerSection}>
        <div style={headerStyles.progressContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div
                style={{
                  ...headerStyles.progressStep,
                  backgroundColor: currentStep >= step.number ? "#ff6b95" : "#e0e0e0",
                  color: currentStep >= step.number ? "white" : "#666"
                }}
                title={step.title}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    ...headerStyles.progressLine,
                    backgroundColor: currentStep > step.number ? "#ff6b95" : "#e0e0e0"
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={headerStyles.currentStep}>
          Paso {currentStep} de {steps.length}: {steps[currentStep - 1]?.title}
        </div>
      </div>

      {/* Acciones de usuario */}
      <div style={headerStyles.rightSection}>
        <button style={headerStyles.helpButton} title="Ayuda">
          ❓
        </button>
        
        <div style={headerStyles.userMenu}>
          <div style={headerStyles.userInfo}>
            <span style={headerStyles.userName}>
              {user?.email?.split('@')[0] || 'Usuario'}
            </span>
            <span style={headerStyles.userStatus}>Conectado</span>
          </div>
          <div style={headerStyles.userAvatar}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          {/* Menú desplegable */}
          <div style={headerStyles.dropdownMenu}>
            <button style={headerStyles.dropdownItem}>
              👤 Mi Perfil
            </button>
            <button style={headerStyles.dropdownItem}>
              📅 Mis Citas
            </button>
            <button style={headerStyles.dropdownItem}>
              ⚙️ Configuración
            </button>
            <div style={headerStyles.dropdownDivider}></div>
            <button 
              style={headerStyles.dropdownItem}
              onClick={onLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        <button 
          style={headerStyles.newAppointmentButton}
          onClick={onNewAppointment}
        >
          + Nueva Cita
        </button>
      </div>
    </div>
  );
}

// Estilos del header
const headerStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: "70px"
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1
  },
  backButton: {
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#ff6b95"
    }
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logoIcon: {
    fontSize: "24px"
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50"
  },
  centerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    flex: 2
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  progressStep: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  progressLine: {
    width: "40px",
    height: "2px",
    transition: "all 0.3s ease"
  },
  currentStep: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500"
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: 1,
    justifyContent: "flex-end"
  },
  helpButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    backgroundColor: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#ff6b95"
    }
  },
  userMenu: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa"
    }
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2c3e50"
  },
  userStatus: {
    fontSize: "12px",
    color: "#27ae60",
    fontWeight: "500"
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#ff6b95",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "14px"
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    minWidth: "160px",
    display: "none",
    zIndex: 1000
  },
  dropdownItem: {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa"
    }
  },
  dropdownDivider: {
    height: "1px",
    backgroundColor: "#e0e0e0",
    margin: "8px 0"
  },
  newAppointmentButton: {
    backgroundColor: "#ff6b95",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#ff5a8c",
      transform: "translateY(-1px)"
    }
  }
};

// Añadir efecto hover para mostrar el dropdown
headerStyles.userMenu[':hover'] = {
  backgroundColor: "#f8f9fa"
};
headerStyles.userMenu[':hover'] = {
  ...headerStyles.userMenu[':hover'],
  [headerStyles.dropdownMenu]: {
    display: 'block'
  }
};

export default AppointmentHeader;