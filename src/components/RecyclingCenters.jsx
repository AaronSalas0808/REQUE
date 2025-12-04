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

  const centers = [
    { 
      id: 1, 
      name: 'EcoCentro Central', 
      address: 'San Carlos, Alajuela, Costa Rica', 
      distance: '2.5 km',
      hours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-12:00',
      materials: ['Plástico', 'Vidrio', 'Metales'],
      coordinates: { lat: 10.3157, lng: -84.4281 },
      phone: '+506 2461-1234',
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2, 
      name: 'ReciColecta', 
      address: 'Ciudad Quesada, Alajuela, Costa Rica', 
      distance: '3.8 km',
      hours: 'Mar-Sáb: 9:00-16:00',
      materials: ['Papel', 'Electrónicos', 'Plástico'],
      coordinates: { lat: 10.3235, lng: -84.4270 },
      phone: '+506 2461-5678',
      rating: 4.2,
      reviews: 89
    },
    { 
      id: 3, 
      name: 'Punto Azul', 
      address: 'Florencia, San Carlos, Costa Rica', 
      distance: '5.2 km',
      hours: 'Mié-Dom: 7:00-15:00',
      materials: ['Vidrio', 'Metales', 'Textiles'],
      coordinates: { lat: 10.3350, lng: -84.4450 },
      phone: '+506 2461-9012',
      rating: 4.7,
      reviews: 156
    },
    { 
      id: 4, 
      name: 'Green Recycling', 
      address: 'Agua Azul, San Carlos, Costa Rica', 
      distance: '7.1 km',
      hours: 'Lun-Sáb: 8:30-18:00',
      materials: ['Plástico', 'Papel', 'Electrónicos', 'Orgánicos'],
      coordinates: { lat: 10.3400, lng: -84.4600 },
      phone: '+506 2461-3456',
      rating: 4.0,
      reviews: 72
    },
  ];

  const materialTypes = ['Todos', 'Plástico', 'Papel', 'Vidrio', 'Metales', 'Electrónicos', 'Textiles', 'Orgánicos'];

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
          
          // Simular geocoding inverso
          const address = `Lat: ${userPos.lat.toFixed(6)}, Lng: ${userPos.lng.toFixed(6)}`;
          setLocation(address);
          
          setIsLoadingLocation(false);
          
          // Mostrar mensaje de éxito
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

  // Calcular distancia aproximada (simulada)
  const calculateRoute = () => {
    if (!userLocation) {
      alert('Primero obtén tu ubicación usando el botón "Usar ubicación"');
      return;
    }

    if (!selectedCenter) {
      alert('Selecciona un centro de reciclaje de la lista');
      return;
    }

    // Simular cálculo de distancia (Haversine formula simplificada)
    const R = 6371; // Radio de la Tierra en km
    const dLat = (selectedCenter.coordinates.lat - userLocation.lat) * Math.PI / 180;
    const dLon = (selectedCenter.coordinates.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(selectedCenter.coordinates.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    // Tiempo estimado basado en modo de transporte
    let duration;
    let speed;
    switch(travelMode) {
      case 'driving':
        speed = 50; // km/h promedio
        duration = (distance / speed) * 60; // minutos
        break;
      case 'walking':
        speed = 5; // km/h caminando
        duration = (distance / speed) * 60;
        break;
      case 'bicycling':
        speed = 15; // km/h en bicicleta
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

  // Abrir en Google Maps
  const openInGoogleMaps = () => {
    if (selectedCenter) {
      const { lat, lng } = selectedCenter.coordinates;
      window.open(`https://www.google.com/maps?q=${lat},${lng}&z=15`, '_blank');
    }
  };

  // Obtener URL del mapa embebido
  const getMapEmbedUrl = (center) => {
    if (!center) return '';
    const { lat, lng } = center.coordinates;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&t=${mapType}`;
  };

  // Obtener URL para navegación
  const getNavigationUrl = () => {
    if (!userLocation || !selectedCenter) return '#';
    const { lat: destLat, lng: destLng } = selectedCenter.coordinates;
    return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destLat},${destLng}/`;
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
          ></iframe>
        </div>
        <div className="map-controls">
          <div className="map-type-buttons">
            <button
              className={`btn btn-sm ${mapType === 'roadmap' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMapType('roadmap')}
            >
              Mapa
            </button>
            <button
              className={`btn btn-sm ${mapType === 'satellite' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMapType('satellite')}
            >
              Satélite
            </button>
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
            <span>Centros de Reciclaje Cercanos</span>
          </div>
          <p className="card-subtitle">
            Encuentra el centro más cercano para reciclar tus materiales de manera responsable.
            <br />
            <small>Los mapas se muestran usando Google Maps embebido</small>
          </p>
        </div>
        
        <div className="search-filters">
          <div className="filter-section">
            <div className="filter-header">
              <FaSearch />
              <h3>Buscar centros</h3>
            </div>
            
            <div className="form-group">
              <label className="form-label">Tu ubicación</label>
              <div className="location-input">
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ingresa tu dirección o usa ubicación actual"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
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
                      Usar ubicación
                    </>
                  )}
                </button>
              </div>
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
                     '🍃 Orgánicos'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="centers-container">
          <div className="centers-list">
            <div className="list-header">
              <h3>Centros encontrados: {filteredCenters.length}</h3>
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
                  <p className="hours">
                    <FaClock />
                    {center.hours}
                  </p>
                  <div className="center-meta">
                    <span className="rating">⭐ {center.rating} ({center.reviews} reseñas)</span>
                  </div>
                  <div className="center-materials">
                    {center.materials.map(mat => (
                      <span key={mat} className="material-tag">
                        {mat === 'Plástico' ? '🔵' : 
                         mat === 'Papel' ? '📄' :
                         mat === 'Vidrio' ? '🥃' :
                         mat === 'Metales' ? '⚙️' :
                         mat === 'Electrónicos' ? '💻' :
                         mat === 'Textiles' ? '👕' :
                         '🍃'} {mat}
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
                          <strong>Dirección:</strong>
                          <span>{selectedCenter.address}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaRoute />
                        </div>
                        <div>
                          <strong>Distancia:</strong>
                          <span>{selectedCenter.distance}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaClock />
                        </div>
                        <div>
                          <strong>Horario:</strong>
                          <span>{selectedCenter.hours}</span>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon">
                          <FaPhone />
                        </div>
                        <div>
                          <strong>Teléfono:</strong>
                          <span>{selectedCenter.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-section">
                      <h4>Materiales aceptados</h4>
                      <div className="materials-list">
                        {selectedCenter.materials.map(mat => (
                          <div key={mat} className="material-accepted">
                            {mat === 'Plástico' ? '🔵' : 
                             mat === 'Papel' ? '📄' :
                             mat === 'Vidrio' ? '🥃' :
                             mat === 'Metales' ? '⚙️' :
                             mat === 'Electrónicos' ? '💻' :
                             mat === 'Textiles' ? '👕' :
                             '🍃'} {mat}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="info-section">
                      <h4>Requisitos de reciclaje</h4>
                      <ul className="requirements-list">
                        <li>✅ Material limpio y seco</li>
                        <li>✅ Separado por tipo de material</li>
                        <li>✅ Máximo 20 kg por visita</li>
                        <li>✅ No aceptan materiales peligrosos</li>
                        <li>✅ Tarjetas de identificación pueden ser requeridas</li>
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
                          Navegación en Maps
                        </a>
                      )}
                      <button className="btn btn-secondary">
                        <FaPhone />
                        Contactar
                      </button>
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
                        <p className="map-note" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                          * Para navegación precisa, usa el botón "Navegación en Maps"
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="map-container">
                    <h4>🗺️ Mapa y Navegación</h4>
                    {renderMapContent()}
                  </div>
                </>
              ) : (
                <div className="no-selection">
                  <div className="empty-state">
                    <FaRecycle className="empty-icon" />
                    <h3>Selecciona un centro</h3>
                    <p>Haz clic en un centro de reciclaje de la lista para ver detalles completos, ubicación en el mapa y calcular rutas.</p>
                    <div className="tips">
                      <div className="tip">
                        <FaMapMarkerAlt />
                        <span>Usa tu ubicación para calcular distancias</span>
                      </div>
                      <div className="tip">
                        <FaFilter />
                        <span>Filtra por tipo de material que necesitas reciclar</span>
                      </div>
                      <div className="tip">
                        <FaDirections />
                        <span>Calcula rutas aproximadas y abre navegación en Google Maps</span>
                      </div>
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