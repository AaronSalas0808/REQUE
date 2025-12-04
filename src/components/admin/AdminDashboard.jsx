import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import VotersListModal from "./VotersListModal";
import AddVoterModal from "./AddVoterModal";

// --- Componente Interno: Modal de Detalles del Candidato ---
function CandidateDetailModal({ candidate, onClose, onUpdateStatus }) {
  if (!candidate) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          {candidate.partyLogo && (
            <img 
              src={`http://localhost:3001${candidate.partyLogo}`} 
              alt={`Logo de ${candidate.party}`} 
              className="party-logo-modal" 
            />
          )}
          <h2>Detalles de Candidatura</h2>
        </div>
        <div className="detail-grid">
          <p><strong>Nombre:</strong> {candidate.name}</p>
          <p><strong>Cédula:</strong> {candidate.id}</p>
          <p><strong>Partido:</strong> {candidate.party}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
        </div>
        <div className="detail-section">
          <h3>Biografía</h3>
          <p>{candidate.biography}</p>
        </div>
        <div className="detail-section">
          <h3>Propuesta de Campaña</h3>
          <p>{candidate.proposal}</p>
        </div>
        <div className="modal-actions">
          <button className="approve-btn" onClick={() => onUpdateStatus(candidate.id, "approved")}>Aprobar</button>
          <button className="reject-btn" onClick={() => onUpdateStatus(candidate.id, "rejected")}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}

// --- Componente Principal: Panel de Administración ---
function AdminDashboard() {
  const [data, setData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVotersModalOpen, setIsVotersModalOpen] = useState(false);
  const [isAddVoterModalOpen, setIsAddVoterModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/admin/dashboard");
      if (response.ok) {
        setData(await response.json());
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (candidateId, newStatus) => {
    await fetch("http://localhost:3001/api/admin/update-candidate-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, newStatus }),
    });
    setSelectedCandidate(null);
    fetchData();
  };

  const toggleElection = async () => {
    await fetch("http://localhost:3001/api/admin/toggle-election", { method: "POST" });
    fetchData();
  };

  if (!data) return <p>Cargando panel de administración...</p>;

  // Pre-calculamos valores para mantener el JSX limpio
  // Los votos nulos también se consideran en el total de votos
  const totalVotes = Object.values(data.votes).reduce((sum, count) => sum + count, 0);
  const participatingVoters = data.users.filter(u => u.role === 'voter' && u.hasVoted);

  return (
    <div className="admin-dashboard">
      <CandidateDetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} onUpdateStatus={handleUpdateStatus} />
      <VotersListModal isOpen={isVotersModalOpen} onClose={() => setIsVotersModalOpen(false)} voters={participatingVoters} />
      <AddVoterModal isOpen={isAddVoterModalOpen} onClose={() => setIsAddVoterModalOpen(false)} onVoterAdded={fetchData} />
      
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
          </div>
          <ul className="results-list">
            {/* Resultados de candidatos aprobados */}
            {data.candidates.filter(c => c.status === 'approved').map(c => {
              const votes = data.votes[c.id] || 0;
              const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
              return (
                <li key={c.id}>
                  <div className="result-info"><span>{c.name}</span><span>{votes} votos</span></div>
                  <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${percentage}%` }}>{percentage.toFixed(1)}%</div></div>
                </li>
              );
            })}
            {/* 👇 NUEVO: Mostrar Votos Nulos 👇 */}
            {data.votes.null !== undefined && (
              <li key="null-votes">
                <div className="result-info"><span>Voto Nulo</span><span>{data.votes.null || 0} votos</span></div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill null-vote-bar"
                    style={{ width: `${totalVotes > 0 ? ((data.votes.null || 0) / totalVotes) * 100 : 0}%` }}
                  >
                    {totalVotes > 0 ? (((data.votes.null || 0) / totalVotes) * 100).toFixed(1) : 0}%
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>

      <section className="admin-section">
        <h3>Gestión y Aprobación de Candidatos</h3>
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

      <section className="admin-section">
        <div className="section-header">
          <h3>Gestión de Usuarios</h3>
          <button className="add-voter-btn" onClick={() => setIsAddVoterModalOpen(true)}>
            + Agregar Votante
          </button>
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Cédula / ID</th>
              <th>Rol</th>
              <th>Estado de Voto</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.id}</td>
                <td><span className={`role-badge role-${user.role}`}>{user.role}</span></td>
                <td>
                  {user.role === 'admin' || 'voter' && (user.hasVoted ? 'Ha votado' : 'Pendiente')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;