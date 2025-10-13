// src/components/PostVoting.jsx
import React from "react";
import "./PostVoting.css";

function PostVoting() {
  return (
    <div className="phase-container results-container">
      <h2>¡Gracias por Votar!</h2>
      <p>Su voto ha sido registrado de forma segura y anónima.</p>
      <p>Los resultados se publicarán una vez finalizado el período electoral.</p>
    </div>
  );
}

export default PostVoting;