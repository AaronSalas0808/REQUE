// src/App.jsx
import React, { useState } from 'react';
import './styles.css'; // Importa tu archivo CSS

// Importa todos los componentes de los módulos
import ExcursionDefinitionTool from './components/ExcursionDefinitionTool';
import OrganizerManagementTool from './components/OrganizerManagementTool';
import ProviderProfileManagement from './components/ProviderProfileManagement';
import CustomerExcursionSearch from './components/CustomerExcursionSearch';
import ExcursionDetailView from './components/ExcursionDetailView';

function App() {
  const [activeRole, setActiveRole] = useState('customer'); // Roles: 'customer', 'organizer', 'provider'
  const [selectedExcursionId, setSelectedExcursionId] = useState(null); // Para el módulo de clientes

  const handleSelectExcursion = (id) => {
    setSelectedExcursionId(id);
  };

  const handleEnrollSuccess = (excursionId) => {
    console.log(`Excursión ${excursionId} tuvo una inscripción exitosa.`);
    setSelectedExcursionId(null); // Vuelve a la búsqueda después de inscribirse
    // En una app real, aquí podrías recargar la lista de excursiones o mostrar un toast/snackbar.
  };

  const renderContent = () => {
    if (activeRole === 'customer') {
      if (selectedExcursionId) {
        return <ExcursionDetailView
                 excursionId={selectedExcursionId}
                 onBack={() => setSelectedExcursionId(null)}
                 onEnrollSuccess={handleEnrollSuccess}
               />;
      }
      return <CustomerExcursionSearch onSelectExcursion={handleSelectExcursion} />;
    } else if (activeRole === 'organizer') {
      return <OrganizerManagementTool />;
    } else if (activeRole === 'provider') {
      return <ProviderProfileManagement />;
    }
    // No hay un módulo UI específico para 'admin' o para el estado inicial sin rol.
    // Podrías poner una pantalla de inicio de sesión o un dashboard de admin aquí.
    return <p className="page-container" style={{ textAlign: 'center', fontSize: '1.2rem', padding: '50px', color: 'var(--neutral-medium)' }}>
             Por favor, selecciona un rol de usuario desde el encabezado para interactuar con la plataforma.
           </p>;
  };

  return (
    <div className="app-main-container">
      <header className="app-header">
        <h1>Excursión Costa Rica</h1>
        <nav>
          <button
            onClick={() => { setActiveRole('customer'); setSelectedExcursionId(null); }}
            className={`button nav-button ${activeRole === 'customer' ? 'active' : ''}`}
          >
            Módulo Clientes
          </button>
          <button
            onClick={() => { setActiveRole('organizer'); setSelectedExcursionId(null); }}
            className={`button nav-button ${activeRole === 'organizer' ? 'active' : ''}`}
          >
            Módulo Organizadores
          </button>
          <button
            onClick={() => { setActiveRole('provider'); setSelectedExcursionId(null); }}
            className={`button nav-button ${activeRole === 'provider' ? 'active' : ''}`}
          >
            Módulo Proveedores
          </button>
          {/* Si tuvieras un módulo de administración, lo añadirías aquí */}
          {/* <button
            onClick={() => { setActiveRole('admin'); setSelectedExcursionId(null); }}
            className={`button nav-button ${activeRole === 'admin' ? 'active' : ''}`}
          >
            Módulo Administrador
          </button> */}
        </nav>
      </header>

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;