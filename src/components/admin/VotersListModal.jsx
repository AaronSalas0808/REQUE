import React from "react";
import "./AdminDashboard.css"; // Reutilizamos los estilos del modal

function VotersListModal({ isOpen, onClose, voters }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Votantes que han participado ({voters.length})</h2>
        <ul className="voters-list">
          {voters.map((voter) => (
            <li key={voter.id}>
              <span>{voter.name}</span>
              <span className="voter-id">{voter.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VotersListModal;