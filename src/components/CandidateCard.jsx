import React from "react";
import "./CandidateCard.css";

function CandidateCard({ candidate, onVote, isSelected }) {
  // Construimos la URL completa para la imagen del logo
  const logoUrl = `http://localhost:3001${candidate.partyLogo}`;

  // Aplicamos una clase especial si esta tarjeta está seleccionada
  const cardClassName = `candidate-card ${isSelected ? "selected" : ""}`;

  return (
    <div className={cardClassName}>
      <img
        src={logoUrl}
        alt={`Logo de ${candidate.party}`}
        className="candidate-party-logo"
      />
      <div className="candidate-info">
        <h3>{candidate.name}</h3>
        <p>{candidate.party}</p>
      </div>
      <button className="vote-button" onClick={() => onVote(candidate)}>
        Seleccionar
      </button>
    </div>
  );
}

export default CandidateCard;