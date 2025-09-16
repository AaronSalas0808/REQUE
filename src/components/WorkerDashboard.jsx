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
 * - user: objeto auth (obligatorio)
 * - onLogout: callback para cuando el worker cierra sesión
 * - employeeId: (opcional) id interno del empleado (por ejemplo 5)
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
  }, [user?.uid, user?.displayName, user?.email]);

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
          employeeId !== undefined && employeeId !== ""
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
  }, [profileName, employeeId, user?.uid]);

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
        String(apt.status).toLowerCase() === "cancelada"
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

  const getStatusBadgeStyle = (status) => {
    const s = String(status).toLowerCase();
    let color = "#64748b"; // gris por defecto
    if (s === "confirmed" || s === "pendiente" || s === "pending") {
      color = "#3b82f6"; // azul
    } else if (s === "completed" || s === "completada" || s === "attended") {
      color = "#22c55e"; // verde
    } else if (s === "cancelled" || s === "cancelada") {
      color = "#ef4444"; // rojo
    }
    return {
      backgroundColor: color,
      color: "white",
      padding: "4px 8px",
      borderRadius: "10px",
      fontSize: "12px",
      fontWeight: "600",
      textTransform: "capitalize",
    };
  };

  const renderDetailsModal = () => {
    if (!selectedAppointment) return null;

    const {
      userEmail,
      service,
      date,
      time,
      notes,
      status,
      imageUrl,
    } = selectedAppointment;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Fecha no especificada";

    return (
      <div style={styles.modalBackdrop} onClick={handleCloseDetails}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Detalles de la Cita</h2>
            <button style={styles.closeButton} onClick={handleCloseDetails}>
              &times;
            </button>
          </div>
          <div style={styles.modalBody}>
            <div style={styles.modalGrid}>
              {/* Sección de detalles a la izquierda */}
              <div style={styles.detailsLeft}>
                <div style={styles.detailSection}>
                  <h3 style={styles.detailTitle}>Cliente y Servicio</h3>
                  <p style={styles.detailItem}>
                    <span style={styles.detailLabel}>Cliente:</span> {userEmail}
                  </p>
                  <p style={styles.detailItem}>
                    <span style={styles.detailLabel}>Servicio:</span>{" "}
                    {service?.name || "No especificado"}
                  </p>
                </div>

                <div style={styles.detailSection}>
                  <h3 style={styles.detailTitle}>Horario</h3>
                  <p style={styles.detailItem}>
                    <span style={styles.detailLabel}>Fecha:</span> {formattedDate}
                  </p>
                  <p style={styles.detailItem}>
                    <span style={styles.detailLabel}>Hora:</span> {time}
                  </p>
                </div>

                {notes && (
                  <div style={styles.detailSection}>
                    <h3 style={styles.detailTitle}>Notas</h3>
                    <p style={styles.detailItem}>{notes}</p>
                  </div>
                )}
              </div>

              {/* Sección de imagen a la derecha */}
              <div style={styles.imageRight}>
                <h3 style={styles.detailTitle}>Imagen de Referencia</h3>
                <div style={styles.imageContainer}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Imagen de referencia"
                      style={styles.appointmentImage}
                    />
                  ) : (
                    <p style={styles.noImageText}>No hay imagen</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.modalActions}>
            <span style={getStatusBadgeStyle(status)}>{status}</span>
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.actionButton, backgroundColor: "#22c55e" }}
                onClick={() => handleStatusChange(selectedAppointment.id, "completada")}
              >
                Completada
              </button>
              <button
                style={{ ...styles.actionButton, backgroundColor: "#ef4444" }}
                onClick={() => handleStatusChange(selectedAppointment.id, "cancelada")}
              >
                Cancelada
              </button>
              <button
                style={{ ...styles.actionButton, backgroundColor: "#64748b" }}
                onClick={() => removeAppointment(selectedAppointment.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {showDetailsModal && renderDetailsModal()}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Agenda</h1>
          <div style={styles.headerRight}>
            <div style={{ textAlign: "right" }}>
              <div style={styles.userWelcome}>
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
          Mostrando: <strong>{selectedFilter}</strong>{" "}
          {filteredAppointments.length > 0
            ? ` (${filteredAppointments.length} citas)`
            : " (0 citas)"}
        </div>
        <div style={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  ...styles.appointmentCard,
                  ...(isActiveStatus(appointment.status)
                    ? styles.activeAppointment
                    : {}),
                }}
                onClick={() => handleShowDetails(appointment)}
              >
                <div style={styles.appointmentHeader}>
                  <div style={styles.appointmentTime}>
                    {appointment.time}
                  </div>
                  <div style={styles.appointmentStatus}>
                    {getStatusBadgeStyle(appointment.status) ? (
                      <span style={getStatusBadgeStyle(appointment.status)}>
                        {appointment.status}
                      </span>
                    ) : (
                      "Estatus no disponible"
                    )}
                  </div>
                </div>
                <div style={styles.appointmentBody}>
                  <div style={styles.appointmentUser}>{appointment.userEmail}</div>
                  <div style={styles.appointmentService}>
                    {appointment.service?.name}
                  </div>
                  <div style={styles.appointmentNotes}>{appointment.notes || "Sin notas"}</div>
                </div>
                <div style={styles.appointmentActions}>
                  <button
                    style={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDetails(appointment);
                    }}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noAppointments}>
              No hay citas para el filtro seleccionado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f4f7f9",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    padding: "20px",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1e293b",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  userWelcome: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#34495e",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  content: {
    flexGrow: 1,
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  filtersSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#34495e",
    margin: 0,
  },
  filters: {
    display: "flex",
    gap: "8px",
  },
  filterButton: {
    padding: "8px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    backgroundColor: "white",
    color: "#4a5568",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "500",
  },
  activeFilter: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6",
  },
  filterIndicator: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "16px",
    paddingLeft: "10px",
  },
  appointmentsList: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    padding: "20px",
    borderLeft: "4px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.3s",
    ":hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    },
  },
  activeAppointment: {
    borderLeftColor: "#3b82f6",
  },
  appointmentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  appointmentTime: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  appointmentStatus: {
    // estilos definidos por getStatusBadgeStyle
  },
  appointmentBody: {
    marginBottom: "12px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "12px",
  },
  appointmentUser: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#34495e",
    marginBottom: "4px",
  },
  appointmentService: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
  },
  appointmentNotes: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "8px",
    whiteSpace: "pre-wrap",
  },
  appointmentActions: {
    display: "flex",
    gap: "10px",
  },
  detailsButton: {
    padding: "8px 12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  noAppointments: {
    textAlign: "center",
    color: "#64748b",
    padding: "40px",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "800px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  modalTitle: { margin: 0, fontSize: "20px", fontWeight: "600", color: "#1e293b" },
  closeButton: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b", padding: "0", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" },
  modalBody: {
    padding: "24px",
    overflowY: "auto",
    maxHeight: "70vh",
  },
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  detailsLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  imageRight: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  imageContainer: {
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    padding: "12px",
    border: "1px solid #e2e8f0",
  },
  detailSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "10px",
  },
  detailTitle: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#34495e",
  },
  detailItem: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    color: "#4a5568",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#1e293b",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#fff",
    borderTop: "1px solid #e2e8f0",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  actionButton: {
    padding: "10px 16px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  },
  appointmentImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    display: "block",
  },
  noImageText: {
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default WorkerDashboard;