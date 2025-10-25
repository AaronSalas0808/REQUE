// src/components/CustomerExcursionSearch.jsx
import React, { useState, useEffect } from 'react';
import { TextInput, SelectInput, TagsInput } from './CommonInputs'; // Asegúrate de que TagsInput esté importado

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('½');
    while (stars.length < 5) stars.push('☆');
    return <span className="star-rating">{stars.join('')} <span className="rating-value">({rating})</span></span>;
};


// SIMULACIÓN: Datos de excursiones disponibles para clientes (más visuales)
const MOCK_CUSTOMER_EXCURSIONS = [
  {
    id: 'custEx1',
    name: 'Rafting en Río Pacuare (3 días)',
    image: 'https://source.unsplash.com/random/400x220?rafting,river,costarica',
    description: 'Aventura extrema en uno de los 10 mejores ríos del mundo para rafting. Emoción y naturaleza pura.',
    type: 'aventura',
    targetAudience: ['adults', 'athletes'],
    durationDays: 3,
    basePrice: 280,
    datesAvailable: '10-12 Dic, 2025',
    keywords: ['rafting', 'agua', 'adrenalina'],
    rating: 4.8,
  },
  {
    id: 'custEx2',
    name: 'Relajación en Playa Conchal (5 días)',
    image: 'https://source.unsplash.com/random/400x220?beach,relax,costarica',
    description: 'Disfruta de la arena blanca y aguas cristalinas en la paradisíaca Playa Conchal.',
    type: 'relax',
    targetAudience: ['families', 'adults', 'elderly'],
    durationDays: 5,
    basePrice: 450,
    datesAvailable: '20-25 Ene, 2026',
    keywords: ['playa', 'sol', 'relax', 'lujo'],
    rating: 4.5,
  },
  {
    id: 'custEx3',
    name: 'Senderismo Volcán Arenal (1 día)',
    image: 'https://source.unsplash.com/random/400x220?volcano,hiking,costarica',
    description: 'Explora los senderos alrededor del majestuoso Volcán Arenal con un guía experto.',
    type: 'cultural',
    targetAudience: ['adults'],
    durationDays: 1,
    basePrice: 95,
    datesAvailable: 'Cada Sábado',
    keywords: ['volcán', 'senderismo', 'naturaleza'],
    rating: 4.2,
  },
  {
    id: 'custEx4',
    name: 'Tour de Café y Mariposas',
    image: 'https://source.unsplash.com/random/400x220?coffee,butterflies,costarica',
    description: 'Conoce el proceso del café y visita un hermoso jardín de mariposas.',
    type: 'cultural',
    targetAudience: ['families', 'children', 'elderly'],
    durationDays: 1,
    basePrice: 70,
    datesAvailable: 'Todos los días',
    keywords: ['café', 'cultura', 'mariposas'],
    rating: 4.9,
  },
   {
    id: 'custEx5',
    name: 'Avistamiento de Ballenas Uvita',
    image: 'https://source.unsplash.com/random/400x220?whales,ocean,costarica',
    description: 'Un viaje inolvidable para ver ballenas jorobadas en la famosa Cola de Ballena de Uvita.',
    type: 'fauna',
    targetAudience: ['families', 'adults'],
    durationDays: 1,
    basePrice: 120,
    datesAvailable: 'Julio - Noviembre',
    keywords: ['ballenas', 'océano', 'vida marina'],
    rating: 4.7,
  }
];

const CustomerExcursionSearch = ({ onSelectExcursion }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    orientation: '',
    activityType: '',
    durationDays: '',
    priceRange: '',
    dateRange: '',
    keywords: [],
  });
  const [searchResults, setSearchResults] = useState(MOCK_CUSTOMER_EXCURSIONS);

  useEffect(() => {
    const filtered = MOCK_CUSTOMER_EXCURSIONS.filter((excursion) => {
      const matchesSearchTerm = excursion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                excursion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                excursion.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters =
        (!filters.orientation || excursion.targetAudience.includes(filters.orientation)) &&
        (!filters.activityType || excursion.type.includes(filters.activityType)) &&
        (!filters.durationDays || excursion.durationDays === parseInt(filters.durationDays)) &&
        (!filters.priceRange || excursion.basePrice <= parseFloat(filters.priceRange)) &&
        (filters.keywords.length === 0 || filters.keywords.every(k => excursion.keywords.includes(k)));

      return matchesSearchTerm && matchesFilters;
    });
    setSearchResults(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    console.log(`Filtro actualizado: ${field} -> ${value}`);
  };

  return (
    <div className="page-container">
      <h2>Descubre tu Próxima Aventura en Costa Rica</h2>

      <section className="section-card">
        <h3>Búsqueda Avanzada</h3>
        <TextInput
            label="Buscar por Palabra Clave"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: Rafting, Volcán, Playa..."
            type="search"
        />

        <div className="search-filters">
          <SelectInput
            label="Orientación"
            value={filters.orientation}
            options={[
              { value: '', label: 'Cualquiera' },
              { value: 'families', label: 'Familiar' },
              { value: 'children', label: 'Niños' },
              { value: 'teens', label: 'Adolescentes' },
              { value: 'adults', label: 'Adultos' },
              { value: 'elderly', label: 'Tercera Edad' },
              { value: 'athletes', label: 'Deportistas' },
            ]}
            onChange={(e) => handleFilterChange('orientation', e.target.value)}
          />
          <SelectInput
            label="Tipo de Actividad"
            value={filters.activityType}
            options={[
              { value: '', label: 'Cualquiera' },
              { value: 'playa', label: 'Playa' },
              { value: 'montaña', label: 'Montaña' },
              { value: 'caminata', label: 'Caminata' },
              { value: 'deportes', label: 'Deportes' },
              { value: 'aventura', label: 'Aventura' },
              { value: 'cultural', label: 'Cultural' },
              { value: 'relax', label: 'Relajación' },
              { value: 'fauna', label: 'Vida Silvestre' },
            ]}
            onChange={(e) => handleFilterChange('activityType', e.target.value)}
          />
          <TextInput
            label="Duración (días)"
            type="number"
            value={filters.durationDays}
            onChange={(e) => handleFilterChange('durationDays', e.target.value)}
            placeholder="Ej: 3"
            min={1}
          />
          <TextInput
            label="Precio Máximo ($)"
            type="number"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            placeholder="Ej: 300"
            min={0}
          />
          <TextInput
            label="Fecha Específica"
            type="date"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          />
        </div>
      </section>

      <section className="section-card">
        <h3>Resultados de Búsqueda ({searchResults.length} excursiones)</h3>
        {searchResults.length === 0 ? (
          <p>No se encontraron excursiones que coincidan con tus criterios.</p>
        ) : (
          <div className="search-results-grid">
            {searchResults.map((excursion) => (
              <div key={excursion.id} className="excursion-card" onClick={() => onSelectExcursion(excursion.id)}>
                <img src={excursion.image} alt={excursion.name} />
                <div className="excursion-card-content">
                  <h4>{excursion.name}</h4>
                  <p>{excursion.description.substring(0, 100)}...</p>
                  <p><strong>Tipo:</strong> {excursion.type.charAt(0).toUpperCase() + excursion.type.slice(1)}</p>
                  <p><strong>Duración:</strong> {excursion.durationDays} días</p>
                  <div className="excursion-card-footer">
                      <span className="price">${excursion.basePrice}</span>
                      <StarRating rating={excursion.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerExcursionSearch;