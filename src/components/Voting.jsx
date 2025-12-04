import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import "./Voting.css";

// Definimos una opción especial para el voto nulo
const NULL_VOTE_OPTION = { 
  id: "null", 
  name: "Voto Nulo", 
  party: "Ninguno", 
  photo: "https://via.placeholder.com/150?text=Voto+Nulo", // Imagen de marcador de posición
  partyLogo: "/uploads/nulo.png" // Opcional: puedes poner una imagen de logo para voto nulo si la creas
};


function Voting({ candidates, onFinishVoting }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      onFinishVoting(selectedCandidate.id);
    }
  };

  return (
    <div className="phase-container voting-container">
      <h2>Seleccione su Candidato</h2>
      <p>Su voto es secreto, anónimo y único. Elija una opción o anule su voto para continuar.</p>
      
      <div className="candidates-grid">
        {candidates.map((c) => (
          <CandidateCard 
            key={c.id} 
            candidate={c} 
            onVote={setSelectedCandidate}
            isSelected={selectedCandidate && selectedCandidate.id === c.id}
          />
        ))}
        {/* 👇 AÑADIMOS LA TARJETA PARA EL VOTO NULO 👇 */}
        <CandidateCard
          key={NULL_VOTE_OPTION.id}
          candidate={NULL_VOTE_OPTION}
          onVote={setSelectedCandidate}
          isSelected={selectedCandidate && selectedCandidate.id === NULL_VOTE_OPTION.id}
        />
      </div>

      {selectedCandidate && (
        <div className="confirmation-dialog">
          <p>
            Usted ha seleccionado:{" "}
            {selectedCandidate.id === "null" ? (
              <strong>Voto Nulo</strong>
            ) : (
              <span>
                <strong>{selectedCandidate.name}</strong> del partido{" "}
                <strong>{selectedCandidate.party}</strong>
              </span>
            )}
            .
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