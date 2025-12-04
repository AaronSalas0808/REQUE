import React from 'react';

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
          
          {userRole === 'admin' && (
            <button 
              className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => setCurrentPage('admin')}
            >
              Administración
            </button>
          )}
          
          {userRole === 'company' && (
            <button 
              className={`nav-link ${currentPage === 'company' ? 'active' : ''}`}
              onClick={() => setCurrentPage('company')}
            >
              Empresa
            </button>
          )}
        </div>
        
        <div className="user-actions">
          {isAuthenticated ? (
            <>
              <button 
                className="btn btn-outline"
                onClick={() => setCurrentPage('profile')}
              >
                Perfil
              </button>
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