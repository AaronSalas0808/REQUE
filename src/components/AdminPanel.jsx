// components/AdminPanel.jsx - COMPLETO Y MODIFICADO
import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('moderation');
  const [selectedPendingItem, setSelectedPendingItem] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const pendingItems = [
    { 
      id: 1, 
      type: 'idea', 
      title: 'Bolsa con jeans viejos', 
      user: 'Carlos Martínez',
      submitted: '2025-12-01',
      details: 'Idea de reutilización de jeans para crear bolsas reutilizables. Requiere revisión de materiales y seguridad.'
    },
    { 
      id: 2, 
      type: 'comment', 
      title: 'Comentario en "Compostaje avanzado"', 
      user: 'Ana Gómez',
      submitted: '2025-11-30',
      details: 'Comentario reportado por posible información incorrecta sobre tiempos de compostaje.'
    },
    { 
      id: 3, 
      type: 'center', 
      title: 'Nuevo centro: EcoPunto Norte', 
      user: 'Centro EcoPunto',
      submitted: '2025-11-29',
      details: 'Solicitud de registro de nuevo centro de reciclaje. Verificar documentación y ubicación.'
    },
  ];

  const materials = [
    { id: 1, name: 'PET', category: 'Plástico', recyclingCode: '1', status: 'active' },
    { id: 2, name: 'HDPE', category: 'Plástico', recyclingCode: '2', status: 'active' },
    { id: 3, name: 'PVC', category: 'Plástico', recyclingCode: '3', status: 'inactive' },
    { id: 4, name: 'Vidrio transparente', category: 'Vidrio', recyclingCode: 'GL-70', status: 'active' },
    { id: 5, name: 'Aluminio', category: 'Metales', recyclingCode: 'ALU', status: 'active' },
  ];

  const users = [
    { id: 1, name: 'María Pérez', email: 'maria@email.com', role: 'user', joinDate: '2025-10-15' },
    { id: 2, name: 'Juan Rodríguez', email: 'juan@email.com', role: 'user', joinDate: '2025-11-02' },
    { id: 3, name: 'EcoCentro Central', email: 'info@ecocentro.com', role: 'company', joinDate: '2025-09-20' },
    { id: 4, name: 'Admin Sistema', email: 'admin@ecotrack.com', role: 'admin', joinDate: '2025-01-10' },
  ];

  const roleStats = {
    users: 45,
    companies: 12,
    admins: 3,
    total: 60
  };

  const handleApprove = (id) => {
    alert(`Elemento ${id} aprobado`);
    // Lógica de aprobación aquí
  };

  const handleReject = (id) => {
    alert(`Elemento ${id} rechazado`);
    // Lógica de rechazo aquí
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    alert(`Editando material: ${material.name}`);
  };

  const handleDeleteMaterial = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este material?')) {
      alert(`Material ${id} eliminado`);
      // Lógica de eliminación aquí
    }
  };

  return (
    <div className="admin-panel">
      <div className="card">
        <h2 className="card-title">Panel de Administración</h2>
        
        {/* Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'moderation' ? 'active' : ''}`}
            onClick={() => setActiveTab('moderation')}
          >
            <span className="tab-icon">📋</span>
            Moderación
          </button>
          <button 
            className={`admin-tab ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            <span className="tab-icon">♻️</span>
            Materiales
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="tab-icon">👥</span>
            Usuarios
          </button>
          <button 
            className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="tab-icon">📊</span>
            Analíticas
          </button>
        </div>
        
        {/* Content */}
        <div className="admin-content">
          {activeTab === 'moderation' && (
            <div className="moderation-section">
              <div className="section-header">
                <h3>Contenido Pendiente de Revisión <span className="badge-count">{pendingItems.length}</span></h3>
                <p className="section-description">Revisa y aprueba contenido enviado por usuarios y empresas</p>
              </div>
              
              <div className="pending-container">
                <div className="pending-list">
                  {pendingItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`pending-item ${selectedPendingItem?.id === item.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPendingItem(item)}
                    >
                      <div className="item-info">
                        <div className="item-type">
                          {item.type === 'idea' ? '💡' : item.type === 'comment' ? '💬' : '🏭'}
                        </div>
                        <div className="item-content">
                          <h4>{item.title}</h4>
                          <div className="item-meta">
                            <span className="meta-user">👤 {item.user}</span>
                            <span className="meta-date">📅 {item.submitted}</span>
                            <span className={`meta-type ${item.type}`}>
                              {item.type === 'idea' ? 'Idea' : item.type === 'comment' ? 'Comentario' : 'Centro'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="item-actions">
                        <button 
                          className="btn btn-success"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(item.id);
                          }}
                        >
                          <span className="btn-icon">✓</span>
                          Aprobar
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(item.id);
                          }}
                        >
                          <span className="btn-icon">✗</span>
                          Rechazar
                        </button>
                        <button 
                          className="btn btn-outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPendingItem(item);
                          }}
                        >
                          <span className="btn-icon">👁️</span>
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Detalles del item seleccionado */}
                <div className="pending-details">
                  {selectedPendingItem ? (
                    <div className="details-card">
                      <div className="details-header">
                        <h4>Detalles de revisión</h4>
                        <span className="item-type-large">
                          {selectedPendingItem.type === 'idea' ? '💡' : selectedPendingItem.type === 'comment' ? '💬' : '🏭'}
                        </span>
                      </div>
                      <div className="details-content">
                        <h3>{selectedPendingItem.title}</h3>
                        <div className="details-meta">
                          <div className="meta-item">
                            <span className="meta-label">Usuario:</span>
                            <span className="meta-value">{selectedPendingItem.user}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Fecha:</span>
                            <span className="meta-value">{selectedPendingItem.submitted}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Tipo:</span>
                            <span className="meta-value">
                              {selectedPendingItem.type === 'idea' ? 'Idea de Reutilización' : 
                               selectedPendingItem.type === 'comment' ? 'Comentario' : 'Centro de Reciclaje'}
                            </span>
                          </div>
                        </div>
                        <div className="details-description">
                          <h5>Descripción:</h5>
                          <p>{selectedPendingItem.details}</p>
                        </div>
                        <div className="action-history">
                          <h5>Historial de acciones:</h5>
                          <ul>
                            <li>📅 Enviado para revisión: {selectedPendingItem.submitted}</li>
                            <li>⏳ Estado actual: Pendiente de revisión</li>
                            <li>👤 Asignado a: Administrador actual</li>
                          </ul>
                        </div>
                        <div className="details-actions">
                          <button className="btn btn-success">
                            <span className="btn-icon">✓</span>
                            Aprobar y publicar
                          </button>
                          <button className="btn btn-danger">
                            <span className="btn-icon">✗</span>
                            Rechazar con comentarios
                          </button>
                          <button className="btn btn-outline">
                            <span className="btn-icon">💾</span>
                            Guardar borrador
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-selection">
                      <div className="no-selection-icon">👈</div>
                      <h4>Selecciona un elemento</h4>
                      <p>Haz clic en cualquier elemento de la lista para ver sus detalles y tomar acciones</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="moderation-stats">
                <div className="stat">
                  <h4>Total pendientes</h4>
                  <p>{pendingItems.length}</p>
                </div>
                <div className="stat">
                  <h4>Aprobados hoy</h4>
                  <p>8</p>
                </div>
                <div className="stat">
                  <h4>Tiempo promedio</h4>
                  <p>2.4h</p>
                </div>
                <div className="stat">
                  <h4>Ratio aprobación</h4>
                  <p>85%</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'materials' && (
            <div className="materials-section">
              <div className="section-header">
                <h3>Gestión de Materiales Reciclables</h3>
                <p className="section-description">Administra los materiales que pueden ser reciclados en la plataforma</p>
              </div>
              
              <div className="add-material">
                <h4>{editingMaterial ? `Editando: ${editingMaterial.name}` : 'Agregar nuevo material'}</h4>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Nombre del material" />
                  </div>
                  <div className="form-group">
                    <select className="form-select">
                      <option>Categoría</option>
                      <option>Plástico</option>
                      <option>Vidrio</option>
                      <option>Metales</option>
                      <option>Papel</option>
                      <option>Electrónicos</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Código de reciclaje" />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary">
                    <span className="btn-icon">💾</span>
                    {editingMaterial ? 'Actualizar material' : 'Agregar material'}
                  </button>
                  {editingMaterial && (
                    <button 
                      className="btn btn-outline"
                      onClick={() => setEditingMaterial(null)}
                    >
                      <span className="btn-icon">↶</span>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </div>
              
              <div className="materials-list">
                <h4>Materiales registrados</h4>
                <table className="materials-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Código</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(material => (
                      <tr key={material.id}>
                        <td>
                          <div className="material-info">
                            <span className="material-icon">
                              {material.category === 'Plástico' ? '🥤' : 
                               material.category === 'Vidrio' ? '🍶' : 
                               material.category === 'Metales' ? '🔩' : '📄'}
                            </span>
                            {material.name}
                          </div>
                        </td>
                        <td>
                          <span className="material-category">
                            {material.category}
                          </span>
                        </td>
                        <td>
                          <code className="recycling-code">{material.recyclingCode}</code>
                        </td>
                        <td>
                          <span className={`status-badge ${material.status}`}>
                            {material.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-action edit"
                              onClick={() => handleEditMaterial(material)}
                              title="Editar"
                            >
                              Editar
                            </button>
                            <button 
                              className="btn-action delete"
                              onClick={() => handleDeleteMaterial(material.id)}
                              title="Eliminar"
                            >
                              Eliminar
                            </button>
                            <button 
                              className={`btn-action toggle ${material.status}`}
                              title={material.status === 'active' ? 'Desactivar' : 'Activar'}
                            >
                              {material.status === 'active' ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h3>Usuarios y Roles</h3>
                <p className="section-description">Administra usuarios, empresas y permisos del sistema</p>
              </div>
              
              <div className="search-users">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Buscar usuarios por nombre, email o rol..."
                />
                <button className="btn btn-outline">
                  <span className="btn-icon">🔍</span>
                  Buscar
                </button>
                <button className="btn btn-primary">
                  <span className="btn-icon">➕</span>
                  Nuevo usuario
                </button>
              </div>
              
              <div className="users-table-container">
                <table className="users-table">
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
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <strong>{user.name}</strong>
                              <div className="user-id">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role === 'admin' ? 'Administrador' : 
                             user.role === 'company' ? 'Empresa' : 'Usuario'}
                          </span>
                        </td>
                        <td>{user.joinDate}</td>
                        <td>
                          <span className="status-badge active">
                            Activo
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-action edit"
                              title="Editar usuario"
                            >
                              Editar
                            </button>
                            <button 
                              className="btn-action role"
                              title="Cambiar rol"
                            >
                              Rol
                            </button>
                            <button 
                              className="btn-action delete"
                              title="Eliminar usuario"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="role-stats">
                <div className="stat">
                  <h4>Usuarios totales</h4>
                  <p>{roleStats.total}</p>
                </div>
                <div className="stat">
                  <h4>Usuarios generales</h4>
                  <p>{roleStats.users}</p>
                </div>
                <div className="stat">
                  <h4>Empresas</h4>
                  <p>{roleStats.companies}</p>
                </div>
                <div className="stat">
                  <h4>Administradores</h4>
                  <p>{roleStats.admins}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <div className="section-header">
                <h3>Analíticas del Sistema</h3>
                <p className="section-description">Métricas y estadísticas de uso de la plataforma</p>
              </div>
              
              <div className="analytics-grid">
                <div className="analytic-card large">
                  <h4>📈 Actividad de usuarios</h4>
                  <div className="analytic-value">1,240</div>
                  <div className="analytic-label">Visitas hoy (+12%)</div>
                  <div className="analytic-chart">
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                  </div>
                </div>
                
                <div className="analytic-card">
                  <h4>♻️ Materiales registrados</h4>
                  <div className="analytic-value">24</div>
                  <div className="analytic-label">Tipos diferentes</div>
                </div>
                
                <div className="analytic-card">
                  <h4>🏭 Centros activos</h4>
                  <div className="analytic-value">156</div>
                  <div className="analytic-label">+8 este mes</div>
                </div>
                
                <div className="analytic-card">
                  <h4>💡 Ideas publicadas</h4>
                  <div className="analytic-value">89</div>
                  <div className="analytic-label">+15 esta semana</div>
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