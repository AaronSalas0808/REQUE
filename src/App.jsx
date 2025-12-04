// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import MaterialClassification from './components/MaterialClassification';
import RecyclingCenters from './components/RecyclingCenters';
import ReuseIdeas from './components/ReuseIdeas';
import Community from './components/Community';
import AdminPanel from './components/AdminPanel';
import RecyclingCompanyPanel from './components/RecyclingCompanyPanel';
import UserProfile from './components/UserProfile';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState('general');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Cambiado a true para demo

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('general');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'classification':
        return <MaterialClassification />;
      case 'centers':
        return <RecyclingCenters />;
      case 'reuse':
        return <ReuseIdeas />;
      case 'community':
        return <Community />;
      case 'admin':
        return userRole === 'admin' ? <AdminPanel /> : <div className="access-denied">🔒 Acceso restringido a administradores</div>;
      case 'company':
        return userRole === 'company' ? <RecyclingCompanyPanel /> : <div className="access-denied">🏭 Esta sección es solo para empresas recicladoras</div>;
      case 'profile':
        return isAuthenticated ? <UserProfile /> : <div className="access-denied">👤 Inicia sesión para ver tu perfil</div>;
      case 'login':
        return <Login onLogin={handleLogin} />;
      default:
        return (
          <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="hero-title-main">Transforma</span>
                  <span className="hero-title-sub">tu impacto ambiental</span>
                </h1>
                <p className="hero-description">
                  EcoTrack es tu guía completa para un reciclaje inteligente. 
                  Desde clasificación hasta reutilización creativa, te acompañamos 
                  en cada paso hacia un futuro más sostenible.
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn btn-primary btn-hero"
                    onClick={() => setCurrentPage('classification')}
                  >
                    <span className="btn-icon">♻️</span>
                    Comenzar a reciclar
                  </button>
                  <button 
                    className="btn btn-outline btn-hero"
                    onClick={() => setCurrentPage('community')}
                  >
                    <span className="btn-icon">👥</span>
                    Unirse a la comunidad
                  </button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="visual-element visual-1">🌱</div>
                <div className="visual-element visual-2">♻️</div>
                <div className="visual-element visual-3">🌍</div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="features-section">
              <h2 className="section-title">¿Qué ofrece EcoTrack?</h2>
              <p className="section-subtitle">Todas las herramientas que necesitas para un reciclaje efectivo</p>
              
              <div className="features-grid">
                <div className="feature-card" onClick={() => setCurrentPage('classification')}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🔍</div>
                    <div className="feature-badge">Nuevo</div>
                  </div>
                  <h3 className="feature-title">Clasificación Inteligente</h3>
                  <p className="feature-description">
                    Identifica materiales correctamente con nuestro sistema de búsqueda avanzada y reconocimiento por IA
                  </p>
                  <div className="feature-stats">
                    <span>+200 materiales</span>
                    <span>•</span>
                    <span>Guías paso a paso</span>
                  </div>
                </div>

                <div className="feature-card" onClick={() => setCurrentPage('centers')}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">📍</div>
                  </div>
                  <h3 className="feature-title">Centros Cercanos</h3>
                  <p className="feature-description">
                    Encuentra centros de reciclaje en tu área con información actualizada de horarios y materiales aceptados
                  </p>
                  <div className="feature-stats">
                    <span>50+ centros</span>
                    <span>•</span>
                    <span>Mapas interactivos</span>
                  </div>
                </div>

                <div className="feature-card" onClick={() => setCurrentPage('reuse')}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">💡</div>
                    <div className="feature-badge trending">Tendencia</div>
                  </div>
                  <h3 className="feature-title">Reutilización Creativa</h3>
                  <p className="feature-description">
                    Descubre proyectos DIY para dar segunda vida a tus materiales antes de reciclarlos
                  </p>
                  <div className="feature-stats">
                    <span>150+ ideas</span>
                    <span>•</span>
                    <span>Proyectos paso a paso</span>
                  </div>
                </div>

                <div className="feature-card" onClick={() => setCurrentPage('community')}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">👥</div>
                  </div>
                  <h3 className="feature-title">Comunidad Activa</h3>
                  <p className="feature-description">
                    Conéctate con otros recicladores, comparte experiencias y resuelve duntas en tiempo real
                  </p>
                  <div className="feature-stats">
                    <span>1,000+ miembros</span>
                    <span>•</span>
                    <span>Foros moderados</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-value">2,500+</div>
                  <div className="stat-label">Usuarios activos</div>
                  <div className="stat-trend positive">↑ 15% este mes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">45,000+ kg</div>
                  <div className="stat-label">Material reciclado</div>
                  <div className="stat-trend positive">↑ 8% este mes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">150+</div>
                  <div className="stat-label">Centros registrados</div>
                  <div className="stat-trend positive">↑ 5% este mes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4.8</div>
                  <div className="stat-label">Calificación promedio</div>
                  <div className="stat-trend positive">⭐ ⭐ ⭐ ⭐ ⭐</div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="cta-content">
                <h2 className="cta-title">¿Eres una empresa recicladora?</h2>
                <p className="cta-description">
                  Únete a nuestra plataforma y aumenta tu visibilidad. Llega a más usuarios interesados 
                  en reciclar y optimiza la recepción de materiales.
                </p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => userRole === 'company' ? setCurrentPage('company') : setCurrentPage('login')}
                >
                  <span className="btn-icon">🏭</span>
                  {userRole === 'company' ? 'Ir a mi panel' : 'Registrar mi empresa'}
                </button>
              </div>
              <div className="cta-illustration">
                <div className="illustration-element">🏢</div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">♻️</span>
              <span className="footer-logo-text">EcoTrack</span>
            </div>
            <p className="footer-tagline">
              Conectando personas con un futuro más sostenible
            </p>
            <div className="footer-social">
              <button className="social-icon">📱</button>
              <button className="social-icon">📧</button>
              <button className="social-icon">📘</button>
              <button className="social-icon">📸</button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Enlaces rápidos</h4>
            <ul className="footer-links">
              <li><button onClick={() => setCurrentPage('classification')}>Clasificación</button></li>
              <li><button onClick={() => setCurrentPage('centers')}>Centros</button></li>
              <li><button onClick={() => setCurrentPage('reuse')}>Reutilización</button></li>
              <li><button onClick={() => setCurrentPage('community')}>Comunidad</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Recursos</h4>
            <ul className="footer-links">
              <li><button>Guías de reciclaje</button></li>
              <li><button>Materiales aceptados</button></li>
              <li><button>Preguntas frecuentes</button></li>
              <li><button>Contacto</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><button>Términos de servicio</button></li>
              <li><button>Política de privacidad</button></li>
              <li><button>Aviso legal</button></li>
              <li><button>Cookies</button></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 EcoTrack - Tecnológico de Costa Rica. Todos los derechos reservados.</p>
          <p className="footer-team">Desarrollado por: Melany Arrieta, Brandon Vallejos, Aaron Salas</p>
        </div>
      </footer>
    </div>
  );
}

export default App;