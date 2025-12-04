// components/RecyclingCenters.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaRoute, 
  FaClock, 
  FaRecycle,
  FaDirections,
  FaLocationArrow
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import './RecyclingCenters.css';

const RecyclingCenters = () => {
  const [location, setLocation] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userMarker, setUserMarker] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDB5KtINM3A1lJzFxnW5xIJm7l-F31EJjM'; // Usar variable de entorno

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

  // Cargar Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API cargada');
        setIsMapLoaded(true);
      };
      script.onerror = () => {
        console.error('Error cargando Google Maps API');
        setIsMapLoaded(false);
      };
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      setIsMapLoaded(true);
    }
  }, [GOOGLE_MAPS_API_KEY]);

  // Inicializar mapa cuando la API está cargada
  useEffect(() => {
    if (isMapLoaded && window.google && mapRef.current && !map) {
      console.log('Inicializando mapa...');
      
      const mapOptions = {
        center: { lat: 10.3157, lng: -84.4281 },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      
      try {
        const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);
        console.log('Mapa inicializado correctamente');
        
        // Crear renderizador de direcciones
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
          map: newMap,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#3B82F6',
            strokeOpacity: 0.8,
            strokeWeight: 5
          }
        });
        setDirectionsRenderer(newDirectionsRenderer);
        
        // Agregar marcadores iniciales
        addMarkersToMap(newMap);
        
      } catch (error) {
        console.error('Error inicializando mapa:', error);
      }
    }
  }, [isMapLoaded, map]);

  // Agregar marcadores al mapa
  const addMarkersToMap = (mapInstance) => {
    if (!mapInstance || !window.google) return;
    
    // Limpiar marcadores anteriores
    markers.forEach(marker => {
      if (marker) marker.setMap(null);
    });
    
    const newMarkers = centers.map(center => {
      const marker = new window.google.maps.Marker({
        position: center.coordinates,
        map: mapInstance,
        title: center.name,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        },
        animation: window.google.maps.Animation.DROP
      });
      
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 250px;">
            <h3 style="margin: 0 0 5px 0; color: #1E293B; font-size: 16px;">${center.name}</h3>
            <p style="margin: 0 0 5px 0; color: #64748B; font-size: 14px;">
              <span style="color: #10B981;">📍</span> ${center.address}
            </p>
            <p style="margin: 0 0 5px 0; color: #64748B; font-size: 14px;">
              <span style="color: #F59E0B;">🕒</span> ${center.hours}
            </p>
            <div style="margin-top: 8px;">
              ${center.materials.map(mat => 
                `<span style="background: #EFF6FF; color: #3B82F6; padding: 4px 10px; border-radius: 12px; margin-right: 4px; margin-bottom: 4px; font-size: 12px; display: inline-block;">${mat}</span>`
              ).join('')}
            </div>
            <div style="margin-top: 10px; display: flex; gap: 8px;">
              <span style="background: #FEF3C7; color: #92400E; padding: 4px 8px; border-radius: 8px; font-size: 12px;">
                ⭐ ${center.rating} (${center.reviews})
              </span>
            </div>
          </div>
        `
      });
      
      marker.addListener('click', () => {
        setSelectedCenter(center);
        infoWindow.open(mapInstance, marker);
        mapInstance.panTo(center.coordinates);
        mapInstance.setZoom(15);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
  };

  // Actualizar marcadores cuando se filtran los centros
  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach(marker => {
        const centerId = parseInt(marker.getTitle()?.match(/\d+/)?.[0]) || marker.getTitle();
        const isVisible = filteredCenters.some(center => 
          center.id === centerId || center.name === marker.getTitle()
        );
        marker.setVisible(isVisible);
      });
    }
  }, [filteredCenters, map, markers]);

  // Obtener ubicación del usuario
  const getUserLocation = () => {
    if (!isMapLoaded || !window.google) {
      alert('Google Maps aún no está cargado. Por favor espera unos segundos.');
      return;
    }

    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          // Actualizar campo de ubicación usando geocoding
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userPos }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
              setLocation(results[0].formatted_address);
            } else {
              setLocation(`Lat: ${userPos.lat.toFixed(6)}, Lng: ${userPos.lng.toFixed(6)}`);
            }
          });
          
          // Agregar marcador del usuario
          if (map) {
            if (userMarker) {
              userMarker.setMap(null);
            }
            
            const newUserMarker = new window.google.maps.Marker({
              position: userPos,
              map: map,
              title: 'Tu ubicación',
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(50, 50)
              },
              animation: window.google.maps.Animation.BOUNCE
            });
            
            setUserMarker(newUserMarker);
            
            // Centrar mapa en la ubicación del usuario
            map.panTo(userPos);
            map.setZoom(14);
          }
          
          setIsLoadingLocation(false);
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

  // Calcular ruta
  const calculateRoute = () => {
    if (!isMapLoaded || !window.google) {
      alert('Google Maps aún no está cargado. Por favor espera unos segundos.');
      return;
    }

    if (!userLocation) {
      alert('Primero obtén tu ubicación usando el botón "Usar ubicación"');
      return;
    }

    if (!selectedCenter) {
      alert('Selecciona un centro de reciclaje de la lista');
      return;
    }

    if (!directionsRenderer) {
      alert('El renderizador de rutas no está disponible');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: userLocation,
        destination: selectedCenter.coordinates,
        travelMode: window.google.maps.TravelMode[travelMode],
        unitSystem: window.google.maps.UnitSystem.METRIC,
        language: 'es'
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          setDirections(result);
          
          // Ajustar el mapa para mostrar toda la ruta
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(userLocation);
          bounds.extend(selectedCenter.coordinates);
          map.fitBounds(bounds);
          
        } else {
          console.error('Error calculando ruta:', status);
          let errorMsg = 'No se pudo calcular la ruta. ';
          switch(status) {
            case 'ZERO_RESULTS':
              errorMsg += 'No se encontró una ruta entre los puntos especificados.';
              break;
            case 'OVER_QUERY_LIMIT':
              errorMsg += 'Se ha excedido el límite de consultas. Intenta más tarde.';
              break;
            case 'REQUEST_DENIED':
              errorMsg += 'La solicitud fue denegada. Verifica tu API key.';
              break;
            case 'INVALID_REQUEST':
              errorMsg += 'La solicitud es inválida.';
              break;
            default:
              errorMsg += 'Error desconocido.';
          }
          alert(errorMsg);
        }
      }
    );
  };

  // Limpiar ruta
  const clearRoute = () => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
      setDirections(null);
      if (selectedCenter && map) {
        map.panTo(selectedCenter.coordinates);
        map.setZoom(15);
      }
    }
  };

  // Manejar clic en un centro
  const handleCenterClick = (center) => {
    setSelectedCenter(center);
    if (map) {
      map.panTo(center.coordinates);
      map.setZoom(15);
    }
  };

  // Renderizar contenido del mapa
  const renderMapContent = () => {
    if (!isMapLoaded) {
      return (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Cargando mapa...</p>
          <p className="map-note">Si el mapa no carga, verifica tu conexión y API key</p>
        </div>
      );
    }

    return (
      <div className="map-wrapper">
        <div ref={mapRef} className="google-map"></div>
        <div className="map-controls">
          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => map && map.setZoom(map.getZoom() + 1)}
          >
            +
          </button>
          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => map && map.setZoom(map.getZoom() - 1)}
          >
            -
          </button>
          <button 
            className="btn btn-sm btn-primary"
            onClick={getUserLocation}
          >
            <FaLocationArrow />
            Mi ubicación
          </button>
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
            Encuentra el centro más cercano para reciclar tus materiales de manera responsable
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
                  onClick={() => setSelectedMaterialFilter('')}
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
                      <label>Modo de viaje:</label>
                      <div className="mode-buttons">
                        {['DRIVING', 'WALKING', 'BICYCLING'].map(mode => (
                          <button
                            key={mode}
                            className={`mode-btn ${travelMode === mode ? 'active' : ''}`}
                            onClick={() => setTravelMode(mode)}
                          >
                            {mode === 'DRIVING' ? '🚗 Conducir' :
                             mode === 'WALKING' ? '🚶‍♂️ Caminar' :
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
                        {directions ? 'Actualizar ruta' : 'Calcular ruta'}
                      </button>
                      <button className="btn btn-secondary">
                        <FaPhone />
                        Contactar
                      </button>
                    </div>
                    
                    {directions && directions.routes[0] && (
                      <div className="route-info">
                        <div className="route-summary">
                          <p><strong>Distancia:</strong> {directions.routes[0].legs[0].distance.text}</p>
                          <p><strong>Tiempo estimado:</strong> {directions.routes[0].legs[0].duration.text}</p>
                          <p><strong>Modo:</strong> {travelMode === 'DRIVING' ? 'Conducir' : 
                                                     travelMode === 'WALKING' ? 'Caminar' : 
                                                     'Bicicleta'}</p>
                        </div>
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
                        <span>Usa tu ubicación para encontrar centros cercanos</span>
                      </div>
                      <div className="tip">
                        <FaFilter />
                        <span>Filtra por tipo de material que necesitas reciclar</span>
                      </div>
                      <div className="tip">
                        <FaDirections />
                        <span>Calcula rutas en tiempo real</span>
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