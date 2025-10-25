// src/components/OrganizerManagementTool.jsx
import React, { useState, useEffect } from 'react';
import ExcursionDefinitionTool from './ExcursionDefinitionTool';

// Componente de Ayuda para mostrar el estado de las excursiones/pagos
const StatusTag = ({ status }) => {
  let className = "status-tag";
  if (status === "published" || status === "paid" || status === "confirmed") {
    className += " published"; // Usar la misma clase general para verde de éxito
  } else if (status === "draft" || status === "pending") {
    className += " draft"; // Usar la misma clase general para amarillo de advertencia
  } else if (status === "archived" || status === "cancelled") {
    className += " archived"; // Usar la misma clase general para rojo/gris de peligro/archivado
  }
  return <span className={className}>{status}</span>;
};

// Componente para mostrar y gestionar los detalles de una excursión
const ExcursionDetailManagement = ({ excursion, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('participants');

  const handleUpdateBookingStatus = (participantId, newStatus) => {
    const updatedParticipants = excursion.participants.map((p) =>
      p.id === participantId ? { ...p, status: newStatus } : p
    );
    onUpdate({ ...excursion, participants: updatedParticipants });
    console.log(
      `Simulación: Estado de pago de participante ${participantId} actualizado a ${newStatus}.`
    );
  };

  const handleConfirmService = (serviceName) => {
    const updatedServices = excursion.servicesBooked.map((s) =>
      s.name === serviceName ? { ...s, status: 'confirmed' } : s
    );
    onUpdate({ ...excursion, servicesBooked: updatedServices });
    console.log(`Simulación: Servicio '${serviceName}' confirmado con proveedor.`);
  };

  const handleTrackExcursionProgress = () => {
    alert('Simulación: Abriendo interfaz de seguimiento en vivo de la excursión (mapas, check-ins, etc.)...');
    console.log('Simulación: Iniciando seguimiento de excursión:', excursion.name);
  };

  const handleSendNotificationToParticipants = () => {
    const message = prompt("Escribe el mensaje para enviar a los participantes:");
    if (message) {
      alert(`Simulación: Notificación enviada a todos los participantes de "${excursion.name}": "${message}"`);
      console.log(`Notificación enviada a participantes de ${excursion.name}:`, message);
    }
  };

  return (
    <div className="section-card" style={{ marginTop: '30px' }}>
      <h3>Gestionando: {excursion.name} <StatusTag status={excursion.status} /></h3>
      <div className="flex-group" style={{ marginBottom: '20px' }}>
        <button onClick={onClose} className="button secondary-button">← Volver a Mis Excursiones</button>
        <button onClick={() => console.log('Simulación: Navegar a la edición completa de la excursión')} className="button info-button">
          Editar Definición de Excursión
        </button>
        <button onClick={handleSendNotificationToParticipants} className="button primary-button">
          Comunicar a Participantes
        </button>
      </div>

      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('participants')}
          className={`tab-button ${activeTab === 'participants' ? 'active' : ''}`}
        >
          Participantes
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`tab-button ${activeTab === 'payments' ? 'active' : ''}`}
        >
          Pagos
        </button>
        <button
          onClick={() => setActiveTab('providers')}
          className={`tab-button ${activeTab === 'providers' ? 'active' : ''}`}
        >
          Proveedores
        </button>
        <button
          onClick={() => setActiveTab('logistics')}
          className={`tab-button ${activeTab === 'logistics' ? 'active' : ''}`}
        >
          Logística Operativa
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'participants' && (
          <section className="participant-tracking">
            <h4>Listado de Participantes ({excursion.currentBookings} / {excursion.capacity} espacios)</h4>
            {excursion.participants.length === 0 ? (
              <p>No hay participantes inscritos aún.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cant. Personas</th>
                    <th>Punto de Recogida</th>
                    <th>Estado Pago</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {excursion.participants.map((p, index) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.numPeople}</td>
                      <td>{p.pickupPoint}</td>
                      <td><StatusTag status={p.status} /></td>
                      <td>
                        {p.status !== 'paid' && (
                          <button onClick={() => handleUpdateBookingStatus(p.id, 'paid')} className="button primary-button">
                            Marcar Pagado
                          </button>
                        )}
                        <button onClick={() => console.log(`Simulación: Ver detalles de ${p.name}`)} className="button info-button">
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === 'payments' && (
          <section className="payment-management">
            <h4>Control de Pagos</h4>
            <p>Ingresos Totales Esperados: <strong>${excursion.capacity * (excursion.basePrice || 0)}</strong></p>
            <p>Ingresos Recibidos: <strong>${excursion.totalRevenue}</strong></p>
            <p>Espacios Vendidos: <strong>{excursion.currentBookings} / {excursion.capacity}</strong></p>
            <button onClick={() => console.log('Simulación: Generar reporte de pagos')} className="button primary-button">
              Generar Reporte de Pagos
            </button>
          </section>
        )}

        {activeTab === 'providers' && (
          <section className="provider-coordination">
            <h4>Coordinación con Proveedores</h4>
            <ul>
              {excursion.servicesBooked.length === 0 ? (
                <p>No hay servicios asociados a proveedores para esta excursión.</p>
              ) : (
                excursion.servicesBooked.map((service, index) => (
                  <li key={index} className="list-item">
                    <span>
                      <strong>{service.name}</strong> (Costo: ${service.cost}) - Estado: <StatusTag status={service.status} />
                    </span>
                    <div>
                      {service.status !== 'confirmed' && (
                        <button onClick={() => handleConfirmService(service.name)} className="button primary-button">
                          Confirmar
                        </button>
                      )}
                      <button onClick={() => console.log(`Simulación: Enviar recordatorio a ${service.name}`)} className="button warning-button">
                        Recordatorio
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        )}

        {activeTab === 'logistics' && (
          <section className="operational-logistics">
            <h4>Logística y Ejecución del Viaje</h4>
            <h5>Puntos de Recogida en Ruta:</h5>
            <ul>
              {excursion.pickupPoints.length === 0 ? (
                <p>No hay puntos de recogida definidos.</p>
              ) : (
                excursion.pickupPoints.map((point, index) => (
                  <li key={index} className="list-item">
                    <span>
                      {point} (
                      <strong>
                        {excursion.participants.filter((p) => p.pickupPoint === point).reduce((sum, p) => sum + p.numPeople, 0)}{' '}
                      </strong>
                      personas)
                    </span>
                    <button onClick={() => console.log(`Simulación: Ver detalles de los que recogen en ${point}`)} className="button info-button">
                      Ver Lista
                    </button>
                  </li>
                ))
              )}
            </ul>
            <button onClick={handleTrackExcursionProgress} className="button primary-button" style={{ marginTop: '20px' }}>
              Iniciar Seguimiento en Vivo (Mapa, Check-in)
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

// Componente principal para la gestión de excursiones por parte del organizador
const OrganizerManagementTool = () => {
  const [myExcursions, setMyExcursions] = useState([]);
  const [selectedExcursion, setSelectedExcursion] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // SIMULACIÓN: Carga inicial de excursiones del organizador
  useEffect(() => {
    console.log('Simulación: Cargando excursiones del organizador...');
    const dummyExcursions = [
      {
        id: 'ex101',
        name: 'Aventura Río Pacuare',
        status: 'published',
        datesAvailable: { startDate: '2025-12-10', endDate: '2025-12-12' },
        capacity: 20,
        currentBookings: 15,
        basePrice: 150,
        totalRevenue: 15 * 150,
        pickupPoints: ['San José Centro', 'Parque Braulio Carrillo'],
        participants: [
          { id: 'p1', name: 'Ana Rojas', status: 'paid', numPeople: 2, pickupPoint: 'San José Centro' },
          { id: 'p2', name: 'Luis Pérez', status: 'pending', numPeople: 3, pickupPoint: 'Parque Braulio Carrillo' },
          { id: 'p3', name: 'Marta Solís', status: 'paid', numPeople: 1, pickupPoint: 'San José Centro' },
        ],
        servicesBooked: [
          { name: 'Hotel Río', status: 'confirmed', cost: 500 },
          { name: 'Transportes CR', status: 'pending', cost: 800 },
        ],
        description: 'Una emocionante aventura de rafting en el río Pacuare.',
        type: 'aventura',
        durationDays: 3,
        targetAudience: ['adults', 'athletes'],
        keywords: ['rafting', 'aventura', 'río'],
        galleryImages: ['https://source.unsplash.com/random/140x100?rafting,river'],
        participantRecommendations: {
          physicalRequirements: 'Buena condición física',
          equipmentRequired: ['traje de baño', 'sandalias de río'],
          attireSuggestions: 'Ropa ligera que se pueda mojar',
          conditionsAlerts: 'Aguas rápidas, posible exposición al sol',
        },
        itinerary: [
            { id: 1, day: 1, title: "Llegada y Preparación", description: "Encuentro en San José y traslado a lodge. Charla de seguridad." },
            { id: 2, day: 2, title: "Día de Rafting Intenso", description: "Rafting en el río Pacuare con guías expertos." }
        ],
        transportSegments: [
          { providerId: 'transp1', vehicleType: 'Buseta', routeName: 'San José - Río Pacuare', estimatedCost: 150 }
        ]
      },
      {
        id: 'ex102',
        name: 'Relax en Playa Conchal',
        status: 'draft',
        datesAvailable: { startDate: '2026-01-20', endDate: '2026-01-25' },
        capacity: 30,
        currentBookings: 0,
        basePrice: 200,
        totalRevenue: 0,
        pickupPoints: ['Heredia Centro', 'Aeropuerto Juan Santamaría'],
        participants: [],
        servicesBooked: [],
        description: 'Cinco días de relajación en las playas de Guanacaste.',
        type: 'relax',
        durationDays: 5,
        targetAudience: ['families', 'adults'],
        keywords: ['playa', 'relajación', 'sol'],
        galleryImages: ['https://source.unsplash.com/random/140x100?beach,relax'],
        participantRecommendations: {
          physicalRequirements: 'Ninguna en particular',
          equipmentRequired: ['bloqueador solar', 'sombrero'],
          attireSuggestions: 'Ropa de playa',
          conditionsAlerts: 'Alta exposición al sol',
        },
        itinerary: [],
        transportSegments: []
      },
      {
        id: 'ex103',
        name: 'Senderismo Volcán Arenal',
        status: 'archived',
        datesAvailable: { startDate: '2025-11-05', endDate: '2025-11-05' },
        capacity: 10,
        currentBookings: 8,
        basePrice: 80,
        totalRevenue: 8 * 80,
        pickupPoints: ['La Fortuna'],
        participants: [
          { id: 'pa1', name: 'Pedro González', status: 'paid', numPeople: 2, pickupPoint: 'La Fortuna' },
        ],
        servicesBooked: [],
        description: 'Una caminata guiada por los senderos del Volcán Arenal.',
        type: 'aventura',
        durationDays: 1,
        targetAudience: ['adults'],
        keywords: ['volcán', 'senderismo', 'naturaleza'],
        galleryImages: ['https://source.unsplash.com/random/140x100?volcano,hiking'],
        participantRecommendations: {
          physicalRequirements: 'Resistencia para caminatas',
          equipmentRequired: ['zapatos de hiking', 'botella de agua'],
          attireSuggestions: 'Ropa cómoda para caminar',
          conditionsAlerts: 'Terreno irregular, posible lluvia',
        },
        itinerary: [],
        transportSegments: []
      },
    ];
    setMyExcursions(dummyExcursions);
  }, []);

  const handlePublishExcursion = (excursionId) => {
    setMyExcursions((prev) =>
      prev.map((ex) => (ex.id === excursionId ? { ...ex, status: 'published' } : ex))
    );
    alert(`Simulación: Excursión ${excursionId} publicada.`);
    console.log(`Simulación: Excursión ${excursionId} publicada.`);
  };

  const handleDeleteExcursion = (excursionId) => {
    setMyExcursions((prev) => prev.filter((ex) => ex.id !== excursionId));
    alert(`Simulación: Excursión ${excursionId} eliminada.`);
    console.log(`Simulación: Excursión ${excursionId} eliminada.`);
  };

  const handleCreateNewExcursion = () => {
    setIsCreatingNew(true);
    setSelectedExcursion(null);
    console.log('Simulación: Iniciando creación de nueva excursión.');
  };

  const handleBackFromDefinition = (actionType) => {
    setIsCreatingNew(false);
    setSelectedExcursion(null);
    console.log(`Simulación: Volviendo al panel principal después de ${actionType}.`);
  };

  const handleViewDetails = (excursion) => {
    setSelectedExcursion(excursion);
    setIsCreatingNew(false);
    console.log('Simulación: Viendo detalles de excursión:', excursion.name);
  };

  const handleEditExcursion = (excursion) => {
    setSelectedExcursion(excursion);
    setIsCreatingNew(false);
    console.log('Simulación: Editando excursión:', excursion.name);
  };

  if (isCreatingNew || (selectedExcursion && !isCreatingNew && selectedExcursion.id !== undefined)) {
    return (
      <ExcursionDefinitionTool
        initialData={selectedExcursion || {}}
        onBack={handleBackFromDefinition}
      />
    );
  }

  return (
    <div className="page-container">
      <h2>Panel de Gestión de Excursiones</h2>

      <section className="section-card">
        <h3>Mis Excursiones</h3>
        {myExcursions.length === 0 ? (
          <p>Aún no tienes excursiones. ¡Crea una nueva!</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Fechas</th>
                <th>Inscritos</th>
                <th>Disponibles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {myExcursions.map((excursion, index) => (
                <tr key={excursion.id}>
                  <td>{excursion.name}</td>
                  <td><StatusTag status={excursion.status} /></td>
                  <td>
                    {excursion.datesAvailable.startDate} -{' '}
                    {excursion.datesAvailable.endDate}
                  </td>
                  <td>{excursion.currentBookings}</td>
                  <td>{excursion.capacity - excursion.currentBookings}</td>
                  <td>
                    {excursion.status === 'draft' && (
                      <button onClick={() => handlePublishExcursion(excursion.id)} className="button primary-button">
                        Publicar
                      </button>
                    )}
                    <button onClick={() => handleEditExcursion(excursion)} className="button info-button">
                      Editar
                    </button>
                    <button onClick={() => handleViewDetails(excursion)} className="button secondary-button">
                      Gestionar
                    </button>
                    <button onClick={() => handleDeleteExcursion(excursion.id)} className="button danger-button">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={handleCreateNewExcursion} className="button primary-button" style={{ marginTop: '20px' }}>
          Crear Nueva Excursión
        </button>
      </section>

      {selectedExcursion && !isCreatingNew && (
        <ExcursionDetailManagement
          excursion={selectedExcursion}
          onClose={() => setSelectedExcursion(null)}
          onUpdate={(updatedExcursion) => {
            setMyExcursions((prev) =>
              prev.map((ex) => (ex.id === updatedExcursion.id ? updatedExcursion : ex))
            );
            setSelectedExcursion(updatedExcursion);
            console.log('Simulación: Excursión actualizada en el estado local.');
          }}
        />
      )}
    </div>
  );
};

export default OrganizerManagementTool;