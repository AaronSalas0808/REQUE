import React from "react";

function CandidateDashboard({ user }) {
  // En una app real, aquí se haría un fetch para obtener el estado del candidato
  const candidateStatus = "Aprobado"; // Simulado

  return (
    <div className="phase-container">
      <h2>Portal del Candidato</h2>
      <p>
        Bienvenido, <strong>{user.name}</strong>.
      </p>
      <p>
        Estado de su candidatura: <strong>{candidateStatus}</strong>
      </p>
      {/* Aquí podría ir un botón para "Editar Perfil" */}
    </div>
  );
}

export default CandidateDashboard;