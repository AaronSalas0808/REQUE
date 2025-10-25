// src/components/ExcursionDefinitionTool.jsx
import React, { useState } from 'react';
import { TextInput, TextAreaInput, NumberInput, SelectInput, TagsInput, ImageUpload, AudienceSelector } from './CommonInputs';

const ItineraryBuilderVisual = ({ itinerary, onItineraryUpdate }) => {
  const addStep = () => {
    const newItinerary = [
      ...itinerary,
      {
        id: Date.now(),
        day: itinerary.length + 1,
        title: `Paso ${itinerary.length + 1}: Actividad de Ejemplo`,
        description: 'Breve descripción de las actividades de este paso.',
        services: [],
        transport: [],
      },
    ];
    onItineraryUpdate(newItinerary);
    console.log('Simulación: Paso añadido al itinerario.');
  };

  const updateStep = (id, field, value) => {
    const newItinerary = itinerary.map((step) =>
      step.id === id ? { ...step, [field]: value } : step
    );
    onItineraryUpdate(newItinerary);
    console.log(`Simulación: Paso ${id} actualizado en el campo '${field}'.`);
  };

  const removeStep = (idToRemove) => {
    const newItinerary = itinerary.filter(step => step.id !== idToRemove);
    onItineraryUpdate(newItinerary);
    console.log(`Simulación: Paso ${idToRemove} eliminado.`);
  }

  return (
    <div className="itinerary-builder">
      {itinerary.map((step) => (
        <div key={step.id} className="itinerary-step">
          <h4>Día {step.day}: {step.title}</h4>
          <TextInput
            label="Título del Paso"
            value={step.title}
            onChange={(e) => updateStep(step.id, 'title', e.target.value)}
          />
          <TextAreaInput
            label="Descripción de Actividades"
            value={step.description}
            onChange={(e) => updateStep(step.id, 'description', e.target.value)}
          />
          <div className="itinerary-actions">
            <button onClick={() => console.log(`Simulación: Abrir selección de servicios para Paso ${step.day}`)} className="button info-button">
              Gestionar Servicios por Paso
            </button>
            <button onClick={() => console.log(`Simulación: Abrir selección de transporte para Paso ${step.day}`)} className="button warning-button">
              Gestionar Transporte por Paso
            </button>
            <button onClick={() => removeStep(step.id)} className="button danger-button">
              Eliminar Paso
            </button>
          </div>
        </div>
      ))}
      <button onClick={addStep} className="button primary-button">Añadir Paso al Itinerario</button>
    </div>
  );
};

// SIMULACIÓN: Catálogo de Proveedores de servicios reales
const MOCK_SERVICE_PROVIDERS_CATALOG = [
  { id: 'servProv1', name: 'Restaurant Sabores CR', serviceType: 'Alimentación', description: 'Comida típica, opción vegetariana' },
  { id: 'servProv2', name: 'Hotel Bosque Encantado', serviceType: 'Alojamiento', description: 'Cabañas rústicas, piscina, vistas' },
  { id: 'servProv3', name: 'Aventura Canopy Tours', serviceType: 'Actividad de Aventura', description: 'Canopy extremo, puentes colgantes, rappel' },
  { id: 'servProv4', name: 'Guías de Senderismo CR', serviceType: 'Guía Turístico', description: 'Guías expertos en flora y fauna local' },
];

const MOCK_TRANSPORT_PROVIDERS_CATALOG = [
  { id: 'transpProv1', name: 'Transportes Montaña', vehicleType: 'Buseta', capacity: 15, baseCost: 150, driverCost: 80, extraDriverCost: 60, images: [] },
  { id: 'transpProv2', name: 'Botes del Río Aventuras', vehicleType: 'Bote', capacity: 10, baseCost: 100, driverCost: 50, images: [] },
  { id: 'transpProv3', name: 'Chapulines Off-Road', vehicleType: 'Chapulín', capacity: 6, baseCost: 200, driverCost: 90, images: [] },
];

