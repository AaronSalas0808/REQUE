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

  const fetchElectionData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/election-data");
      if (response.ok) setElectionData(await response.json());
    } catch (error) {
      console.error("Error al conectar con la API", error);
      setLoginError("No se pudo conectar con el servidor de votación.");
    }
  };

  useEffect(() => { fetchElectionData() }, []);

  const handleLogin = async (username, password) => {
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

  const handleLogout = () => { setCurrentUser(null); setView("login"); };
  const handleVote = async (candidateId) => {
    await fetch("http://localhost:3001/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, candidateId }),
    });
    setCurrentUser({ ...currentUser, hasVoted: true });
  };

  const renderContent = () => {
    if (!currentUser) {
      if (view === "register") {
        return <CandidateRegistration onBackToLogin={() => setView("login")} />;
      }
      // ✅ LA CORRECCIÓN ESTÁ AQUÍ ✅
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
      case "admin": return <AdminDashboard />;
      case "candidate": return <CandidateDashboard user={currentUser} />;
      case "voter":
        if (currentUser.hasVoted) return <PostVoting />;
        if (electionData.electionStatus === "active") {
          return <Voting candidates={electionData.candidates} onFinishVoting={handleVote} />;
        }
        return <div className="phase-container"><h2>Votación no activa</h2><p>La votación no se encuentra activa en este momento. Por favor, vuelva más tarde.</p></div>;
      default: return <p>Rol de usuario no reconocido.</p>;
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