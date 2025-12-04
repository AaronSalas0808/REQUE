// components/Community.jsx
import React, { useState } from 'react';
import { 
  FaUsers, 
  FaComments, 
  FaLightbulb, 
  FaTrophy, 
  FaImage, 
  FaLink, 
  FaPaperPlane,
  FaThumbsUp,
  FaShare,
  FaBookmark,
  FaComment,
  FaUserCircle,
  FaCalendarAlt,
  FaFilter
} from 'react-icons/fa';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'María Pérez',
      userRole: 'Usuario',
      content: '¿Alguien sabe dónde puedo reciclar baterías de laptop en San Carlos? He buscado en varios centros pero no aceptan este tipo de residuos electrónicos.',
      category: 'Consulta',
      comments: 3,
      likes: 5,
      timestamp: 'Hace 2 horas',
      userColor: 'var(--primary-500)'
    },
    {
      id: 2,
      user: 'EcoCentro Central',
      userRole: 'Centro Reciclaje',
      content: '¡Nuevo horario de atención! Ahora abrimos los sábados de 8:00 a 12:00. Aceptamos plástico, vidrio y metales. ¡Trae tus materiales limpios y separados! 🎉',
      category: 'Anuncio',
      comments: 7,
      likes: 15,
      timestamp: 'Ayer, 14:15',
      userColor: 'var(--secondary-500)'
    },
    {
      id: 3,
      user: 'Carlos Rodríguez',
      userRole: 'Creador Contenido',
      content: 'Comparto tutorial completo para hacer compost en casa usando residuos orgánicos. ¡Es más fácil de lo que parece! Paso a paso y con fotos explicativas. #CompostajeCasero',
      category: 'Tutorial',
      comments: 12,
      likes: 28,
      timestamp: '2 días',
      userColor: 'var(--success-500)'
    },
    {
      id: 4,
      user: 'Ana Martínez',
      userRole: 'Usuario',
      content: '¿Es cierto que los envases tetrapak se pueden reciclar? ¿En qué centros los aceptan aquí en la zona? He leído información contradictoria.',
      category: 'Consulta',
      comments: 8,
      likes: 4,
      timestamp: '3 días',
      userColor: 'var(--warning-500)'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Consulta');
  const [activeFilter, setActiveFilter] = useState('Todas');

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
      timestamp: 'Justo ahora',
      userColor: 'var(--primary-600)'
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

  const filteredPosts = activeFilter === 'Todas' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  return (
    <div className="community">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FaUsers className="title-icon" />
            <span>Comunidad EcoTrack</span>
          </div>
          <p className="card-subtitle">
            Comparte, pregunta y aprende con la comunidad ecológica
          </p>
        </div>
        
        <div className="create-post">
          <div className="post-header">
            <div className="user-avatar current-user">
              <FaUserCircle className="avatar-icon" />
            </div>
            <form onSubmit={handleSubmitPost} className="post-form">
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
                  <label className="select-label">
                    <FaFilter />
                    Categoría:
                  </label>
                  <div className="select-wrapper">
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
                </div>
                
                <div className="post-actions">
                  <button type="button" className="btn btn-outline btn-icon">
                    <FaImage />
                    <span>Imagen</span>
                  </button>
                  <button type="button" className="btn btn-outline btn-icon">
                    <FaLink />
                    <span>Enlace</span>
                  </button>
                  <button type="submit" className="btn btn-primary btn-icon">
                    <FaPaperPlane />
                    <span>Publicar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="community-filters">
          <div className="filters-header">
            <h3>
              <FaComments />
              Publicaciones de la comunidad
            </h3>
            <div className="posts-count">
              {filteredPosts.length} publicaciones
            </div>
          </div>
          <div className="filter-tags">
            <button 
              className={`filter-tag ${activeFilter === 'Todas' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Todas')}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-tag ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'Consulta' ? '❓ Consulta' :
                 cat === 'Anuncio' ? '📢 Anuncio' :
                 cat === 'Tutorial' ? '📚 Tutorial' :
                 cat === 'Idea' ? '💡 Idea' :
                 cat === 'Proyecto' ? '🚀 Proyecto' :
                 '📅 Evento'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="posts-list">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="user-info">
                  <div className="user-avatar" style={{ backgroundColor: post.userColor }}>
                    {post.user.charAt(0)}
                  </div>
                  <div className="user-details">
                    <div className="user-name-row">
                      <h4>{post.user}</h4>
                      <span className={`post-category category-${post.category.toLowerCase()}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="user-meta">
                      <span className="user-role">
                        {post.userRole}
                      </span>
                      <span className="post-time">
                        <FaCalendarAlt />
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              
              <div className="post-stats">
                <div className="stats-left">
                  <button 
                    className="stat-btn like-btn"
                    onClick={() => handleLike(post.id)}
                  >
                    <FaThumbsUp />
                    <span>{post.likes}</span>
                  </button>
                  <button className="stat-btn comment-btn">
                    <FaComment />
                    <span>{post.comments} comentarios</span>
                  </button>
                </div>
                <div className="stats-right">
                  <button className="stat-btn share-btn">
                    <FaShare />
                    <span>Compartir</span>
                  </button>
                  <button className="stat-btn save-btn">
                    <FaBookmark />
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
              
              <div className="post-comments">
                <div className="comment-input">
                  <div className="comment-avatar">
                    <FaUserCircle />
                  </div>
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Escribe un comentario..." 
                      className="comment-field"
                    />
                    <button className="btn btn-secondary btn-sm">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="community-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaLightbulb />
            </div>
            <div className="stat-content">
              <h4>123</h4>
              <p>ideas de reuso</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h4>456</h4>
              <p>usuarios activos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaComments />
            </div>
            <div className="stat-content">
              <h4>789</h4>
              <p>comentarios</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-content">
              <h4>45</h4>
              <p>proyectos comunitarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;