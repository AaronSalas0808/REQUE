import React from "react";
import "./CandidateCard.css";

function CandidateCard({ candidate, onVote }) {
  return (
    <div className="candidate-card">
      <img
        src={candidate.photo}
        alt={`Foto de ${candidate.name}`}
        className="candidate-photo"
      />
      <div className="candidate-info">
        <h3>{candidate.name}</h3>
        <p>{candidate.party}</p>
      </div>
      <button className="vote-button" onClick={() => onVote(candidate)}>
        Votar
      </button>
    </div>
  );
}

export default CandidateCard;