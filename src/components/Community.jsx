// components/Community.jsx
import React, { useState } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'María Pérez',
      userRole: 'Usuario',
      content: '¿Alguien sabe dónde puedo reciclar baterías de laptop en San Carlos?',
      category: 'Consulta',
      comments: 3,
      likes: 5,
      timestamp: '2025-12-03 10:30'
    },
    {
      id: 2,
      user: 'EcoCentro Central',
      userRole: 'Centro Reciclaje',
      content: '¡Nuevo horario de atención! Ahora abrimos los sábados de 8:00 a 12:00. Aceptamos plástico, vidrio y metales.',
      category: 'Anuncio',
      comments: 7,
      likes: 15,
      timestamp: '2025-12-02 14:15'
    },
    {
      id: 3,
      user: 'Carlos Rodríguez',
      userRole: 'Creador Contenido',
      content: 'Comparto tutorial completo para hacer compost en casa usando residuos orgánicos. ¡Es más fácil de lo que parece!',
      category: 'Tutorial',
      comments: 12,
      likes: 28,
      timestamp: '2025-12-01 09:45'
    },
    {
      id: 4,
      user: 'Ana Martínez',
      userRole: 'Usuario',
      content: '¿Es cierto que los envases tetrapak se pueden reciclar? ¿En qué centros los aceptan?',
      category: 'Consulta',
      comments: 8,
      likes: 4,
      timestamp: '2025-11-30 16:20'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Consulta');

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      user: 'Tú',
      userRole: 'Usuario',
      content: newPost,
      category: selectedCategory,
      comments: 0,
      likes: 0,
      timestamp: new Date().toISOString().split('T')[0] + ' ' + 
                new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
    alert('¡Publicación enviada para moderación!');
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const categories = ['Consulta', 'Anuncio', 'Tutorial', 'Idea', 'Proyecto', 'Evento'];

  return (
    <div className="community">
      <div className="card">
        <h2 className="card-title">Comunidad EcoTrack</h2>
        <p className="subtitle">Comparte, pregunta y aprende con la comunidad ecológica</p>
        
        <div className="create-post">
          <form onSubmit={handleSubmitPost}>
            <div className="form-group">
              <textarea
                className="form-textarea"
                placeholder="¿Qué quieres compartir con la comunidad? Preguntas, ideas, proyectos..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows="3"
              />
            </div>
            
            <div className="post-options">
              <div className="category-select">
                <label>Categoría:</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="post-actions">
                <button type="button" className="btn btn-outline">
                  📷 Imagen
                </button>
                <button type="button" className="btn btn-outline">
                  🔗 Enlace
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="community-filters">
          <h3>Publicaciones de la comunidad</h3>
          <div className="filter-tags">
            <button className="filter-tag active">Todas</button>
            {categories.map(cat => (
              <button key={cat} className="filter-tag">{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="user-info">
                  <div className="user-avatar">
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <h4>{post.user}</h4>
                    <div className="user-meta">
                      <span className="user-role">{post.userRole}</span>
                      <span className="post-time">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <span className="post-category">{post.category}</span>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              
              <div className="post-stats">
                <button 
                  className="stat-btn"
                  onClick={() => handleLike(post.id)}
                >
                  👍 {post.likes}
                </button>
                <button className="stat-btn">
                  💬 {post.comments} comentarios
                </button>
                <button className="stat-btn">
                  🔗 Compartir
                </button>
                <button className="stat-btn">
                  📌 Guardar
                </button>
              </div>
              
              <div className="post-comments">
                <div className="comment-input">
                  <input type="text" placeholder="Escribe un comentario..." />
                  <button className="btn btn-secondary">Comentar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="community-stats">
          <div className="stat-card">
            <h4>🌱</h4>
            <p>123 ideas de reuso</p>
          </div>
          <div className="stat-card">
            <h4>👥</h4>
            <p>456 usuarios activos</p>
          </div>
          <div className="stat-card">
            <h4>💬</h4>
            <p>789 comentarios</p>
          </div>
          <div className="stat-card">
            <h4>🏆</h4>
            <p>45 proyectos comunitarios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;