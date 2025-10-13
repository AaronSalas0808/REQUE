import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import VotersListModal from "./VotersListModal"; // 👈 Importa el nuevo modal

// (El componente CandidateDetailModal se queda igual que antes)
function CandidateDetailModal({ candidate, onClose, onUpdateStatus }) {
  if (!candidate) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          {/* 👇 MOSTRAMOS LA FOTO DEL PARTIDO AQUÍ 👇 */}
          <img src={`http://localhost:3001${candidate.partyLogo}`} alt={`Logo de ${candidate.party}`} className="party-logo-modal" />
          <h2>Detalles de Candidatura</h2>
        </div>
        {/* ... (el resto del modal no cambia) ... */}
        <div className="detail-grid">
          <p><strong>Nombre:</strong> {candidate.name}</p>
          <p><strong>Cédula:</strong> {candidate.id}</p>
          <p><strong>Partido:</strong> {candidate.party}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
        </div>
        <div className="detail-section">
          <h3>Biografía</h3><p>{candidate.biography}</p>
        </div>
        <div className="detail-section">
          <h3>Propuesta de Campaña</h3><p>{candidate.proposal}</p>
        </div>
        <div className="modal-actions">
          <button className="approve-btn" onClick={() => onUpdateStatus(candidate.id, "approved")}>Aprobar</button>
          <button className="reject-btn" onClick={() => onUpdateStatus(candidate.id, "rejected")}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVotersModalOpen, setIsVotersModalOpen] = useState(false); // 👈 Nuevo estado para el modal

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/api/admin/dashboard");
    setData(await response.json());
  };

  // 👇 EFECTO PARA POLLING EN TIEMPO REAL 👇
  useEffect(() => {
    fetchData(); // Carga inicial
    const interval = setInterval(() => {
      fetchData();
    }, 3000); // Pide los datos cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al salir
  }, []);

  const handleUpdateStatus = async (candidateId, newStatus) => {
    // ... (esta función no cambia)
    await fetch("http://localhost:3001/api/admin/update-candidate-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, newStatus }),
    });
    setSelectedCandidate(null);
    fetchData();
  };
  
  const toggleElection = async () => {
    // ... (esta función no cambia)
    await fetch("http://localhost:3001/api/admin/toggle-election", { method: "POST" });
    fetchData();
  };
  
  if (!data) return <p>Cargando panel de administración...</p>;

  // Pre-calculamos los datos para las vistas
  const totalVotes = Object.values(data.votes).reduce((a, b) => a + b, 0);
  const participatingVoters = data.users.filter(u => u.role === 'voter' && u.hasVoted);

  return (
    <div className="admin-dashboard">
      <CandidateDetailModal 
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateStatus={handleUpdateStatus}
      />
      <VotersListModal
        isOpen={isVotersModalOpen}
        onClose={() => setIsVotersModalOpen(false)}
        voters={participatingVoters}
      />
      
      {/* --- SECCIÓN DE ESTADO Y RESULTADOS --- */}
      <div className="dashboard-grid">
        <section className="admin-section">
          <h3>Estado de la Elección</h3>
          <p>Actualmente: <strong className={data.electionStatus === "active" ? "status-active" : ""}>
            {data.electionStatus === "active" ? "ACTIVA" : "INACTIVA"}
          </strong></p>
          <button onClick={toggleElection}>
            {data.electionStatus === "active" ? "Finalizar Elección" : "Iniciar Elección"}
          </button>
        </section>

        <section className="admin-section">
          <h3>Resultados en Tiempo Real</h3>
          <div className="live-results-header">
            <span>Total de Votos: <strong>{totalVotes}</strong></span>
            <button className="secondary-action-btn" onClick={() => setIsVotersModalOpen(true)}>
              Ver Votantes ({participatingVoters.length})
            </button>
          </div>
          <ul className="results-list">
            {data.candidates.filter(c => c.status === 'approved').map(c => {
              const votes = data.votes[c.id] || 0;
              const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
              return (
                <li key={c.id}>
                  <div className="result-info">
                    <span>{c.name}</span>
                    <span>{votes} votos</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* --- SECCIÓN DE GESTIÓN DE CANDIDATOS --- */}
      <section className="admin-section">
        <h3>Gestión y Aprobación de Candidatos</h3>
        {/* ... (la tabla de candidatos no cambia) ... */}
        <table className="candidates-table">
          <thead><tr><th>Nombre</th><th>Partido</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {data.candidates.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.party}</td>
                <td><span className={`status status-${c.status}`}>{c.status}</span></td>
                <td><button className="details-btn" onClick={() => setSelectedCandidate(c)}>Ver Detalles</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;