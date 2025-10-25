// src/components/ExcursionDetailView.jsx
import React, { useState, useEffect } from 'react';
import { TextInput, SelectInput, NumberInput } from './CommonInputs';

// SIMULACIÓN: Datos detallados de una excursión
const MOCK_DETAILED_EXCURSIONS = {
  'custEx1': {
    id: 'custEx1',
    name: 'Rafting en Río Pacuare (3 días)',
    images: [
      'https://source.unsplash.com/random/600x400?rafting-main',
      'https://source.unsplash.com/random/200x150?rafting-gallery1',
      'https://source.unsplash.com/random/200x150?rafting-gallery2',
      'https://source.unsplash.com/random/200x150?rafting-gallery3',
    ],
    description: 'Sumérgete en una aventura sin igual con nuestro tour de rafting de 3 días en el río Pacuare, clasificado entre los 10 mejores del mundo. Disfrutarás de rápidos emocionantes, paisajes de selva virgen y campamentos bajo las estrellas. Todo incluido para una experiencia inolvidable. Descubre la exuberante biodiversidad de Costa Rica mientras navegas por sus aguas turbulentas, una experiencia perfecta para los amantes de la adrenalina y la naturaleza.',
    type: 'aventura',
    targetAudience: ['adults', 'athletes'],
    durationDays: 3,
    basePrice: 280, // Precio por persona
    datesAvailable: '10-12 Diciembre, 2025',
    keywords: ['rafting', 'agua', 'adrenalina', 'selva', 'campamento'],
    rating: 4.8,
    itinerary: [
      { day: 1, title: 'Llegada y Preparación', description: 'Encuentro en San José, traslado a Turrialba y luego al lodge. Charla de seguridad, asignación de equipo y cena de bienvenida.' },
      { day: 2, title: 'Día de Rafting Intenso', description: 'Descenso por los rápidos clase III-IV del Pacuare, con paradas para nadar y explorar. Almuerzo tipo picnic en el río y noche de campamento junto a la ribera.' },
      { day: 3, title: 'Últimos Rápidos y Regreso', description: 'Disfruta de más rápidos por la mañana, desayuno en el campamento, almuerzo de despedida y traslado de regreso a San José.' },
    ],
    servicesIncluded: [
      'Transporte terrestre ida y vuelta desde San José',
      'Alojamiento en lodge/campamento (2 noches)',
      'Todas las comidas y bebidas no alcohólicas durante la excursión',
      'Equipo de rafting completo y certificado (cascos, chalecos, remos)',
      'Guías bilingües y certificados por la ACA (American Canoe Association)',
      'Seguro de aventura y primeros auxilios',
      'Fotografías de la excursión (opcional, costo adicional)',
    ],
    recommendations: {
      physicalRequirements: 'Buena condición física. Se requiere saber nadar. Capacidad para remar activamente.',
      equipmentRequired: ['Traje de baño', 'Sandalias de río o zapatos cerrados para agua', 'Ropa seca y abrigada para la noche', 'Protector solar (biodegradable)', 'Repelente de insectos', 'Gorra/sombrero', 'Linterna o frontal', 'Botella de agua reutilizable'],
      attireSuggestions: 'Ropa cómoda y ligera para mojar. Para la noche, capas de ropa para el frío.',
      conditionsAlerts: 'Posibilidad de lluvia torrencial. Exposición prolongada al sol. Contacto con vida silvestre (insectos). Flujo rápido del río. Terreno resbaladizo.',
    },
    availableSpaces: 20,
    bookedSpaces: 10,
    pickupPoints: ['San José Centro', 'Parque Braulio Carrillo', 'Hotel en Turrialba (previa coordinación)'],
  },
  'custEx2': {
    id: 'custEx2',
    name: 'Relajación en Playa Conchal (5 días)',
    images: [
        'https://source.unsplash.com/random/600x400?beach-resort',
        'https://source.unsplash.com/random/200x150?beach-sunset',
        'https://source.unsplash.com/random/200x150?beach-pool'
    ],
    description: 'Cinco días de puro descanso en la impresionante Playa Conchal, conocida por su arena de conchas trituradas y aguas turquesas. Disfruta de la tranquilidad, el sol y las opciones de recreación en un hotel de lujo con todo incluido. Ideal para familias y parejas que buscan desconectar.',
    type: 'relax',
    targetAudience: ['families', 'adults', 'elderly'],
    durationDays: 5,
    basePrice: 450,
    datesAvailable: '20-25 Enero, 2026',
    keywords: ['playa', 'sol', 'relax', 'lujo', 'hotel todo incluido'],
    rating: 4.5,
    itinerary: [
        { day: 1, title: 'Llegada y Check-in', description: 'Traslado cómodo al hotel en Playa Conchal. Cóctel de bienvenida y tiempo libre para explorar las instalaciones del resort.' },
        { day: 2, title: 'Día de Sol y Mar', description: 'Disfruta de la playa, la piscina del hotel o participa en actividades acuáticas no motorizadas (kayak, paddleboard).' },
        { day: 3, title: 'Exploración Opcional', description: 'Día libre. Opciones: tour de snorkel en Isla Catalina, visita al pueblo de Tamarindo (actividades no incluidas).' },
        { day: 4, title: 'Último Día de Relax', description: 'Disfruta de las últimas horas de playa y sol. Noche de cena especial de despedida en uno de los restaurantes temáticos del hotel.' },
        { day: 5, title: 'Desayuno y Salida', description: 'Desayuno buffet y traslado de regreso a tu punto de origen.' },
    ],
    servicesIncluded: [
        'Transporte terrestre ida y vuelta desde San José',
        'Alojamiento 4 noches en hotel 4 estrellas "Todo Incluido"',
        'Todas las comidas y bebidas ilimitadas',
        'Acceso a todas las facilidades y entretenimiento del hotel',
        'Seguro de viaje básico',
    ],
    recommendations: {
        physicalRequirements: 'Ninguna exigencia física especial. Accesible para todas las edades.',
        equipmentRequired: ['Bloqueador solar (alto SPF)', 'Sombrero o gorra', 'Gafas de sol', 'Cámara fotográfica', 'Repelente de insectos'],
        attireSuggestions: 'Ropa ligera de playa, trajes de baño, sandalias, ropa casual elegante para las noches.',
        conditionsAlerts: 'Alta exposición al sol. Llevar hidratación constante. Posibilidad de lluvias tropicales intermitentes.',
    },
    availableSpaces: 30,
    bookedSpaces: 5,
    pickupPoints: ['Heredia Centro', 'Aeropuerto Juan Santamaría (SJO)'],
  },
  // ... más excursiones detalladas
};


