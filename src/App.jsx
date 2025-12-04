import React, { useState } from "react";
import "./App.css";

// ================== DATOS BASE (CATÁLOGOS) ==================

const materialCategories = [
  "Plástico",
  "Papel y cartón",
  "Metales",
  "Vidrio",
  "Electrónicos",
  "Orgánicos",
  "Textiles",
  "Residuos peligrosos",
];

const baseMaterials = [
  {
    name: "Botella plástica",
    category: "Plástico",
    type: "PET 1 transparente",
    recyclability: "Alta",
    steps: [
      "Enjuagar durante unos 10 segundos.",
      "Retirar tapa y etiqueta si es posible.",
      "Secar y aplastar para reducir volumen.",
    ],
    warnings: [
      "No mezclar con residuos orgánicos.",
      "Si está muy sucia, puede no ser reciclada.",
    ],
    reuseIdeas: [
      "Macetas para plantas pequeñas.",
      "Organizadores para escritorio.",
    ],
  },
  {
    name: "Envase de detergente",
    category: "Plástico",
    type: "HDPE",
    recyclability: "Media",
    steps: [
      "Vaciar completamente el contenido.",
      "Enjuagar por dentro con poca agua.",
      "Dejar escurrir y cerrar con tapa.",
    ],
    warnings: [
      "No mezclar con restos de comida.",
      "Si contiene químicos peligrosos, tratar como residuo especial.",
    ],
    reuseIdeas: [
      "Hacer regaderas para plantas.",
      "Cortar para usar como contenedor de herramientas.",
    ],
  },
  {
    name: "Bolsa plástica de supermercado",
    category: "Plástico",
    type: "Película plástica delgada",
    recyclability: "Media",
    steps: [
      "Reutilizar la bolsa tantas veces como sea posible.",
      "Si se recicla, entregarla limpia y sin residuos.",
    ],
    warnings: [
      "No quemar ni enterrar.",
      "Puede enredarse en maquinaria de plantas recicladoras.",
    ],
    reuseIdeas: [
      "Usarla como bolsa de basura para pequeños botes.",
      "Tejidos o manualidades con varias bolsas.",
    ],
  },
  {
    name: "Lata de aluminio",
    category: "Metales",
    type: "Lata de bebida",
    recyclability: "Alta",
    steps: [
      "Enjuagar si tiene restos de líquido.",
      "Aplastar para ahorrar espacio.",
    ],
    warnings: [
      "Evitar bordes filosos al manipular.",
    ],
    reuseIdeas: [
      "Manualidades decorativas.",
      "Porta-lápices cortando la parte superior.",
    ],
  },
  {
    name: "Frasco de vidrio",
    category: "Vidrio",
    type: "Transparente sin tapa metálica",
    recyclability: "Alta",
    steps: [
      "Retirar tapa y etiqueta si es posible.",
      "Enjuagar para quitar restos de comida.",
    ],
    warnings: [
      "No mezclar vidrio roto con vidrio entero sin protección.",
      "Evitar introducirlo en bolsas que se rompan fácilmente.",
    ],
    reuseIdeas: [
      "Almacenar granos o especias.",
      "Portavelas decorativo.",
    ],
  },
  {
    name: "Botella de vidrio verde",
    category: "Vidrio",
    type: "Vidrio de color",
    recyclability: "Alta",
    steps: [
      "Enjuagar.",
      "Separar por color si el centro lo requiere.",
    ],
    warnings: [
      "No mezclar vidrio plano (ventanas) con botellas.",
    ],
    reuseIdeas: [
      "Decoración de jardín.",
      "Lámparas artesanales.",
    ],
  },
  {
    name: "Caja de cartón",
    category: "Papel y cartón",
    type: "Cartón corrugado",
    recyclability: "Alta",
    steps: [
      "Retirar plástico, cinta adhesiva y etiquetas grandes.",
      "Doblar o desarmar para reducir volumen.",
    ],
    warnings: [
      "Si está muy mojado o grasoso, puede no ser reciclable.",
    ],
    reuseIdeas: [
      "Organizadores para guardar cosas.",
      "Material para proyectos escolares.",
    ],
  },
  {
    name: "Revistas viejas",
    category: "Papel y cartón",
    type: "Papel couché",
    recyclability: "Media",
    steps: [
      "Retirar grapas si es posible.",
      "Apilar y atar con cuerda.",
    ],
    warnings: [
      "No mezclar con papel higiénico ni servilletas usadas.",
    ],
    reuseIdeas: [
      "Collages y manualidades.",
      "Forrar cuadernos.",
    ],
  },
  {
    name: "Restos de comida",
    category: "Orgánicos",
    type: "Desechos de cocina",
    recyclability: "Media",
    steps: [
      "Separar de otros residuos (plástico, metal, etc.).",
      "Si se tiene compostera, colocarlos ahí según las indicaciones.",
    ],
    warnings: [
      "No mezclar con huesos grandes ni grasa en exceso si es para compost.",
    ],
    reuseIdeas: [
      "Elaborar compost para plantas.",
    ],
  },
  {
    name: "Cáscaras de frutas y verduras",
    category: "Orgánicos",
    type: "Residuos frescos",
    recyclability: "Media",
    steps: [
      "Separarlas de residuos no orgánicos.",
      "Picar en trozos más pequeños para acelerar el compost.",
    ],
    warnings: [
      "No mezclar con cáscaras cítricas en exceso en composteras pequeñas.",
    ],
    reuseIdeas: [
      "Compost.",
      "Tinturas naturales (por ejemplo, cáscara de cebolla).",
    ],
  },
  {
    name: "Ropa en buen estado",
    category: "Textiles",
    type: "Tela de algodón o mezcla",
    recyclability: "Media",
    steps: [
      "Lavar antes de donar o entregar.",
      "Doblar y clasificar por tipo (camisas, pantalones, etc.).",
    ],
    warnings: [
      "Ropa muy dañada puede no ser aceptada en donaciones.",
    ],
    reuseIdeas: [
      "Transformar en trapos de limpieza.",
      "Convertir en bolsas reutilizables.",
    ],
  },
  {
    name: "Sábana vieja",
    category: "Textiles",
    type: "Algodón",
    recyclability: "Media",
    steps: [
      "Lavar y revisar el estado.",
      "Cortar en tiras si se va a reutilizar.",
    ],
    warnings: [
      "Evitar mezclar con residuos orgánicos.",
    ],
    reuseIdeas: [
      "Cortinas improvisadas.",
      "Relleno para camas de mascotas.",
    ],
  },
  {
    name: "Pilas alcalinas usadas",
    category: "Residuos peligrosos",
    type: "Pilas AA / AAA",
    recyclability: "Baja",
    steps: [
      "No mezclar con otros residuos.",
      "Almacenar en un recipiente seguro, lejos de humedad.",
      "Llevar a un punto de acopio de pilas.",
    ],
    warnings: [
      "No abrir ni aplastar las pilas.",
      "No tirarlas a la basura común.",
    ],
    reuseIdeas: [
      "No se recomienda su reuso; priorizar entrega a centros especializados.",
    ],
  },
  {
    name: "Aerosol vacío (desodorante, pintura)",
    category: "Residuos peligrosos",
    type: "Envase presurizado",
    recyclability: "No reciclable",
    steps: [
      "Verificar si realmente está vacío.",
      "Consultar indicaciones del fabricante.",
      "Llevar a centros que acepten residuos peligrosos si existen en la zona.",
    ],
    warnings: [
      "No perforar ni quemar el envase.",
      "Puede ser inflamable o explosivo.",
    ],
    reuseIdeas: [
      "No se recomienda reuso por riesgo de seguridad.",
    ],
  },
  {
    name: "Celular viejo",
    category: "Electrónicos",
    type: "Residuo electrónico pequeño (RAEE)",
    recyclability: "Media",
    steps: [
      "No desechar en la basura común.",
      "Hacer copia de seguridad y borrar datos personales.",
      "Llevar a centros especializados en RAEE.",
    ],
    warnings: [
      "Puede contener metales pesados y baterías de litio.",
    ],
    reuseIdeas: [
      "Donar para proyectos educativos.",
      "Reutilizar como reproductor de música o dispositivo para pruebas.",
    ],
  },
];

// Centros con coordenadas
const baseCenters = [
  {
    name: "EcoCentro San Carlos",
    distance: "2.3 km",
    materials: ["Plástico", "Vidrio", "Metales", "Papel y cartón"],
    requirements: "Solo material limpio. Máximo 10 kg por visita.",
    schedule: "Lun - Sáb · 8:00 am - 4:30 pm",
    lat: 10.324923,
    lng: -84.428119,
  },
  {
    name: "Punto Azul Tecnológico",
    distance: "4.8 km",
    materials: ["Electrónicos", "Residuos peligrosos", "Papel y cartón"],
    requirements: "Electrónicos en buen estado, sin desarmar.",
    schedule: "Vie · 9:00 am - 3:00 pm",
    lat: 10.112509,
    lng: -84.38839,
  },
  {
    name: "Centro Orgánico VerdeClaro",
    distance: "6.1 km",
    materials: ["Orgánicos"],
    requirements: "Sin plástico ni vidrio mezclado.",
    schedule: "Mar - Sáb · 7:30 am - 3:30 pm",
    lat: 10.349405,
    lng: -84.211449,
  },
];

// Tutoriales con enlace a YouTube
const baseTutorials = [
  {
    title: "Cómo clasificar residuos en casa en 5 pasos",
    materialCategory: "Hogar",
    difficulty: "Básico",
    duration: "7 min",
    format: "Video + Guía PDF",
    url: "https://www.youtube.com/watch?v=VIDEOID1",
  },
  {
    title: "Reuso creativo de frascos de vidrio",
    materialCategory: "Vidrio",
    difficulty: "Intermedio",
    duration: "10 min",
    format: "Paso a paso ilustrado",
    url: "https://www.youtube.com/watch?v=VIDEOID2",
  },
  {
    title: "Gestión segura de baterías y electrónicos pequeños",
    materialCategory: "Electrónicos",
    difficulty: "Básico",
    duration: "8 min",
    format: "Infografía interactiva",
    url: "https://www.youtube.com/watch?v=VIDEOID3",
  },
  {
    title: "Cómo iniciar tu propia compostera casera",
    materialCategory: "Orgánicos",
    difficulty: "Intermedio",
    duration: "12 min",
    format: "Guía ilustrada + checklist",
    url: "https://www.youtube.com/watch?v=VIDEOID4",
  },
  {
    title: "Taller de reutilización de textiles en familia",
    materialCategory: "Textiles",
    difficulty: "Avanzado",
    duration: "20 min",
    format: "Video + plantillas descargables",
    url: "https://www.youtube.com/watch?v=VIDEOID5",
  },
];

// Publicaciones de comunidad con detalles + comentarios + id estable
const baseCommunityPosts = [
  {
    id: 1,
    title: "Macetas colgantes con botellas PET",
    author: "Laura M.",
    materialCategory: "Plástico",
    summary:
      "Convierte tus botellas de refresco en macetas colgantes ideales para balcones y espacios pequeños.",
    details:
      "Se utilizan botellas PET de 2 L bien lavadas. Se corta una ventana lateral, se perforan dos orificios superiores para pasar una cuerda resistente y se llena con sustrato ligero. Es ideal para sembrar hierbas aromáticas como culantro, albahaca o cebollín. La ventaja es que se aprovechan paredes y balcones sin ocupar piso.",
    reactions: { like: 34, useful: 21, wow: 9 },
    commentsList: [
      {
        author: "Ana P.",
        text: "Yo lo probé en el balcón de mi apartamento y las plantas crecieron súper bien.",
      },
      {
        author: "Familia Gómez",
        text: "Nos encantó para que los niños aprendan a cuidar plantas y reciclar al mismo tiempo.",
      },
    ],
  },
  {
    id: 2,
    title: "Organizador para escritorio con cartón reciclado",
    author: "Carlos R.",
    materialCategory: "Papel y cartón",
    summary:
      "Usa cajas de cereal y tubos de papel para crear un organizador modular para lapiceros, notas y cables.",
    details:
      "A partir de dos cajas de cereal se construye una base y divisiones internas. Los tubos de papel higiénico sirven como porta-lápices, forrados con recortes de revistas o papel de regalo. Se recomienda usar pegamento blanco y reforzar las esquinas con cinta de papel. Ideal para estudiantes que quieren ordenar su área de estudio sin comprar plástico nuevo.",
    reactions: { like: 18, useful: 27, wow: 4 },
    commentsList: [
      {
        author: "Mariana",
        text: "Lo usamos en la escuela para un proyecto y quedó súper resistente.",
      },
    ],
  },
  {
    id: 3,
    title: "Banco de ropa comunitario en el barrio",
    author: "Comité Vecinal La Esperanza",
    materialCategory: "Textiles",
    summary:
      "Organizamos un punto de intercambio de ropa en buen estado para reducir residuos y apoyar a familias.",
    details:
      "Se habilitó un espacio en el salón comunal donde cada familia puede donar ropa limpia y en buen estado. Una vez por mes se realiza una feria de intercambio sin dinero: quien necesita puede llevarse prendas, y quien tiene de más puede donarlas. Esto extiende la vida útil de las prendas, evita que terminen en la basura y fortalece la red de apoyo entre vecinos.",
    reactions: { like: 45, useful: 39, wow: 12 },
    commentsList: [
      {
        author: "Luis",
        text: "Gracias a la feria conseguimos ropa de abrigo para el invierno sin gastar.",
      },
      {
        author: "Comité de Juventud",
        text: "Estamos pensando en añadir un espacio para reparar ropa (costuras, botones, etc.).",
      },
    ],
  },
];

const baseCompanies = [
  {
    name: "ReciclaTEC Electrónicos",
    materials: ["Electrónicos", "Residuos peligrosos"],
    notes: "Recibimos RAEE de lunes a viernes con previa clasificación.",
  },
  {
    name: "MetalVerde",
    materials: ["Metales"],
    notes: "Pagamos por metales limpios y separados.",
  },
  {
    name: "TextilCiclo",
    materials: ["Textiles"],
    notes: "Programas de donación y reciclaje textil para proyectos sociales.",
  },
];

const householdTips = [
  "Ubica 3 contenedores básicos: reciclables, orgánicos y no reciclables.",
  "Coloca una mini-guía cerca de los basureros con ejemplos de cada categoría.",
  "Lava rápidamente envases de comida para evitar malos olores.",
  "Separa electrónicos y pilas en una caja distinta y segura.",
];

const difficulties = ["Todos", "Básico", "Intermedio", "Avanzado"];
const recyclabilityOptions = ["Todas", "Alta", "Media", "Baja", "No reciclable"];

// ================== COMPONENTE PRINCIPAL ==================

function App() {
  const [activeTab, setActiveTab] = useState("clasificar");
  const [selectedCategory, setSelectedCategory] = useState("Plástico");
  const [search, setSearch] = useState("");
  const [recyclabilityFilter, setRecyclabilityFilter] = useState("Todas");
  const [centerSearch, setCenterSearch] = useState("");
  const [tutorialDifficulty, setTutorialDifficulty] = useState("Todos");

  const [materials] = useState(baseMaterials);
  const [centers, setCenters] = useState(baseCenters);
  const [tutorials] = useState(baseTutorials);
  const [communityPosts, setCommunityPosts] = useState(baseCommunityPosts);
  const [companies, setCompanies] = useState(baseCompanies);

  // Comunidad: formularios, detalles, comentarios y reacciones
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaAuthor, setIdeaAuthor] = useState("");
  const [ideaCategory, setIdeaCategory] = useState("Plástico");
  const [ideaSummary, setIdeaSummary] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [reactedPosts, setReactedPosts] = useState({}); // id -> true

  // Empresas: formulario + materiales seleccionados
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNotes, setCompanyNotes] = useState("");
  const [selectedCompanyMaterials, setSelectedCompanyMaterials] = useState([]);

  // Centros: centro seleccionado para mostrar en el mapa
  const [selectedCenterIndex, setSelectedCenterIndex] = useState(0); // por defecto el primero

  // ================== FILTROS ==================

  const filteredMaterials = materials.filter((m) => {
    const matchCategory = selectedCategory ? m.category === selectedCategory : true;
    const text = search.toLowerCase();
    const matchSearch = text
      ? m.name.toLowerCase().includes(text) ||
        m.type.toLowerCase().includes(text)
      : true;
    const matchRecycl =
      recyclabilityFilter === "Todas" || m.recyclability === recyclabilityFilter;
    return matchCategory && matchSearch && matchRecycl;
  });

  const centersForClasificar = centers.filter((c) => {
    if (!selectedCategory) return true;
    const cat = selectedCategory.toLowerCase();
    return c.materials.some((mat) => mat.toLowerCase().includes(cat));
  });

  const filteredCenters = centers.filter((c) => {
    const text = centerSearch.toLowerCase();
    if (!text) return true;
    return (
      c.name.toLowerCase().includes(text) ||
      c.materials.some((m) => m.toLowerCase().includes(text))
    );
  });

  const filteredTutorials = tutorials.filter((t) => {
    if (tutorialDifficulty === "Todos") return true;
    return t.difficulty === tutorialDifficulty;
  });

  const selectedCenter =
    selectedCenterIndex !== null && centers[selectedCenterIndex]
      ? centers[selectedCenterIndex]
      : null;

  // ================== HANDLERS FORMULARIOS ==================

  function handleSubmitIdea(e) {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaAuthor.trim() || !ideaSummary.trim()) {
      alert("Por favor completa al menos título, autor y resumen de la idea.");
      return;
    }

    const id = Date.now(); // id sencillo para la sesión

    const newPost = {
      id,
      title: ideaTitle.trim(),
      author: ideaAuthor.trim(),
      materialCategory: ideaCategory,
      summary: ideaSummary.trim(),
      details:
        ideaSummary.trim() +
        " Esta idea fue creada por la comunidad y en una versión completa del sistema podría incluir fotografías, lista de materiales, tiempos aproximados y comentarios de otras familias.",
      reactions: { like: 0, useful: 0, wow: 0 },
      commentsList: [],
    };

    setCommunityPosts((prev) => [newPost, ...prev]);

    setIdeaTitle("");
    setIdeaAuthor("");
    setIdeaCategory("Plástico");
    setIdeaSummary("");
    setShowIdeaForm(false);
    setSelectedPostId(id); // mostrar detalles de la nueva idea
  }

  function toggleCompanyMaterial(option) {
    setSelectedCompanyMaterials((prev) =>
      prev.includes(option)
        ? prev.filter((m) => m !== option)
        : [...prev, option]
    );
  }

  function handleSubmitCompany(e) {
    e.preventDefault();
    if (!companyName.trim() || selectedCompanyMaterials.length === 0) {
      alert("La empresa necesita al menos un nombre y un material que recibe.");
      return;
    }

    const newCompany = {
      name: companyName.trim(),
      materials: selectedCompanyMaterials,
      notes:
        companyNotes.trim() ||
        "Perfil recién creado. En una versión completa podrían verse aquí teléfonos, dirección y formulario de contacto.",
    };

    // Agregamos a empresas
    setCompanies((prev) => [newCompany, ...prev]);

    // Y también como centro de reciclaje (usado en Centros y Clasificar material)
    const newCenter = {
      name: companyName.trim(),
      distance: "Centro aliado",
      materials: selectedCompanyMaterials,
      requirements: "Centro creado desde el perfil de empresa.",
      schedule: "Horario por definir",
      // sin coordenadas específicas, se puede usar un mapa general
    };

    setCenters((prev) => [newCenter, ...prev]);

    setCompanyName("");
    setCompanyNotes("");
    setSelectedCompanyMaterials([]);
    setShowCompanyForm(false);
  }

  // ================== REACCIONES Y COMENTARIOS ==================

  function handleViewDetails(postId) {
    setSelectedPostId((prev) => (prev === postId ? null : postId));
  }

  function handleReact(postId, type) {
    if (reactedPosts[postId]) {
      alert("Ya reaccionaste a esta idea.");
      return;
    }

    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [type]: (post.reactions[type] || 0) + 1,
              },
            }
          : post
      )
    );

    setReactedPosts((prev) => ({
      ...prev,
      [postId]: true,
    }));
  }

  function handleCommentChange(postId, value) {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: value,
    }));
  }

  function handleAddComment(postId) {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) {
      alert("Escribe un comentario antes de enviarlo.");
      return;
    }

    const newComment = {
      author: "Persona usuaria",
      text,
    };

    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsList: [...(post.commentsList || []), newComment],
            }
          : post
      )
    );

    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: "",
    }));
  }

  function handleViewCenterDetails(globalIndex) {
    setSelectedCenterIndex((prev) =>
      prev === globalIndex ? null : globalIndex
    );
  }

  // ================== UI ==================

  return (
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
              Estos datos provienen del catálogo actual.
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
                              Este centro no tiene coordenadas configuradas.
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
          EcoTrack · Clasificación de materiales, directorio de centros,
          tutoriales, comunidad y empresas recicladoras.
        </p>
        <p>
          Pensado para apoyar la gestión interna de desechos en las familias y la conexión con actores ambientales.
        </p>
      </footer>
    </div>
  );
}

export default App;
