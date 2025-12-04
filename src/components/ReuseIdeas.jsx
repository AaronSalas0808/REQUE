// components/ReuseIdeas.jsx
import React, { useState } from 'react';
import './ReuseIdeas.css';
import { FaHeart, FaBookmark, FaYoutube, FaUpload, FaLightbulb, FaLeaf, FaBox, FaGlassCheers } from 'react-icons/fa';

const ReuseIdeas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'Maceta con botella PET',
      description: 'Transforma botellas plásticas en hermosas macetas para tu jardín con este sencillo tutorial paso a paso.',
      material: 'Plástico',
      difficulty: 'Fácil',
      steps: ['Cortar botella', 'Decorar', 'Agregar tierra', 'Plantar'],
      image: '🌱',
      icon: <FaLeaf />,
      likes: 24,
      approved: true,
      youtubeLink: null
    },
    {
      id: 2,
      title: 'Organizador con latas',
      description: 'Crea un organizador de escritorio moderno usando latas de aluminio recicladas.',
      material: 'Metales',
      difficulty: 'Fácil',
      steps: ['Limpiar latas', 'Pintar', 'Unir con silicona', 'Decorar'],
      image: '🗄️',
      icon: <FaBox />,
      likes: 18,
      approved: true,
      youtubeLink: null
    },
    {
      id: 3,
      title: 'Lámpara con frascos de vidrio',
      description: 'Convierte frascos de vidrio en elegantes lámparas con este tutorial completo.',
      material: 'Vidrio',
      difficulty: 'Media',
      steps: ['Limpiar frasco', 'Instalar portalámparas', 'Decorar', 'Conectar cableado'],
      image: '💡',
      icon: <FaLightbulb />,
      likes: 31,
      approved: true,
      youtubeLink: 'https://share.google/0VzGM4JYMJMmNwUWH'
    },
    {
      id: 4,
      title: 'Bolsa con jeans viejos',
      description: 'Transforma jeans en desuso en bolsas reutilizables de moda.',
      material: 'Textiles',
      difficulty: 'Media',
      steps: ['Cortar jeans', 'Coser', 'Agregar asas', 'Decorar'],
      image: '👜',
      icon: <FaGlassCheers />,
      likes: 15,
      approved: false,
      youtubeLink: null
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
      icon: <FaLightbulb />,
      likes: 0,
      approved: false,
      steps: [],
      youtubeLink: null
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
        <div className="card-header">
          <h2 className="card-title">
            <FaLightbulb className="title-icon" />
            Ideas de Reutilización Creativa
          </h2>
          <p className="card-subtitle">Descubre y comparte ideas innovadoras para dar nueva vida a materiales reciclables</p>
        </div>
        
        <div className="ideas-grid">
          {ideas
            .filter(idea => idea.approved)
            .map(idea => (
              <div key={idea.id} className="idea-card">
                <div className="idea-header">
                  <div className="idea-image">
                    <div className="idea-icon">{idea.icon}</div>
                    <div className="idea-emoji">{idea.image}</div>
                  </div>
                  <div className="idea-header-content">
                    <h4>{idea.title}</h4>
                    <div className="idea-tags">
                      <span className={`material-tag material-${idea.material.toLowerCase()}`}>
                        {idea.material}
                      </span>
                      <span className={`difficulty-tag difficulty-${idea.difficulty.toLowerCase()}`}>
                        {idea.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="idea-description">{idea.description}</p>
                
                <div className="idea-steps">
                  <h5><span className="steps-icon">📋</span> Pasos:</h5>
                  <ol>
                    {idea.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="idea-footer">
                  <div className="idea-actions">
                    <button 
                      className="like-btn"
                      onClick={() => handleLike(idea.id)}
                    >
                      <FaHeart className="like-icon" />
                      <span className="like-count">{idea.likes}</span>
                    </button>
                    
                    <button className="save-btn">
                      <FaBookmark className="save-icon" />
                      <span>Guardar</span>
                    </button>
                    
                    {idea.youtubeLink && (
                      <a 
                        href={idea.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-btn"
                      >
                        <FaYoutube className="youtube-icon" />
                        <span>Ver Tutorial</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="submit-idea">
          <div className="submit-header">
            <h3>
              <FaUpload className="submit-icon" />
              Comparte tu idea de reutilización
            </h3>
            <p className="submit-description">Inspira a otros con tu creatividad. Sube tu idea y forma parte de nuestra comunidad eco-friendly.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Título de la idea *</label>
              <input
                type="text"
                className="form-input"
                value={newIdea.title}
                onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                placeholder="Ej: Lámpara solar con botellas"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Descripción detallada *</label>
              <textarea
                className="form-textarea"
                value={newIdea.description}
                onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                placeholder="Describe tu idea creativa, materiales necesarios y el proceso..."
                rows="4"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Material principal *</label>
                <select
                  className="form-select"
                  value={newIdea.material}
                  onChange={(e) => setNewIdea({...newIdea, material: e.target.value})}
                >
                  <option value="Plástico">♻️ Plástico</option>
                  <option value="Vidrio">🥛 Vidrio</option>
                  <option value="Metales">⚙️ Metales</option>
                  <option value="Papel">📄 Papel</option>
                  <option value="Textiles">👕 Textiles</option>
                  <option value="Electrónicos">🔌 Electrónicos</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Dificultad *</label>
                <select
                  className="form-select"
                  value={newIdea.difficulty}
                  onChange={(e) => setNewIdea({...newIdea, difficulty: e.target.value})}
                >
                  <option value="Fácil">🟢 Fácil</option>
                  <option value="Media">🟡 Media</option>
                  <option value="Difícil">🔴 Difícil</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Imágenes (opcional)</label>
              <div className="image-upload">
                <div className="upload-content">
                  <FaUpload className="upload-icon" />
                  <p className="upload-text">Arrastra o haz clic para subir imágenes</p>
                  <p className="upload-note">Formatos: JPG, PNG, MP4 (Máx. 5MB)</p>
                </div>
                <input type="file" className="file-input" accept="image/*,video/*" />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Enlace de YouTube (opcional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://youtube.com/tu-tutorial"
                onChange={(e) => setNewIdea({...newIdea, youtubeLink: e.target.value})}
              />
            </div>
            
            <button type="submit" className="btn-submit-idea">
              <FaUpload className="btn-icon" />
              Publicar idea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReuseIdeas;