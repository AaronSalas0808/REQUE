// npm install express cors   --> para usar json
// npm install multer         --> para subir y bajar imagenes 

import React, { useState, useEffect } from "react";
import "./App.css";

// Importa todos los componentes
import Header from "./components/Header";
import Login from "./components/Login";
import Voting from "./components/Voting";
import PostVoting from "./components/PostVoting";
import AdminDashboard from "./components/admin/AdminDashboard";
import CandidateDashboard from "./components/candidate/CandidateDashboard";
import CandidateRegistration from "./components/candidate/CandidateRegistration";
import CandidateInfoModal from "./components/CandidateInfoModal";

export default function App() {
  const [view, setView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [electionData, setElectionData] = useState({
    electionStatus: "inactive",
    candidates: [],
  });
  const [isCandidateInfoModalOpen, setCandidateInfoModalOpen] = useState(false);
  // 👇 NUEVO ESTADO: Controla si el candidato ve su dashboard o la pantalla de votación
  const [candidateView, setCandidateView] = useState("dashboard");

  const fetchElectionData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/election-data");
      if (response.ok) setElectionData(await response.json());
    } catch (error) {
      console.error("Error al conectar con la API", error);
    }
  };

  useEffect(() => { fetchElectionData() }, []);

  const handleLogin = async (username, password) => {
    // ... (esta función no cambia)
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        await fetchElectionData();
        setLoginError("");
      } else {
        setLoginError("Credenciales incorrectas.");
      }
    } catch (error) {
      setLoginError("Error de conexión al intentar iniciar sesión.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
    setCandidateView("dashboard"); // Reseteamos la vista del candidato al salir
  };

  const handleVote = async (candidateId) => {
    await fetch("http://localhost:3001/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, candidateId }),
    });
    // Actualizamos el estado local del usuario para reflejar el voto
    setCurrentUser({ ...currentUser, hasVoted: true });
    // Si el que votó fue un candidato, lo regresamos a su dashboard
    if (currentUser.role === 'candidate') {
      setCandidateView("dashboard");
    }
  };

  const renderContent = () => {
    if (!currentUser) {
      // ... (esta sección no cambia)
      if (view === "register") {
        return <CandidateRegistration onBackToLogin={() => setView("login")} />;
      }
      return (
        <Login
          onLogin={handleLogin}
          error={loginError}
          onShowRegister={() => setView("register")}
          electionStatus={electionData.electionStatus}
          onShowCandidates={() => setCandidateInfoModalOpen(true)}
        />
      );
    }

    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard />;
      
      case "candidate":
        // Si el candidato ya votó, solo puede ver su dashboard
        if (currentUser.hasVoted) {
          return <CandidateDashboard user={currentUser} electionData={electionData} />;
        }
        // Si no ha votado, decidimos si ve su dashboard o la pantalla de votación
        if (candidateView === "voting") {
          return <Voting candidates={electionData.candidates} onFinishVoting={handleVote} />;
        }
        return (
          <CandidateDashboard
            user={currentUser}
            electionData={electionData}
            onNavigateToVote={() => setCandidateView("voting")}
          />
        );

      case "voter":
        if (currentUser.hasVoted) {
          return <PostVoting />;
        }
        if (electionData.electionStatus === "active") {
          return <Voting candidates={electionData.candidates} onFinishVoting={handleVote} />;
        }
        return <div className="phase-container"><h2>Votación no activa</h2><p>La votación no se encuentra activa en este momento.</p></div>;
      
      default:
        return <p>Rol de usuario no reconocido.</p>;
    }
  };

  return (
    <div className="App">
      <Header user={currentUser} onLogout={handleLogout} />
      <CandidateInfoModal
        isOpen={isCandidateInfoModalOpen}
        onClose={() => setCandidateInfoModalOpen(false)}
        candidates={electionData.candidates}
      />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}