import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Appointments from "./components/Appointments";
import WorkerDashboard from "./components/WorkerDashboard"; // Importar el nuevo componente

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showWorkerDashboard, setShowWorkerDashboard] = useState(false);

  // Referencias para secciones del Home
  const homeRef = useRef(null);
  const serviciosRef = useRef(null);
  const sobreNosotrosRef = useRef(null);
  const contactoRef = useRef(null);
  const opinionesRef = useRef(null);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setShowLogin(false);
    
    // Verificar si es un trabajador (email termina con @apolo.admin.cr)
    if (loggedUser.email.endsWith('@apolo.admin.cr')) {
      setShowWorkerDashboard(true);
      setCurrentScreen("worker");
    } else {
      setShowWorkerDashboard(false);
      setCurrentScreen("appointments");
    }
  };

  const handleRegister = (userData) => {
    setShowRegister(false);
    setShowLogin(false);
    
    // Verificar si es un trabajador
    if (userData.email.endsWith('@apolo.admin.cr')) {
      setShowWorkerDashboard(true);
      setCurrentScreen("worker");
    } else {
      setShowWorkerDashboard(false);
      setCurrentScreen("appointments");
    }
    
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("home");
    setShowWorkerDashboard(false);
  };

  const handleNavigation = (sectionId) => {
    switch (sectionId) {
      case "inicio":
        if (currentScreen === "home") homeRef.current?.scrollIntoView({ behavior: "smooth" });
        else {
          setCurrentScreen("home");
          setTimeout(() => homeRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
        break;
      case "servicios":
        setCurrentScreen("home");
        setTimeout(() => serviciosRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        break;
      case "sobre-nosotros":
        if (currentScreen === "home") sobreNosotrosRef.current?.scrollIntoView({ behavior: "smooth" });
        else {
          setCurrentScreen("home");
          setTimeout(() => sobreNosotrosRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
        break;
      case "contacto":
        if (currentScreen === "home") contactoRef.current?.scrollIntoView({ behavior: "smooth" });
        else {
          setCurrentScreen("home");
          setTimeout(() => contactoRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
        break;
      case "opiniones":
        if (currentScreen === "home") opinionesRef.current?.scrollIntoView({ behavior: "smooth" });
        else {
          setCurrentScreen("home");
          setTimeout(() => opinionesRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
        break;
      default:
        break;
    }
    setSidebarOpen(false);
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setShowWorkerDashboard(false);
  };

  // Props para Home
  const homeProps = {
    onReservaClick: () => {
      if (user) {
        // Verificar si es trabajador para redirigir a la vista correcta
        if (user.email.endsWith('@apolo.admin.cr')) {
          setCurrentScreen("worker");
          setShowWorkerDashboard(true);
        } else {
          setCurrentScreen("appointments");
        }
      } else {
        setShowLogin(true);
      }
    },
    ref: { homeRef, serviciosRef, sobreNosotrosRef, contactoRef, opinionesRef },
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#fff", color: "#2c3e50" }}>
      {/* Header - Mostrar en todas las pantallas excepto login/register */}
      {(currentScreen === "home") && (
  <Header
    user={user}
    onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
    onRegisterClick={() => { setShowRegister(true); setShowLogin(false); }}
    onLogout={handleLogout}
    onMenuClick={() => setSidebarOpen(true)}
  />
)}

      {/* Sidebar - Solo mostrar en home */}
      {(currentScreen === "home") && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={handleNavigation} />
      )}

      {/* Contenido principal */}
      <main>
        {currentScreen === "home" && <Home {...homeProps} />}
        {currentScreen === "appointments" && user && !showWorkerDashboard && (
          <Appointments user={user} onBackToHome={handleBackToHome} onLogout={handleLogout} />
        )}
        {currentScreen === "worker" && user && showWorkerDashboard && (
          <WorkerDashboard user={user} onLogout={handleLogout} />
        )}

        {/* Login */}
        {showLogin && !user && (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => { setShowRegister(true); setShowLogin(false); }}
            onClose={() => setShowLogin(false)}
          />
        )}

        {showRegister && !user && (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => { setShowLogin(true); setShowRegister(false); }}
            onClose={() => setShowRegister(false)}
          />
        )}
      </main>

      {/* Footer - Solo mostrar en home */}
      {(currentScreen === "home") && (
        <footer style={{ background: "#ecf0f1", padding: "30px 20px", textAlign: "center", color: "#7f8c8d", fontSize: "14px", borderTop: "1px solid #dce4e6" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>Apolo Barber & Spa</h3>
            <p style={{ margin: "0 0 10px 0" }}>Juventud, fuerza y estilo</p>
            <p style={{ margin: 0 }}>© 2025 Apolo Barber & Spa. Todos los derechos reservados.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;