const ServiceSelectionPanelVisual = ({ selectedServices, onServiceChange }) => {
  const handleSelectService = (provider) => {
    const newService = {
      providerId: provider.id,
      serviceName: provider.name,
      type: provider.serviceType,
      configuration: 'Configuración pendiente',
      cost: Math.floor(Math.random() * 200) + 50, // Costo aleatorio de ejemplo
    };
    onServiceChange([...selectedServices, newService]);
    console.log(`Simulación: Servicio '${provider.name}' añadido. Se abriría un modal para configurar.`);
  };

  const handleRemoveService = (serviceToRemove) => {
    onServiceChange(selectedServices.filter(s => s !== serviceToRemove));
    console.log(`Simulación: Servicio '${serviceToRemove.serviceName}' eliminado.`);
  }

  return (
    <div className="service-selection-panel">
      <h4>Servicios Disponibles de Proveedores:</h4>
      <ul>
        {MOCK_SERVICE_PROVIDERS_CATALOG.map((provider) => (
          <li key={provider.id} className="list-item">
            <span>
              <strong>{provider.name}</strong> ({provider.serviceType}) - {provider.description}
            </span>
            <button onClick={() => handleSelectService(provider)} className="button success-button">
              Añadir
            </button>
          </li>
        ))}
      </ul>
      <h4>Servicios Seleccionados para esta Excursión:</h4>
      <ul>
        {selectedServices.length === 0 ? <p>No se han añadido servicios aún.</p> :
          selectedServices.map((service, index) => (
            <li key={index} className="list-item">
              <span>
                <strong>{service.serviceName}</strong> ({service.type}) - Costo: ${service.cost}
              </span>
              <div>
                <button onClick={() => console.log(`Simulación: Editar configuración de ${service.serviceName}`)} className="button">
                  Editar
                </button>
                <button onClick={() => handleRemoveService(service)} className="button danger-button">
                  Eliminar
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const TransportConfigurationPanelVisual = ({ transportSegments, onTransportChange }) => {
  const handleSelectTransport = (provider) => {
    const newSegment = {
      providerId: provider.id,
      vehicleType: provider.vehicleType,
      routeName: 'Ruta genérica de ejemplo',
      departureTime: 'HH:MM',
      arrivalTime: 'HH:MM',
      requiresExtraDriver: Math.random() > 0.7,
      estimatedCost: provider.baseCost + provider.driverCost,
    };
    onTransportChange([...transportSegments, newSegment]);
    console.log(`Simulación: Segmento de transporte '${provider.vehicleType}' añadido. Se abriría un formulario para detalles.`);
  };

  const handleRemoveSegment = (segmentToRemove) => {
    onTransportChange(transportSegments.filter(s => s !== segmentToRemove));
    console.log(`Simulación: Segmento de transporte de ${segmentToRemove.vehicleType} eliminado.`);
  }

  return (
    <div className="transport-config-panel">
      <h4>Opciones de Transporte de Proveedores:</h4>
      <ul>
        {MOCK_TRANSPORT_PROVIDERS_CATALOG.map((provider) => (
          <li key={provider.id} className="list-item">
            <span>
              <strong>{provider.name}</strong> ({provider.vehicleType}, Cap: {provider.capacity}) - Costo/día: $
              {provider.baseCost + provider.driverCost}
            </span>
            <button onClick={() => handleSelectTransport(provider)} className="button success-button">
              Añadir a Ruta
            </button>
          </li>
        ))}
      </ul>
      <h4>Segmentos de Transporte Definidos:</h4>
      <ul>
        {transportSegments.length === 0 ? <p>No se han añadido segmentos de transporte aún.</p> :
          transportSegments.map((segment, index) => (
            <li key={index} className="list-item">
              <span>
                <strong>{segment.vehicleType}</strong> de {segment.providerId} - Ruta: {segment.routeName}{' '}
                {segment.requiresExtraDriver ? '(Con chofer adicional)' : ''}
              </span>
              <div>
                <button onClick={() => console.log(`Simulación: Editar detalles del segmento de ${segment.vehicleType}`)} className="button">
                  Editar
                </button>
                <button onClick={() => handleRemoveSegment(segment)} className="button danger-button">
                  Eliminar
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const PickupPointsManagerVisual = ({ points, onPointsChange }) => {
  const [newPoint, setNewPoint] = useState('');

  const addPoint = () => {
    if (newPoint.trim() && !points.includes(newPoint.trim())) {
      onPointsChange([...points, newPoint.trim()]);
      setNewPoint('');
      console.log(`Simulación: Punto de recogida '${newPoint}' añadido.`);
    }
  };

  const removePoint = (pointToRemove) => {
    onPointsChange(points.filter((point) => point !== pointToRemove));
    console.log(`Simulación: Punto de recogida '${pointToRemove}' eliminado.`);
  };

  return (
    <div className="pickup-points-manager">
      <div className="add-point">
        <TextInput
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
          placeholder="Ej: Gasolinera La Lima"
          label=""
        />
        <button onClick={addPoint} className="button primary-button">Añadir</button>
      </div>
      <ul className="points-list">
        {points.map((point, index) => (
          <li key={index}>
            <span>{point}</span>
            <button onClick={() => removePoint(point)} className="button danger-button">
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente principal para la creación y edición de excursiones
const ExcursionDefinitionTool = ({ initialData = {}, onBack }) => {
  const [excursionData, setExcursionData] = useState({
    id: initialData.id || null,
    name: initialData.name || '',
    description: initialData.description || '',
    type: initialData.type || '',
    durationDays: initialData.durationDays || 1,
    capacity: initialData.capacity || 10,
    targetAudience: initialData.targetAudience || [],
    datesAvailable: initialData.datesAvailable || {
      startDate: '',
      endDate: '',
      specificDates: [],
    },
    basePrice: initialData.basePrice || 0,
    keywords: initialData.keywords || [],
    departurePoint: initialData.departurePoint || '',
    pickupPoints: initialData.pickupPoints || [],
    participantRecommendations: initialData.participantRecommendations || {
      physicalRequirements: '',
      equipmentRequired: [],
      attireSuggestions: '',
      conditionsAlerts: '',
    },
    itinerary: initialData.itinerary || [],
    associatedServices: initialData.associatedServices || [],
    transportSegments: initialData.transportSegments || [],
    galleryImages: initialData.galleryImages || [],
    status: initialData.status || 'draft',
  });

  const handleUpdateExcursionData = (field, value) => {
    setExcursionData((prevData) => ({ ...prevData, [field]: value }));
    console.log(`Campo '${field}' actualizado a:`, value);
  };

  const handleNestedUpdate = (parentField, childField, value) => {
    setExcursionData((prevData) => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [childField]: value,
      },
    }));
    console.log(`Campo anidado '${parentField}.${childField}' actualizado a:`, value);
  };

  const handleSaveOrPublish = (action) => {
    console.log(`Acción: ${action} excursión`, excursionData.id ? `(ID: ${excursionData.id})` : '(Nueva)');
    alert(`Simulación: Excursión ${action.toLowerCase()}d successfully!`);
    if (onBack) onBack(excursionData.id ? 'edit' : 'new');
  };

  return (
    <div className="page-container">
      <h2>
        {excursionData.id ? 'Editar Excursión' : 'Definir Nueva Excursión'}
      </h2>
      {onBack && (
        <button onClick={onBack} className="button secondary-button" style={{ marginBottom: '20px' }}>
          ← Volver
        </button>
      )}

      <section className="section-card">
        <h3>1. Información General</h3>
        <TextInput
          label="Nombre de la Excursión"
          value={excursionData.name}
          onChange={(e) => handleUpdateExcursionData('name', e.target.value)}
          placeholder="Ej: Aventura en el Bosque Nuboso"
        />
        <TextAreaInput
          label="Descripción Detallada"
          value={excursionData.description}
          onChange={(e) => handleUpdateExcursionData('description', e.target.value)}
          placeholder="Describe en detalle la experiencia, lo que incluye, lo que se espera..."
        />
        <SelectInput
          label="Tipo de Excursión"
          value={excursionData.type}
          options={[
            { value: '', label: 'Seleccione un tipo' },
            { value: 'aventura', label: 'Aventura' },
            { value: 'deportes', label: 'Deportes' },
            { value: 'familiar', label: 'Familiar' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'relax', label: 'Relajación' },
          ]}
          onChange={(e) => handleUpdateExcursionData('type', e.target.value)}
        />
        <NumberInput
          label="Duración (días)"
          value={excursionData.durationDays}
          onChange={(e) => handleUpdateExcursionData('durationDays', parseInt(e.target.value) || 1)}
          min={1}
        />
        <NumberInput
          label="Capacidad Máxima de Participantes"
          value={excursionData.capacity}
          onChange={(e) => handleUpdateExcursionData('capacity', parseInt(e.target.value) || 10)}
          min={1}
        />
        <TextInput
          label="Precio Base por Persona"
          type="number"
          value={excursionData.basePrice}
          onChange={(e) => handleUpdateExcursionData('basePrice', parseFloat(e.target.value) || 0)}
          placeholder="Ej: 150.00"
          min={0}
        />
        <TextInput
            label="Fecha de Inicio"
            type="date"
            value={excursionData.datesAvailable.startDate}
            onChange={(e) => handleNestedUpdate('datesAvailable', 'startDate', e.target.value)}
        />
        <TextInput
            label="Fecha de Fin"
            type="date"
            value={excursionData.datesAvailable.endDate}
            onChange={(e) => handleNestedUpdate('datesAvailable', 'endDate', e.target.value)}
        />
        <TagsInput
          label="Palabras Clave"
          value={excursionData.keywords}
          onChange={(newKeywords) => handleUpdateExcursionData('keywords', newKeywords)}
          placeholder="montaña, río, canopy, adrenalina"
        />
        <ImageUpload
          label="Galería de Imágenes de la Excursión"
          images={excursionData.galleryImages}
          onImagesChange={(newImages) => handleUpdateExcursionData('galleryImages', newImages)}
          multiple
        />
      </section>

      <section className="section-card">
        <h3>2. Público Meta</h3>
        <AudienceSelector
          selectedAudiences={excursionData.targetAudience}
          onSelectionChange={(selected) => handleUpdateExcursionData('targetAudience', selected)}
          availableAudiences={[
            { id: 'families', name: 'Familias' },
            { id: 'athletes', name: 'Deportistas' },
            { id: 'children', name: 'Niños' },
            { id: 'teens', name: 'Adolescentes' },
            { id: 'elderly', name: 'Tercera Edad' },
            { id: 'adults', name: 'Adultos' },
          ]}
        />
      </section>

      <section className="section-card">
        <h3>3. Itinerario y Actividades</h3>
        <ItineraryBuilderVisual
          itinerary={excursionData.itinerary}
          onItineraryUpdate={(newItinerary) => handleUpdateExcursionData('itinerary', newItinerary)}
        />
      </section>

      <section className="section-card">
        <h3>4. Servicios Complementarios (Integración con catálogo de proveedores)</h3>
        <p className="text-color-light" style={{ marginBottom: '20px' }}>
          Selecciona servicios de nuestro catálogo de proveedores.
        </p>
        <ServiceSelectionPanelVisual
          selectedServices={excursionData.associatedServices}
          onServiceChange={(newServices) => handleUpdateExcursionData('associatedServices', newServices)}
        />
      </section>

      <section className="section-card">
        <h3>5. Transporte (Multi-modal e Integración con catálogo de proveedores)</h3>
        <p className="text-color-light" style={{ marginBottom: '20px' }}>
          Define los segmentos de transporte necesarios para tu excursión, eligiendo de los proveedores disponibles.
        </p>
        <TransportConfigurationPanelVisual
          transportSegments={excursionData.transportSegments}
          onTransportChange={(newSegments) => handleUpdateExcursionData('transportSegments', newSegments)}
        />
      </section>

      <section className="section-card">
        <h3>6. Puntos de Partida y Recogida</h3>
        <TextInput
          label="Punto de Partida Principal"
          value={excursionData.departurePoint}
          onChange={(e) => handleUpdateExcursionData('departurePoint', e.target.value)}
          placeholder="Ej: Parque Central de San José"
        />
        <PickupPointsManagerVisual
          points={excursionData.pickupPoints}
          onPointsChange={(newPoints) => handleUpdateExcursionData('pickupPoints', newPoints)}
        />
      </section>

      <section className="section-card">
        <h3>7. Recomendaciones y Requisitos para Participantes</h3>
        <TextAreaInput
          label="Exigencias Físicas"
          value={excursionData.participantRecommendations.physicalRequirements}
          onChange={(e) =>
            handleNestedUpdate(
              'participantRecommendations',
              'physicalRequirements',
              e.target.value
            )
          }
          placeholder="Ej: Requiere buena condición física para caminatas largas."
        />
        <TagsInput
          label="Equipo Requerido"
          value={excursionData.participantRecommendations.equipmentRequired}
          onChange={(newEquipment) =>
            handleNestedUpdate(
              'participantRecommendations',
              'equipmentRequired',
              newEquipment
            )
          }
          placeholder="Ej: Zapatos de trekking, protector solar, cámara acuática"
        />
        <TextInput
          label="Vestimenta Sugerida"
          value={excursionData.participantRecommendations.attireSuggestions}
          onChange={(e) =>
            handleNestedUpdate(
              'participantRecommendations',
              'attireSuggestions',
              e.target.value
            )
          }
          placeholder="Ej: Ropa cómoda y ligera, traje de baño, chaqueta impermeable"
        />
        <TextAreaInput
          label="Condiciones / Advertencias"
          value={excursionData.participantRecommendations.conditionsAlerts}
          onChange={(e) =>
            handleNestedUpdate(
              'participantRecommendations',
              'conditionsAlerts',
              e.target.value
            )
          }
          placeholder="Ej: Posibilidad de lluvia, exposición al sol, terrenos irregulares"
        />
      </section>

      <div className="action-buttons">
        <button onClick={() => handleSaveOrPublish('Guardar Borrador')} className="button">
          Guardar Borrador
        </button>
        <button onClick={() => handleSaveOrPublish('Publicar')} className="button primary-button">
          Publicar Excursión
        </button>
        {excursionData.id && excursionData.status !== 'archived' && (
          <button onClick={() => handleSaveOrPublish('Archivar')} className="button danger-button">
            Archivar
          </button>
        )}
      </div>
    </div>
  );
};

export default ExcursionDefinitionTool;