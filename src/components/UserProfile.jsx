// components/UserProfile.jsx
import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'María Pérez',
    email: 'maria@email.com',
    location: 'San Carlos, Alajuela',
    interests: ['Plástico', 'Vidrio', 'Reutilización creativa'],
    joinDate: '2025-11-15'
  });

  const [userStats, setUserStats] = useState({
    ideasPosted: 5,
    centersVisited: 12,
    communityComments: 23,
    materialsRecycled: 45,
    points: 1250
  });

  const [savedIdeas, setSavedIdeas] = useState([
    { id: 1, title: 'Maceta con botella PET', category: 'Plástico' },
    { id: 2, title: 'Organizador con latas', category: 'Metales' },
    { id: 3, title: 'Lámpara con frascos', category: 'Vidrio' },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'idea', title: 'Publicaste una idea de reuso', date: '2025-12-02' },
    { id: 2, type: 'comment', title: 'Comentaste en "Compostaje casero"', date: '2025-12-01' },
    { id: 3, type: 'visit', title: 'Visitaste EcoCentro Central', date: '2025-11-30' },
    { id: 4, type: 'material', title: 'Clasificaste "PET" correctamente', date: '2025-11-28' },
  ]);

  return (
    <div className="user-profile">
      <div className="card">
        <h2 className="card-title">Mi Perfil</h2>
        
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p className="profile-email">{user.email}</p>
            <p className="profile-location">📍 {user.location}</p>
            <p className="profile-join">Miembro desde: {user.joinDate}</p>
          </div>
          <div className="profile-points">
            <div className="points-display">
              <span className="points-label">Puntos Eco</span>
              <span className="points-value">{userStats.points}</span>
            </div>
            <p className="points-description">Contribuyendo a un planeta más limpio</p>
          </div>
        </div>
        
        <div className="profile-stats">
          <h3>Mi Impacto Ambiental</h3>
          <div className="stats-grid">
            <div className="stat-card profile">
              <h4>💡</h4>
              <p className="stat-value">{userStats.ideasPosted}</p>
              <p className="stat-label">Ideas compartidas</p>
            </div>
            <div className="stat-card profile">
              <h4>🏭</h4>
              <p className="stat-value">{userStats.centersVisited}</p>
              <p className="stat-label">Centros visitados</p>
            </div>
            <div className="stat-card profile">
              <h4>💬</h4>
              <p className="stat-value">{userStats.communityComments}</p>
              <p className="stat-label">Comentarios</p>
            </div>
            <div className="stat-card profile">
              <h4>♻️</h4>
              <p className="stat-value">{userStats.materialsRecycled} kg</p>
              <p className="stat-label">Material reciclado</p>
            </div>
          </div>
        </div>
        
        <div className="profile-sections">
          <div className="profile-section">
            <h3>Mis Intereses</h3>
            <div className="interests-list">
              {user.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>
              + Agregar intereses
            </button>
          </div>
          
          <div className="profile-section">
            <h3>Ideas Guardadas</h3>
            {savedIdeas.length > 0 ? (
              <div className="saved-ideas">
                {savedIdeas.map(idea => (
                  <div key={idea.id} className="saved-idea">
                    <h5>{idea.title}</h5>
                    <span className="idea-category">{idea.category}</span>
                    <button className="view-btn">Ver</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No tienes ideas guardadas</p>
            )}
          </div>
        </div>
        
        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'idea' ? '💡' : 
                   activity.type === 'comment' ? '💬' :
                   activity.type === 'visit' ? '📍' : '♻️'}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-date">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="profile-settings">
          <h3>Configuración de Cuenta</h3>
          <div className="settings-options">
            <button className="btn btn-outline">
              ✏️ Editar perfil
            </button>
            <button className="btn btn-outline">
              🔒 Cambiar contraseña
            </button>
            <button className="btn btn-outline">
              📍 Actualizar ubicación
            </button>
            <button className="btn btn-outline">
              🔔 Preferencias de notificaciones
            </button>
          </div>
        </div>
        
        <div className="profile-achievements">
          <h3>Logros y Reconocimientos</h3>
          <div className="achievements-list">
            <div className="achievement">
              <div className="achievement-icon">🏆</div>
              <div>
                <h5>Reciclador Novato</h5>
                <p>Primeros 10 materiales reciclados</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-icon">🌟</div>
              <div>
                <h5>Comunidad Activa</h5>
                <p>10+ comentarios en la comunidad</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-icon">💡</div>
              <div>
                <h5>Creador de Ideas</h5>
                <p>Primera idea de reuso publicada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;