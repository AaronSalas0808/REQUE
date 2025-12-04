// components/ReuseIdeas.jsx
import React, { useState } from 'react';
import './ReuseIdeas.css';

const ReuseIdeas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Maceta con botella PET',
      description: 'Transforma botellas plásticas en hermosas macetas para tu jardín',
      material: 'Plástico',
      difficulty: 'Fácil',
      steps: ['Cortar botella', 'Decorar', 'Agregar tierra', 'Plantar'],
      image: '🌱',
      likes: 24,
      approved: true
    },
    {
      id: 2,
      title: 'Organizador con latas',
      description: 'Crea un organizador de escritorio usando latas de aluminio',
      material: 'Metales',
      difficulty: 'Fácil',
      steps: ['Limpiar latas', 'Pintar', 'Unir con silicona'],
      image: '🗄️',
      likes: 18,
      approved: true
    },
    {
      id: 3,
      title: 'Lámpara con frascos de vidrio',
      description: 'Convierte frascos de vidrio en elegantes lámparas',
      material: 'Vidrio',
      difficulty: 'Media',
      steps: ['Limpiar frasco', 'Instalar portalámparas', 'Decorar'],
      image: '💡',
      likes: 31,
      approved: true
    },
    {
      id: 4,
      title: 'Bolsa con jeans viejos',
      description: 'Transforma jeans en desuso en bolsas reutilizables',
      material: 'Textiles',
      difficulty: 'Media',
      steps: ['Cortar jeans', 'Coser', 'Agregar asas'],
      image: '👜',
      likes: 15,
      approved: false
    }
  ]);

  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    material: 'Plástico',
    difficulty: 'Fácil'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const idea = {
      ...newIdea,
      id: ideas.length + 1,
      image: '💡',
      likes: 0,
      approved: false,
      steps: []
    };
    setIdeas([...ideas, idea]);
    setNewIdea({ title: '', description: '', material: 'Plástico', difficulty: 'Fácil' });
    alert('¡Idea enviada! Será revisada por moderadores antes de publicarse.');
  };

  const handleLike = (id) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
    ));
  };

  return (
    <div className="reuse-ideas">
      <div className="card">
        <h2 className="card-title">Ideas de Reutilización Creativa</h2>
        
        <div className="ideas-grid">
          {ideas
            .filter(idea => idea.approved)
            .map(idea => (
              <div key={idea.id} className="idea-card">
                <div className="idea-header">
                  <div className="idea-image">{idea.image}</div>
                  <div>
                    <h4>{idea.title}</h4>
                    <div className="idea-tags">
                      <span className="material-tag">{idea.material}</span>
                      <span className="difficulty-tag">{idea.difficulty}</span>
                    </div>
                  </div>
                </div>
                
                <p className="idea-description">{idea.description}</p>
                
                <div className="idea-steps">
                  <h5>Pasos:</h5>
                  <ol>
                    {idea.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="idea-footer">
                  <button 
                    className="like-btn"
                    onClick={() => handleLike(idea.id)}
                  >
                    👍 {idea.likes}
                  </button>
                  <button className="btn btn-outline" style={{ padding: '0.3rem 1rem' }}>
                    Guardar
                  </button>
                </div>
              </div>
            ))}
        </div>
        
        <div className="submit-idea">
          <h3>Comparte tu idea de reutilización</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Título de la idea</label>
              <input
                type="text"
                className="form-input"
                value={newIdea.title}
                onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Descripción detallada</label>
              <textarea
                className="form-textarea"
                value={newIdea.description}
                onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Material principal</label>
                <select
                  className="form-select"
                  value={newIdea.material}
                  onChange={(e) => setNewIdea({...newIdea, material: e.target.value})}
                >
                  <option value="Plástico">Plástico</option>
                  <option value="Vidrio">Vidrio</option>
                  <option value="Metales">Metales</option>
                  <option value="Papel">Papel</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Electrónicos">Electrónicos</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Dificultad</label>
                <select
                  className="form-select"
                  value={newIdea.difficulty}
                  onChange={(e) => setNewIdea({...newIdea, difficulty: e.target.value})}
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Media">Media</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Imágenes (opcional)</label>
              <div className="image-upload">
                <button type="button" className="btn btn-outline">
                  📸 Subir imagen
                </button>
                <p className="upload-note">Formatos: JPG, PNG, MP4</p>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Publicar idea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReuseIdeas;