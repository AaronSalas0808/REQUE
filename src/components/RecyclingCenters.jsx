// components/RecyclingCenters.jsx
import React, { useState } from 'react';
import './RecyclingCenters.css';

const RecyclingCenters = () => {
  const [location, setLocation] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  const centers = [
    { 
      id: 1, 
      name: 'EcoCentro Central', 
      address: 'San Carlos, Alajuela', 
      distance: '2.5 km',
      hours: 'Lun-Vie: 8:00-17:00',
      materials: ['Plástico', 'Vidrio', 'Metales'],
      coordinates: { lat: 10.3157, lng: -84.4281 }
    },
    { 
      id: 2, 
      name: 'ReciColecta', 
      address: 'Ciudad Quesada', 
      distance: '3.8 km',
      hours: 'Mar-Sáb: 9:00-16:00',
      materials: ['Papel', 'Electrónicos', 'Plástico'],
      coordinates: { lat: 10.3235, lng: -84.4270 }
    },
    { 
      id: 3, 
      name: 'Punto Azul', 
      address: 'Florencia', 
      distance: '5.2 km',
      hours: 'Mié-Dom: 7:00-15:00',
      materials: ['Vidrio', 'Metales', 'Textiles'],
      coordinates: { lat: 10.3350, lng: -84.4450 }
    },
    { 
      id: 4, 
      name: 'Green Recycling', 
      address: 'Agua Azul', 
      distance: '7.1 km',
      hours: 'Lun-Sáb: 8:30-18:00',
      materials: ['Plástico', 'Papel', 'Electrónicos', 'Orgánicos'],
      coordinates: { lat: 10.3400, lng: -84.4600 }
    },
  ];

  const materialTypes = ['Todos', 'Plástico', 'Papel', 'Vidrio', 'Metales', 'Electrónicos', 'Textiles', 'Orgánicos'];

  const filteredCenters = selectedMaterialFilter === '' || selectedMaterialFilter === 'Todos' 
    ? centers 
    : centers.filter(center => center.materials.includes(selectedMaterialFilter));

  return (
    <div className="recycling-centers">
      <div className="card">
        <h2 className="card-title">Centros de Reciclaje Cercanos</h2>
        
        <div className="search-filters">
          <div className="form-group">
            <label className="form-label">Tu ubicación</label>
            <div className="location-input">
              <input
                type="text"
                className="form-input"
                placeholder="Ingresa tu dirección o usa ubicación actual"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="btn btn-secondary">
                📍 Usar ubicación
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Filtrar por tipo de material</label>
            <div className="material-filters">
              {materialTypes.map(material => (
                <button
                  key={material}
                  className={`material-filter ${selectedMaterialFilter === material ? 'active' : ''}`}
                  onClick={() => setSelectedMaterialFilter(material)}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="centers-container">
          <div className="centers-list">
            <h3>Centros encontrados: {filteredCenters.length}</h3>
            {filteredCenters.map(center => (
              <div 
                key={center.id} 
                className={`center-item ${selectedCenter?.id === center.id ? 'selected' : ''}`}
                onClick={() => setSelectedCenter(center)}
              >
                <div className="center-header">
                  <h4>{center.name}</h4>
                  <span className="distance">{center.distance}</span>
                </div>
                <p className="address">{center.address}</p>
                <p className="hours">{center.hours}</p>
                <div className="center-materials">
                  {center.materials.map(mat => (
                    <span key={mat} className="material-tag">{mat}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="center-detail">
            {selectedCenter ? (
              <>
                <h3>{selectedCenter.name}</h3>
                <div className="detail-info">
                  <div className="info-row">
                    <strong>Dirección:</strong>
                    <span>{selectedCenter.address}</span>
                  </div>
                  <div className="info-row">
                    <strong>Distancia:</strong>
                    <span>{selectedCenter.distance}</span>
                  </div>
                  <div className="info-row">
                    <strong>Horario:</strong>
                    <span>{selectedCenter.hours}</span>
                  </div>
                  <div className="info-row">
                    <strong>Materiales aceptados:</strong>
                    <div className="materials-list">
                      {selectedCenter.materials.map(mat => (
                        <div key={mat} className="material-accepted">{mat}</div>
                      ))}
                    </div>
                  </div>
                  <div className="info-row">
                    <strong>Requisitos:</strong>
                    <ul>
                      <li>Material limpio y seco</li>
                      <li>Separado por tipo</li>
                      <li>Máximo 20 kg por visita</li>
                    </ul>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="btn btn-primary">
                    🗺️ Ver ruta en mapa
                  </button>
                  <button className="btn btn-secondary">
                    📞 Contactar
                  </button>
                </div>
                
                <div className="map-placeholder">
                  <div className="map-content">
                    <h4>📍 Mapa de ubicación</h4>
                    <div className="mock-map">
                      <div className="map-points">
                        <div className="user-point">Tú</div>
                        <div className="center-point">Centro</div>
                      </div>
                      <div className="map-route"></div>
                    </div>
                    <p className="map-note">(Integración con Google Maps)</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Selecciona un centro para ver los detalles</p>
                <div className="selection-hint">
                  <p>📌 Verifica horarios antes de visitar</p>
                  <p>♻️ Lleva material limpio y separado</p>
                  <p>📍 Usa la navegación para llegar fácilmente</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingCenters;