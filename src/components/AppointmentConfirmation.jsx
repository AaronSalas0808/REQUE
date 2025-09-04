import React, { useState } from "react";
import AppointmentScheduler from "./AppointmentScheduler";
import AppointmentConfirmation from "./AppointmentConfirmation";

function Appointments({ user, onBackToHome }) {
  const [view, setView] = useState("list"); // 'list', 'scheduler', 'confirmation'
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const handleNewAppointment = () => {
    setView("scheduler");
  };

  const handleConfirmAppointment = (appointment) => {
    const newAppointment = {
      id: Date.now(),
      ...appointment,
      status: "confirmed"
    };
    setAppointments([...appointments, newAppointment]);
    setCurrentAppointment(newAppointment);
    setView("confirmation");
  };

  const handleBackToAppointments = () => {
    setView("list");
  };

  const handleNewAppointmentAfterConfirm = () => {
    setView("scheduler");
    setCurrentAppointment(null);
  };

  if (view === "scheduler") {
    return (
      <AppointmentScheduler
        user={user}
        onBack={handleBackToAppointments}
        onConfirm={handleConfirmAppointment}
      />
    );
  }

  if (view === "confirmation" && currentAppointment) {
    return (
      <AppointmentConfirmation
        appointment={currentAppointment}
        onBackToAppointments={handleBackToAppointments}
        onNewAppointment={handleNewAppointmentAfterConfirm}
      />
    );
  }

  // Vista por defecto: lista de citas
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Mis Citas</h2>
        <p style={subtitleStyle}>Gestiona y agenda tus próximas citas</p>
      </div>

      {appointments.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>📅</div>
          <h3 style={emptyTitleStyle}>No tienes citas programadas</h3>
          <p style={emptyTextStyle}>Agenda tu primera cita para comenzar</p>
          <button style={primaryButtonStyle} onClick={handleNewAppointment}>
            Agendar nueva cita
          </button>
        </div>
      ) : (
        <>
          <div style={appointmentsHeaderStyle}>
            <h3 style={sectionTitleStyle}>Próximas citas</h3>
            <button style={primaryButtonStyle} onClick={handleNewAppointment}>
              + Nueva cita
            </button>
          </div>

          <div style={appointmentsListStyle}>
            {appointments.map(appointment => (
              <div key={appointment.id} style={appointmentCardStyle}>
                <div style={appointmentHeaderStyle}>
                  <h4 style={appointmentTitleStyle}>{appointment.service.name}</h4>
                  <span style={statusStyle[appointment.status] || statusStyle.default}>
                    {appointment.status}
                  </span>
                </div>
                <div style={appointmentDetailsStyle}>
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Establecimiento:</span>
                    <span style={detailValueStyle}>{appointment.center.name}</span>
                  </div>
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Fecha y hora:</span>
                    <span style={detailValueStyle}>{appointment.date} a las {appointment.time}</span>
                  </div>
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Duración:</span>
                    <span style={detailValueStyle}>{appointment.service.duration}</span>
                  </div>
                  <div style={detailRowStyle}>
                    <span style={detailLabelStyle}>Precio:</span>
                    <span style={detailValueStyle}>{appointment.service.price}</span>
                  </div>
                </div>
                {appointment.notes && (
                  <div style={notesStyle}>
                    <span style={notesLabelStyle}>Notas:</span>
                    <p style={notesTextStyle}>{appointment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div style={footerStyle}>
        <button style={secondaryButtonStyle} onClick={onBackToHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

// Estilos
const containerStyle = {
  padding: "40px 20px",
  background: "#f8f9fa",
  minHeight: "100vh",
  maxWidth: "1000px",
  margin: "0 auto"
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px"
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#2c3e50",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  color: "#7f8c8d",
  marginBottom: "40px",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "60px 20px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
};

const emptyIconStyle = {
  fontSize: "60px",
  marginBottom: "20px"
};

const emptyTitleStyle = {
  fontSize: "1.5rem",
  color: "#2c3e50",
  marginBottom: "10px"
};

const emptyTextStyle = {
  color: "#7f8c8d",
  marginBottom: "30px"
};

const appointmentsHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const sectionTitleStyle = {
  fontSize: "1.5rem",
  color: "#2c3e50",
  margin: 0
};

const appointmentsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "40px"
};

const appointmentCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const appointmentHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  paddingBottom: "15px",
  borderBottom: "1px solid #ecf0f1"
};

const appointmentTitleStyle = {
  fontSize: "1.2rem",
  color: "#2c3e50",
  margin: 0
};

const statusStyle = {
  confirmed: {
    background: "#d4edda",
    color: "#155724",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  default: {
    background: "#f8f9fa",
    color: "#6c757d",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  }
};

const appointmentDetailsStyle = {
  marginBottom: "15px"
};

const detailRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px"
};

const detailLabelStyle = {
  fontWeight: "600",
  color: "#2c3e50"
};

const detailValueStyle = {
  color: "#7f8c8d"
};

const notesStyle = {
  padding: "15px",
  background: "#f8f9fa",
  borderRadius: "6px"
};

const notesLabelStyle = {
  display: "block",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "8px"
};

const notesTextStyle = {
  margin: 0,
  color: "#7f8c8d",
  fontSize: "14px"
};

const footerStyle = {
  textAlign: "center"
};

const primaryButtonStyle = {
  background: "#3498db",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: "all 0.3s ease"
};

const secondaryButtonStyle = {
  background: "transparent",
  color: "#7f8c8d",
  border: "1px solid #bdc3c7",
  padding: "12px 25px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "16px",
  transition: "all 0.3s ease"
};

export default Appointments;