// npm install express cors   --> para usar json
// npm install multer         --> para subir y bajar imagenes 

import React, { useState, useEffect } from "react";
import "./App.css";

// Importa todos los componentes nuevos
import Header from "./components/Header";
import Login from "./components/Login";
import PreVoting from "./components/PreVoting";
import Voting from "./components/Voting";
import PostVoting from "./components/PostVoting";
import AdminDashboard from "./components/admin/AdminDashboard"
import CandidateDashboard from "./components/candidate/CandidateDashboard"
import CandidateRegistration from "./components/candidate/CandidateRegistration"; // 👈 Importa el nuevo componente

export default function App() {
  const [view, setView] = useState("login"); // 'login' o 'register'
  const [currentUser, setCurrentUser] = useState(null);
  // ... (el resto de los estados no cambia)
  const [loginError, setLoginError] = useState("");
  const [electionData, setElectionData] = useState({
    electionStatus: "inactive",
    candidates: [],
  });

  // ... (la función useEffect no cambia)
  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/election-data");
        setElectionData(await response.json());
      } catch (error) {
        console.error("Error al conectar con la API", error);
        setLoginError("No se pudo conectar con el servidor de votación.");
      }
    };
    fetchElectionData();
  }, []);

  // ... (la función handleLogin no cambia)
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
    setView("login"); // Al cerrar sesión, vuelve al login
  };

  // ... (la función handleVote no cambia)
  const handleVote = async (candidateId) => {
    await fetch("http://localhost:3001/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, candidateId }),
    });
    // Actualizamos el estado local del usuario para reflejar el voto
    setCurrentUser({ ...currentUser, hasVoted: true });
  };

  const renderContent = () => {
    // Si no hay usuario logueado, decidimos entre login y registro
    if (!currentUser) {
      if (view === "register") {
        return <CandidateRegistration onBackToLogin={() => setView("login")} />;
      }
      return (
        <Login
          onLogin={handleLogin}
          error={loginError}
          onShowRegister={() => setView("register")}
        />
      );
    }

    // Si hay usuario logueado, la lógica de roles se mantiene
    switch (currentUser.role) {
      // ... (el resto del switch no cambia)
      case "admin":
        return <AdminDashboard />;
      case "candidate":
        return <CandidateDashboard user={currentUser} />;
      case "voter":
        if (currentUser.hasVoted) {
          return <PostVoting />; // Muestra agradecimiento, resultados al final
        }
        if (electionData.electionStatus === "active") {
          return (
            <Voting
              candidates={electionData.candidates}
              onFinishVoting={handleVote}
            />
          );
        }
        return (
          <div className="phase-container">
            <h2>Votación no activa</h2>
            <p>
              La votación no se encuentra activa en este momento. Por favor,
              vuelva más tarde.
            </p>
          </div>
        );
      default:
        return <p>Rol de usuario no reconocido.</p>;
    }
  };

  return (
    <div className="App">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}