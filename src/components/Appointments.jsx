import React, { useState, useRef, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  ref,
  push,
  serverTimestamp,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  remove,
} from "firebase/database";
import { database } from "../firebase";

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const employees = [
  // Barbería - Especialistas en diferentes áreas
  { id: 1, name: "Carlos R.", photo: "💇", centerId: 1, category: "Barbería", specialties: ["Cortes clásicos", "Afeitado tradicional", "Arreglo de barba"], isGeneralist: true },
  { id: 2, name: "Javier M.", photo: "✂️", centerId: 1, category: "Barbería", specialties: ["Cortes modernos", "Estilos de moda", "Tintes"], isGeneralist: false },
  { id: 3, name: "Luis G.", photo: "🧔", centerId: 1, category: "Barbería", specialties: ["Barba y bigote", "Tratamientos faciales", "Depilación"], isGeneralist: false },
  { id: 4, name: "Miguel A.", photo: "👨", centerId: 2, category: "Barbería", specialties: ["Cortes clásicos", "Combo corte+barba", "Limpieza facial"], isGeneralist: true },
  { id: 5, name: "David F.", photo: "🎨", centerId: 2, category: "Barbería", specialties: ["Tintes", "Mechas", "Estilos creativos"], isGeneralist: false },
  { id: 6, name: "Pedro S.", photo: "✨", centerId: 2, category: "Barbería", specialties: ["Afeitado premium", "Tratamientos VIP", "Servicios a domicilio"], isGeneralist: false },
  { id: 7, name: "Andrés V.", photo: "💆‍♂️", centerId: 3, category: "Barbería", specialties: ["Cortes tradicionales", "Masajes capilares", "Relajación"], isGeneralist: true },
  { id: 8, name: "Sergio P.", photo: "👁️", centerId: 3, category: "Barbería", specialties: ["Depilación de cejas", "Diseño facial", "Maquillaje masculino"], isGeneralist: false },
  { id: 9, name: "Jorge L.", photo: "🧴", centerId: 3, category: "Barbería", specialties: ["Tratamientos capilares", "Mascarillas", "Cuidado premium"], isGeneralist: false },

  // Belleza - Especialistas en diferentes áreas
  { id: 10, name: "Ana P.", photo: "💇‍♀️", centerId: 1, category: "Belleza", specialties: ["Cortes de dama", "Peinados", "Asesoría de imagen"], isGeneralist: true },
  { id: 11, name: "Sofía L.", photo: "🌈", centerId: 1, category: "Belleza", specialties: ["Coloración", "Tintes", "Mechas"], isGeneralist: false },
  { id: 12, name: "María C.", photo: "🔀", centerId: 1, category: "Belleza", specialties: ["Alisados", "Keratina", "Tratamientos"], isGeneralist: false },
  { id: 13, name: "Lucía H.", photo: "👰", centerId: 2, category: "Belleza", specialties: ["Peinados para eventos", "Bodas", "Ceremonias"], isGeneralist: true },
  { id: 14, name: "Carmen R.", photo: "👑", centerId: 2, category: "Belleza", specialties: ["Extensiones", "Recogidos", "Estilos elaborados"], isGeneralist: false },
  { id: 15, name: "Paula D.", photo: "💆‍♀️", centerId: 2, category: "Belleza", specialties: ["Tratamientos", "Hidratación", "Terapias capilares"], isGeneralist: false },
  { id: 16, name: "Cristina M.", photo: "💄", centerId: 3, category: "Belleza", specialties: ["Maquillaje", "Colorimetría", "Asesoría de color"], isGeneralist: true },
  { id: 17, name: "Beatriz F.", photo: "✨", centerId: 3, category: "Belleza", specialties: ["Estilos de pasarela", "Tendencias", "Looks modernos"], isGeneralist: false },
  { id: 18, name: "Nerea J.", photo: "🌟", centerId: 3, category: "Belleza", specialties: ["Alisados brasileños", "Tratamientos especializados", "Cuidado intensivo"], isGeneralist: false },

  // Manos y Pies - Especialistas en diferentes áreas
  { id: 19, name: "Elena V.", photo: "💅", centerId: 1, category: "Manos y Pies", specialties: ["Manicure básica", "Pedicure", "Esmaltado"], isGeneralist: true },
  { id: 20, name: "Isabel S.", photo: "👣", centerId: 1, category: "Manos y Pies", specialties: ["Pedicure spa", "Tratamientos", "Relajación"], isGeneralist: false },
  { id: 21, name: "Laura T.", photo: "🎨", centerId: 1, category: "Manos y Pies", specialties: ["Uñas acrílicas", "Decoración", "Diseños artísticos"], isGeneralist: false },
  { id: 22, name: "Verónica N.", photo: "💅", centerId: 2, category: "Manos y Pies", specialties: ["Manicure spa", "Uñas de gel", "Lujo"], isGeneralist: true },
  { id: 23, name: "Raquel B.", photo: "✨", centerId: 2, category: "Manos y Pies", specialties: ["Decoración premium", "Cristales", "Diseños exclusivos"], isGeneralist: false },
  { id: 24, name: "Marta G.", photo: "🧴", centerId: 2, category: "Manos y Pies", specialties: ["Tratamientos", "Hidratación", "Cuidado profesional"], isGeneralist: false },
  { id: 25, name: "Silvia Q.", photo: "💅", centerId: 3, category: "Manos y Pies", specialties: ["Manicure tradicional", "Pedicure básica", "Esmaltado semi"], isGeneralist: true },
  { id: 26, name: "Lorena A.", photo: "🌟", centerId: 3, category: "Manos y Pies", specialties: ["Uñas esculpidas", "Alargamientos", "Técnicas avanzadas"], isGeneralist: false },
  { id: 27, name: "Eva Z.", photo: "👑", centerId: 3, category: "Manos y Pies", specialties: ["Diseño de lujo", "Aplicaciones premium", "Servicios VIP"], isGeneralist: false },

  // Spa y Bienestar - Especialistas en diferentes áreas
  { id: 28, name: "Juan M.", photo: "💆", centerId: 1, category: "Spa y Bienestar", email: "juan@apolo.admin.cr", specialties: ["Masajes relajantes", "Terapias", "Bienestar general"], isGeneralist: true },
  { id: 29, name: "Alejandro P.", photo: "💆‍♂️", centerId: 1, category: "Spa y Bienestar", specialties: ["Masajes descontracturantes", "Deportivos", "Rehabilitación"], isGeneralist: false },
  { id: 30, name: "Ricardo L.", photo: "✨", centerId: 1, category: "Spa y Bienestar", specialties: ["Tratamientos faciales", "Limpieza", "Hidratación"], isGeneralist: false },
  { id: 31, name: "Gabriela R.", photo: "💆", centerId: 2, category: "Spa y Bienestar", specialties: ["Masajes terapéuticos", "Aromaterapia", "Relajación"], isGeneralist: true },
  { id: 32, name: "Daniela S.", photo: "👁️", centerId: 2, category: "Spa y Bienestar", specialties: ["Depilación", "Diseño de cejas", "Cejas y pestañas"], isGeneralist: false },
  { id: 33, name: "Patricia M.", photo: "💄", centerId: 2, category: "Spa y Bienestar", specialties: ["Maquillaje profesional", "Eventos", "Asesoría de imagen"], isGeneralist: false },
  { id: 34, name: "Roberto C.", photo: "💆", centerId: 3, category: "Spa y Bienestar", specialties: ["Masajes tradicionales", "Terapias orientales", "Bienestar integral"], isGeneralist: true },
  { id: 35, name: "Fernando G.", photo: "✨", centerId: 3, category: "Spa y Bienestar", specialties: ["Tratamientos corporales", "Reducción", "Moldeamiento"], isGeneralist: false },
  { id: 36, name: "Martina V.", photo: "🌿", centerId: 3, category: "Spa y Bienestar", specialties: ["Terapias naturales", "Productos orgánicos", "Wellness"], isGeneralist: false },
];

