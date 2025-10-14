import React, { useState } from "react";
import "./CandidateInfoModal.css";

function CandidateInfoModal({ isOpen, onClose, candidates }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!isOpen) return null;

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Candidatos Aprobados para la Elección</h2>
        <div className="candidates-list">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-accordion">
                <button
                  className="accordion-header"
                  onClick={() => handleToggle(candidate.id)}
                >
                  <img
                    src={`http://localhost:3001${candidate.partyLogo}`}
                    alt={`Logo de ${candidate.party}`}
                    className="accordion-logo"
                  />
                  <div className="accordion-title">
                    <h4>{candidate.name}</h4>
                    <p>{candidate.party}</p>
                  </div>
                  <span className="accordion-icon">
                    {expandedId === candidate.id ? "−" : "+"}
                  </span>
                </button>
                {expandedId === candidate.id && (
                  <div className="accordion-content">
                    <div className="detail-section">
                      <h3>Biografía</h3>
                      <p>{candidate.biography}</p>
                    </div>
                    <div className="detail-section">
                      <h3>Propuesta de Campaña</h3>
                      <p>{candidate.proposal}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay candidatos aprobados en este momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateInfoModal;