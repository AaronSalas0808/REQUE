// src/components/MaterialClassification.jsx
import React, { useState } from 'react';
import './MaterialClassification.css';
import { FaSearch, FaCamera, FaHeart, FaIndustry, FaLightbulb, FaMapMarkerAlt, FaBookmark, FaRecycle, FaLeaf, FaFire, FaArrowRight, FaTimes, FaExclamationTriangle, FaRegHeart, FaRegBookmark } from 'react-icons/fa';

const MaterialClassification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  
  const categories = [
    { id: 'all', name: 'Todos', icon: '📦', emoji: '📦', colorClass: 'category-all' },
    { id: 'plastic', name: 'Plástico', icon: <FaRecycle />, emoji: '♻️', colorClass: 'category-plastic' },
    { id: 'paper', name: 'Papel', icon: '📄', emoji: '📄', colorClass: 'category-paper' },
    { id: 'metal', name: 'Metales', icon: '🔩', emoji: '🔩', colorClass: 'category-metal' },
    { id: 'glass', name: 'Vidrio', icon: '🍶', emoji: '🍶', colorClass: 'category-glass' },
    { id: 'electronics', name: 'Electrónicos', icon: '📱', emoji: '📱', colorClass: 'category-electronics' },
    { id: 'organic', name: 'Orgánicos', icon: <FaLeaf />, emoji: '🍃', colorClass: 'category-organic' },
    { id: 'textile', name: 'Textiles', icon: '👕', emoji: '👕', colorClass: 'category-textile' },
  ];
  
  const materials = [
    {
      id: 1,
      name: 'Botella PET',
      category: 'plastic',
      recyclability: 'Alta',
      recyclabilityScore: 95,
      description: 'Botellas de plástico PET transparente o de color - Uno de los materiales más reciclables',
      image: '🥤',
      emoji: '🥤',
      colorClass: 'material-card-plastic',
      steps: [
        'Retirar tapas y anillos de plástico o metal',
        'Enjuagar completamente con agua para eliminar residuos',
        'Aplastar para reducir volumen de almacenamiento',
        'Separar por color si es posible para mejor reciclaje'
      ],
      warnings: ['No incluir tapas de metal en el contenedor de plástico', 'El material debe estar limpio y seco', 'Evitar botellas con aceites o químicos'],
      centers: 15,
      reuseIdeas: 8,
      energySaved: '84%',
      co2Reduced: '3.8 kg'
    },
    {
      id: 2,
      name: 'Latas Alu- minio',
      category: 'metal',
      recyclability: 'Alta',
      recyclabilityScore: 98,
      description: 'Latas de bebidas y conservas de aluminio - Material infinitamente reciclable',
      image: '🥫',
      emoji: '🥫',
      colorClass: 'material-card-metal',
      steps: [
        'Enjuagar completamente con agua para eliminar residuos',
        'Aplastar cuidadosamente para reducir volumen',
        'Separar de otros tipos de metales como el acero',
        'Verificar que no contengan líquidos'
      ],
      warnings: ['No incluir latas con pintura especial o recubrimientos', 'Verificar que sea aluminio puro', 'Evitar latas abolladas con bordes afilados'],
      centers: 12,
      reuseIdeas: 5,
      energySaved: '95%',
      co2Reduced: '4.5 kg'
    },
    {
      id: 3,
      name: 'Vidrio Trans- parente',
      category: 'glass',
      recyclability: 'Alta',
      recyclabilityScore: 90,
      description: 'Botellas y frascos de vidrio incoloro - 100% reciclable infinitas veces',
      image: '🍶',
      emoji: '🍶',
      colorClass: 'material-card-glass',
      steps: [
        'Retirar tapas metálicas y etiquetas de papel',
        'Enjuagar con agua para eliminar residuos',
        'Separar por color (transparente, verde, ámbar)',
        'No romper - depositar enteros'
      ],
      warnings: ['No incluir vidrio templado, cerámica o porcelana', 'Separar por color es esencial para calidad', 'Evitar vidrios con productos químicos'],
      centers: 10,
      reuseIdeas: 12,
      energySaved: '30%',
      co2Reduced: '1.2 kg'
    },
    {
      id: 4,
      name: 'Cartón Corru- gado',
      category: 'paper',
      recyclability: 'Alta',
      recyclabilityScore: 85,
      description: 'Cajas de cartón ondulado - Puede reciclarse hasta 7 veces',
      image: '📦',
      emoji: '📦',
      colorClass: 'material-card-paper',
      steps: [
        'Aplanar cajas completamente para optimizar espacio',
        'Retirar cinta adhesiva, grapas y plásticos',
        'Mantener en lugar seco y protegido de la humedad',
        'Atar en paquetes compactos para facilitar transporte'
      ],
      warnings: ['No reciclar cartón con grasa, aceite o comida', 'Mantener completamente libre de humedad', 'Separar del papel normal'],
      centers: 10,
      reuseIdeas: 7,
      energySaved: '64%',
      co2Reduced: '2.5 kg'
    },
    {
      id: 5,
      name: 'Elect Peque- ño',
      category: 'electronics',
      recyclability: 'Media',
      recyclabilityScore: 65,
      description: 'Teléfonos, tablets y pequeños electrodomésticos - Recuperación de metales preciosos',
      image: '📱',
      emoji: '📱',
      colorClass: 'material-card-electronics',
      steps: [
        'Retirar baterías (dispositivos Li-ion requieren cuidado)',
        'Limpiar superficialmente de polvo y suciedad',
        'Llevar a centro especializado autorizado',
        'No desarmar - puede ser peligroso'
      ],
      warnings: ['Contienen metales pesados tóxicos (plomo, mercurio)', 'Requieren tratamiento especializado', 'No mezclar con residuos normales'],
      centers: 10,
      reuseIdeas: 3,
      energySaved: '40%',
      co2Reduced: '15 kg'
    },
    {
      id: 6,
      name: 'Envase Tetra- pak',
      category: 'paper',
      recyclability: 'Media',
      recyclabilityScore: 70,
      description: 'Envases de bebidas y alimentos multicapa - Separación compleja',
      image: '🥛',
      emoji: '🥛',
      colorClass: 'material-card-tetrapak',
      steps: [
        'Enjuagar completamente hasta eliminar residuos',
        'Aplanar completamente para reducir volumen',
        'Separar de otros tipos de papel y cartón',
        'Verificar símbolo de reciclaje específico'
      ],
      warnings: ['Algunos centros de reciclaje no los aceptan', 'Debe estar completamente seco antes de reciclar', 'No todos los tipos son reciclables'],
      centers: 11,
      reuseIdeas: 4,
      energySaved: '50%',
      co2Reduced: '1.8 kg'
    },
  ];

  const filteredMaterials = selectedCategory === 'all' 
    ? materials
    : materials.filter(material => material.category === selectedCategory);

  const getRecyclabilityColor = (score) => {
    if (score >= 90) return 'recyclability-high';
    if (score >= 70) return 'recyclability-medium';
    return 'recyclability-low';
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="material-classification">
      <div className="card">
        {/* Header */}
        <div className="material-header">
          <h1 className="material-title">
            <FaRecycle className="title-icon" />
            Clasificación de Materiales
          </h1>
          <p className="material-subtitle">Identifica, clasifica y aprende a reciclar correctamente cada material. Encuentra centros cercanos y descubre ideas creativas de reutilización.</p>
        </div>

        {/* Search Bar */}
        <div className="material-search">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar material por nombre (ej: botella plástica, latas, vidrio, cartón, electrónicos...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-camera">
              <FaCamera className="camera-icon" />
              <span className="camera-text">Escanear</span>
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="material-categories">
          <div className="categories-header">
            <h2 className="categories-title">
              <span className="categories-icon">🏷️</span>
              Categorías de Materiales
            </h2>
            <button className="categories-all">
              Ver todas las categorías
              <FaArrowRight className="arrow-icon" />
            </button>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-card ${category.colorClass} ${
                  selectedCategory === category.id ? 'category-selected' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-icon-container">
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-emoji">{category.emoji}</span>
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div 
              key={material.id}
              className={`material-card ${material.colorClass} ${
                selectedMaterial?.id === material.id ? 'material-selected' : ''
              }`}
              onClick={() => setSelectedMaterial(material)}
            >
              <div className="material-card-badge">
                <span className="badge-text">{material.category.toUpperCase()}</span>
              </div>
              
              <div className="material-card-header">
                <div className="material-card-left">
                  <div className="material-icon">
                    <span className="material-emoji">{material.emoji}</span>
                    <div className="material-icon-bg"></div>
                  </div>
                  <div className="material-info">
                    <h3 className="material-name">{material.name}</h3>
                    <div className="material-recyclability">
                      <span className={`recyclability-badge ${getRecyclabilityColor(material.recyclabilityScore)}`}>
                        <span className="recycle-icon">♻️</span>
                        {material.recyclability} • {material.recyclabilityScore}%
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className={`material-favorite ${favorites.includes(material.id) ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(material.id, e)}
                >
                  {favorites.includes(material.id) ? (
                    <FaHeart className="favorite-icon filled" />
                  ) : (
                    <FaRegHeart className="favorite-icon" />
                  )}
                </button>
              </div>
              
              <p className="material-description">
                {material.description}
              </p>
              
              <div className="material-stats">
                <div className="stats-left">
                  <span className="stat-item">
                    <FaIndustry className="stat-icon" />
                    <span className="stat-value">{material.centers}</span>
                    <span className="stat-label">centros</span>
                  </span>
                  <span className="stat-item">
                    <FaLightbulb className="stat-icon" />
                    <span className="stat-value">{material.reuseIdeas}</span>
                    <span className="stat-label">ideas</span>
                  </span>
                </div>
                <button className="material-details">
                  <span className="details-text">Ver detalles</span>
                  <FaArrowRight className="details-arrow" />
                </button>
              </div>

              {/* Mini Impact Stats */}
              <div className="material-impact">
                <div className="impact-item">
                  <FaFire className="impact-icon energy" />
                  <span className="impact-value">{material.energySaved}</span>
                  <span className="impact-label">energía</span>
                </div>
                <div className="impact-item">
                  <FaLeaf className="impact-icon co2" />
                  <span className="impact-value">{material.co2Reduced}</span>
                  <span className="impact-label">CO₂</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h3 className="quick-stats-title">
            <span className="stats-icon">📊</span>
            Estadísticas de Impacto
          </h3>
          <div className="quick-stats-grid">
            <div className="quick-stat">
              <div className="quick-stat-value">{materials.length}</div>
              <div className="quick-stat-label">Materiales catalogados</div>
              <div className="quick-stat-trend">+2 este mes</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">95%</div>
              <div className="quick-stat-label">Tasa de reciclabilidad</div>
              <div className="quick-stat-trend positive">↑ 3% vs 2023</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">57</div>
              <div className="quick-stat-label">Centros disponibles</div>
              <div className="quick-stat-trend">+8 nuevos</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">156</div>
              <div className="quick-stat-label">Ideas de reuso</div>
              <div className="quick-stat-trend positive">↑ 42 este año</div>
            </div>
          </div>
        </div>

        {/* AI Recognition */}
        <div className="ai-recognition">
          <div className="ai-content">
            <div className="ai-icon-container">
              <div className="ai-main-icon">🤖</div>
              <div className="ai-sub-icon">📸</div>
            </div>
            <div className="ai-text">
              <h3 className="ai-title">¿No estás seguro del material?</h3>
              <p className="ai-description">Usa DeepSeek AI para escanear e identificar materiales al instante. Sube una foto o describe el material y descubre cómo reciclar correctamente.</p>
              <div className="ai-features">
                <span className="ai-feature">🎯 98% de precisión</span>
                <span className="ai-feature">⚡ Resultados en segundos</span>
                <span className="ai-feature">🌍 Más de 500 materiales</span>
              </div>
            </div>
            <a 
        
            href="https://chat.deepseek.com/" 
            //target="_blank" 
            //rel="noopener noreferrer"
            className="ai-button"
            >
          <span className="ai-icon"></span>
            Usar DeepSeek AI
            </a>
        </div>
        </div>

        {/* Material Detail Modal */}
        {selectedMaterial && (
          <div className="material-modal-overlay" onClick={() => setSelectedMaterial(null)}>
            <div className="material-modal" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="modal-header">
                <div className="modal-header-left">
                  <div className={`modal-icon ${selectedMaterial.colorClass}`}>
                    <span className="modal-emoji">{selectedMaterial.emoji}</span>
                    <div className="modal-icon-glow"></div>
                  </div>
                  <div className="modal-title-section">
                    <div className="modal-category-badge">
                      {selectedMaterial.category.toUpperCase()}
                    </div>
                    <h2 className="modal-title">{selectedMaterial.name}</h2>
                    <div className="modal-recyclability">
                      <span className={`recyclability-badge ${getRecyclabilityColor(selectedMaterial.recyclabilityScore)}`}>
                        <span className="badge-icon">♻️</span>
                        <span className="badge-text">
                          Reciclabilidad: <strong>{selectedMaterial.recyclability}</strong> ({selectedMaterial.recyclabilityScore}%)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedMaterial(null)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="modal-content">
                {/* Description */}
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">📝</span>
                    Descripción del Material
                  </h3>
                  <p className="section-content">{selectedMaterial.description}</p>
                </div>

                {/* Impact Stats */}
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">🌱</span>
                    Impacto Ambiental
                  </h3>
                  <div className="impact-stats-grid">
                    <div className="impact-stat">
                      <div className="impact-stat-icon energy">
                        <FaFire />
                      </div>
                      <div className="impact-stat-content">
                        <div className="impact-stat-value">{selectedMaterial.energySaved}</div>
                        <div className="impact-stat-label">Ahorro de energía</div>
                      </div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-stat-icon co2">
                        <FaLeaf />
                      </div>
                      <div className="impact-stat-content">
                        <div className="impact-stat-value">{selectedMaterial.co2Reduced}</div>
                        <div className="impact-stat-label">Reducción de CO₂</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">📋</span>
                    Pasos para preparar
                  </h3>
                  <div className="steps-list">
                    {selectedMaterial.steps.map((step, index) => (
                      <div key={index} className="step-item">
                        <div className="step-number">{index + 1}</div>
                        <div className="step-content">
                          <div className="step-text">{step}</div>
                          <div className="step-tip">Recomendación importante</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {selectedMaterial.warnings.length > 0 && (
                  <div className="modal-section">
                    <h3 className="section-title warning-title">
                      <FaExclamationTriangle className="warning-icon" />
                      Advertencias importantes
                    </h3>
                    <div className="warnings-list">
                      {selectedMaterial.warnings.map((warning, index) => (
                        <div key={index} className="warning-item">
                          <div className="warning-marker"></div>
                          <div className="warning-content">
                            <div className="warning-text">{warning}</div>
                            <div className="warning-severity">Alta prioridad</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reuse Ideas */}
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">💡</span>
                    Ideas de reutilización
                  </h3>
                  <div className="reuse-grid">
                    <button className="reuse-idea reuse-idea-green">
                      <div className="reuse-emoji">🌱</div>
                      <div className="reuse-content">
                        <div className="reuse-title">Maceta autoriego</div>
                        <div className="reuse-description">Transforma en maceta con sistema de riego automático</div>
                        <div className="reuse-difficulty">
                          <span className="difficulty-dot easy"></span>
                          Fácil • 30 min
                        </div>
                      </div>
                    </button>
                    <button className="reuse-idea reuse-idea-blue">
                      <div className="reuse-emoji">🗑️</div>
                      <div className="reuse-content">
                        <div className="reuse-title">Organizador multifunción</div>
                        <div className="reuse-description">Crea organizadores para escritorio, baño o cocina</div>
                        <div className="reuse-difficulty">
                          <span className="difficulty-dot medium"></span>
                          Media • 1 hora
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="modal-actions">
                  <button className="modal-action-primary">
                    <FaMapMarkerAlt className="action-icon" />
                    <div className="action-content">
                      <div className="action-main">Ver centros cercanos</div>
                      <div className="action-sub">{selectedMaterial.centers} centros disponibles</div>
                    </div>
                  </button>
                  <button className="modal-action-secondary">
                    <FaRegBookmark className="action-icon" />
                    <div className="action-content">
                      <div className="action-main">Guardar material</div>
                      <div className="action-sub">Acceso rápido desde tu perfil</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialClassification;