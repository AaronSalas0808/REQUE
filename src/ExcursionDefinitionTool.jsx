// src/ExcursionDefinitionTool.jsx
import React, { useState } from 'react';

// --- Componentes Reutilizables ---

const TextInput = ({ label, value, onChange, placeholder }) => (
  <div className="form-field">
    <label>{label}:</label>
    <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

const TextAreaInput = ({ label, value, onChange, placeholder }) => (
  <div className="form-field">
    <label>{label}:</label>
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows="4" />
  </div>
);

const NumberInput = ({ label, value, onChange, min = 0 }) => (
  <div className="form-field">
    <label>{label}:</label>
    <input type="number" value={value} onChange={onChange} min={min} />
  </div>
);

const SelectInput = ({ label, value, options, onChange }) => (
  <div className="form-field">
    <label>{label}:</label>
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const TagsInput = ({ label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className="form-field">
      <label>{label}:</label>
      <div className="tags-input-container">
        {value.map((tag) => (
          <span key={tag} className="tag">
            {tag}{' '}
            <button
              onClick={() => handleRemoveTag(tag)}
            >
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          placeholder={placeholder}
          className="tags-input-inner"
        />
        <button onClick={handleAddTag} className="button success-button">Añadir</button>
      </div>
    </div>
  );
};

const ImageUpload = ({ label, images, onImagesChange, multiple = false }) => (
  <div className="form-field">
    <label>{label}:</label>
    <input
      type="file"
      accept="image/*"
      multiple={multiple}
      onChange={(e) => {
        console.log('Simulación: Archivos seleccionados:', e.target.files);
        onImagesChange([
          ...images,
          `https://via.placeholder.com/100?text=Img${images.length + 1}`,
        ]);
      }}
    />
    <div className="image-previews">
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={`Previsualización ${index + 1}`}
          className="image-preview"
        />
      ))}
    </div>
  </div>
);

const AudienceSelector = ({ selectedAudiences, onSelectionChange, availableAudiences }) => (
  <div className="audience-selector">
    {availableAudiences.map((audience) => (
      <label key={audience.id}>
        <input
          type="checkbox"
          checked={selectedAudiences.includes(audience.id)}
          onChange={(e) => {
            console.log(`Selección de público '${audience.name}': ${e.target.checked}`);
            if (e.target.checked) {
              onSelectionChange([...selectedAudiences, audience.id]);
            } else {
              onSelectionChange(selectedAudiences.filter((id) => id !== audience.id));
            }
          }}
        />{' '}
        {audience.name}
      </label>
    ))}
  </div>
);

const ItineraryBuilderVisual = ({ itinerary, onItineraryUpdate }) => {
  const addStep = () => {
    const newItinerary = [
      ...itinerary,
      {
        id: Date.now(),
        day: itinerary.length + 1,
        title: `Paso ${itinerary.length + 1}: Actividad de Ejemplo`,
        description: 'Breve descripción de las actividades de este paso.',
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

const ServiceSelectionPanelVisual = ({ selectedServices, onServiceChange }) => {
  const availableProviders = [
    { id: 'prov1', name: 'Restaurant Sabores CR', serviceType: 'Comida', description: 'Comida típica, opción vegetariana' },
    { id: 'prov2', name: 'Hotel Bosque Encantado', serviceType: 'Alojamiento', description: 'Cabañas, piscina, vistas' },
    { id: 'prov3', name: 'Aventura Canopy', serviceType: 'Actividad', description: 'Canopy extremo, puentes colgantes' },
    { id: 'prov4', name: 'Guías de Senderismo', serviceType: 'Guía', description: 'Expertos en flora y fauna local' },
  ];

  const handleSelectService = (provider) => {
    const newService = {
      providerId: provider.id,
      serviceName: provider.name,
      type: provider.serviceType,
      configuration: 'Configuración genérica',
      cost: Math.floor(Math.random() * 200) + 50,
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
        {availableProviders.map((provider) => (
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
        {selectedServices.map((service, index) => (
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
        ))}
      </ul>
    </div>
  );
};

const TransportConfigurationPanelVisual = ({ transportSegments, onTransportChange }) => {
  const availableTransportProviders = [
    { id: 'transp1', name: 'Transportes Rápidos', vehicleType: 'Buseta', capacity: 15, baseCost: 150, driverCost: 80, extraDriverCost: 60, images: [] },
    { id: 'transp2', name: 'Botes del Río', vehicleType: 'Bote', capacity: 10, baseCost: 100, driverCost: 50, images: [] },
    { id: 'transp3', name: 'Chapulines Tours', vehicleType: 'Chapulín', capacity: 6, baseCost: 200, driverCost: 90, images: [] },
  ];

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
        {availableTransportProviders.map((provider) => (
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
        {transportSegments.map((segment, index) => (
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
        ))}
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
        <input
          type="text"
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
          placeholder="Ej: Gasolinera La Lima"
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
    if (onBack) onBack();
  };

  return (
    <div className="page-container">
      <h2>
        {excursionData.id ? 'Editar Excursión' : 'Definir Nueva Excursión'}
      </h2>
      {onBack && (
        <button onClick={onBack} className="button secondary-button back-button">
          ← Volver
        </button>
      )}

      <section className="section">
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
          ]}
          onChange={(e) => handleUpdateExcursionData('type', e.target.value)}
        />
        <NumberInput
          label="Duración (días)"
          value={excursionData.durationDays}
          onChange={(e) => handleUpdateExcursionData('durationDays', parseInt(e.target.value) || 1)}
        />
        <TagsInput
          label="Palabras Clave"
          value={excursionData.keywords}
          onChange={(newKeywords) => handleUpdateExcursionData('keywords', newKeywords)}
          placeholder="montaña, río, canopy, adrenalina"
        />
        <ImageUpload
          label="Imágenes de la Excursión"
          images={excursionData.galleryImages}
          onImagesChange={(newImages) => handleUpdateExcursionData('galleryImages', newImages)}
          multiple
        />
      </section>

      <section className="section">
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

      <section className="section">
        <h3>3. Itinerario y Actividades</h3>
        <ItineraryBuilderVisual
          itinerary={excursionData.itinerary}
          onItineraryUpdate={(newItinerary) => handleUpdateExcursionData('itinerary', newItinerary)}
        />
      </section>

      <section className="section">
        <h3>4. Servicios Complementarios (Alimentación, Alojamiento, Actividades Específicas)</h3>
        <ServiceSelectionPanelVisual
          selectedServices={excursionData.associatedServices}
          onServiceChange={(newServices) => handleUpdateExcursionData('associatedServices', newServices)}
        />
      </section>

      <section className="section">
        <h3>5. Transporte (Multi-modal)</h3>
        <TransportConfigurationPanelVisual
          transportSegments={excursionData.transportSegments}
          onTransportChange={(newSegments) => handleUpdateExcursionData('transportSegments', newSegments)}
        />
      </section>

      <section className="section">
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

      <section className="section">
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
