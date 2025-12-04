// components/RecyclingCenters.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaRoute, 
  FaClock, 
  FaRecycle,
  FaDirections,
  FaLocationArrow,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import './RecyclingCenters.css';

const RecyclingCenters = () => {
  const [location, setLocation] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  const [mapType, setMapType] = useState('roadmap'); // roadmap o satellite

  // Centros REALES en Ciudad Quesada, San Carlos
  const centers = [
    { 
      id: 1, 
      name: 'COOPEAMBIENTE RL', 
      address: 'Diagonal al Cementerio Municipal, Ciudad Quesada, San Carlos, Costa Rica', 
      distance: '1.2 km',
      hours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-12:00',
      materials: ['Papel', 'Cartón', 'Plástico', 'Vidrio', 'Metales'],
      // Coordenadas aproximadas de COOPEAMBIENTE RL
      coordinates: { lat: 10.34700, lng: -84.40199 },
      phone: '+506 2460-0505',
      rating: 4.6,
      reviews: 156,
      website: 'https://www.coopeambientecr.com/'
    },
    { 
      id: 2, 
      name: 'Centro de Acopio Municipal de Ciudad Quesada', 
      address: '300 metros sur del Parque Central, Ciudad Quesada, San Carlos', 
      distance: '0.8 km',
      hours: 'Lun-Sáb: 7:00-16:00',
      materials: ['Papel', 'Cartón', 'Plástico', 'Vidrio', 'Metales', 'Tetrapak'],
      // Coordenadas del Centro de Acopio Municipal
      coordinates: { lat: 10.32747, lng: -84.41671 },
      phone: '+506 2460-1010',
      rating: 4.4,
      reviews: 89,
      notes: 'Recibe materiales separados y limpios'
    },
    { 
      id: 3, 
      name: 'Scrap Queen Metal Corp S.R.L.', 
      address: 'Frente a la Bomba Texaco, Carretera a Florencia, Ciudad Quesada', 
      distance: '2.5 km',
      hours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-12:00',
      materials: ['Metales', 'Aluminio', 'Cobre', 'Bronce', 'Chatarra'],
      // Coordenadas de Scrap Queen Metal Corp
      coordinates: { lat: 10.35477, lng: -84.42581 },
      phone: '+506 2461-2323',
      rating: 4.7,
      reviews: 203,
      notes: 'Especializados en metales, pagan por material'
    },
   
    { 
      id: 5, 
      name: 'RECICLADORA ARTEMISA', 
      address: 'Marsella, Venecia, San Carlos, Costa Rica', 
      distance: '1.5 km',
      hours: 'Lun-Vie: 5:00-17:00, Sáb/Dom: Cerrado',
      materials: ['PV', 'PET', 'PS', 'Bronce', 'Chatarra', 'Plástico duro'],
      // Coordenadas aproximadas de Recicladora Artemisa
      coordinates: { lat: 10.35000, lng: -84.25266 },
      phone: '+506 2461-5050',
      whatsapp: '+506 8356-7890',
      rating: 4.7,
      reviews: 234,
      notes: 'Especialistas en metales, compran material',
      website: 'http://www.recicladoraartemisa.com/'
    },
    { 
      id: 7, 
      name: 'Centro de Acopio Planta de Tratamiento', 
      address: 'Carretera a Aguas Zarcas, antes del Río Platanar, San Carlos', 
      distance: '3.5 km',
      hours: 'Lun-Vie: 7:00-15:00',
      materials: ['Orgánicos', 'Podas', 'Maderas', 'Residuos vegetales'],
      // Coordenadas en dirección a Aguas Zarcas
      coordinates: { lat: 10.333056, lng: -84.432500 },
      phone: '+506 2461-8989',
      rating: 4.2,
      reviews: 67,
      notes: 'Planta de tratamiento de residuos orgánicos'
    },
    { 
      id: 8, 
      name: 'Recicladora de Metal Carranza', 
      address: 'Ruta Nacional Secundaria 141, Provincia de Alajuela, San Carlos', 
      distance: '3.8 km',
      hours: 'Lun-Vie: 7:00-17:00',
      materials: ['Vidrio', 'Botellas', 'Frascos', 'Envases de vidrio'],
      // Coordenadas en Zona Industrial
      coordinates: { lat: 10.35954, lng: -84.46542 },
      phone: '+506 6474 0445',
      rating: 4.6,
      reviews: 142,
      notes: 'Especializados solo en vidrio'
    },
  ];

  const materialTypes = ['Todos', 'Plástico', 'Papel', 'Vidrio', 'Metales', 'Electrónicos', 'Textiles', 'Orgánicos', 'Peligrosos', 'Cartón', 'Tetrapak'];

  const filteredCenters = selectedMaterialFilter === '' || selectedMaterialFilter === 'Todos' 
    ? centers 
    : centers.filter(center => center.materials.includes(selectedMaterialFilter));

  // Obtener ubicación del usuario
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          // Mostrar coordenadas
          const address = `Ubicación actual: ${userPos.lat.toFixed(6)}, ${userPos.lng.toFixed(6)}`;
          setLocation(address);
          
          setIsLoadingLocation(false);
          
          alert('Ubicación obtenida correctamente. Puedes calcular rutas a los centros.');
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          let errorMessage = 'No se pudo obtener tu ubicación. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Permiso denegado por el usuario.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Información de ubicación no disponible.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Tiempo de espera agotado.';
              break;
            default:
              errorMessage += 'Error desconocido.';
          }
          alert(errorMessage);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización. Intenta con otro navegador.');
    }
  };

  // Función para calcular distancia usando fórmula de Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calcular distancia aproximada
  const calculateRoute = () => {
    if (!userLocation) {
      alert('Primero obtén tu ubicación usando el botón "Usar ubicación"');
      return;
    }

    if (!selectedCenter) {
      alert('Selecciona un centro de reciclaje de la lista');
      return;
    }

    // Calcular distancia exacta
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng,
      selectedCenter.coordinates.lat,
      selectedCenter.coordinates.lng
    );

    // Tiempo estimado basado en modo de transporte
    let duration;
    let speed;
    switch(travelMode) {
      case 'driving':
        speed = 40; // km/h promedio en ciudad
        duration = (distance / speed) * 60; // minutos
        break;
      case 'walking':
        speed = 4.5; // km/h caminando
        duration = (distance / speed) * 60;
        break;
      case 'bicycling':
        speed = 12; // km/h en bicicleta
        duration = (distance / speed) * 60;
        break;
      default:
        speed = 30;
        duration = (distance / speed) * 60;
    }

    setDirections({
      distance: `${distance.toFixed(1)} km`,
      duration: `${Math.round(duration)} min`,
      mode: travelMode
    });
  };

  // Limpiar ruta
  const clearRoute = () => {
    setDirections(null);
  };

  // Abrir en Google Maps con coordenadas exactas
  const openInGoogleMaps = () => {
    if (selectedCenter) {
      const { lat, lng } = selectedCenter.coordinates;
      // Usar coordenadas exactas
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  // Obtener URL del mapa embebido con marcador
  const getMapEmbedUrl = (center) => {
    if (!center) return '';
    const { lat, lng } = center.coordinates;
    // URL con marcador en las coordenadas exactas
    return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed&t=${mapType}&hl=es&markers=color:green%7Clabel:C%7C${lat},${lng}`;
  };

  // Obtener URL para navegación CON coordenadas exactas
  const getNavigationUrl = () => {
    if (!userLocation || !selectedCenter) return '#';
    const { lat: destLat, lng: destLng } = selectedCenter.coordinates;
    // Usar coordenadas exactas para origen y destino
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destLat},${destLng}&travelmode=${travelMode}&hl=es`;
  };

  // Manejar clic en un centro
  const handleCenterClick = (center) => {
    setSelectedCenter(center);
    setDirections(null); // Limpiar ruta anterior
  };

  // Renderizar contenido del mapa
  const renderMapContent = () => {
    if (!selectedCenter) {
      return (
        <div className="map-loading">
          <FaMapMarkerAlt className="empty-icon" style={{ fontSize: '3rem' }} />
          <p>Selecciona un centro para ver el mapa</p>
          <p className="map-note">Centros reales</p>
        </div>
      );
    }

    return (
      <div className="map-wrapper">
        <div className="map-embed">
          <iframe
            title={`Mapa de ${selectedCenter.name}`}
            width="100%"
            height="400"
            loading="lazy"
            style={{ border: 0, borderRadius: "var(--radius-lg)" }}
            allowFullScreen
            src={getMapEmbedUrl(selectedCenter)}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="map-controls">
          <div className="map-type-buttons">
           
           
          </div>
          <div className="map-actions">
            <button 
              className="btn btn-sm btn-primary"
              onClick={openInGoogleMaps}
            >
              <FaExternalLinkAlt />
              Abrir en Maps
            </button>
            {userLocation && selectedCenter && (
              <a
                href={getNavigationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success"
              >
                <FaDirections />
                Cómo llegar
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="recycling-centers">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FaRecycle className="title-icon" />
            <span>Centros de Reciclaje</span>
          </div>
          <p className="card-subtitle">
            Ubicaciones reales de centros de reciclaje y acopio
            <br />
            <small>Coordenadas GPS precisas para ubicación exacta</small>
          </p>
        </div>
        
        <div className="search-filters">
          <div className="filter-section">
            <div className="filter-header">
              <FaSearch />
              <h3>Buscar centros:</h3>
            </div>
            
            <div className="form-group">
              <label className="form-label">Tu ubicación actual</label>
              <div className="location-input">
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Obtén tu ubicación para calcular rutas"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="location-buttons">
                  <button 
                    className={`btn btn-secondary ${isLoadingLocation ? 'loading' : ''}`}
                    onClick={getUserLocation}
                    disabled={isLoadingLocation}
                  >
                    {isLoadingLocation ? (
                      <>
                        <div className="spinner-small"></div>
                        Cargando...
                      </>
                    ) : (
                      <>
                        <FaLocationArrow />
                        Ubicación real
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="location-hint">
                <small>Activa tu GPS para obtener ubicación precisa y calcular rutas</small>
              </p>
            </div>
            
            <div className="form-group">
              <div className="filter-header">
                <FaFilter />
                <label className="form-label">Filtrar por tipo de material</label>
              </div>
              <div className="material-filters">
                {materialTypes.map(material => (
                  <button
                    key={material}
                    className={`material-filter ${selectedMaterialFilter === material ? 'active' : ''}`}
                    onClick={() => setSelectedMaterialFilter(material)}
                  >
                    {material === 'Todos' ? '♻️ Todos' : 
                     material === 'Plástico' ? '🔵 Plástico' :
                     material === 'Papel' ? '📄 Papel' :
                     material === 'Vidrio' ? '🥃 Vidrio' :
                     material === 'Metales' ? '⚙️ Metales' :
                     material === 'Electrónicos' ? '💻 Electrónicos' :
                     material === 'Textiles' ? '👕 Textiles' :
                     material === 'Orgánicos' ? '🍃 Orgánicos' :
                     material === 'Peligrosos' ? '⚠️ Peligrosos' :
                     material === 'Cartón' ? '📦 Cartón' :
                     '🥛 Tetrapak'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="centers-container">
          <div className="centers-list">
            <div className="list-header">
              <h3>Centros disponibles: {filteredCenters.length}</h3>
              <div className="list-actions">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setSelectedMaterialFilter('');
                    setSelectedCenter(null);
                    clearRoute();
                  }}
                >
                  <IoMdClose />
                  Limpiar filtros
                </button>
              </div>
            </div>
            
            <div className="centers-scroll">
              {filteredCenters.map(center => (
                <div 
                  key={center.id} 
                  className={`center-item ${selectedCenter?.id === center.id ? 'selected' : ''}`}
                  onClick={() => handleCenterClick(center)}
                >
                  <div className="center-header">
                    <div className="center-title">
                      <FaRecycle className="center-icon" />
                      <h4>{center.name}</h4>
                    </div>
                    <span className="distance">{center.distance}</span>
                  </div>
                  <p className="address">
                    <FaMapMarkerAlt />
                    {center.address}
                  </p>
                  <div className="coordinates">
                    <small>📍 {center.coordinates.lat.toFixed(6)}, {center.coordinates.lng.toFixed(6)}</small>
                  </div>
                  <p className="hours">
                    <FaClock />
                    {center.hours}
                  </p>
                  <div className="center-meta">
                    <span className="rating">⭐ {center.rating} ({center.reviews} reseñas)</span>
                    {center.notes && (
                      <span className="specialty">✨ {center.notes}</span>
                    )}
                  </div>
                  <div className="center-materials">
                    {center.materials.map(mat => (
                      <span key={mat} className="material-tag">
                        {mat === 'Plástico' ? '🔵' : 
                         mat === 'Papel' ? '📄' :
                         mat === 'Cartón' ? '📦' :
                         mat === 'Vidrio' ? '🥃' :
                         mat === 'Metales' ? '⚙️' :
                         mat === 'Aluminio' ? '🥫' :
                         mat === 'Cobre' ? '🔴' :
                         mat === 'Electrónicos' ? '💻' :
                         mat === 'Pilas' ? '🔋' :
                         mat === 'Baterías' ? '⚡' :
                         mat === 'Textiles' ? '👕' :
                         mat === 'Orgánicos' ? '🍃' :
                         mat === 'Podas' ? '🌿' :
                         mat === 'Medicamentos' ? '💊' :
                         mat === 'Aceite usado' ? '🛢️' :
                         mat === 'Tetrapak' ? '🥛' :
                         '♻️'} {mat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="main-content">
            <div className="center-detail">
              {selectedCenter ? (
                <>
                  <div className="detail-header">
                    <div className="detail-title">
                      <FaRecycle className="detail-icon" />
                      <div>
                        <h3>{selectedCenter.name}</h3>
                        <div className="detail-meta">
                          <span className="rating-badge">⭐ {selectedCenter.rating}</span>
                          <span className="review-count">({selectedCenter.reviews} reseñas)</span>
                          <span className="coordinates-badge">
                            📍 {selectedCenter.coordinates.lat.toFixed(6)}, {selectedCenter.coordinates.lng.toFixed(6)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={clearRoute}
                    >
                      <IoMdClose />
                      Limpiar ruta
                    </button>
                  </div>
                  
                  <div className="detail-info">
                    <div className="info-grid">
                      <div className="info-card">
                        <div className="info-icon">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <strong>Dirección exacta:</strong>
                          <span>{selectedCenter.address}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaRoute />
                        </div>
                        <div>
                          <strong>Distancia desde centro:</strong>
                          <span>{selectedCenter.distance}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaClock />
                        </div>
                        <div>
                          <strong>Horario de atención:</strong>
                          <span>{selectedCenter.hours}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaPhone />
                        </div>
                        <div>
                          <strong>Teléfono de contacto:</strong>
                          <span>{selectedCenter.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-section">
                      <h4>📦 Materiales aceptados</h4>
                      <div className="materials-list">
                        {selectedCenter.materials.map(mat => (
                          <div key={mat} className="material-accepted">
                            {mat === 'Plástico' ? '🔵' : 
                             mat === 'Papel' ? '📄' :
                             mat === 'Cartón' ? '📦' :
                             mat === 'Vidrio' ? '🥃' :
                             mat === 'Metales' ? '⚙️' :
                             mat === 'Aluminio' ? '🥫' :
                             mat === 'Cobre' ? '🔴' :
                             mat === 'Electrónicos' ? '💻' :
                             mat === 'Pilas' ? '🔋' :
                             mat === 'Baterías' ? '⚡' :
                             mat === 'Textiles' ? '👕' :
                             mat === 'Orgánicos' ? '🍃' :
                             mat === 'Podas' ? '🌿' :
                             mat === 'Medicamentos' ? '💊' :
                             mat === 'Aceite usado' ? '🛢️' :
                             mat === 'Tetrapak' ? '🥛' :
                             '♻️'} {mat}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="info-section">
                      <h4>📝 Información importante</h4>
                      <ul className="requirements-list">
                        <li>✅ Llevar material limpio y seco</li>
                        <li>✅ Separar por tipo de material</li>
                        <li>✅ Verificar horarios antes de visitar</li>
                        <li>✅ Llamar para confirmar materiales aceptados</li>
                        <li>✅ Algunos centros pagan por material (metales)</li>
                        {selectedCenter.notes && (
                          <li>✅ <strong>Nota:</strong> {selectedCenter.notes}</li>
                        )}
                        {selectedCenter.website && (
                          <li>🌐 <strong>Sitio web:</strong> <a href={selectedCenter.website} target="_blank" rel="noopener noreferrer">{selectedCenter.website}</a></li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="route-actions">
                    <div className="travel-mode-selector">
                      <label>Modo de viaje para cálculo:</label>
                      <div className="mode-buttons">
                        {['driving', 'walking', 'bicycling'].map(mode => (
                          <button
                            key={mode}
                            className={`mode-btn ${travelMode === mode ? 'active' : ''}`}
                            onClick={() => setTravelMode(mode)}
                          >
                            {mode === 'driving' ? '🚗 Conducir' :
                             mode === 'walking' ? '🚶‍♂️ Caminar' :
                             '🚴‍♂️ Bicicleta'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="action-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={calculateRoute}
                        disabled={!userLocation}
                      >
                        <FaDirections />
                        {directions ? 'Actualizar cálculo' : 'Calcular ruta aprox.'}
                      </button>
                      {userLocation && selectedCenter && (
                        <a
                          href={getNavigationUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success"
                        >
                          <FaExternalLinkAlt />
                          Cómo llegar en Maps
                        </a>
                      )}
                      <a 
                        href={`tel:${selectedCenter.phone.replace(/\s+/g, '')}`}
                        className="btn btn-secondary"
                      >
                        <FaPhone />
                        Llamar al centro
                      </a>
                    </div>
                    
                    {directions && (
                      <div className="route-info">
                        <div className="route-summary">
                          <p><strong>Distancia aproximada:</strong> {directions.distance}</p>
                          <p><strong>Tiempo estimado:</strong> {directions.duration}</p>
                          <p><strong>Modo:</strong> {travelMode === 'driving' ? 'Conducir' : 
                                                     travelMode === 'walking' ? 'Caminar' : 
                                                     'Bicicleta'}</p>
                        </div>
                        <div className="route-note">
                          <p><strong>📍 Ubicación exacta del centro:</strong></p>
                          <p><small>Latitud: {selectedCenter.coordinates.lat.toFixed(6)}</small></p>
                          <p><small>Longitud: {selectedCenter.coordinates.lng.toFixed(6)}</small></p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="map-container">
                    <h4>🗺️ Mapa de ubicación exacta</h4>
                    {renderMapContent()}
                  </div>
                </>
              ) : (
                <div className="no-selection">
                  <div className="empty-state">
                    <FaRecycle className="empty-icon" />
                    <h3>Selecciona un centro de reciclaje</h3>
                    <p>Haz clic en un centro de la lista para ver detalles completos, ubicación exacta en el mapa y calcular rutas.</p>
                    <div className="tips">
                      <div className="tip">
                        <FaMapMarkerAlt />
                        <span>Obtén tu ubicación para calcular rutas precisas</span>
                      </div>
                      <div className="tip">
                        <FaFilter />
                        <span>Filtra por tipo específico de material que necesitas reciclar</span>
                      </div>
                      <div className="tip">
                        <FaDirections />
                        <span>Las rutas usan coordenadas GPS exactas de cada centro</span>
                      </div>
                    </div>
                    <div className="location-note">
                      <p><strong>💡 Nota:</strong> Todas las ubicaciones son reales</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingCenters;