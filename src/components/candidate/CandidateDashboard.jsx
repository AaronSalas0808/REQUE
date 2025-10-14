import React from "react";
import CandidateCard from "../CandidateCard"; // Importamos la tarjeta reutilizable
import "./CandidateDashboard.css"; // Crearemos este archivo de estilos

function CandidateDashboard({ user, electionData, onNavigateToVote }) {
  // Buscamos los datos completos del candidato actual en la lista de candidatos
  const selfData = electionData.candidates.find(c => c.id === user.id);

  // Componente para la sección de votación del candidato
  const VotingSection = () => {
    if (user.hasVoted) {
      return (
        <div className="voting-status voted">
          <p><strong>Usted ya ha ejercido su voto.</strong></p>
          <p>¡Gracias por participar en el proceso democrático!</p>
        </div>
      );
    }
    if (electionData.electionStatus === 'active') {
      return (
        <div className="voting-status">
          <p>La votación se encuentra activa.</p>
          <button className="vote-action-button" onClick={onNavigateToVote}>
            Ejercer Voto
          </button>
        </div>
      );
    }
    return (
      <div className="voting-status">
        <p>La votación no se encuentra activa en este momento.</p>
      </div>
    );
  };

  return (
    <div className="candidate-dashboard">
      <h2>Portal del Candidato</h2>
      <p>Bienvenido de vuelta, <strong>{user.name}</strong>.</p>
      
      <div className="dashboard-grid">
        {/* Columna izquierda: Vista Previa */}
        <div className="dashboard-section">
          <h3>Vista Previa en Papeleta</h3>
          <p className="section-description">Así es como los votantes verán su candidatura en la pantalla de votación.</p>
          {selfData ? (
            <div className="ballot-preview">
              <CandidateCard candidate={selfData} onVote={() => {}} />
            </div>
          ) : (
            <p>Su información de candidatura no se pudo cargar. Asegúrese de que su registro haya sido aprobado.</p>
          )}
        </div>
        
        {/* Columna derecha: Participación y Estado */}
        <div className="dashboard-section">
          <h3>Participación Electoral</h3>
          <p className="section-description">Como candidato, también tiene derecho a participar en la elección.</p>
          <VotingSection />

          <h3 className="status-title">Estado de su Candidatura</h3>
          {selfData ? (
            <p>Actualmente su candidatura se encuentra: <strong>{selfData.status}</strong></p>
          ) : (
            <p>Estado no disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;