function Appointments({ user, onBackToHome, onLogout }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sidebarCurrentTime, setSidebarCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Nuevos estados para Mis Citas / Historial
  const [misCitas, setMisCitas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [showMyAppointmentsView, setShowMyAppointmentsView] = useState(false);
  const [showHistoryView, setShowHistoryView] = useState(false);

  const centers = [
    { id: 1, name: "Centro A", address: "Av. Siempre Viva 123 - 1.2 km", rating: "4.8 (230)", image: "🏢" },
    { id: 2, name: "Centro B", address: "Calle Luna 45 - 3.4 km", rating: "4.6 (180)", image: "🏢" },
    { id: 3, name: "Centro C", address: "Paseo del Sol 88 - 5.0 km", rating: "4.9 (320)", image: "🏢" }
  ];

  // 2. Actualizar los servicios
  const services = [
    // 💇 Servicios de Barbería
    { id: 1, name: "Corte de cabello clásico", duration: "30 min", price: "$15-25", category: "Barbería", image: "💇" },
    { id: 2, name: "Corte de cabello moderno/estilo", duration: "45 min", price: "$20-30", category: "Barbería", image: "💇" },
    { id: 3, name: "Afeitado tradicional con navaja", duration: "30 min", price: "$15-20", category: "Barbería", image: "✂️" },
    { id: 4, name: "Arreglo de barba y bigote", duration: "25 min", price: "$12-18", category: "Barbería", image: "🧔" },
    { id: 5, name: "Corte + Barba (Combo)", duration: "60 min", price: "$30-40", category: "Barbería", image: "👨" },
    { id: 6, name: "Tinte para cabello/barba", duration: "45 min", price: "$20-30", category: "Barbería", image: "🎨" },
    { id: 7, name: "Mascarilla facial/tratamientos", duration: "30 min", price: "$15-25", category: "Barbería", image: "🧴" },
    { id: 8, name: "Depilación de cejas", duration: "15 min", price: "$8-12", category: "Barbería", image: "👁️" },
    { id: 9, name: "Limpieza facial masculina", duration: "45 min", price: "$25-35", category: "Barbería", image: "✨" },

    // 💆 Servicios de Belleza
    { id: 10, name: "Corte de dama", duration: "45 min", price: "$20-30", category: "Belleza", image: "💇‍♀️" },
    { id: 11, name: "Peinado para eventos", duration: "60 min", price: "$35-60", category: "Belleza", image: "👰" },
    { id: 12, name: "Tinte/coloración", duration: "90 min", price: "$40-70", category: "Belleza", image: "🌈" },
    { id: 13, name: "Mechas/balayage", duration: "120 min", price: "$60-100", category: "Belleza", image: "🎨" },
    { id: 14, name: "Tratamientos capilares", duration: "45 min", price: "$25-45", category: "Belleza", image: "💆‍♀️" },
    { id: 15, name: "Alisado/keratina", duration: "120 min", price: "$80-150", category: "Belleza", image: "🔀" },
    { id: 16, name: "Extensiones de cabello", duration: "120 min", price: "$100-250", category: "Belleza", image: "👑" },

    // 💅 Servicios de Manos y Pies
    { id: 17, name: "Manicure básica", duration: "30 min", price: "$15-20", category: "Manos y Pies", image: "💅" },
    { id: 18, name: "Manicure spa/lujo", duration: "45 min", price: "$25-35", category: "Manos y Pies", image: "💅" },
    { id: 19, name: "Pedicure básica", duration: "45 min", price: "$20-25", category: "Manos y Pies", image: "👣" },
    { id: 20, name: "Pedicure spa/lujo", duration: "60 min", price: "$30-40", category: "Manos y Pies", image: "👣" },
    { id: 21, name: "Uñas acrílicas", duration: "90 min", price: "$40-60", category: "Manos y Pies", image: "💅" },
    { id: 22, name: "Uñas de gel", duration: "75 min", price: "$35-50", category: "Manos y Pies", image: "💅" },
    { id: 23, name: "Decoración de uñas", duration: "30 min", price: "$10-25", category: "Manos y Pies", image: "✨" },

    // ✨ Servicios de Spa y Bienestar
    { id: 24, name: "Masaje relajante (30 min)", duration: "30 min", price: "$40", category: "Spa y Bienestar", image: "💆" },
    { id: 25, name: "Masaje relajante (50 min)", duration: "50 min", price: "$65", category: "Spa y Bienestar", image: "💆" },
    { id: 26, name: "Masaje relajante (80 min)", duration: "80 min", price: "$90", category: "Spa y Bienestar", image: "💆" },
    { id: 27, name: "Masaje descontracturante", duration: "60 min", price: "$50-80", category: "Spa y Bienestar", image: "💆‍♂️" },
    { id: 28, name: "Tratamiento facial completo", duration: "60 min", price: "$45-70", category: "Spa y Bienestar", image: "✨" },
    { id: 29, name: "Depilación facial", duration: "25 min", price: "$15-25", category: "Spa y Bienestar", image: "👁️" },
    { id: 30, name: "Depilación corporal (por zona)", duration: "30 min", price: "$20-40", category: "Spa y Bienestar", image: "✨" },
    { id: 31, name: "Maquillaje profesional", duration: "60 min", price: "$35-60", category: "Spa y Bienestar", image: "💄" },
    { id: 32, name: "Ceja y pestañas (tinte/laminado)", duration: "45 min", price: "$20-35", category: "Spa y Bienestar", image: "👁️" },
  ];

  const timeSlots = [
    "8:00","09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00","15:00", "16:00", "17:00", "18:00",
    "19:00",
  ];

  const categories = ["Todas", "Barbería", "Belleza", "Manos y Pies", "Spa y Bienestar"];

  // Función para filtrar servicios según búsqueda y categoría
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Agrupar servicios por categoría
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  const steps = [
    { number: 1, title: "Establecimiento" },
    { number: 2, title: "Servicio" },
    { number: 3, title: "Profesional" },
    { number: 4, title: "Imagen y notas" },
    { number: 5, title: "Fecha y hora" },
    { number: 6, title: "Resumen" },
    { number: 7, title: "Confirmación" },
  ];

  const menuItems = [
    { id: "profile", label: "Mi Perfil", icon: "👤" },
    { id: "appointments", label: "Mis Citas", icon: "📅" },
    { id: "history", label: "Historial", icon: "📋" },
    { id: "notifications", label: "Notificaciones", icon: "🔔" },
    { id: "logout", label: "Cerrar Sesión", icon: "🚪" }
  ];

  // Actualizar la hora cada minuto para el sidebar
  useEffect(() => {
    const timer = setInterval(() => {
      setSidebarCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Suscripción en tiempo real a las citas del usuario
  useEffect(() => {
    if (!user?.uid) {
      setMisCitas([]);
      setHistorial([]);
      return;
    }

    const appointmentsRef = ref(database, "appointments");
    const q = query(appointmentsRef, orderByChild("userId"), equalTo(user.uid));

    const unsubscribe = onValue(
      q,
      (snapshot) => {
        const data = snapshot.val() || {};
        const all = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val,
        }));

        // Separar confirmed vs historial (cualquier otro estado)
        const confirmed = all.filter((a) => a.status === "confirmed");
        const other = all.filter((a) => a.status !== "confirmed");

        // ordenar por fecha ascendente (opcional)
        confirmed.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const db = b.date ? new Date(b.date).getTime() : 0;
          return da - db;
        });
        other.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const db = b.date ? new Date(b.date).getTime() : 0;
          return db - da; // historial más reciente primero
        });

        setMisCitas(confirmed);
        setHistorial(other);

        // También mantener appointments local para usos internos (ej: confirmación)
        setAppointments(
          all.map((a) => ({
            ...a,
            dateObj: a.date ? new Date(a.date) : null,
          }))
        );
      },
      (err) => {
        console.error("Error suscribiéndose a citas:", err);
      }
    );

    return () => {
      // detach listener
      unsubscribe();
    };
  }, [user]);

  const nextStep = () => setCurrentStep((s) => s + 1);
  const prevStep = () => setCurrentStep((s) => s - 1);

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const formatDate = (dateObject) => {
    if (!dateObject) return "Fecha no seleccionada";
    return format(dateObject, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  };

  // Formatear fecha de manera elegante para el sidebar
  const formatSidebarDate = (date) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Formatear hora de manera elegante para el sidebar
  const formatSidebarTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleConfirmAppointment = async () => {
    try {
      if (!selectedCenter || !selectedService || !selectedEmployee || !selectedDate || !selectedTime) {
        alert("Por favor, completa todos los campos obligatorios antes de confirmar.");
        return;
      }

      const newAppointment = {
        center: selectedCenter,
        service: selectedService,
        employee: selectedEmployee,
        date: selectedDate.toISOString(),
        time: selectedTime,
        notes: notes,
        imageUrl: imagePreviewUrl,
        status: "confirmed",
        userId: user?.uid || "anonymous",
        userEmail: user?.email || "unknown@email.com",
        createdAt: serverTimestamp()
      };

      const appointmentsRef = ref(database, 'appointments');
      const newAppointmentRef = await push(appointmentsRef, newAppointment);

      console.log("Cita guardada con ID: ", newAppointmentRef.key);

      // Lo agregamos localmente (aunque onValue la recogerá pronto)
      setAppointments((prev) => [
        ...prev,
        {
          ...newAppointment,
          id: newAppointmentRef.key,
          dateObj: selectedDate,
        },
      ]);

      nextStep();
    } catch (error) {
      console.error("Error al guardar la cita: ", error);
      alert("Hubo un error al guardar la cita. Por favor, intenta nuevamente.");
    }
  };

  const handleNewAppointment = () => {
    setCurrentStep(1);
    setSelectedCenter(null);
    setSelectedService(null);
    setSelectedEmployee(null);
    setSelectedDate(null);
    setSelectedTime("");
    setNotes("");
    setSearchTerm("");
    setSelectedCategory("Todas");
    setShowMyAppointmentsView(false);
    setShowHistoryView(false);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const apptRef = ref(database, `appointments/${appointmentId}`);
      await update(apptRef, { status: newStatus, updatedAt: serverTimestamp() });
      // La suscripción onValue actualizará misCitas y historial automáticamente.
    } catch (err) {
      console.error("Error actualizando estado de cita:", err);
      alert("No se pudo actualizar la cita. Intenta nuevamente.");
    }
  };

  // Opcional: mover físicamente a otra rama (archive) - aquí simplemente lo dejo comentado
  const moveAppointmentToArchive = async (appointmentId) => {
    // Si prefieres mover a /history/ en vez de solo cambiar status:
    // const apptRef = ref(database, `appointments/${appointmentId}`);
    // const snapshot = await get(apptRef);
    // if (snapshot.exists()) {
    //   const data = snapshot.val();
    //   const historyRef = ref(database, `history/${appointmentId}`);
    //   await set(historyRef, { ...data, archivedAt: serverTimestamp() });
    //   await remove(apptRef);
    // }
  };

  const handleNavigation = (section) => {
    if (section === "logout") {
      onLogout();
    } else if (section === "appointments") {
      // abrir la vista Mis Citas en el main content
      setShowMyAppointmentsView(true);
      setShowHistoryView(false);
    } else if (section === "history") {
      setShowHistoryView(true);
      setShowMyAppointmentsView(false);
    } else {
      console.log("Navegar a:", section);
      // cerrar vistas si navegamos a otra cosa
      setShowMyAppointmentsView(false);
      setShowHistoryView(false);
    }
    setSidebarOpen(false);
  };

  const renderHeader = () => {
    return (
      <div style={headerStyles.container}>
        <div style={headerStyles.leftSection}>
          <button style={headerStyles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <button style={headerStyles.backButton} onClick={onBackToHome}>
            ← Volver al Inicio
          </button>
        </div>

        <div style={headerStyles.centerSection}>
          <div style={headerStyles.progressContainer}>
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div
                  style={{
                    ...headerStyles.progressStep,
                    backgroundColor: currentStep >= step.number ? "#3498db" : "#e0e0e0",
                    color: currentStep >= step.number ? "white" : "#666"
                  }}
                  title={step.title}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      ...headerStyles.progressLine,
                      backgroundColor: currentStep > step.number ? "#3498db" : "#e0e0e0"
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={headerStyles.currentStep}>
            Paso {currentStep} de {steps.length}: {steps[currentStep - 1]?.title}
          </div>
        </div>

        <div style={headerStyles.rightSection}>
          <button style={headerStyles.helpButton} title="Ayuda">
            ❓
          </button>

          <div style={headerStyles.userMenu}>
            <div style={headerStyles.userInfo}>
              <span style={headerStyles.userName}>
                {user?.nombre || user?.email?.split('@')[0] || 'Usuario'}
              </span>
              <span style={headerStyles.userStatus}>Conectado</span>
            </div>
            <div style={headerStyles.userAvatar}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>

          <button
            style={headerStyles.newAppointmentButton}
            onClick={handleNewAppointment}
          >
            + Nueva Cita
          </button>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (!sidebarOpen) return null;

    return (
      <>
        {/* Overlay que cubre toda la pantalla - permite abrir/cerrar desde cualquier lugar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            zIndex: 998,
            transition: "all 0.3s ease",
          }}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar minimalista */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "280px",
            height: "100%",
            background: "#ffffff",
            color: "#2c3e50",
            padding: "0",
            zIndex: 999,
            boxShadow: "2px 0 15px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {/* Encabezado con fecha y hora */}
          <div
            style={{
              padding: "25px 20px",
              background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
              borderBottom: "1px solid #e0e0e0",
              textAlign: "center",
              color: "white"
            }}
          >
            <div style={{
              fontSize: "36px",
              color: "white",
              fontWeight: "400",
              marginBottom: "6px",
              letterSpacing: "-1px"
            }}>
              {formatSidebarTime(sidebarCurrentTime)}
            </div>
            <div style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.9)",
              fontWeight: "400",
              letterSpacing: "0.3px"
            }}>
              {formatSidebarDate(sidebarCurrentTime)}
            </div>
          </div>

          {/* Logo y nombre */}
          <div style={{
            padding: "20px",
            paddingBottom: "10px",
            textAlign: "center",
            borderBottom: "1px solid #f1f2f6"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px auto",
              boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)"
            }}>
              <span style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "white"
              }}>
                A
              </span>
            </div>
            <h2 style={{
              margin: "0 0 5px 0",
              color: "#2c3e50",
              fontSize: "18px",
              fontWeight: "600"
            }}>
              Apolo Barber & Spa
            </h2>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "#7f8c8d"
            }}>
              Juventud, fuerza y estilo
            </p>
          </div>

          {/* Información del usuario */}
          <div style={{
            padding: "20px",
            borderBottom: "1px solid #f1f2f6",
            textAlign: "center"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px auto",
              fontSize: "28px",
              color: "white",
              fontWeight: "bold"
            }}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 style={{
              margin: "0 0 5px 0",
              color: "#2c3e50",
              fontSize: "16px",
              fontWeight: "600"
            }}>
              {user?.email?.split('@')[0] || 'Usuario'}
            </h3>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "#27ae60",
              fontWeight: "500"
            }}>
              ⭐ Cliente Premium
            </p>
          </div>

          {/* Menú de navegación minimalista */}
          <div style={{
            padding: "15px 0",
            flex: 1
          }}>
            <div style={{
              fontSize: "11px",
              color: "#7f8c8d",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              padding: "0 20px 10px 20px",
              marginBottom: "10px"
            }}>
              Mi Cuenta
            </div>

            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0
            }}>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    style={{
                      color: "#2c3e50",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 20px",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      background: "transparent",
                      border: "none",
                      transition: "all 0.2s ease",
                      borderLeft: "3px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#f8f9fa";
                      e.target.style.borderLeftColor = "#3498db";
                      e.target.style.paddingLeft = "25px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.borderLeftColor = "transparent";
                      e.target.style.paddingLeft = "20px";
                    }}
                  >
                    <span style={{
                      marginRight: "12px",
                      fontSize: "16px",
                      width: "20px"
                    }}>
                      {item.icon}
                    </span>
                    {item.label}
                    {item.id === "notifications" && (
                      <span style={{
                        marginLeft: "auto",
                        backgroundColor: "#e74c3c",
                        color: "white",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        minWidth: "18px"
                      }}>
                        3
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto minimalista */}
          <div style={{
            padding: "20px",
            background: "#f8f9fa",
            borderTop: "1px solid #f1f2f6"
          }}>
            <div style={{
              fontSize: "11px",
              color: "#7f8c8d",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px"
            }}>
              Contacto Rápido
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div style={{
                fontSize: "13px",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                marginBottom: "5px"
              }}>
                <span style={{
                  width: "20px",
                  color: "#3498db",
                  fontWeight: "bold",
                  marginRight: "10px"
                }}>
                  📞
                </span>
                +34 123 456 789
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div style={{
                fontSize: "13px",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                marginBottom: "5px"
              }}>
                <span style={{
                  width: "20px",
                  color: "#3498db",
                  fontWeight: "bold",
                  marginRight: "10px"
                }}>
                  ✉️
                </span>
                soporte@apolo.com
              </div>
            </div>

            <div>
              <div style={{
                fontSize: "13px",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center"
              }}>
                <span style={{
                  width: "20px",
                  color: "#3498db",
                  fontWeight: "bold",
                  marginRight: "10px"
                }}>
                  🕒
                </span>
                Lun-Vie: 9:00-20:00
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: "15px 20px",
            textAlign: "center",
            borderTop: "1px solid #f1f2f6"
          }}>
            <p style={{
              margin: "0 0 5px 0",
              fontSize: "14px",
              fontWeight: "600",
              color: "#2c3e50"
            }}>
              Apolo Barber & Spa
            </p>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "#7f8c8d",
              fontStyle: "italic"
            }}>
              Juventud, Fuerza y Estilo
            </p>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              color: "#3498db",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#3498db";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.9)";
              e.target.style.color = "#3498db";
            }}
          >
            ×
          </button>
        </div>
      </>
    );
  };

  const renderMyAppointmentsView = () => {
    return (
      <div style={styles.stepContent}>
        <div style={styles.stepHeader}>
          <h2 style={styles.stepTitle}>Mis citas</h2>
          <p style={styles.stepSubtitle}>Citas activas con estado confirmado</p>
        </div>

        {misCitas.length === 0 ? (
          <div style={styles.noResults}>
            <p>No tienes citas confirmadas.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {misCitas.map((c) => (
              <div key={c.id} style={styles.summaryCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {c.service?.name || (c.service && c.service.name) || "Servicio"}
                    </div>
                    <div style={{ color: "#666", fontSize: 14 }}>
                      {c.center?.name || (c.center && c.center.name) || ""} • {c.time || ""}
                    </div>
                    <div style={{ color: "#999", fontSize: 13 }}>
                      {c.date ? format(new Date(c.date), "PPP", { locale: es }) : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={styles.primaryButton}
                      onClick={() => {
                        if (window.confirm("¿Deseas cancelar esta cita?")) {
                          updateAppointmentStatus(c.id, "cancelled");
                        }
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={styles.navigationButtons}>
          <button style={styles.secondaryButton} onClick={() => setShowMyAppointmentsView(false)}>
            Volver
          </button>
          <button style={styles.primaryButton} onClick={() => { setShowHistoryView(true); setShowMyAppointmentsView(false); }}>
            Ver Historial
          </button>
        </div>
      </div>
    );
  };

  const renderHistoryView = () => {
    return (
      <div style={styles.stepContent}>
        <div style={styles.stepHeader}>
          <h2 style={styles.stepTitle}>Historial</h2>
          <p style={styles.stepSubtitle}>Tus citas pasadas</p>
        </div>

        {historial.length === 0 ? (
          <div style={styles.noResults}>
            <p>No hay elementos en el historial.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {historial.map((c) => (
              <div key={c.id} style={styles.summaryCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {c.service?.name || (c.service && c.service.name) || "Servicio"}
                    </div>
                    <div style={{ color: "#666", fontSize: 14 }}>
                      {c.center?.name || (c.center && c.center.name) || ""} • {c.time || ""}
                    </div>
                    <div style={{ color: "#999", fontSize: 13 }}>
                      {c.date ? format(new Date(c.date), "PPP", { locale: es }) : ""}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 13, color: "#777" }}>
                      Estado: <strong>{c.status}</strong>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={styles.primaryButton}
                      onClick={() => {
                        // Opcional: eliminar historial (solo si es necesario)
                        if (window.confirm("¿Deseas eliminar este elemento del historial? Esta acción no se puede deshacer.")) {
                          const apptRef = ref(database, `appointments/${c.id}`);
                          remove(apptRef).catch((err) => {
                            console.error("Error eliminando historial:", err);
                            alert("No se pudo eliminar. Intenta nuevamente.");
                          });
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={styles.navigationButtons}>
          <button style={styles.secondaryButton} onClick={() => setShowHistoryView(false)}>
            Volver
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    // Prioridad: vistas Mis Citas / Historial abiertas desde el sidebar
    if (showMyAppointmentsView) {
      return renderMyAppointmentsView();
    }
    if (showHistoryView) {
      return renderHistoryView();
    }

    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Selecciona un establecimiento</h2>
              <p style={styles.stepSubtitle}>Elige la sucursal más conveniente</p>
            </div>
            <div style={styles.centersGrid}>
              {centers.map(center => (
                <div
                  key={center.id}
                  style={{
                    ...styles.centerCard,
                    borderColor: selectedCenter?.id === center.id ? "#3498db" : "#e0e0e0"
                  }}
                  onClick={() => setSelectedCenter(center)}
                >
                  <div style={styles.centerImage}>{center.image}</div>
                  <h3 style={styles.centerName}>{center.name}</h3>
                  <p style={styles.centerAddress}>{center.address}</p>
                  <div style={styles.rating}>
                    ⭐ {center.rating}
                  </div>
                  {selectedCenter?.id === center.id && (
                    <div style={styles.selectedIndicator}>✓ Seleccionado</div>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={onBackToHome}>
                Cancelar
              </button>
              <button
                style={styles.primaryButton}
                onClick={nextStep}
                disabled={!selectedCenter}
              >
                Siguiente
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Elige un servicio</h2>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Buscar servicios o categorías"
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div style={styles.categories}>
                {categories.map(category => (
                  <button
                    key={category}
                    style={{
                      ...styles.categoryButton,
                      backgroundColor: selectedCategory === category ? "#3498db" : "#f8f9fa",
                      color: selectedCategory === category ? "white" : "#666",
                      borderColor: selectedCategory === category ? "#3498db" : "#ddd"
                    }}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {Object.keys(servicesByCategory).length === 0 ? (
              <div style={styles.noResults}>
                <p>No se encontraron servicios que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <>
                {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                  <div key={category} style={styles.categorySection}>
                    <h3 style={styles.categoryTitle}>{category}</h3>
                    <div style={styles.servicesGrid}>
                      {categoryServices.map(service => (
                        <div
                          key={service.id}
                          style={{
                            ...styles.serviceCard,
                            borderColor: selectedService?.id === service.id ? "#3498db" : "#e0e0e0"
                          }}
                          onClick={() => setSelectedService(service)}
                        >
                          <div style={styles.serviceImage}>{service.image}</div>
                          <h3 style={styles.serviceName}>{service.name}</h3>
                          <p style={styles.serviceDuration}>{service.duration}</p>
                          <p style={styles.servicePrice}>{service.price}</p>
                          <button style={{
                            ...styles.selectButton,
                            backgroundColor: selectedService?.id === service.id ? "#3498db" : "#f8f9fa",
                            color: selectedService?.id === service.id ? "white" : "#666"
                          }}>
                            {selectedService?.id === service.id ? "Seleccionado" : "Seleccionar"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={prevStep}>
                Atrás
              </button>
              <button
                style={styles.primaryButton}
                onClick={nextStep}
                disabled={!selectedService}
              >
                Siguiente
              </button>
            </div>
          </div>
        );

      case 3: {
        // Filtrar empleados por centro y categoría del servicio seleccionado
        const availableEmployees = employees.filter(
          (emp) =>
            emp.centerId === selectedCenter?.id &&
            emp.category === selectedService?.category
        );

        // Separar generalistas de especialistas
        const generalistEmployees = availableEmployees.filter(emp => emp.isGeneralist);
        const specialistEmployees = availableEmployees.filter(emp => !emp.isGeneralist);

        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Selecciona un profesional</h2>
              <p style={styles.stepSubtitle}>
                Elige con quién quieres ser atendido para {selectedService?.name}
              </p>
            </div>

            {/* Sección de Generalistas */}
            {generalistEmployees.length > 0 && (
              <div style={styles.employeeSection}>
                <h3 style={styles.sectionTitle}>Profesionales Generalistas</h3>
                <p style={styles.sectionSubtitle}>Expertos en múltiples técnicas</p>
                <div style={styles.employeeGrid}>
                  {generalistEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      style={{
                        ...styles.employeeCard,
                        borderColor:
                          selectedEmployee?.id === employee.id
                            ? "#3498db"
                            : "#e0e0e0",
                      }}
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <div style={styles.employeePhoto}>{employee.photo}</div>
                      <h3 style={styles.employeeName}>{employee.name}</h3>
                      <div style={styles.specialties}>
                        {employee.specialties.slice(0, 2).map((spec, index) => (
                          <span key={index} style={styles.specialtyTag}>
                            {spec}
                          </span>
                        ))}
                        {employee.specialties.length > 2 && (
                          <span style={styles.moreSpecialties}>
                            +{employee.specialties.length - 2} más
                          </span>
                        )}
                      </div>
                      {selectedEmployee?.id === employee.id && (
                        <div style={styles.selectedIndicator}>✓ Seleccionado</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección de Especialistas */}
            {specialistEmployees.length > 0 && (
              <div style={styles.employeeSection}>
                <h3 style={styles.sectionTitle}>Especialistas</h3>
                <p style={styles.sectionSubtitle}>Expertos en áreas específicas</p>
                <div style={styles.employeeGrid}>
                  {specialistEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      style={{
                        ...styles.employeeCard,
                        borderColor:
                          selectedEmployee?.id === employee.id
                            ? "#3498db"
                            : "#e0e0e0",
                      }}
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <div style={styles.employeePhoto}>{employee.photo}</div>
                      <h3 style={styles.employeeName}>{employee.name}</h3>
                      <div style={styles.specialties}>
                        {employee.specialties.slice(0, 2).map((spec, index) => (
                          <span key={index} style={styles.specialtyTag}>
                            {spec}
                          </span>
                        ))}
                        {employee.specialties.length > 2 && (
                          <span style={styles.moreSpecialties}>
                            +{employee.specialties.length - 2} más
                          </span>
                        )}
                      </div>
                      {selectedEmployee?.id === employee.id && (
                        <div style={styles.selectedIndicator}>✓ Seleccionado</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={prevStep}>
                Atrás
              </button>
              <button
                style={styles.primaryButton}
                onClick={nextStep}
                disabled={!selectedEmployee}
              >
                Siguiente
              </button>
            </div>
          </div>
        );
      }

      case 4:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Imagen de referencia y notas</h2>
              <p style={styles.stepSubtitle}>(Opcional)</p>
            </div>
            <div style={styles.imageNotesContainer}>
              <div style={styles.uploadSection}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <div
                  style={{
                    ...styles.uploadArea,
                    borderColor: isDraggingOver ? "#3498db" : "#ddd",
                  }}
                  onClick={handleUploadClick}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {!imageFile && !isDraggingOver && (
                    <>
                      <p style={styles.uploadText}>
                        Arrastra y suelta una imagen
                      </p>
                      <p style={styles.uploadSubtext}>o</p>
                      <button
                        style={styles.uploadButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadClick();
                        }}
                      >
                        Explorar archivos
                      </button>
                    </>
                  )}
                  {isDraggingOver && (
                    <p style={styles.uploadText}>¡Suelta la imagen aquí!</p>
                  )}
                  {imageFile && (
                    <div>
                      <p style={styles.fileNameText}>{imageFile.name}</p>
                      <p style={styles.fileSizeText}>
                        {formatFileSize(imageFile.size)}
                      </p>
                    </div>
                  )}
                </div>
                <div style={styles.imagePreview}>
                  {imagePreviewUrl ? (
                    <>
                      <img
                        src={imagePreviewUrl}
                        alt="Vista previa"
                        style={styles.previewImage}
                      />
                      <button
                        onClick={handleRemoveImage}
                        style={styles.removeImageButton}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span style={styles.previewPlaceholder}>
                      Vista previa de imagen
                    </span>
                  )}
                </div>
              </div>
              <div style={styles.notesSection}>
                <label style={styles.label}>Notas para el profesional:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Agregar notas para el profesional (preferencias, alergias, estilos, etc.)"
                  style={styles.notesTextarea}
                  rows={6}
                />
              </div>
            </div>
            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={prevStep}>
                Atrás
              </button>
              <button style={styles.primaryButton} onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 5: {
        const weekStartsOn = 1;
        const firstDayOfMonth = startOfMonth(currentDate);
        const lastDayOfMonth = endOfMonth(currentDate);
        const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn });
        const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn });

        const daysInMonthGrid = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });

        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Selecciona fecha y hora</h2>
            </div>
            <div style={styles.dateAndTimeContainer}>
              <div style={styles.calendarWrapper}>
                <div style={styles.calendarHeader}>
                  <button
                    style={styles.calendarNavButton}
                    onClick={handlePrevMonth}
                  >
                    ‹
                  </button>
                  <h3 style={styles.calendarMonth}>
                    {format(currentDate, "MMMM yyyy", { locale: es })}
                  </h3>
                  <button
                    style={styles.calendarNavButton}
                    onClick={handleNextMonth}
                  >
                    ›
                  </button>
                </div>
                <div style={styles.calendarGrid}>
                  {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                    <div key={day} style={styles.calendarDayHeader}>
                      {day}
                    </div>
                  ))}
                  {daysInMonthGrid.map((day) => {
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isSelected =
                      selectedDate && isSameDay(day, selectedDate);
                    const isCurrentToday = isToday(day);

                    return (
                      <button
                        key={day.toString()}
                        disabled={!isCurrentMonth}
                        style={{
                          ...styles.calendarDay,
                          ...(isCurrentMonth
                            ? {}
                            : styles.calendarDayNotInMonth),
                          backgroundColor: isSelected ? "#3498db" : "white",
                          color: isSelected ? "white" : isCurrentMonth ? "#333" : "#ccc",
                          borderColor: isCurrentToday && isCurrentMonth ? "#3498db" : "transparent",
                          fontWeight: isSelected || isCurrentToday ? "600" : "500",
                        }}
                        onClick={() => handleDateClick(day)}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={styles.timeSlotsWrapper}>
                {selectedDate ? (
                  <div style={styles.timeContainer}>
                    <h3 style={styles.timeTitle}>
                      Horarios para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
                    </h3>
                    <div style={styles.timeGrid}>
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          style={{
                            ...styles.timeSlot,
                            backgroundColor:
                              selectedTime === time ? "#3498db" : "#f8f9fa",
                            color:
                              selectedTime === time ? "white" : "#2c3e50",
                          }}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={styles.timePrompt}>
                    <p>Selecciona un día en el calendario para ver los horarios disponibles.</p>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={prevStep}>
                Atrás
              </button>
              <button
                style={styles.primaryButton}
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
              >
                Siguiente
              </button>
            </div>
          </div>
        );
      }

      case 6:
        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Resumen de tu cita</h2>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Establecimiento:</span>
                <span style={styles.summaryValue}>{selectedCenter?.name}</span>
                <button
                  style={styles.editButton}
                  onClick={() => setCurrentStep(1)}
                >
                  Editar
                </button>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Servicio:</span>
                <span style={styles.summaryValue}>
                  {selectedService?.name} ({selectedService?.duration})
                </span>
                <button
                  style={styles.editButton}
                  onClick={() => setCurrentStep(2)}
                >
                  Editar
                </button>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Profesional:</span>
                <span style={styles.summaryValue}>
                  {selectedEmployee?.name}
                </span>
                <button
                  style={styles.editButton}
                  onClick={() => setCurrentStep(3)}
                >
                  Editar
                </button>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Fecha y Hora:</span>
                <span style={styles.summaryValue}>
                  {formatDate(selectedDate)} - {selectedTime || "Hora no seleccionada"}
                </span>
                <button
                  style={styles.editButton}
                  onClick={() => setCurrentStep(5)}
                >
                  Editar
                </button>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Precio:</span>
                <span style={styles.summaryValue}>
                  {selectedService?.price}
                </span>
              </div>
              <div style={styles.notesSummary}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={styles.summaryLabel}>Notas e imágenes:</span>
                  <button
                    style={styles.editButton}
                    onClick={() => setCurrentStep(4)}
                  >
                    Editar
                  </button>
                </div>
                <p style={styles.notesText}>
                  {notes || "No se han agregado notas."}
                </p>
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Imagen de referencia"
                    style={styles.imageThumbnail}
                  />
                ) : (
                  <p style={styles.noImageText}>
                    No se agregó imagen de referencia.
                  </p>
                )}
              </div>
            </div>
            <p style={styles.securityText}>*Tus datos están seguros</p>
            <div style={styles.navigationButtons}>
              <button style={styles.secondaryButton} onClick={prevStep}>
                Volver
              </button>
              <button
                style={styles.primaryButton}
                onClick={handleConfirmAppointment}
              >
                Confirmar cita
              </button>
            </div>
          </div>
        );

      case 7:
        const appointment = appointments[appointments.length - 1];
        return (
          <div style={styles.stepContent}>
            <div style={styles.confirmationContainer}>
              <div style={styles.confirmationIcon}>✓</div>
              <h2 style={styles.confirmationTitle}>¡Cita confirmada!</h2>
              <p style={styles.confirmationDetails}>
                {formatDate(appointment.dateObj || new Date(appointment.date))} - {appointment.time} - {appointment.center?.name || appointment.center} - {appointment.service?.name || appointment.service?.name} ({appointment.service?.duration})
              </p>
              <div style={styles.confirmationActions}>
                <button style={styles.confirmationActionButton}>
                  Agregar al calendario
                </button>
                <button style={styles.confirmationActionButton}>
                  Compartir
                </button>
                <button style={styles.primaryButton}>
                  Guardar comprobante
                </button>
              </div>
              <button style={styles.secondaryButton} onClick={handleNewAppointment}>
                Agendar nueva cita
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {renderHeader()}
      <div style={styles.contentWrapper}>
        {renderSidebar()}
        <div
          style={{
            ...styles.mainContent,
            marginLeft: sidebarOpen ? "280px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

// Estilos
const headerStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: "70px"
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: 1
  },
  menuButton: {
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#666",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  centerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    flex: 2
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  progressStep: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  progressLine: {
    width: "40px",
    height: "2px",
    transition: "all 0.3s ease"
  },
  currentStep: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500"
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: 1,
    justifyContent: "flex-end"
  },
  helpButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    backgroundColor: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2c3e50"
  },
  userStatus: {
    fontSize: "12px",
    color: "#27ae60",
    fontWeight: "500"
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "14px"
  },
  newAppointmentButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  }
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff",
    fontFamily: "'Poppins', sans-serif"
  },
  contentWrapper: {
    display: "flex",
    minHeight: "calc(100vh - 70px)",
    position: "relative"
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 70px)",
    overflowY: "auto",
    transition: "margin-left 0.3s ease"
  },
  stepContent: {
    maxWidth: "900px",
    margin: "0 auto"
  },
  stepHeader: {
    marginBottom: "30px"
  },
  stepTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0 0 8px 0"
  },
  stepSubtitle: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: 0
  },
  centersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  centerCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }
  },
  centerImage: {
    fontSize: "48px",
    marginBottom: "15px"
  },
  centerName: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#2c3e50"
  },
  centerAddress: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: "0 0 12px 0"
  },
  rating: {
    fontSize: "14px",
    color: "#f39c12",
    fontWeight: "500"
  },
  selectedIndicator: {
    marginTop: "15px",
    padding: "5px 10px",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500"
  },
  searchContainer: {
    marginBottom: "20px"
  },
  searchInput: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    ":focus": {
      outline: "none",
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    }
  },
  categories: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  categoryButton: {
    padding: "8px 16px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db"
    }
  },
  categorySection: {
    marginBottom: "30px"
  },
  categoryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0 0 15px 0",
    paddingBottom: "10px",
    borderBottom: "2px solid #f0f0f0"
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  serviceCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }
  },
  serviceImage: {
    fontSize: "36px",
    marginBottom: "15px"
  },
  serviceName: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#2c3e50"
  },
  serviceDuration: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 8px 0"
  },
  servicePrice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#3498db",
    margin: "0 0 15px 0"
  },
  selectButton: {
    padding: "8px 15px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db"
    }
  },
  noResults: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    color: "#7f8c8d"
  },
  employeeSection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0 0 8px 0",
  },
  sectionSubtitle: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: "0 0 20px 0",
  },
  employeeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  employeeCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    position: "relative",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
  },
  employeePhoto: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    margin: "0 auto 15px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
  },
  employeeName: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#333",
  },
  specialties: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "center",
    marginBottom: "15px",
  },
  specialtyTag: {
    padding: "4px 8px",
    backgroundColor: "#f0f8ff",
    color: "#3498db",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "500",
  },
  moreSpecialties: {
    padding: "4px 8px",
    backgroundColor: "#f8f9fa",
    color: "#666",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "500",
  },
  imageNotesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginBottom: "30px"
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  uploadArea: {
    border: "2px dashed #ddd",
    borderRadius: "12px",
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "150px",
    ":hover": {
      borderColor: "#3498db",
    },
  },
  uploadText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#666",
    margin: "0 0 8px 0",
  },
  uploadSubtext: {
    fontSize: "14px",
    color: "#999",
    margin: "0 0 15px 0",
  },
  uploadButton: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db",
    },
  },
  imagePreview: {
    height: "150px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  previewPlaceholder: {
    fontSize: "14px",
    color: "#999",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "8px",
  },
  removeImageButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  },
  fileNameText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 5px 0",
    wordBreak: "break-all",
  },
  fileSizeText: {
    fontSize: "12px",
    color: "#666",
    margin: 0,
  },
  notesSection: {},
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
  },
  notesTextarea: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
    ":focus": {
      outline: "none",
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
    },
  },
  dateAndTimeContainer: {
    display: "flex",
    gap: "30px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
  },
  calendarWrapper: {
    flex: "1.5",
  },
  timeSlotsWrapper: {
    flex: "1",
    borderLeft: "1px solid #eee",
    paddingLeft: "30px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  calendarNavButton: {
    padding: "8px 12px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#666",
    cursor: "pointer",
  },
  calendarMonth: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
    textTransform: "capitalize",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  },
  calendarDayHeader: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "#999",
    paddingBottom: "10px",
  },
  calendarDay: {
    padding: "8px",
    border: "1px solid transparent",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    margin: "0 auto",
    backgroundColor: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#3498db",
    },
  },
  calendarDayNotInMonth: {
    color: "#ccc",
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: "white",
      borderColor: "transparent",
    },
  },
  timeContainer: {},
  timeTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 15px 0",
  },
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "10px",
  },
  timeSlot: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db",
    },
  },
  timePrompt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    color: "#999",
    fontSize: "14px",
  },
  summaryCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  summaryLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    width: "150px",
    flexShrink: 0,
  },
  summaryValue: {
    fontSize: "14px",
    color: "#333",
    flex: 1,
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db",
    },
  },
  notesSummary: {
    padding: "15px 0",
  },
  notesText: {
    fontSize: "14px",
    color: "#666",
    margin: "8px 0",
    lineHeight: "1.5",
  },
  imageThumbnail: {
    width: "80px",
    height: "80px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa",
    marginTop: "10px",
    objectFit: "cover",
  },
  noImageText: {
    fontSize: "14px",
    color: "#999",
    fontStyle: "italic",
    margin: "10px 0 0 0",
  },
  securityText: {
    fontSize: "12px",
    color: "#999",
    textAlign: "center",
    margin: "0 0 20px 0",
  },
  confirmationContainer: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center"
  },
  confirmationIcon: {
    fontSize: "60px",
    color: "#27ae60",
    marginBottom: "20px"
  },
  confirmationTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 15px 0"
  },
  confirmationDetails: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 30px 0",
    lineHeight: "1.5"
  },
  confirmationActions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  confirmationActionButton: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#3498db",
      color: "white",
      borderColor: "#3498db"
    }
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px"
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(52, 152, 219, 0.3)"
    },
    ":disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none"
    }
  },
  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#3498db",
      color: "#3498db"
    }
  }
};

export default Appointments;