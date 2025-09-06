import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import Services from "./components/Services";
import Subservices from "./components/Subservices";
import Home from "./components/Home";
import Appointments from "./components/Appointments";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedService, setSelectedService] = useState(null);

  // Referencias para secciones del Home
  const homeRef = useRef(null);
  const serviciosRef = useRef(null);
  const sobreNosotrosRef = useRef(null);
  const contactoRef = useRef(null);
  const opinionesRef = useRef(null);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setShowLogin(false);
    setCurrentScreen("appointments");
  };

  const handleRegister = (userData) => {
    setShowRegister(false);
    setShowLogin(false); // Asegúrate de cerrar también el modal de login si está abierto
    setCurrentScreen("appointments");
    setUser(userData);
  
};

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("home");
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
        if (currentScreen === "home") serviciosRef.current?.scrollIntoView({ behavior: "smooth" });
        else setCurrentScreen("services");
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

  const handleExploreServices = () => {
    setCurrentScreen("services");
    setSidebarOpen(false);
  };

  const handleBackToHome = () => setCurrentScreen("home");

  // Props para Home
  const homeProps = {
    onExploreServices: handleExploreServices,
    onReservaClick: () => {
      if (user) setCurrentScreen("appointments");
      else setShowLogin(true);
    },
    ref: { homeRef, serviciosRef, sobreNosotrosRef, contactoRef, opinionesRef },
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#fff", color: "#2c3e50" }}>
      {/* Header */}
      {(currentScreen === "home" || currentScreen === "services" || currentScreen === "subservices") && (
        <Header
          user={user}
          onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
          onRegisterClick={() => { setShowRegister(true); setShowLogin(false); }}
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      {(currentScreen === "home" || currentScreen === "services" || currentScreen === "subservices") && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={handleNavigation} />
      )}

      {/* Contenido principal */}
      <main>
        {currentScreen === "home" && <Home {...homeProps} />}
        {currentScreen === "services" && (
          <Services
            onSelectService={(service) => { setSelectedService(service); setCurrentScreen("subservices"); }}
            onBackToHome={() => setCurrentScreen("home")}
          />
        )}
        {currentScreen === "subservices" && selectedService && (
          <Subservices service={selectedService} onBack={() => setCurrentScreen("services")} />
        )}
        {currentScreen === "appointments" && user && (
          <Appointments user={user} onBackToHome={handleBackToHome} onLogout={handleLogout} />
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

      {/* Footer */}
      {(currentScreen === "home" || currentScreen === "services" || currentScreen === "subservices") && (
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