const ExcursionDetailView = ({ excursionId, onBack, onEnrollSuccess }) => {
  const [excursion, setExcursion] = useState(null);
  const [numParticipants, setNumParticipants] = useState(1);
  const [participantNames, setParticipantNames] = useState(['']);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    console.log(`Simulación: Cargando detalles para excursión ID: ${excursionId}`);
    const data = MOCK_DETAILED_EXCURSIONS[excursionId];
    if (data) {
      setExcursion(data);
      if (data.pickupPoints && data.pickupPoints.length > 0) {
        setSelectedPickupPoint(data.pickupPoints[0]);
      }
    } else {
      alert('Excursión no encontrada.');
      onBack();
    }
  }, [excursionId, onBack]);

  const handleNumParticipantsChange = (value) => {
    const newNum = parseInt(value);
    if (isNaN(newNum) || newNum < 1) {
      setNumParticipants(1);
      setParticipantNames(['']);
      return;
    }
    setNumParticipants(newNum);
    setParticipantNames(prevNames => {
      const newNames = [...prevNames];
      while (newNames.length < newNum) newNames.push('');
      return newNames.slice(0, newNum);
    });
  };

  const handleParticipantNameChange = (index, name) => {
    setParticipantNames(prevNames => {
      const newNames = [...prevNames];
      newNames[index] = name;
      return newNames;
    });
  };

  const handleEnroll = () => {
    if (!excursion) return;
    if (numParticipants > (excursion.availableSpaces - excursion.bookedSpaces)) {
      alert(`No hay suficientes espacios disponibles. Solo quedan ${excursion.availableSpaces - excursion.bookedSpaces} espacios.`);
      return;
    }
    if (participantNames.some(name => name.trim() === '')) {
      alert('Por favor, ingresa los nombres de todos los participantes.');
      return;
    }
    if (!selectedPickupPoint) {
        alert('Por favor, selecciona un punto de recogida.');
        return;
    }

    setIsEnrolling(true);
    console.log('Simulación: Iniciando proceso de inscripción...');
    console.log('Datos de inscripción:', {
      excursionId: excursion.id,
      numParticipants,
      participantNames,
      selectedPickupPoint,
      totalAmount: numParticipants * excursion.basePrice,
    });

    // Simular procesamiento de pago
    setTimeout(() => {
      alert(`¡Inscripción exitosa para ${numParticipants} personas en "${excursion.name}"! Total: $${numParticipants * excursion.basePrice}. Se ha enviado un correo de confirmación.`);
      console.log('Simulación: Pago procesado y confirmación enviada.');
      setIsEnrolling(false);
      onEnrollSuccess(excursion.id);
    }, 2000);
  };

  if (!excursion) {
    return <div className="page-container">Cargando detalles de la excursión...</div>;
  }

  const availableSlots = excursion.availableSpaces - excursion.bookedSpaces;

  return (
    <div className="page-container">
      <button onClick={onBack} className="button secondary-button" style={{ marginBottom: '20px' }}>
        ← Volver a la Búsqueda
      </button>

      <div className="excursion-detail-header">
        <h2>{excursion.name}</h2>
        <p className="text-color-light">{excursion.description.substring(0, 150)}...</p>
        <span className="star-rating">{'★'.repeat(Math.floor(excursion.rating))} <span className="rating-value">({excursion.rating})</span></span>
      </div>

      <div className="excursion-detail-gallery">
        {excursion.images.map((img, index) => (
          <img key={index} src={img} alt={`${excursion.name} - ${index}`} />
        ))}
      </div>

      <div className="excursion-detail-info">
        <div className="excursion-description">
          <section className="section-card">
            <h4>Descripción Detallada</h4>
            <p>{excursion.description}</p>
          </section>

          <section className="section-card">
            <h4>Itinerario de la Excursión</h4>
            <ul>
              {excursion.itinerary.map((item, index) => (
                <li key={index}>
                  <strong>Día {item.day}: {item.title}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section-card">
            <h4>Servicios Incluidos</h4>
            <ul>
              {excursion.servicesIncluded.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </section>

          <section className="section-card">
            <h4>Recomendaciones y Requisitos</h4>
            <h5>Exigencias Físicas:</h5>
            <p>{excursion.recommendations.physicalRequirements}</p>
            <h5>Equipo Requerido:</h5>
            <ul>
              {excursion.recommendations.equipmentRequired.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <h5>Vestimenta Sugerida:</h5>
            <p>{excursion.recommendations.attireSuggestions}</p>
            <h5>Condiciones / Advertencias:</h5>
            <p>{excursion.recommendations.conditionsAlerts}</p>
          </section>
        </div>

        <div className="excursion-summary-and-enrollment">
          <div className="excursion-summary-box">
            <h4>Detalles Rápidos</h4>
            <p>Tipo: <strong>{excursion.type}</strong></p>
            <p>Público: <strong>{excursion.targetAudience.join(', ')}</strong></p>
            <p>Duración: <strong>{excursion.durationDays} días</strong></p>
            <p>Fechas: <strong>{excursion.datesAvailable}</strong></p>
            <p>Precio por persona: <span className="price"><strong>${excursion.basePrice}</strong></span></p>
            <p>Espacios Disponibles: <strong>{availableSlots}</strong> de {excursion.availableSpaces}</p>
          </div>

          <section className="section-card enrollment-form" style={{ marginTop: '30px' }}>
            <h5>Inscripción a la Excursión</h5>
            <NumberInput
              label="Número de Participantes"
              value={numParticipants}
              onChange={(e) => handleNumParticipantsChange(e.target.value)}
              min={1}
              max={availableSlots}
            />

            {Array.from({ length: numParticipants }).map((_, index) => (
              <div key={index} className="participant-input-group">
                <TextInput
                  label={`Nombre Completo Participante ${index + 1}`}
                  value={participantNames[index]}
                  onChange={(e) => handleParticipantNameChange(index, e.target.value)}
                  placeholder="Ej: Laura Méndez"
                />
              </div>
            ))}

            <SelectInput
              label="Punto de Recogida"
              value={selectedPickupPoint}
              options={excursion.pickupPoints.map(point => ({ value: point, label: point }))}
              onChange={(e) => setSelectedPickupPoint(e.target.value)}
            />

            <div className="total-price">Total a Pagar: ${numParticipants * excursion.basePrice}</div>

            <button
              onClick={handleEnroll}
              className="button primary-button"
              style={{ width: '100%', padding: '15px 20px', marginTop: '20px' }}
              disabled={isEnrolling || availableSlots < numParticipants}
            >
              {isEnrolling ? 'Procesando Inscripción...' : `Inscribirse y Pagar`}
            </button>
            {availableSlots < numParticipants && (
                <p style={{ color: 'var(--danger-color)', textAlign: 'center', marginTop: '10px' }}>
                    Solo quedan {availableSlots} espacios.
                </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExcursionDetailView;