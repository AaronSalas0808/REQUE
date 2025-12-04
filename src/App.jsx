// npm install express cors   --> para usar json
// npm install multer         --> para subir y bajar imagenes 

import React, { useState, useEffect } from "react";
import "./App.css";

// Importa todos los componentes
import Header from "./components/Header";
import Login from "./components/Login";
import Voting from "./components/Voting";
import PostVoting from "./components/PostVoting";
import AdminDashboard from "./components/admin/AdminDashboard";
import CandidateDashboard from "./components/candidate/CandidateDashboard";
import CandidateRegistration from "./components/candidate/CandidateRegistration";
import CandidateInfoModal from "./components/CandidateInfoModal";

export default function App() {
  const [view, setView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [electionData, setElectionData] = useState({
    electionStatus: "inactive",
    candidates: [],
  });
  const [isCandidateInfoModalOpen, setCandidateInfoModalOpen] = useState(false);
  // 👇 NUEVO ESTADO: Controla si el candidato ve su dashboard o la pantalla de votación
  const [candidateView, setCandidateView] = useState("dashboard");

  const fetchElectionData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/election-data");
      if (response.ok) setElectionData(await response.json());
    } catch (error) {
      console.error("Error al conectar con la API", error);
    }
  };

  useEffect(() => { fetchElectionData() }, []);

  const handleLogin = async (username, password) => {
    // ... (esta función no cambia)
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        await fetchElectionData();
        setLoginError("");
      } else {
        setLoginError("Credenciales incorrectas.");
      }
    } catch (error) {
      setLoginError("Error de conexión al intentar iniciar sesión.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
    setCandidateView("dashboard"); // Reseteamos la vista del candidato al salir
  };

  const handleVote = async (candidateId) => {
    await fetch("http://localhost:3001/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, candidateId }),
    });
    // Actualizamos el estado local del usuario para reflejar el voto
    setCurrentUser({ ...currentUser, hasVoted: true });
    // Si el que votó fue un candidato, lo regresamos a su dashboard
    if (currentUser.role === 'candidate') {
      setCandidateView("dashboard");
    }
  };

  const renderContent = () => {
    if (!currentUser) {
      // ... (esta sección no cambia)
      if (view === "register") {
        return <CandidateRegistration onBackToLogin={() => setView("login")} />;
      }
      return (
        <Login
          onLogin={handleLogin}
          error={loginError}
          onShowRegister={() => setView("register")}
          electionStatus={electionData.electionStatus}
          onShowCandidates={() => setCandidateInfoModalOpen(true)}
        />
      );
    }

    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard />;
      
      case "candidate":
        // Si el candidato ya votó, solo puede ver su dashboard
        if (currentUser.hasVoted) {
          return <CandidateDashboard user={currentUser} electionData={electionData} />;
        }
        // Si no ha votado, decidimos si ve su dashboard o la pantalla de votación
        if (candidateView === "voting") {
          return <Voting candidates={electionData.candidates} onFinishVoting={handleVote} />;
        }
        return (
          <CandidateDashboard
            user={currentUser}
            electionData={electionData}
            onNavigateToVote={() => setCandidateView("voting")}
          />
        );

      case "voter":
        if (currentUser.hasVoted) {
          return <PostVoting />;
        }
        if (electionData.electionStatus === "active") {
          return <Voting candidates={electionData.candidates} onFinishVoting={handleVote} />;
        }
        return <div className="phase-container"><h2>Votación no activa</h2><p>La votación no se encuentra activa en este momento.</p></div>;
      
      default:
        return <p>Rol de usuario no reconocido.</p>;
    }
  };

  return (
<<<<<<< HEAD
    <div className="App">
      <Header user={currentUser} onLogout={handleLogout} />
      <CandidateInfoModal
        isOpen={isCandidateInfoModalOpen}
        onClose={() => setCandidateInfoModalOpen(false)}
        candidates={electionData.candidates}
      />
      <main className="main-content">{renderContent()}</main>
=======
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="app-title-block">
          <div className="app-icon">♻️</div>
          <div>
            <h1 className="app-title">EcoTrack</h1>
            <p className="app-subtitle">
              Asistente de reciclaje y reuso de “desechos” para familias, comunidad y empresas.
            </p>
          </div>
        </div>
        <div className="app-user-block">
          <span className="app-role">Rol: Usuario general</span>
          <button className="btn-outline small">🔔</button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-main">
        {/* COLUMNA IZQUIERDA: HOGAR */}
        <aside className="app-sidebar">
          <section className="card">
            <h2 className="card-title">Guía rápida para tu hogar</h2>
            <p className="card-subtitle">
              Pasos simples para empezar a clasificar los materiales dentro de la casa.
            </p>
            <ul className="tips-list">
              {householdTips.map((tip, index) => (
                <li key={index} className="tips-item">
                  <span className="tips-number">{index + 1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <button className="btn-outline full">Ver checklist semanal</button>
          </section>

          <section className="card">
            <h2 className="card-title">Clasificación rápida</h2>
            <p className="card-subtitle">
              Atajos para las categorías de desechos más comunes.
            </p>
            <div className="chips-container">
              {materialCategories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  className={
                    "chip" + (selectedCategory === cat ? " chip-active" : "")
                  }
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <small className="card-note">
              Puedes cambiar de categoría aquí y luego ver más detalles en el
              módulo de “Clasificar material”.
            </small>
          </section>

          <section className="card stats-card">
            <h2 className="card-title">Resumen de tu asistente</h2>
            <p className="card-subtitle">
              Estos datos provienen del catálogo actual (prototipo).
            </p>
            <div className="stats-row">
              <div className="stat-box">
                <span className="stat-number">{materials.length}</span>
                <span className="stat-label">Materiales</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{centers.length}</span>
                <span className="stat-label">Centros</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{tutorials.length}</span>
                <span className="stat-label">Tutoriales</span>
              </div>
            </div>
          </section>
        </aside>

        {/* ZONA DERECHA: MÓDULOS */}
        <section className="app-content">
          {/* TABS */}
          <div className="tabs">
            <button
              className={
                "tab-button" + (activeTab === "clasificar" ? " tab-active" : "")
              }
              onClick={() => setActiveTab("clasificar")}
            >
              Clasificar material
            </button>
            <button
              className={
                "tab-button" + (activeTab === "centros" ? " tab-active" : "")
              }
              onClick={() => setActiveTab("centros")}
            >
              Centros de reciclaje
            </button>
            <button
              className={
                "tab-button" + (activeTab === "tutoriales" ? " tab-active" : "")
              }
              onClick={() => setActiveTab("tutoriales")}
            >
              Tutoriales y guías
            </button>
            <button
              className={
                "tab-button" + (activeTab === "comunidad" ? " tab-active" : "")
              }
              onClick={() => setActiveTab("comunidad")}
            >
              Comunidad
            </button>
            <button
              className={
                "tab-button" + (activeTab === "empresas" ? " tab-active" : "")
              }
              onClick={() => setActiveTab("empresas")}
            >
              Empresas recicladoras
            </button>
          </div>

          {/* CONTENIDO DE CADA TAB */}
          {activeTab === "clasificar" && (
            <div className="tab-panel">
              <div className="panel-grid">
                {/* Buscador de material */}
                <section className="card">
                  <h2 className="card-title">
                    ¿Qué material quieres clasificar?
                  </h2>
                  <p className="card-subtitle">
                    Escribe algo como “botella plástica”, “celular viejo” o
                    “lata de aluminio” y verás pasos concretos.
                  </p>

                  <div className="search-row">
                    <div className="search-box">
                      <span className="search-icon">🔍</span>
                      <input
                        type="text"
                        placeholder="Buscar material por nombre…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="select-box">
                      <label>Categoría:</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {materialCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="select-box">
                      <label>Reciclabilidad:</label>
                      <select
                        value={recyclabilityFilter}
                        onChange={(e) => setRecyclabilityFilter(e.target.value)}
                      >
                        {recyclabilityOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <small className="card-note">
                    Materiales totales en catálogo: {materials.length} ·
                    Mostrando: {filteredMaterials.length}
                  </small>

                  <div className="materials-list">
                    {filteredMaterials.length === 0 && (
                      <div className="empty-state">
                        <p>No encontramos ese material en el catálogo.</p>
                        <button className="btn-outline small">
                          Sugerir nuevo material
                        </button>
                      </div>
                    )}

                    {filteredMaterials.map((m) => (
                      <div key={m.name} className="material-card">
                        <div className="material-header">
                          <div>
                            <h3>{m.name}</h3>
                            <p className="material-meta">
                              {m.type} · {m.category}
                            </p>
                          </div>
                          <span className={`badge badge-${m.recyclability}`}>
                            Reciclabilidad: {m.recyclability}
                          </span>
                        </div>

                        <div className="material-body">
                          <div className="material-column">
                            <h4>Pasos para prepararlo</h4>
                            <ul>
                              {m.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="material-column">
                            <h4>Advertencias</h4>
                            <ul className="warnings">
                              {m.warnings.map((w, i) => (
                                <li key={i}>{w}</li>
                              ))}
                            </ul>
                            <h4>Ideas de reuso</h4>
                            <div className="tags-container">
                              {m.reuseIdeas.map((idea) => (
                                <span key={idea} className="tag">
                                  {idea}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Centros que reciben este material */}
                <section className="card">
                  <h2 className="card-title">Centros que reciben este material</h2>
                  <p className="card-subtitle">
                    Vista orientativa: se mostrarían puntos limpios y centros de
                    acopio cercanos a tu ubicación, filtrados por el tipo de material.
                  </p>

                  <div className="location-box">
                    <div>
                      <strong>Ubicación aproximada:</strong> San Carlos, Costa Rica
                    </div>
                    <button className="btn-outline small">Cambiar ubicación</button>
                  </div>

                  <div className="map-placeholder">
                    <p>🗺️ Aquí iría un mapa interactivo (prototipo visual).</p>
                  </div>

                  <div className="centers-list">
                    {centersForClasificar.length === 0 && (
                      <div className="empty-state">
                        <p>No hay centros configurados que reciban esta categoría.</p>
                      </div>
                    )}
                    {centersForClasificar.map((c) => (
                      <div key={c.name} className="center-card">
                        <div className="center-header">
                          <h3>{c.name}</h3>
                          <span className="badge">{c.distance}</span>
                        </div>
                        <p className="center-meta">{c.schedule}</p>
                        <p>
                          <strong>Acepta:</strong> {c.materials.join(", ")}
                        </p>
                        <p className="center-req">{c.requirements}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === "centros" && (
            <div className="tab-panel">
              <section className="card">
                <h2 className="card-title">Directorio de centros de reciclaje</h2>
                <p className="card-subtitle">
                  Puntos limpios, ecocentros y empresas recicladoras según el tipo de material.
                </p>

                <div className="search-row">
                  <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Buscar centro por nombre o material aceptado…"
                      value={centerSearch}
                      onChange={(e) => setCenterSearch(e.target.value)}
                    />
                  </div>
                  <div className="chips-container">
                    <button className="chip">Plástico</button>
                    <button className="chip">Electrónicos</button>
                    <button className="chip chip-active">Ver todos</button>
                  </div>
                </div>

                <div className="panel-grid">
                  {/* Panel de mapa */}
                  <div>
                    <div className="map-large">
                      {!selectedCenter ? (
                        <>
                          <p>
                            Selecciona un centro de la lista para ver el mapa y la ruta.
                          </p>
                          <small>
                            En una versión completa se mostraría un mapa embebido con
                            marcador y rutas sugeridas desde tu ubicación actual.
                          </small>
                        </>
                      ) : (
                        <>
                          <p>
                            🗺️ Mapa centrado en{" "}
                            <strong>{selectedCenter.name}</strong>.
                          </p>
                          <p> - </p>
                          {selectedCenter.lat && selectedCenter.lng ? (
                            <div className="map-embed">
                              <iframe
                                title={`Mapa de ${selectedCenter.name}`}
                                width="100%"
                                height="260"
                                loading="lazy"
                                style={{ border: 0, borderRadius: "10px" }}
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${selectedCenter.lat},${selectedCenter.lng}&z=15&output=embed`}
                              ></iframe>
                            </div>
                          ) : (
                            <small>
                              Este centro no tiene coordenadas configuradas en el prototipo.
                            </small>
                          )}

                          {selectedCenter.lat && selectedCenter.lng && (
                            <button
                              className="btn-outline"
                              style={{ marginTop: "12px" }}
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps?q=${selectedCenter.lat},${selectedCenter.lng}`,
                                  "_blank"
                                )
                              }
                            >
                              Abrir en Google Maps
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Lista de centros */}
                  <div className="centers-list">
                    {filteredCenters.length === 0 && (
                      <div className="empty-state">
                        <p>No se encontraron centros con ese criterio de búsqueda.</p>
                      </div>
                    )}
                    {filteredCenters.map((c, idx) => {
                      const globalIndex = centers.indexOf(c);
                      const realIndex = globalIndex === -1 ? idx : globalIndex;

                      return (
                        <div key={c.name + realIndex} className="center-card">
                          <h3>{c.name}</h3>
                          <p className="center-meta">
                            {c.schedule} · {c.distance}
                          </p>
                          <p>
                            <strong>Acepta:</strong> {c.materials.join(", ")}
                          </p>
                          <button
                            className="btn primary full"
                            onClick={() => handleViewCenterDetails(realIndex)}
                          >
                            {selectedCenterIndex === realIndex
                              ? "Cerrar detalles"
                              : "Ver detalles y cómo llegar"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "tutoriales" && (
            <div className="tab-panel">
              <section className="card">
                <h2 className="card-title">Tutoriales y guías de reutilización</h2>
                <p className="card-subtitle">
                  Contenido educativo por tipo de material y nivel de dificultad.
                </p>

                <div className="toolbar-row">
                  <div className="chips-container">
                    <span className="label">Dificultad:</span>
                    {difficulties.map((level) => (
                      <button
                        key={level}
                        className={
                          "chip" +
                          (tutorialDifficulty === level ? " chip-active" : "")
                        }
                        onClick={() => setTutorialDifficulty(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <button className="btn-outline small">
                    Ver solo tutoriales oficiales
                  </button>
                </div>

                <div className="grid-three">
                  {filteredTutorials.map((t) => (
                    <div key={t.title} className="tutorial-card">
                      <h3>{t.title}</h3>
                      <p className="tutorial-meta">{t.materialCategory}</p>
                      <p className="tutorial-meta">
                        <strong>Dificultad:</strong> {t.difficulty} ·{" "}
                        <strong>Duración:</strong> {t.duration}
                      </p>
                      <p className="tutorial-format">Formato: {t.format}</p>
                      <button
                        className="btn primary full"
                        onClick={() => window.open(t.url, "_blank")}
                      >
                        Ver en YouTube
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "comunidad" && (
            <div className="tab-panel">
              <section className="card">
                <h2 className="card-title">Comunidad EcoTrack</h2>
                <p className="card-subtitle">
                  Comparte ideas de reuso y descubre lo que hacen otras familias y comunidades.
                </p>

                <div className="toolbar-row">
                  <p>¿Tienes una idea para reutilizar algo que normalmente botarías?</p>
                  <button
                    className="btn primary"
                    onClick={() => setShowIdeaForm((prev) => !prev)}
                  >
                    {showIdeaForm ? "Cerrar formulario" : "Publicar idea de reuso"}
                  </button>
                </div>

                {showIdeaForm && (
                  <form className="form card form-in-card" onSubmit={handleSubmitIdea}>
                    <h3 className="form-title">Nueva idea de reuso</h3>
                    <div className="form-group">
                      <label>Título de la idea *</label>
                      <input
                        type="text"
                        value={ideaTitle}
                        onChange={(e) => setIdeaTitle(e.target.value)}
                        placeholder="Ej: Lámpara con frascos de vidrio"
                      />
                    </div>
                    <div className="form-two-cols">
                      <div className="form-group">
                        <label>Autor / Familia *</label>
                        <input
                          type="text"
                          value={ideaAuthor}
                          onChange={(e) => setIdeaAuthor(e.target.value)}
                          placeholder="Ej: Familia Salas"
                        />
                      </div>
                      <div className="form-group">
                        <label>Categoría de material</label>
                        <select
                          value={ideaCategory}
                          onChange={(e) => setIdeaCategory(e.target.value)}
                        >
                          {materialCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Descripción / resumen *</label>
                      <textarea
                        rows={3}
                        value={ideaSummary}
                        onChange={(e) => setIdeaSummary(e.target.value)}
                        placeholder="Describe brevemente los pasos, materiales y resultado final."
                      />
                    </div>
                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-outline small"
                        onClick={() => setShowIdeaForm(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn primary small">
                        Guardar idea
                      </button>
                    </div>
                    <p className="form-note">
                      Las ideas se muestran en la lista de la comunidad con 0 reacciones iniciales
                      para que otras personas puedan valorarlas.
                    </p>
                  </form>
                )}

                <div className="panel-grid">
                  {communityPosts.map((post) => {
                    const commentsCount = post.commentsList
                      ? post.commentsList.length
                      : 0;
                    const hasReacted = !!reactedPosts[post.id];
                    const draft = commentDrafts[post.id] || "";

                    return (
                      <div key={post.id} className="community-card">
                        <h3>{post.title}</h3>
                        <p className="community-meta">
                          Por {post.author} · {post.materialCategory}
                        </p>
                        <p className="community-summary">{post.summary}</p>

                        <div className="community-footer">
                          <button
                            type="button"
                            className={
                              "reaction" +
                              (hasReacted ? " reaction-disabled" : "")
                            }
                            disabled={hasReacted}
                            onClick={() => handleReact(post.id, "like")}
                          >
                            🔥 {post.reactions.like}
                          </button>
                          <button
                            type="button"
                            className={
                              "reaction" +
                              (hasReacted ? " reaction-disabled" : "")
                            }
                            disabled={hasReacted}
                            onClick={() => handleReact(post.id, "useful")}
                          >
                            ✅ {post.reactions.useful}
                          </button>
                          <button
                            type="button"
                            className={
                              "reaction" +
                              (hasReacted ? " reaction-disabled" : "")
                            }
                            disabled={hasReacted}
                            onClick={() => handleReact(post.id, "wow")}
                          >
                            ✨ {post.reactions.wow}
                          </button>
                          <span className="comments">
                            {commentsCount} comentario
                            {commentsCount !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="buttons-row">
                          <button
                            className="btn-outline small full"
                            onClick={() => handleViewDetails(post.id)}
                          >
                            {selectedPostId === post.id
                              ? "Cerrar detalles"
                              : "Ver detalles"}
                          </button>
                          <button className="btn primary small full">
                            Guardar para después
                          </button>
                        </div>

                        {selectedPostId === post.id && (
                          <div className="detail-panel">
                            <h4>Detalles de la idea</h4>
                            <p>
                              <strong>Autor/a:</strong> {post.author}
                            </p>
                            <p>
                              <strong>Categoría de material:</strong>{" "}
                              {post.materialCategory}
                            </p>
                            <p>
                              <strong>Descripción ampliada:</strong> {post.details}
                            </p>

                            <div className="comments-block">
                              <h5>Comentarios de la comunidad</h5>
                              {commentsCount === 0 && (
                                <p className="no-comments">
                                  Aún no hay comentarios. ¡Sé la primera persona en opinar!
                                </p>
                              )}
                              {commentsCount > 0 && (
                                <ul className="comments-list">
                                  {post.commentsList.map((c, i) => (
                                    <li key={i} className="comment-item">
                                      <span className="comment-author">
                                        {c.author}:
                                      </span>
                                      <span className="comment-text">
                                        {c.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              <div className="comment-form">
                                <textarea
                                  rows={2}
                                  placeholder="Escribe tu comentario…"
                                  value={draft}
                                  onChange={(e) =>
                                    handleCommentChange(post.id, e.target.value)
                                  }
                                />
                                <button
                                  type="button"
                                  className="btn primary small"
                                  onClick={() => handleAddComment(post.id)}
                                >
                                  Enviar comentario
                                </button>
                              </div>
                            </div>

                            <p className="detail-note">
                              En una versión completa de EcoTrack aquí se podrían
                              ver fotos paso a paso, valoraciones y más detalles
                              de cada proyecto.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {activeTab === "empresas" && (
            <div className="tab-panel">
              <section className="card">
                <h2 className="card-title">Empresas recicladoras y centros aliados</h2>
                <p className="card-subtitle">
                  Espacio para que las empresas indiquen qué materiales reciben y cómo gestionan los residuos.
                </p>

                <div className="toolbar-row">
                  <p>
                    ¿Representas un centro de reciclaje o empresa? Crea tu perfil y publica recomendaciones.
                  </p>
                  <button
                    className="btn primary"
                    onClick={() => setShowCompanyForm((prev) => !prev)}
                  >
                    {showCompanyForm ? "Cerrar formulario" : "Crear perfil de empresa"}
                  </button>
                </div>

                {showCompanyForm && (
                  <form className="form card form-in-card" onSubmit={handleSubmitCompany}>
                    <h3 className="form-title">Nuevo perfil de empresa</h3>
                    <div className="form-group">
                      <label>Nombre de la empresa *</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ej: Recicla Norte S.A."
                      />
                    </div>

                    <div className="form-group">
                      <label>Materiales que recibe *</label>
                      <div className="options-grid">
                        {materialCategories.map((opt) => (
                          <label key={opt} className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={selectedCompanyMaterials.includes(opt)}
                              onChange={() => toggleCompanyMaterial(opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                      <p className="form-hint">
                        Selecciona uno o varios tipos de material. El centro se
                        agregará al directorio y a los filtros de clasificación.
                      </p>
                    </div>

                    <div className="form-group">
                      <label>Notas / recomendaciones</label>
                      <textarea
                        rows={3}
                        value={companyNotes}
                        onChange={(e) => setCompanyNotes(e.target.value)}
                        placeholder="Ej: Horarios de recepción, requisitos para el material, contacto."
                      />
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-outline small"
                        onClick={() => setShowCompanyForm(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn primary small">
                        Guardar perfil
                      </button>
                    </div>
                    <p className="form-note">
                      El perfil aparecerá de inmediato en la lista de empresas y también como
                      centro de reciclaje en el resto del asistente.
                    </p>
                  </form>
                )}

                <div className="panel-grid">
                  {companies.map((company, idx) => (
                    <div key={company.name + idx} className="company-card">
                      <h3>{company.name}</h3>
                      <p className="company-label">Materiales aceptados:</p>
                      <div className="tags-container">
                        {company.materials.map((m) => (
                          <span key={m} className="tag">
                            {m}
                          </span>
                        ))}
                      </div>
                      <p className="company-notes">{company.notes}</p>
                      <button className="btn-outline small full">
                        Publicar guías y recomendaciones
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Prototipo visual de EcoTrack · Clasificación de materiales, directorio de centros,
          tutoriales, comunidad y empresas recicladoras.
        </p>
        <p>
          Pensado para apoyar la gestión interna de desechos en las familias y la conexión con actores ambientales.
        </p>
      </footer>
>>>>>>> parent of a1be693 (..)
    </div>
  );
}