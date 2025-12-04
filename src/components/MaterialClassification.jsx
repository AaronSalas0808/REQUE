// src/components/MaterialClassification.jsx
import React, { useState } from 'react';
import './MaterialClassification.css';

const MaterialClassification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todos', icon: '📦', colorClass: 'category-all' },
    { id: 'plastic', name: 'Plástico', icon: '♻️', colorClass: 'category-plastic' },
    { id: 'paper', name: 'Papel', icon: '📄', colorClass: 'category-paper' },
    { id: 'metal', name: 'Metales', icon: '🔩', colorClass: 'category-metal' },
    { id: 'glass', name: 'Vidrio', icon: '🍶', colorClass: 'category-glass' },
    { id: 'electronics', name: 'Electrónicos', icon: '📱', colorClass: 'category-electronics' },
    { id: 'organic', name: 'Orgánicos', icon: '🍃', colorClass: 'category-organic' },
    { id: 'textile', name: 'Textiles', icon: '👕', colorClass: 'category-textile' },
  ];
  
  const materials = [
    {
      id: 1,
      name: 'Botella PET',
      category: 'plastic',
      recyclability: 'Alta',
      recyclabilityScore: 95,
      description: 'Botellas de plástico PET transparente o de color',
      image: '🥤',
      colorClass: 'material-card-plastic',
      steps: [
        'Retirar tapas y anillos',
        'Enjuagar con agua',
        'Aplastar para reducir volumen',
        'Separar por color si es posible'
      ],
      warnings: ['No incluir tapas de metal', 'Material debe estar limpio'],
      centers: 15,
      reuseIdeas: 8
    },
    {
      id: 2,
      name: 'Lata de Aluminio',
      category: 'metal',
      recyclability: 'Alta',
      recyclabilityScore: 98,
      description: 'Latas de bebidas y conservas de aluminio',
      image: '🥫',
      colorClass: 'material-card-metal',
      steps: [
        'Enjuagar con agua',
        'Aplastar para reducir volumen',
        'Separar de otros metales'
      ],
      warnings: ['No incluir latas con pintura especial', 'Verificar que sea aluminio'],
      centers: 12,
      reuseIdeas: 5
    },
    {
      id: 3,
      name: 'Vidrio Transparente',
      category: 'glass',
      recyclability: 'Alta',
      recyclabilityScore: 90,
      description: 'Botellas y frascos de vidrio incoloro',
      image: '🍶',
      colorClass: 'material-card-glass',
      steps: [
        'Retirar tapas y etiquetas',
        'Enjuagar con agua',
        'Separar por color',
        'No romper'
      ],
      warnings: ['No incluir vidrio templado', 'Separar por color es esencial'],
      centers: 8,
      reuseIdeas: 12
    },
    {
      id: 4,
      name: 'Cartón Corrugado',
      category: 'paper',
      recyclability: 'Alta',
      recyclabilityScore: 85,
      description: 'Cajas de cartón ondulado',
      image: '📦',
      colorClass: 'material-card-paper',
      steps: [
        'Aplanar cajas',
        'Retirar cinta adhesiva',
        'Mantener seco',
        'Atar en paquetes'
      ],
      warnings: ['No reciclar cartón con grasa', 'Mantener libre de humedad'],
      centers: 10,
      reuseIdeas: 7
    },
    {
      id: 5,
      name: 'Electrónicos Pequeños',
      category: 'electronics',
      recyclability: 'Media',
      recyclabilityScore: 65,
      description: 'Teléfonos, tablets y pequeños electrodomésticos',
      image: '📱',
      colorClass: 'material-card-electronics',
      steps: [
        'Retirar baterías',
        'Limpiar superficialmente',
        'Llevar a centro especializado',
        'No desarmar'
      ],
      warnings: ['Contienen metales pesados', 'Requieren tratamiento especial'],
      centers: 5,
      reuseIdeas: 3
    },
    {
      id: 6,
      name: 'Tetrapak',
      category: 'paper',
      recyclability: 'Media',
      recyclabilityScore: 70,
      description: 'Envases de bebidas y alimentos',
      image: '🥛',
      colorClass: 'material-card-tetrapak',
      steps: [
        'Enjuagar completamente',
        'Aplastar',
        'Separar de otros papeles',
        'Verificar símbolo de reciclaje'
      ],
      warnings: ['Algunos centros no aceptan', 'Debe estar completamente seco'],
      centers: 7,
      reuseIdeas: 4
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

  return (
    <div className="material-classification">
      <div className="card">
        {/* Header */}
        <div className="material-header">
          <h1 className="material-title">Clasificación de Materiales</h1>
          <p className="material-subtitle">Identifica, clasifica y aprende a reciclar correctamente cada material</p>
        </div>

        {/* Search Bar */}
        <div className="material-search">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar material por nombre (ej: botella plástica, latas, vidrio...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-camera">
              <span>📸</span>
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="material-categories">
          <div className="categories-header">
            <h2 className="categories-title">Categorías</h2>
            <button className="categories-all">Ver todas →</button>
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
                <span className="category-icon">{category.icon}</span>
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
              <div className="material-card-header">
                <div className="material-card-left">
                  <div className="material-icon">
                    <span>{material.image}</span>
                  </div>
                  <div className="material-info">
                    <h3 className="material-name">{material.name}</h3>
                    <div className="material-recyclability">
                      <span className={`recyclability-badge ${getRecyclabilityColor(material.recyclabilityScore)}`}>
                        {material.recyclability} • {material.recyclabilityScore}%
                      </span>
                    </div>
                  </div>
                </div>
                <button className="material-favorite">
                  <span>❤️</span>
                </button>
              </div>
              
              <p className="material-description">
                {material.description}
              </p>
              
              <div className="material-stats">
                <div className="stats-left">
                  <span className="stat-item">
                    <span className="stat-icon">🏭</span>
                    {material.centers} centros
                  </span>
                  <span className="stat-item">
                    <span className="stat-icon">💡</span>
                    {material.reuseIdeas} ideas
                  </span>
                </div>
                <span className="material-details">
                  Ver detalles
                  <span className="details-arrow">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="quick-stats-grid">
            <div className="quick-stat">
              <div className="quick-stat-value">{materials.length}</div>
              <div className="quick-stat-label">Materiales catalogados</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">95%</div>
              <div className="quick-stat-label">Tasa de reciclabilidad</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">50+</div>
              <div className="quick-stat-label">Centros disponibles</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">150+</div>
              <div className="quick-stat-label">Ideas de reuso</div>
            </div>
          </div>
        </div>

        {/* AI Recognition */}
        <div className="ai-recognition">
          <div className="ai-content">
            <div className="ai-text">
              <h3 className="ai-title">¿No estás seguro del material?</h3>
              <p className="ai-description">Usa nuestro reconocimiento por IA para identificar materiales con una foto</p>
            </div>
            <button className="ai-button">
              <span className="ai-icon">📸</span>
              Subir foto para identificar
            </button>
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
                    <span>{selectedMaterial.image}</span>
                  </div>
                  <div className="modal-title-section">
                    <h2 className="modal-title">{selectedMaterial.name}</h2>
                    <div className="modal-recyclability">
                      <span className={`recyclability-badge ${getRecyclabilityColor(selectedMaterial.recyclabilityScore)}`}>
                        Reciclabilidad: {selectedMaterial.recyclability} ({selectedMaterial.recyclabilityScore}%)
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedMaterial(null)}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="modal-content">
                {/* Description */}
                <div className="modal-section">
                  <h3 className="section-title">Descripción</h3>
                  <p className="section-content">{selectedMaterial.description}</p>
                </div>

                {/* Steps */}
                <div className="modal-section">
                  <h3 className="section-title">Pasos para preparar</h3>
                  <div className="steps-list">
                    {selectedMaterial.steps.map((step, index) => (
                      <div key={index} className="step-item">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {selectedMaterial.warnings.length > 0 && (
                  <div className="modal-section">
                    <h3 className="section-title warning-title">
                      <span className="warning-icon">⚠️</span>
                      Advertencias importantes
                    </h3>
                    <div className="warnings-list">
                      {selectedMaterial.warnings.map((warning, index) => (
                        <div key={index} className="warning-item">
                          <span className="warning-bullet">•</span>
                          <span className="warning-text">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reuse Ideas */}
                <div className="modal-section">
                  <h3 className="section-title">Ideas de reutilización</h3>
                  <div className="reuse-grid">
                    <button className="reuse-idea reuse-idea-green">
                      <div className="reuse-title">🌱 Maceta autoriego</div>
                      <div className="reuse-description">Transforma en maceta con sistema de riego automático</div>
                    </button>
                    <button className="reuse-idea reuse-idea-blue">
                      <div className="reuse-title">🗑️ Organizador</div>
                      <div className="reuse-description">Crea organizadores para escritorio o baño</div>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="modal-actions">
                  <button className="modal-action-primary">
                    <span className="action-icon">📍</span>
                    Ver centros cercanos ({selectedMaterial.centers})
                  </button>
                  <button className="modal-action-secondary">
                    Guardar para después
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