// components/Navigation.jsx - OPCIÓN MÁS LIMPIA
import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage, userRole, isAuthenticated, onLogout }) => {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">♻️</div>
          <h1>EcoTrack</h1>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Inicio
          </button>
          <button 
            className={`nav-link ${currentPage === 'classification' ? 'active' : ''}`}
            onClick={() => setCurrentPage('classification')}
          >
            Clasificar
          </button>
          <button 
            className={`nav-link ${currentPage === 'centers' ? 'active' : ''}`}
            onClick={() => setCurrentPage('centers')}
          >
            Centros
          </button>
          <button 
            className={`nav-link ${currentPage === 'reuse' ? 'active' : ''}`}
            onClick={() => setCurrentPage('reuse')}
          >
            Reutilización
          </button>
          <button 
            className={`nav-link ${currentPage === 'community' ? 'active' : ''}`}
            onClick={() => setCurrentPage('community')}
          >
            Comunidad
          </button>
        </div>
        
        <div className="user-actions">
          {isAuthenticated ? (
            <>
              {/* Botón principal según el rol */}
              {userRole === 'general' && (
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentPage('profile')}
                >
                  👤 Mi Perfil
                </button>
              )}
              {userRole === 'admin' && (
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentPage('admin')}
                >
                  ⚙️ Admin
                </button>
              )}
              {userRole === 'company' && (
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentPage('company')}
                >
                  🏭 Mi Empresa
                </button>
              )}
              
              <button 
                className="btn btn-secondary"
                onClick={onLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('login')}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;