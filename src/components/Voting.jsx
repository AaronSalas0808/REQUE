import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import "./Voting.css";

function Voting({ candidates, onFinishVoting }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      // Enviamos solo el ID del candidato al App.jsx
      onFinishVoting(selectedCandidate.id);
    }
  };

  return (
    <div className="phase-container voting-container">
      <h2>Seleccione su Candidato</h2>
      <p>Su voto es secreto, anónimo y único. Elija una opción para continuar.</p>
      
      <div className="candidates-grid">
        {candidates.map((c) => (
          <CandidateCard 
            key={c.id} 
            candidate={c} 
            onVote={setSelectedCandidate}
            isSelected={selectedCandidate && selectedCandidate.id === c.id}
          />
        ))}
      </div>

      {/* Panel de confirmación que aparece al seleccionar un candidato */}
      {selectedCandidate && (
        <div className="confirmation-dialog">
          <p>
            Usted ha seleccionado a <strong>{selectedCandidate.name}</strong> del partido{" "}
            <strong>{selectedCandidate.party}</strong>.
          </p>
          <p>¿Desea confirmar su voto? Esta acción no se puede deshacer.</p>
          <div className="confirmation-buttons">
            <button className="cancel-button" onClick={() => setSelectedCandidate(null)}>
              Cambiar Voto
            </button>
            <button className="confirm-button" onClick={handleConfirmVote}>
              Sí, Confirmar mi Voto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Voting;