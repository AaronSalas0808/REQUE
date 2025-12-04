import React from "react";

function PreVoting({ onStartVoting }) {
  return (
    <div className="phase-container">
      <h2>La votación está por comenzar</h2>
      <p>
        A continuación, se le presentarán las candidaturas. Su selección es
        anónima y segura.
      </p>
      <button className="main-action-button" onClick={onStartVoting}>
        Entendido, Iniciar Votación
      </button>
    </div>
  );
}

export default PreVoting;