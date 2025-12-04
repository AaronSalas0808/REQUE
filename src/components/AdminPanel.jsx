// components/AdminPanel.jsx
import React, { useState } from 'react';
// En la parte superior del archivo AdminPanel.jsx
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  
  const [materials, setMaterials] = useState([
    { id: 1, name: 'PET', category: 'Plástico', description: 'Polietileno tereftalato', status: 'active' },
    { id: 2, name: 'HDPE', category: 'Plástico', description: 'Polietileno de alta densidad', status: 'active' },
    { id: 3, name: 'Vidrio transparente', category: 'Vidrio', description: 'Vidrio incoloro', status: 'active' },
    { id: 4, name: 'Aluminio', category: 'Metales', description: 'Latas de aluminio', status: 'active' },
  ]);
  
  const [centers, setCenters] = useState([
    { id: 1, name: 'EcoCentro Central', status: 'active', pendingChanges: false },
    { id: 2, name: 'ReciColecta', status: 'active', pendingChanges: true },
    { id: 3, name: 'Punto Azul', status: 'inactive', pendingChanges: false },
  ]);
  
  const [pendingContent, setPendingContent] = useState([
    { id: 1, type: 'idea', title: 'Cómo reciclar pilas', user: 'Juan López', date: '2025-12-03' },
    { id: 2, type: 'tutorial', title: 'Compostaje casero', user: 'María García', date: '2025-12-02' },
    { id: 3, type: 'question', title: 'Centros para electrónicos', user: 'Carlos Ruiz', date: '2025-12-02' },
  ]);

  const [newMaterial, setNewMaterial] = useState({ name: '', category: '', description: '' });

  const handleAddMaterial = () => {
    const material = {
      ...newMaterial,
      id: materials.length + 1,
      status: 'active'
    };
    setMaterials([...materials, material]);
    setNewMaterial({ name: '', category: '', description: '' });
  };

  const handleApproveContent = (id) => {
    setPendingContent(pendingContent.filter(item => item.id !== id));
    alert('Contenido aprobado');
  };

  const handleRejectContent = (id) => {
    setPendingContent(pendingContent.filter(item => item.id !== id));
    alert('Contenido rechazado');
  };

  return (
    <div className="admin-panel">
      <div className="card">
        <h2 className="card-title">Panel de Administración</h2>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Moderación de Contenido
          </button>
          <button 
            className={`admin-tab ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Gestión de Materiales
          </button>
          <button 
            className={`admin-tab ${activeTab === 'centers' ? 'active' : ''}`}
            onClick={() => setActiveTab('centers')}
          >
            Centros de Reciclaje
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Usuarios y Roles
          </button>
        </div>
        
        <div className="admin-content">
          {activeTab === 'content' && (
            <div className="content-moderation">
              <h3>Contenido Pendiente de Revisión ({pendingContent.length})</h3>
              
              {pendingContent.length > 0 ? (
                <div className="pending-list">
                  {pendingContent.map(item => (
                    <div key={item.id} className="pending-item">
                      <div className="item-info">
                        <div className="item-type">{item.type === 'idea' ? '💡' : '📝'}</div>
                        <div>
                          <h4>{item.title}</h4>
                          <p>Por: {item.user} • {item.date}</p>
                        </div>
                      </div>
                      
                      <div className="item-actions">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleApproveContent(item.id)}
                        >
                          Aprobar
                        </button>
                        <button 
                          className="btn btn-outline"
                          onClick={() => handleRejectContent(item.id)}
                        >
                          Rechazar
                        </button>
                        <button className="btn btn-outline">
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-pending">No hay contenido pendiente de revisión.</p>
              )}
              
              <div className="moderation-stats">
                <div className="stat">
                  <h4>Total moderado</h4>
                  <p>156 publicaciones</p>
                </div>
                <div className="stat">
                  <h4>Aprobadas</h4>
                  <p>142 (91%)</p>
                </div>
                <div className="stat">
                  <h4>Rechazadas</h4>
                  <p>14 (9%)</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'materials' && (
            <div className="materials-management">
              <h3>Gestión de Categorías de Materiales</h3>
              
              <div className="add-material">
                <h4>Agregar nuevo material</h4>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nombre del material"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <select
                      className="form-select"
                      value={newMaterial.category}
                      onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Plástico">Plástico</option>
                      <option value="Vidrio">Vidrio</option>
                      <option value="Metales">Metales</option>
                      <option value="Papel">Papel</option>
                      <option value="Electrónicos">Electrónicos</option>
                      <option value="Orgánicos">Orgánicos</option>
                      <option value="Textiles">Textiles</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <textarea
                    className="form-textarea"
                    placeholder="Descripción del material"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  />
                </div>
                
                <button className="btn btn-primary" onClick={handleAddMaterial}>
                  Agregar material
                </button>
              </div>
              
              <div className="materials-list">
                <h4>Materiales registrados</h4>
                <table className="materials-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(material => (
                      <tr key={material.id}>
                        <td>{material.name}</td>
                        <td>{material.category}</td>
                        <td>{material.description}</td>
                        <td>
                          <span className={`status-badge ${material.status}`}>
                            {material.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn">✏️ Editar</button>
                          <button className="action-btn">🗑️ Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'centers' && (
            <div className="centers-management">
              <h3>Gestión de Centros de Reciclaje</h3>
              
              <div className="centers-status">
                {centers.map(center => (
                  <div key={center.id} className="center-status-card">
                    <div className="center-status-header">
                      <h4>{center.name}</h4>
                      {center.pendingChanges && <span className="pending-badge">⚠️ Cambios pendientes</span>}
                    </div>
                    <div className="center-status-info">
                      <p>ID: {center.id}</p>
                      <p>Estado: <span className={`status ${center.status}`}>{center.status}</span></p>
                    </div>
                    <div className="center-actions">
                      <button className="btn btn-secondary">Ver detalles</button>
                      <button className="btn btn-outline">Editar</button>
                      {center.status === 'active' ? (
                        <button className="btn btn-outline">Desactivar</button>
                      ) : (
                        <button className="btn btn-primary">Activar</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="add-center-section">
                <button className="btn btn-primary">
                  + Agregar nuevo centro
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-management">
              <h3>Gestión de Usuarios y Roles</h3>
              
              <div className="search-users">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Buscar usuario por nombre o email"
                />
                <button className="btn btn-secondary">Buscar</button>
              </div>
              
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Fecha registro</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>María Pérez</td>
                      <td>maria@email.com</td>
                      <td>
                        <select className="role-select">
                          <option>Usuario General</option>
                          <option>Empresa Recicladora</option>
                          <option>Administrador</option>
                        </select>
                      </td>
                      <td>2025-11-15</td>
                      <td><span className="status active">Activo</span></td>
                      <td>
                        <button className="action-btn">Editar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>EcoCentro CR</td>
                      <td>info@ecocentro.com</td>
                      <td>Empresa Recicladora</td>
                      <td>2025-11-10</td>
                      <td><span className="status active">Activo</span></td>
                      <td>
                        <button className="action-btn">Editar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="role-stats">
                <div className="stat">
                  <h4>Usuarios totales</h4>
                  <p>456</p>
                </div>
                <div className="stat">
                  <h4>Usuarios generales</h4>
                  <p>420</p>
                </div>
                <div className="stat">
                  <h4>Empresas</h4>
                  <p>25</p>
                </div>
                <div className="stat">
                  <h4>Administradores</h4>
                  <p>3</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
