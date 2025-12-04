// src/components/MaterialClassification.jsx
import React, { useState } from 'react';

const MaterialClassification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todos', icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { id: 'plastic', name: 'Plástico', icon: '♻️', color: 'bg-green-100 text-green-600' },
    { id: 'paper', name: 'Papel', icon: '📄', color: 'bg-amber-100 text-amber-600' },
    { id: 'metal', name: 'Metales', icon: '🔩', color: 'bg-gray-100 text-gray-600' },
    { id: 'glass', name: 'Vidrio', icon: '🍶', color: 'bg-sky-100 text-sky-600' },
    { id: 'electronics', name: 'Electrónicos', icon: '📱', color: 'bg-purple-100 text-purple-600' },
    { id: 'organic', name: 'Orgánicos', icon: '🍃', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'textile', name: 'Textiles', icon: '👕', color: 'bg-pink-100 text-pink-600' },
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
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
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
      color: 'bg-gray-50',
      borderColor: 'border-gray-200',
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
      color: 'bg-sky-50',
      borderColor: 'border-sky-200',
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
      color: 'bg-amber-50',
      borderColor: 'border-amber-200',
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
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
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
      color: 'bg-amber-50',
      borderColor: 'border-amber-200',
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
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="material-classification">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clasificación de Materiales</h1>
        <p className="text-gray-600">Identifica, clasifica y aprende a reciclar correctamente cada material</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Buscar material por nombre (ej: botella plástica, latas, vidrio...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span>📸</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Categorías</h2>
          <button className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
            Ver todas →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                selectedCategory === category.id 
                  ? 'border-green-500 bg-green-50 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredMaterials.map(material => (
          <div 
            key={material.id}
            className={`bg-white rounded-xl border-2 ${material.borderColor} p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
              selectedMaterial?.id === material.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedMaterial(material)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${material.color}`}>
                  <span className="text-2xl">{material.image}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {material.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecyclabilityColor(material.recyclabilityScore)}`}>
                      {material.recyclability} • {material.recyclabilityScore}%
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <span>❤️</span>
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {material.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <span className="mr-1">🏭</span>
                  {material.centers} centros
                </span>
                <span className="flex items-center">
                  <span className="mr-1">💡</span>
                  {material.reuseIdeas} ideas
                </span>
              </div>
              <span className="flex items-center text-green-600 font-medium">
                Ver detalles
                <span className="ml-1">→</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Material Detail View */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${selectedMaterial.color}`}>
                    <span className="text-3xl">{selectedMaterial.image}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMaterial.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecyclabilityColor(selectedMaterial.recyclabilityScore)}`}>
                        Reciclabilidad: {selectedMaterial.recyclability} ({selectedMaterial.recyclabilityScore}%)
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-600">{selectedMaterial.description}</p>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pasos para preparar</h3>
                <div className="space-y-2">
                  {selectedMaterial.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {selectedMaterial.warnings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Advertencias importantes
                  </h3>
                  <div className="space-y-2">
                    {selectedMaterial.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <span className="text-red-600">•</span>
                        <span className="text-red-700">{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reuse Ideas */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ideas de reutilización</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-left">
                    <div className="font-medium mb-1">🌱 Maceta autoriego</div>
                    <div className="text-sm">Transforma en maceta con sistema de riego automático</div>
                  </button>
                  <button className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left">
                    <div className="font-medium mb-1">🗑️ Organizador</div>
                    <div className="text-sm">Crea organizadores para escritorio o baño</div>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                  <span className="mr-2">📍</span>
                  Ver centros cercanos ({selectedMaterial.centers})
                </button>
                <button className="flex-1 border-2 border-green-500 text-green-600 py-3 px-6 rounded-xl font-semibold hover:bg-green-50 transition-all duration-200">
                  Guardar para después
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{materials.length}</div>
            <div className="text-gray-600">Materiales catalogados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-gray-600">Tasa de reciclabilidad</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600">Centros disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">150+</div>
            <div className="text-gray-600">Ideas de reuso</div>
          </div>
        </div>
      </div>

      {/* AI Recognition */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿No estás seguro del material?</h3>
            <p className="text-gray-600">Usa nuestro reconocimiento por IA para identificar materiales con una foto</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center">
            <span className="mr-2">📸</span>
            Subir foto para identificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialClassification;