// components/RecyclingCompanyPanel.jsx
import React, { useState } from 'react';

const RecyclingCompanyPanel = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'EcoCentro Central',
    address: 'San Carlos, Alajuela, Costa Rica',
    email: 'info@ecocentro.com',
    phone: '+506 1234-5678',
    hours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-12:00',
    coordinates: '10.3157, -84.4281'
  });
  
  const [acceptedMaterials, setAcceptedMaterials] = useState([
    { id: 1, name: 'PET', category: 'Plástico', requirements: 'Limpio y seco' },
    { id: 2, name: 'HDPE', category: 'Plástico', requirements: 'Limpio, sin etiquetas' },
    { id: 3, name: 'Vidrio transparente', category: 'Vidrio', requirements: 'Separado por color' },
    { id: 4, name: 'Aluminio', category: 'Metales', requirements: 'Aplastado' },
  ]);
  
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: 'Plástico',
    requirements: ''
  });

  const handleAddMaterial = () => {
    const material = {
      ...newMaterial,
      id: acceptedMaterials.length + 1
    };
    setAcceptedMaterials([...acceptedMaterials, material]);
    setNewMaterial({ name: '', category: 'Plástico', requirements: '' });
  };

  const handleUpdateInfo = () => {
    alert('Información actualizada correctamente');
  };

  return (
    <div className="company-panel">
      <div className="card">
        <h2 className="card-title">Panel de Empresa Recicladora</h2>
        
        <div className="company-overview">
          <div className="company-header">
            <div className="company-logo">🏭</div>
            <div>
              <h3>{companyInfo.name}</h3>
              <p>Empresa registrada • Centro de reciclaje</p>
            </div>
          </div>
          
          <div className="company-stats">
            <div className="stat">
              <h4>Materiales aceptados</h4>
              <p>{acceptedMaterials.length} tipos</p>
            </div>
            <div className="stat">
              <h4>Visitas este mes</h4>
              <p>156 usuarios</p>
            </div>
            <div className="stat">
              <h4>Calificación</h4>
              <p>⭐ 4.8/5.0</p>
            </div>
          </div>
        </div>
        
        <div className="company-sections">
          <div className="section">
            <h3>Información del Centro</h3>
            
            <div className="form-group">
              <label className="form-label">Nombre del centro</label>
              <input
                type="text"
                className="form-input"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Dirección</label>
              <textarea
                className="form-textarea"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                rows="2"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email de contacto</label>
                <input
                  type="email"
                  className="form-input"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Horarios de atención</label>
              <textarea
                className="form-textarea"
                value={companyInfo.hours}
                onChange={(e) => setCompanyInfo({...companyInfo, hours: e.target.value})}
                rows="2"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Coordenadas GPS (lat, lng)</label>
              <input
                type="text"
                className="form-input"
                value={companyInfo.coordinates}
                onChange={(e) => setCompanyInfo({...companyInfo, coordinates: e.target.value})}
                placeholder="Ej: 10.3157, -84.4281"
              />
            </div>
            
            <button className="btn btn-primary" onClick={handleUpdateInfo}>
              Actualizar información
            </button>
          </div>
          
          <div className="section">
            <h3>Materiales Aceptados</h3>
            <p>Actualiza la lista de materiales que recibe tu centro</p>
            
            <div className="add-material-form">
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
                <input
                  type="text"
                  className="form-input"
                  placeholder="Requisitos (ej: limpio, seco, aplastado)"
                  value={newMaterial.requirements}
                  onChange={(e) => setNewMaterial({...newMaterial, requirements: e.target.value})}
                />
              </div>
              
              <button className="btn btn-secondary" onClick={handleAddMaterial}>
                + Agregar material
              </button>
            </div>
            
            <div className="materials-list">
              <h4>Materiales actualmente aceptados</h4>
              {acceptedMaterials.map(material => (
                <div key={material.id} className="accepted-material">
                  <div className="material-info">
                    <h5>{material.name}</h5>
                    <span className="material-category">{material.category}</span>
                  </div>
                  <div className="material-requirements">
                    <strong>Requisitos:</strong> {material.requirements}
                  </div>
                  <button className="remove-btn" title="Eliminar">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="company-announcements">
          <h3>Publicar Anuncio a la Comunidad</h3>
          <div className="announcement-form">
            <div className="form-group">
              <textarea
                className="form-textarea"
                placeholder="Comparte novedades, cambios de horario, promociones o información importante con los usuarios..."
                rows="3"
              />
            </div>
            <div className="announcement-actions">
              <button className="btn btn-outline">
                📷 Agregar imagen
              </button>
              <button className="btn btn-primary">
                Publicar anuncio
              </button>
            </div>
          </div>
        </div>
        
        <div className="company-analytics">
          <h3>Estadísticas del Centro</h3>
          <div className="analytics-cards">
            <div className="analytic-card">
              <h4>📊 Visitas mensuales</h4>
              <p className="analytic-value">156</p>
              <p className="analytic-change">↑ 12% vs mes anterior</p>
            </div>
            <div className="analytic-card">
              <h4>♻️ Material más recibido</h4>
              <p className="analytic-value">PET</p>
              <p className="analytic-change">45% del total</p>
            </div>
            <div className="analytic-card">
              <h4>⭐ Calificación promedio</h4>
              <p className="analytic-value">4.8</p>
              <p className="analytic-change">Basado en 89 reseñas</p>
            </div>
            <div className="analytic-card">
              <h4>📅 Próximas actualizaciones</h4>
              <p className="analytic-value">2 pendientes</p>
              <button className="btn btn-outline">Ver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingCompanyPanel;