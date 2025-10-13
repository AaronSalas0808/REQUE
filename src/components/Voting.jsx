import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import "./Voting.css";

function Voting({ candidates, onFinishVoting }) {
  const [selected, setSelected] = useState(null);

  const handleConfirmVote = () => {
    if (selected) {
      onFinishVoting(selected.id);
    }
  };

  return (
    <div className="phase-container">
      <h2>Seleccione su Voto</h2>
      <div className="candidates-grid">
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} onVote={setSelected} />
        ))}
      </div>
      {selected && (
        <div className="confirmation-dialog">
          <p>
            Confirma su voto por <strong>{selected.name}</strong>?
          </p>
          <button className="confirm-button" onClick={handleConfirmVote}>
            Sí, Confirmar Voto
          </button>
          <button className="cancel-button" onClick={() => setSelected(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default Voting;