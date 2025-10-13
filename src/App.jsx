import React, { useState } from "react";
import "./App.css";

// Importa todos los componentes nuevos
import Header from "./components/Header";
import Login from "./components/Login";
import PreVoting from "./components/PreVoting";
import Voting from "./components/Voting";
import PostVoting from "./components/PostVoting";

// --- DATOS SIMULADOS (Esto vendría de una base de datos) ---
const CANDIDATES_DATA = [
  {
    id: 1,
    name: "Elena Ríos",
    party: "Partido de la Innovación",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Javier Morales",
    party: "Alianza por el Progreso",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Sofía Castro",
    party: "Unidad Democrática",
    photo: "https://i.pravatar.cc/150?img=3",
  },
];

const VOTERS_DATA = [
  { id: "12345678A", password: "123", name: "Ana Torres" },
  { id: "87654321B", password: "456", name: "Carlos Vera" },
  { id: "11223344C", password: "789", name: "Luisa Méndez" },
];
// --- FIN DE DATOS SIMULADOS ---

export default function App() {
  const [phase, setPhase] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [votesCast, setVotesCast] = useState(new Set());
  const [results, setResults] = useState({});

  const handleLogin = (username, password) => {
    const user = VOTERS_DATA.find((v) => v.id === username);
    if (user && user.password === password) {
      if (votesCast.has(user.id)) {
        setLoginError("Usted ya ha emitido su voto en esta elección.");
      } else {
        setCurrentUser(user);
        setPhase("pre-voting");
        setLoginError("");
      }
    } else {
      setLoginError("Credenciales incorrectas. Inténtelo de nuevo.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPhase("login");
  };

  const handleVote = (candidateId) => {
    setResults((prevResults) => ({
      ...prevResults,
      [candidateId]: (prevResults[candidateId] || 0) + 1,
    }));
    setVotesCast((prevVotes) => new Set(prevVotes).add(currentUser.id));
    setPhase("post-voting");
  };

  const renderPhase = () => {
    switch (phase) {
      case "login":
        return <Login onLogin={handleLogin} error={loginError} />;
      case "pre-voting":
        return <PreVoting onStartVoting={() => setPhase("voting")} />;
      case "voting":
        return (
          <Voting candidates={CANDIDATES_DATA} onFinishVoting={handleVote} />
        );
      case "post-voting":
        return <PostVoting results={results} candidates={CANDIDATES_DATA} />;
      default:
        return <Login onLogin={handleLogin} error={loginError} />;
    }
  };

  return (
    <div className="App">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="main-content">{renderPhase()}</main>
    </div>
  );
}