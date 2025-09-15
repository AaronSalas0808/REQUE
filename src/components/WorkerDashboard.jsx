import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase";
import {
  ref,
  onValue,
  update,
  remove,
  serverTimestamp,
} from "firebase/database";

/**
 * WorkerDashboard conectado a Firebase Realtime Database.
 *
 * Props:
 *  - user: objeto auth (obligatorio)
 *  - onLogout: callback para cuando el worker cierra sesión
 *  - employeeId: (opcional) id interno del empleado (por ejemplo 5)
 *
 * Nota: se compara por employee.name (normalizado).
 */

function WorkerDashboard({ user, onLogout, employeeId = null }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  });

  const filters = ["Todas", "Pendientes", "Completadas", "Canceladas"];

  // ---------- Obtener el "nombre" del usuario desde /users/{uid} ----------
  useEffect(() => {
    if (!user?.uid || !database) {
      setProfileName("");
      return;
    }

    const userRef = ref(database, `users/${user.uid}`);
    const unsub = onValue(
      userRef,
      (snap) => {
        const data = snap.val() || {};
        // Prioridad: campo 'nombre' en la BD, luego displayName, luego email prefix
        const nombre =
          data?.nombre ||
          data?.name ||
          user?.displayName ||
          (user?.email ? user.email.split("@")[0] : "");
        setProfileName(nombre || "");
      },
      (err) => {
        console.error("Error leyendo perfil de usuario:", err);
      }
    );

    return () => {
      try {
        unsub();
      } catch (e) {
        // no-op
      }
    };
  }, [user?.uid]);

  // Normalizador de nombres: quita acentos, puntos y espacios extra, pasa a minúsculas
  const normalizeName = (s) => {
    if (!s) return "";
    return String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quitar acentos
      .replace(/\./g, "") // quitar puntos
      .replace(/[^\w\s]/g, "") // quitar otros signos
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  // ---------- Suscripción a /appointments y filtrado por nombre ----------
  useEffect(() => {
    if (!database) return;

    const appointmentsRef = ref(database, "appointments");

    const unsub = onValue(
      appointmentsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        let arr = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val,
        }));

        // Si tenemos profileName, filtramos por employee.name comparando nombres
        if (profileName) {
          const target = normalizeName(profileName);
          arr = arr.filter((a) => {
            const empName =
              (a.employee && (a.employee.name || a.employee.nombre)) ||
              // por si se guardó directamente como string
              (typeof a.employee === "string" ? a.employee : null);
            if (!empName) return false;
            return normalizeName(empName) === target;
          });
        } else if (
          employeeId !== null &&
          employeeId !== undefined &&
          employeeId !== ""
        ) {
          // Fallback si pasas employeeId
          const possibleNum = Number(employeeId);
          arr = arr.filter((a) => {
            const empId = a.employee && a.employee.id;
            if (empId === undefined || empId === null) return false;
            return (
              String(empId) === String(employeeId) ||
              (Number.isFinite(possibleNum) && Number(empId) === possibleNum)
            );
          });
        } else if (user?.uid) {
          // último fallback: matching por employee.uid cuando exista
          arr = arr.filter((a) => a.employee && a.employee.uid === user.uid);
        }

        // Orden simple: por fecha si existe, sino por id
        arr.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const db = b.date ? new Date(b.date).getTime() : 0;
          if (da && db) return da - db;
          return String(a.id).localeCompare(String(b.id));
        });

        setAppointments(arr);
      },
      (err) => {
        console.error("Error suscribiéndose a citas (worker):", err);
      }
    );

    return () => {
      try {
        unsub();
      } catch (e) {
        // no-op
      }
    };
  }, [database, profileName, employeeId, user?.uid]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Helpers de estado
  const isActiveStatus = (status) => {
    if (!status) return false;
    const s = String(status).toLowerCase();
    return (
      s === "pendiente" ||
      s === "pending" ||
      s === "confirmed" ||
      s === "booked"
    );
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const apptRef = ref(database, `appointments/${appointmentId}`);
      await update(apptRef, { status: newStatus, updatedAt: serverTimestamp() });
    } catch (err) {
      console.error("Error actualizando estado de cita:", err);
      alert("No se pudo actualizar la cita. Intenta nuevamente.");
    }
  };

  const removeAppointment = async (appointmentId) => {
    if (!window.confirm("¿Eliminar esta cita permanentemente?")) return;
    try {
      const apptRef = ref(database, `appointments/${appointmentId}`);
      await remove(apptRef);
    } catch (err) {
      console.error("Error eliminando cita:", err);
      alert("No se pudo eliminar la cita.");
    }
  };

  // Filtrados para la UI
  const filteredAppointments = appointments.filter((apt) => {
    if (selectedFilter === "Todas") return true;
    if (selectedFilter === "Pendientes") return isActiveStatus(apt.status);
    if (selectedFilter === "Completadas")
      return (
        String(apt.status).toLowerCase() === "completada" ||
        String(apt.status).toLowerCase() === "completed" ||
        String(apt.status).toLowerCase() === "attended"
      );
    if (selectedFilter === "Canceladas")
      return (
        String(apt.status).toLowerCase() === "cancelled" ||
        String(apt.status).toLowerCase() === "cancelled"
      );
    return true;
  });

  // UI handlers
  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
      if (newStatus === "attended" || newStatus === "cancelled") {
        setShowDetailsModal(false);
      }
    }
  };

  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => setShowDetailsModal(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout && onLogout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Stats (ejemplo)
  const stats = {
    completedThisWeek: `+${appointments.filter(
      (a) =>
        String(a.status).toLowerCase() === "completada" ||
        String(a.status).toLowerCase() === "completed" ||
        String(a.status).toLowerCase() === "attended"
    ).length}`,
    averageRating: "4.8",
    reviewsCount: "Basado en 56 reseñas",
    mostRequested: "34% de tus citas",
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Agenda</h1>
          <div style={styles.headerRight}>
            <div style={{ textAlign: "right" }}>
              <div style={styles.userWelcome}>
                {/* Mostrar el nombre del perfil tal como está en la BD */}
                Hola, {profileName || user?.displayName || user?.email?.split("@")[0]}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                {currentDateTime.date} · {currentDateTime.time}
              </div>
            </div>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        <div style={styles.filtersSection}>
          <h2 style={styles.sectionTitle}>Mis Citas</h2>
          <div style={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter}
                style={{
                  ...styles.filterButton,
                  ...(selectedFilter === filter ? styles.activeFilter : {}),
                }}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.filterIndicator}>
          Mostrando: <strong>{selectedFilter}</strong>
          {filteredAppointments.length > 0
            ? ` (${filteredAppointments.length} citas)`
            : " (0 citas)"}
        </div>

        <div style={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.clientName}>
                    {appointment.client ||
                      appointment.userEmail ||
                      (appointment.customer && appointment.customer.name) ||
                      "Cliente"}
                  </h3>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(isActiveStatus(appointment.status)
                        ? styles.statusPending
                        : {}),
                      ...(String(appointment.status).toLowerCase() ===
                      "attended"
                        ? styles.statusCompleted
                        : {}),
                      ...(String(appointment.status).toLowerCase() ===
                      "cancelled"
                        ? styles.statusCanceled
                        : {}),
                    }}
                  >
                    {appointment.status || "Pendiente"}
                  </span>
                </div>

                <div style={styles.serviceInfo}>
                  <p style={styles.serviceText}>
                    <strong style={styles.serviceName}>
                      {appointment.service?.name ||
                        appointment.service ||
                        "Servicio"}
                    </strong>{" "}
                    • {appointment.duration || appointment.service?.duration || ""}
                  </p>
                  <p style={styles.dateText}>
                    {appointment.date
                      ? new Date(appointment.date).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : appointment.time || ""}
                  </p>
                  <p style={styles.detailText}>
                    {appointment.fullService ||
                      (appointment.service && appointment.service.name) ||
                      ""}
                  </p>
                </div>

                <div style={styles.cardActions}>
                  <button
                    style={styles.detailsButton}
                    onClick={() => handleShowDetails(appointment)}
                  >
                    Ver Detalles
                  </button>

                  {isActiveStatus(appointment.status) && (
                    <div style={styles.statusActions}>
                      <button
                        style={styles.completeButton}
                        onClick={() =>
                          handleStatusChange(appointment.id, "attended")
                        }
                      >
                        Completar
                      </button>
                      <button
                        style={styles.cancelButton}
                        onClick={() =>
                          handleStatusChange(appointment.id, "cancelled")
                        }
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
              <p>
                No hay citas{" "}
                {selectedFilter !== "Todas" ? selectedFilter.toLowerCase() : ""}
              </p>
            </div>
          )}
        </div>

        <div style={styles.statsSection}>
          <div style={styles.statsCard}>
            <h3 style={styles.statsTitle}>Resumen</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Citas completadas</span>
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

        <div style={styles.footerSection}>
          <div style={styles.contactInfo}>
            <p style={styles.contactText}>
              <strong>Soporte:</strong> soporte@apolo.com
            </p>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedAppointment && (
        <div style={styles.modalOverlay} onClick={handleCloseDetails}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Detalles de la Cita</h2>
              <button style={styles.closeButton} onClick={handleCloseDetails}>
                ×
              </button>
            </div>

            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Cliente</h3>
              <p style={styles.detailText}>
                {selectedAppointment.client || selectedAppointment.userEmail}
                {selectedAppointment.phone ? ` · ${selectedAppointment.phone}` : ""}
              </p>
            </div>

            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Servicio</h3>
              <p style={styles.detailText}>
                {selectedAppointment.fullService ||
                  (selectedAppointment.service &&
                    (selectedAppointment.service.name ||
                      selectedAppointment.service))}
                {selectedAppointment.duration
                  ? ` · ${selectedAppointment.duration}`
                  : ""}
              </p>
            </div>

            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Fecha y hora</h3>
              <p style={styles.detailText}>
                {selectedAppointment.date
                  ? new Date(selectedAppointment.date).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : selectedAppointment.time || ""}
              </p>
            </div>

            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Estado</h3>
              <span
                style={{
                  ...styles.modalStatusBadge,
                  ...(isActiveStatus(selectedAppointment.status)
                    ? styles.statusPending
                    : {}),
                  ...(String(selectedAppointment.status).toLowerCase() ===
                  "attended"
                    ? styles.statusCompleted
                    : {}),
                  ...(String(selectedAppointment.status).toLowerCase() ===
                  "cancelled"
                    ? styles.statusCanceled
                    : {}),
                }}
              >
                {selectedAppointment.status}
              </span>
            </div>

            <div style={styles.separator}></div>

            <div style={styles.detailSection}>
              <h3 style={styles.detailSectionTitle}>Notas adicionales</h3>
              <p style={styles.detailText}>
                {selectedAppointment.notes || "-"}
              </p>
            </div>

            <div style={styles.separator}></div>

            <div style={styles.modalActions}>
              <button style={styles.contactButton}>Contactar al Cliente</button>

              {isActiveStatus(selectedAppointment.status) && (
                <>
                  <button
                    style={styles.cancelAppointmentButton}
                    onClick={() =>
                      handleStatusChange(selectedAppointment.id, "cancelled")
                    }
                  >
                    Cancelar Cita
                  </button>
                  <button
                    style={styles.completeAppointmentButton}
                    onClick={() =>
                      handleStatusChange(selectedAppointment.id, "attended")
                    }
                  >
                    Marcar como Completada
                  </button>
                </>
              )}

              <button
                style={{ ...styles.cancelAppointmentButton, backgroundColor: "#9ca3af" }}
                onClick={() => removeAppointment(selectedAppointment.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// (Los estilos permanecen igual a los que ya estabas usando; se pueden dejar tal cual)
const styles = {
  container: {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "0",
    position: "relative",
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
  title: { margin: 0, fontSize: "24px", fontWeight: "600", color: "#1e293b" },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  userWelcome: { fontSize: "14px", color: "#64748b" },
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
  content: { maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" },
  filtersSection: { marginBottom: "24px" },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 16px 0",
  },
  filters: { display: "flex", gap: "12px", flexWrap: "wrap" },
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
  activeFilter: { backgroundColor: "#3b82f6", color: "white", borderColor: "#3b82f6" },
  filterIndicator: {
    padding: "12px 16px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#64748b",
  },
  appointmentsList: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
  clientName: { margin: 0, fontSize: "18px", fontWeight: "600", color: "#1e293b" },
  statusBadge: { padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  statusPending: { backgroundColor: "#fffbeb", color: "#f59e0b" },
  statusCompleted: { backgroundColor: "#ecfdf5", color: "#10b981" },
  statusCanceled: { backgroundColor: "#fef2f2", color: "#ef4444" },
  serviceInfo: { marginBottom: "20px" },
  serviceText: { margin: "0 0 8px 0", fontSize: "16px", color: "#1e293b" },
  serviceName: { color: "#1e293b" },
  dateText: { margin: "0 0 8px 0", fontSize: "14px", color: "#64748b" },
  detailText: { margin: 0, fontSize: "14px", color: "#64748b" },
  cardActions: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
  detailsButton: { padding: "10px 16px", backgroundColor: "transparent", border: "1px solid #e2e8f0", color: "#64748b", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  statusActions: { display: "flex", gap: "8px" },
  completeButton: { padding: "10px 16px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  cancelButton: { padding: "10px 16px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  statsSection: { marginBottom: "40px" },
  statsCard: { backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  statsTitle: { fontSize: "18px", fontWeight: "600", color: "#1e293b", margin: "0 0 20px 0", textAlign: "center" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" },
  statItem: { textAlign: "center", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px" },
  statLabel: { display: "block", fontSize: "13px", color: "#64748b", marginBottom: "8px", fontWeight: "500" },
  statValue: { display: "block", fontSize: "16px", fontWeight: "600", color: "#1e293b" },
  footerSection: { borderTop: "1px solid #e2e8f0", paddingTop: "24px" },
  contactInfo: { textAlign: "center" },
  contactText: { margin: "0 0 8px 0", fontSize: "13px", color: "#64748b" },
  noResults: { textAlign: "center", padding: "40px 20px", backgroundColor: "#ffffff", borderRadius: "12px", color: "#64748b", fontSize: "16px", border: "1px solid #e2e8f0" },

  // Modal styles
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
  modalContent: { backgroundColor: "white", borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #e2e8f0" },
  modalTitle: { margin: 0, fontSize: "20px", fontWeight: "600", color: "#1e293b" },
  closeButton: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b", padding: "0", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" },
  detailSection: { padding: "16px 24px" },
  detailSectionTitle: { margin: "0 0 8px 0", fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" },
  modalStatusBadge: { padding: "6px 12px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", display: "inline-block" },
  separator: { height: "1px", backgroundColor: "#e2e8f0", margin: "8px 0" },
  modalActions: { padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "12px" },
  contactButton: { padding: "12px 16px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", width: "100%" },
  cancelAppointmentButton: { padding: "12px 16px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", width: "100%" },
  completeAppointmentButton: { padding: "12px 16px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", width: "100%" },
};

export default WorkerDashboard;