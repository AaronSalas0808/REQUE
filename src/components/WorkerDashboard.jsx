import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function WorkerDashboard({ user, onLogout }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: "Maria González",
      service: "Corte de cabello",
      duration: "45 min",
      date: "Hoy, 10:30",
      fullService: "Corte + Peinado",
      status: "Pendiente",
      phone: "11-5555-1234",
      notes: "Corte con degradado, no muy corto en los laterales."
    },
    {
      id: 2,
      client: "Lucas Pereira",
      service: "Afeitado",
      duration: "30 min",
      date: "Hoy, 12:00",
      fullService: "Afeitado clásico",
      status: "Completada",
      phone: "11-4444-5678",
      notes: "Preferencia por productos con aroma a menta."
    },
    {
      id: 3,
      client: "Sofia Martinez",
      service: "Coloración",
      duration: "90 min",
      date: "Hoy, 15:00",
      fullService: "Tinción completa",
      status: "Cancelada",
      phone: "11-3333-9012",
      notes: "Alergia a productos con amoníaco."
    },
    {
      id: 4,
      client: "Diego Ramírez",
      service: "Corte + Barba",
      duration: "60 min",
      date: "Mañana, 09:00",
      fullService: "Corte degradado",
      status: "Pendiente",
      phone: "11-2222-3456",
      notes: "Cita de seguimiento para mantenimiento."
    }
  ]);

  const stats = {
    completedThisWeek: "+3 vs. semana pasada",
    averageRating: "4.8",
    reviewsCount: "Basado en 56 reseñas",
    mostRequested: "34% de tus citas"
  };

  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filters = ["Todas", "Pendientes", "Completadas", "Canceladas"];

  // Función mejorada para filtrar las citas
  const filteredAppointments = appointments.filter(apt => {
    if (selectedFilter === "Todas") return true;
    if (selectedFilter === "Pendientes") return apt.status === "Pendiente";
    if (selectedFilter === "Completadas") return apt.status === "Completada";
    if (selectedFilter === "Canceladas") return apt.status === "Cancelada";
    return true;
  });

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? {...apt, status: newStatus} : apt)
    );
    
    // Si estamos viendo los detalles de esta cita, actualizamos el modal también
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({...selectedAppointment, status: newStatus});
    }
    
    // Si marcamos como completada o cancelada, cerramos el modal
    if (newStatus === "Completada" || newStatus === "Cancelada") {
      setShowDetailsModal(false);
    }
  };

  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Formatear fecha y hora actual
  const formatCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      time: now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
  };

  const [currentDateTime, setCurrentDateTime] = useState(formatCurrentDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatCurrentDateTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header minimalista */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Agenda</h1>
          <div style={styles.headerRight}>
            <span style={styles.userWelcome}>Hola, {user.email.split('@')[0]}</span>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        {/* Filtros en la parte superior */}
        <div style={styles.filtersSection}>
          <h2 style={styles.sectionTitle}>Mis Citas</h2>
          <div style={styles.filters}>
            {filters.map(filter => (
              <button
                key={filter}
                style={{
                  ...styles.filterButton,
                  ...(selectedFilter === filter ? styles.activeFilter : {})
                }}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Indicador del filtro activo */}
        <div style={styles.filterIndicator}>
          Mostrando: <strong>{selectedFilter}</strong> 
          {filteredAppointments.length > 0 ? 
            ` (${filteredAppointments.length} citas)` : 
            ' (0 citas)'}
        </div>

        {/* Lista de citas */}
        <div style={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.clientName}>{appointment.client}</h3>
                  <span style={{
                    ...styles.statusBadge,
                    ...(appointment.status === "Pendiente" ? styles.statusPending : {}),
                    ...(appointment.status === "Completada" ? styles.statusCompleted : {}),
                    ...(appointment.status === "Cancelada" ? styles.statusCanceled : {})
                  }}>
                    {appointment.status}
                  </span>
                </div>
                
                <div style={styles.serviceInfo}>
                  <p style={styles.serviceText}>
                    <strong style={styles.serviceName}>{appointment.service}</strong> • {appointment.duration}
                  </p>
                  <p style={styles.dateText}>{appointment.date}</p>
                  <p style={styles.detailText}>{appointment.fullService}</p>
                </div>
                
                <div style={styles.cardActions}>
                  <button 
                    style={styles.detailsButton}
                    onClick={() => handleShowDetails(appointment)}
                  >
                    Ver Detalles
                  </button>
                  
                  {appointment.status === "Pendiente" && (
                    <div style={styles.statusActions}>
                      <button 
                        style={styles.completeButton}
                        onClick={() => handleStatusChange(appointment.id, "Completada")}
                      >
                        Completar
                      </button>
                      <button 
                        style={styles.cancelButton}
                        onClick={() => handleStatusChange(appointment.id, "Cancelada")}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              <p>No hay citas {selectedFilter !== "Todas" ? selectedFilter.toLowerCase() : ""}</p>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div style={styles.statsSection}>
          <div style={styles.statsCard}>
            <h3 style={styles.statsTitle}>Resumen Semanal</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Citas completadas esta semana</span>
                <span style={styles.statValue}>{stats.completedThisWeek}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Calificación promedio</span>
                <span style={styles.statValue}>⭐ {stats.averageRating}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Reseñas</span>
                <span style={styles.statValue}>{stats.reviewsCount}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Servicio más solicitado</span>
                <span style={styles.statValue}>{stats.mostRequested}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div style={styles.footerSection}>
          <div style={styles.contactInfo}>
            <p style={styles.contactText}><strong>Soporte:</strong> soporte@apolo.com</p>
            <p style={styles.contactText}><strong>Centro de ayuda</strong></p>
            <p style={styles.contactText}><strong>Términos y condiciones</strong></p>
          </div>
        </div>
      </div>

      {/* Modal de detalles de cita */}
      {showDetailsModal && selectedAppointment && (
        <div style={styles.modalOverlay} onClick={handleCloseDetails}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Detalles de la Cita</h2>
              <button style={styles.closeButton} onClick={handleCloseDetails}>×</button>
            </div>
            
            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Cliente</h3>
              <p style={styles.detailText}>
                {selectedAppointment.client} · {selectedAppointment.phone}
              </p>
            </div>
            
            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Servicio</h3>
              <p style={styles.detailText}>
                {selectedAppointment.fullService} · {selectedAppointment.duration}
              </p>
            </div>
            
            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Fecha y hora</h3>
              <p style={styles.detailText}>{selectedAppointment.date}</p>
            </div>
            
            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Estado</h3>
              <span style={{
                ...styles.modalStatusBadge,
                ...(selectedAppointment.status === "Pendiente" ? styles.statusPending : {}),
                ...(selectedAppointment.status === "Completada" ? styles.statusCompleted : {}),
                ...(selectedAppointment.status === "Cancelada" ? styles.statusCanceled : {})
              }}>
                {selectedAppointment.status}
              </span>
            </div>
            
            <div style={styles.separator}></div>
            
            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Notas adicionales</h3>
              <p style={styles.detailText}>{selectedAppointment.notes}</p>
            </div>
            
            <div style={styles.separator}></div>
            
            <div style={styles.modalActions}>
              <button style={styles.contactButton}>
                Contactar al Cliente
              </button>
              
              {selectedAppointment.status === "Pendiente" && (
                <>
                  <button 
                    style={styles.cancelAppointmentButton}
                    onClick={() => handleStatusChange(selectedAppointment.id, "Cancelada")}
                  >
                    Cancelar Cita
                  </button>
                  <button 
                    style={styles.completeAppointmentButton}
                    onClick={() => handleStatusChange(selectedAppointment.id, "Completada")}
                  >
                    Marcar como Completada
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos actualizados con diseño más minimalista
const styles = {
  container: {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "0",
    position: 'relative'
  },
  header: {
    backgroundColor: "#ffffff",
    color: "#1e293b",
    padding: "16px 0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    borderBottom: "1px solid #e2e8f0",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
    color: "#1e293b",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userWelcome: {
    fontSize: "14px",
    color: "#64748b",
  },
  logoutButton: {
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  filtersSection: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 16px 0",
  },
  filters: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  filterButton: {
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#64748b",
    transition: "all 0.2s ease",
  },
  activeFilter: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6",
  },
  filterIndicator: {
    padding: "12px 16px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#64748b",
  },
  appointmentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "40px",
  },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    transition: "box-shadow 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "12px",
  },
  clientName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statusPending: {
    backgroundColor: "#fffbeb",
    color: "#f59e0b",
  },
  statusCompleted: {
    backgroundColor: "#ecfdf5",
    color: "#10b981",
  },
  statusCanceled: {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
  },
  serviceInfo: {
    marginBottom: "20px",
  },
  serviceText: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    color: "#1e293b",
  },
  serviceName: {
    color: "#1e293b",
  },
  dateText: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    color: "#64748b",
  },
  detailText: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  detailsButton: {
    padding: "10px 16px",
    backgroundColor: "transparent",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  statusActions: {
    display: "flex",
    gap: "8px",
  },
  completeButton: {
    padding: "10px 16px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  cancelButton: {
    padding: "10px 16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  statsSection: {
    marginBottom: "40px",
  },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  statsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 20px 0",
    textAlign: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  statItem: {
    textAlign: "center",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
  },
  statLabel: {
    display: "block",
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "8px",
    fontWeight: "500",
  },
  statValue: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
  },
  footerSection: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "24px",
  },
  contactInfo: {
    textAlign: "center",
  },
  contactText: {
    margin: "0 0 8px 0",
    fontSize: "13px",
    color: "#64748b",
  },
  noResults: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    color: "#64748b",
    fontSize: "16px",
    border: "1px solid #e2e8f0",
  },
  
  // Estilos para el modal de detalles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0'
  },
  modalTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#64748b',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease'
  },
  detailSection: {
    padding: '16px 24px'
  },
  detailSectionTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  modalStatusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    display: 'inline-block'
  },
  separator: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '8px 0'
  },
  modalActions: {
    padding: '16px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactButton: {
    padding: "12px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    width: '100%'
  },
  cancelAppointmentButton: {
    padding: "12px 16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    width: '100%'
  },
  completeAppointmentButton: {
    padding: "12px 16px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    width: '100%'
  }
};

export default WorkerDashboard;