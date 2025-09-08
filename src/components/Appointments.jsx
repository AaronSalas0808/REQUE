import React, { useState, useRef } from "react";
// ... (imports de date-fns no cambian)
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
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
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../firebase";

//const storage = getStorage();
// ... (formatFileSize no cambia)

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// --- NUEVO: Datos de los empleados ---
const employees = [
  // Centro A (ID 1)
  { id: 1, name: "Carlos R.", photo: "👨🏻", centerId: 1, category: "Popular" },
  { id: 2, name: "Javier M.", photo: "👨🏼", centerId: 1, category: "Popular" },
  { id: 3, name: "Luis G.", photo: "👨🏽", centerId: 1, category: "Popular" },
  { id: 4, name: "Ana P.", photo: "👩🏻", centerId: 1, category: "Uñas" },
  { id: 5, name: "Sofía L.", photo: "👩🏼", centerId: 1, category: "Uñas" },
  { id: 6, name: "María C.", photo: "👩🏽", centerId: 1, category: "Uñas" },
  { id: 7, name: "Elena V.", photo: "👩🏻‍🦰", centerId: 1, category: "Spa" },
  { id: 8, name: "Isabel S.", photo: "👩🏼‍🦰", centerId: 1, category: "Spa" },
  { id: 9, name: "Laura T.", photo: "👩🏽‍🦰", centerId: 1, category: "Spa" },
  // Centro B (ID 2)
  { id: 10, name: "Miguel A.", photo: "👨🏻", centerId: 2, category: "Popular" },
  { id: 11, name: "David F.", photo: "👨🏼", centerId: 2, category: "Popular" },
  { id: 12, name: "Pedro S.", photo: "👨🏽", centerId: 2, category: "Popular" },
  { id: 13, name: "Lucía H.", photo: "👩🏻", centerId: 2, category: "Uñas" },
  { id: 14, name: "Carmen R.", photo: "👩🏼", centerId: 2, category: "Uñas" },
  { id: 15, name: "Paula D.", photo: "👩🏽", centerId: 2, category: "Uñas" },
  { id: 16, name: "Verónica N.", photo: "👩🏻‍🦰", centerId: 2, category: "Spa" },
  { id: 17, name: "Raquel B.", photo: "👩🏼‍🦰", centerId: 2, category: "Spa" },
  { id: 18, name: "Marta G.", photo: "👩🏽‍🦰", centerId: 2, category: "Spa" },
  // Centro C (ID 3)
  { id: 19, name: "Andrés V.", photo: "👨🏻", centerId: 3, category: "Popular" },
  { id: 20, name: "Sergio P.", photo: "👨🏼", centerId: 3, category: "Popular" },
  { id: 21, name: "Jorge L.", photo: "👨🏽", centerId: 3, category: "Popular" },
  { id: 22, name: "Cristina M.", photo: "👩🏻", centerId: 3, category: "Uñas" },
  { id: 23, name: "Beatriz F.", photo: "👩🏼", centerId: 3, category: "Uñas" },
  { id: 24, name: "Nerea J.", photo: "👩🏽", centerId: 3, category: "Uñas" },
  { id: 25, name: "Silvia Q.", photo: "👩🏻‍🦰", centerId: 3, category: "Spa" },
  { id: 26, name: "Lorena A.", photo: "👩🏼‍🦰", centerId: 3, category: "Spa" },
  { id: 27, name: "Eva Z.", photo: "👩🏽‍🦰", centerId: 3, category: "Spa" },
];

function Appointments({ user, onBackToHome, onLogout }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // NUEVO: Estado para el profesional seleccionado
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // ... (Datos de ejemplo no cambian)
  const centers = [
    { id: 1, name: "Centro A", address: "Av. Siempre Viva 123 - 1.2 km", rating: "4.8 (230)", image: "🏢" },
    { id: 2, name: "Centro B", address: "Calle Luna 45 - 3.4 km", rating: "4.6 (180)", image: "🏢" },
    { id: 3, name: "Centro C", address: "Paseo del Sol 88 - 5.0 km", rating: "4.9 (320)", image: "🏢" }
  ];

  const services = [
    { id: 1, name: "Corte de Cabello", duration: "45 min", price: "$25", category: "Popular", image: "✂️" },
    { id: 2, name: "Barba y Alineación", duration: "30 min", price: "$15", category: "Popular", image: "🧔" },
    { id: 3, name: "Manicure Spa", duration: "60 min", price: "$30", category: "Uñas", image: "💅" },
    { id: 4, name: "Pedicure", duration: "45 min", price: "$28", category: "Uñas", image: "👣" },
    { id: 5, name: "Masaje Relajante", duration: "50 min", price: "$40", category: "Spa", image: "💆" },
    { id: 6, name: "Tratamiento Facial", duration: "40 min", price: "$35", category: "Spa", image: "✨" }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const categories = ["Popular", "Cabello", "Uñas", "Spa"];

  // MODIFICADO: Añadir nuevo paso y re-numerar
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
    { id: "help", label: "Ayuda", icon: "❓" },
    { id: "contact", label: "Contacto", icon: "📞" },
    { id: "logout", label: "Cerrar Sesión", icon: "🚪" }
  ];

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // ... (funciones de carga de imagen no cambian)
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

const handleConfirmAppointment = async () => {
  try {
    // Validar que todos los campos necesarios estén seleccionados
    if (!selectedCenter || !selectedService || !selectedEmployee || !selectedDate || !selectedTime) {
      alert("Por favor, completa todos los campos obligatorios antes de confirmar.");
      return;
    }

    // Crear el objeto de la cita
    const newAppointment = {
      center: selectedCenter,
      service: selectedService,
      employee: selectedEmployee,
      date: selectedDate.toISOString(), // Guardar como string
      time: selectedTime,
      notes: notes,
      imageUrl: imagePreviewUrl,
      status: "confirmed",
      userId: user?.uid || "anonymous",
      userEmail: user?.email || "unknown@email.com",
      createdAt: serverTimestamp()
    };
    
    // Guardar en Realtime Database
    const appointmentsRef = ref(database, 'appointments');
    const newAppointmentRef = push(appointmentsRef, newAppointment);
    
    console.log("Cita guardada con ID: ", newAppointmentRef.key);
    
    // Actualizar el estado local
    setAppointments([...appointments, { 
      ...newAppointment, 
      id: newAppointmentRef.key,
      date: selectedDate
    }]);
    nextStep();
  } catch (error) {
    console.error("Error al guardar la cita: ", error);
    alert("Hubo un error al guardar la cita. Por favor, intenta nuevamente.");
  }
};

  // MODIFICADO: Resetear el estado del empleado
  const handleNewAppointment = () => {
    setCurrentStep(1);
    setSelectedCenter(null);
    setSelectedService(null);
    setSelectedEmployee(null); // Resetear empleado
    setSelectedDate(null);
    setSelectedTime("");
    setNotes("");
  };

  const handleNavigation = (section) => {
    if (section === "logout") {
      onLogout();
    } else {
      console.log("Navegar a:", section);
    }
    setSidebarOpen(false);
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // ... (renderHeader y renderSidebar no cambian)
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
                    backgroundColor: currentStep >= step.number ? "#ff6b95" : "#e0e0e0",
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
                      backgroundColor: currentStep > step.number ? "#ff6b95" : "#e0e0e0"
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
                {user?.email?.split('@')[0] || 'Usuario'}
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
      <div style={sidebarStyles.container}>
        <div style={sidebarStyles.header}>
          <button 
            style={sidebarStyles.closeButton}
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div style={sidebarStyles.profileSection}>
          <div style={sidebarStyles.avatar}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div style={sidebarStyles.userInfo}>
            <h3 style={sidebarStyles.welcome}>¡Hola!</h3>
            <p style={sidebarStyles.userName}>{user?.email || "Usuario"}</p>
            <p style={sidebarStyles.userStatus}>⭐ Cliente Premium</p>
          </div>
        </div>

        <div style={sidebarStyles.progressSection}>
          <h4 style={sidebarStyles.sectionTitle}>Tu Cita Actual</h4>
          <div style={sidebarStyles.stepsContainer}>
            {steps.map(step => (
              <div
                key={step.number}
                style={{
                  ...sidebarStyles.stepItem,
                  backgroundColor: currentStep === step.number ? "#ff6b95" : "transparent",
                  color: currentStep === step.number ? "white" : "#666"
                }}
                onClick={() => {
                  handleStepClick(step.number);
                  setSidebarOpen(false);
                }}
              >
                <div style={sidebarStyles.stepNumber}>{step.number}</div>
                <span style={sidebarStyles.stepText}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={sidebarStyles.menuSection}>
          <h4 style={sidebarStyles.sectionTitle}>Mi Cuenta</h4>
          <nav style={sidebarStyles.menu}>
            {menuItems.map(item => (
              <button
                key={item.id}
                style={sidebarStyles.menuItem}
                onClick={() => handleNavigation(item.id)}
              >
                <span style={sidebarStyles.menuIcon}>{item.icon}</span>
                <span style={sidebarStyles.menuLabel}>{item.label}</span>
                {item.id === "notifications" && (
                  <span style={sidebarStyles.notificationBadge}>3</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div style={sidebarStyles.contactSection}>
          <h4 style={sidebarStyles.sectionTitle}>Contacto Rápido</h4>
          <div style={sidebarStyles.contactInfo}>
            <div style={sidebarStyles.contactItem}>
              <span style={sidebarStyles.contactIcon}>📞</span>
              <span style={sidebarStyles.contactText}>+34 123 456 789</span>
            </div>
            <div style={sidebarStyles.contactItem}>
              <span style={sidebarStyles.contactIcon}>✉️</span>
              <span style={sidebarStyles.contactText}>soporte@apolo.com</span>
            </div>
            <div style={sidebarStyles.contactItem}>
              <span style={sidebarStyles.contactIcon}>🕒</span>
              <span style={sidebarStyles.contactText}>Lun-Vie: 9:00-20:00</span>
            </div>
          </div>
        </div>

        <div style={sidebarStyles.footer}>
          <p style={sidebarStyles.footerText}>Apolo Barber & Spa</p>
          <p style={sidebarStyles.footerSubtext}>Juventud, Fuerza y Estilo</p>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      // ... (case 1 y 2 no cambian)
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
                    borderColor: selectedCenter?.id === center.id ? "#ff6b95" : "#e0e0e0"
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
                  placeholder="Buscar servicios"
                  style={styles.searchInput}
                />
              </div>
              <div style={styles.categories}>
                {categories.map(category => (
                  <button
                    key={category}
                    style={styles.categoryButton}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div style={styles.servicesGrid}>
              {services.map(service => (
                <div 
                  key={service.id} 
                  style={{
                    ...styles.serviceCard,
                    borderColor: selectedService?.id === service.id ? "#ff6b95" : "#e0e0e0"
                  }}
                  onClick={() => setSelectedService(service)}
                >
                  <div style={styles.serviceImage}>{service.image}</div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDuration}>{service.duration}</p>
                  <p style={styles.servicePrice}>{service.price}</p>
                  <button style={styles.selectButton}>
                    {selectedService?.id === service.id ? "Seleccionado" : "Seleccionar"}
                  </button>
                </div>
              ))}
            </div>
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

      // --- NUEVO: Paso 3 para seleccionar profesional ---
      case 3: {
        const availableEmployees = employees.filter(
          (emp) =>
            emp.centerId === selectedCenter?.id &&
            emp.category === selectedService?.category,
        );

        return (
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <h2 style={styles.stepTitle}>Selecciona un profesional</h2>
              <p style={styles.stepSubtitle}>
                Elige con quién quieres ser atendido
              </p>
            </div>
            <div style={styles.employeeGrid}>
              {availableEmployees.map((employee) => (
                <div
                  key={employee.id}
                  style={{
                    ...styles.employeeCard,
                    borderColor:
                      selectedEmployee?.id === employee.id
                        ? "#ff6b95"
                        : "#e0e0e0",
                  }}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div style={styles.employeePhoto}>{employee.photo}</div>
                  <h3 style={styles.employeeName}>{employee.name}</h3>
                  {selectedEmployee?.id === employee.id && (
                    <div style={styles.selectedIndicator}>✓</div>
                  )}
                </div>
              ))}
            </div>
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

      // MODIFICADO: El antiguo paso 3 ahora es el 4
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
                    borderColor: isDraggingOver ? "#ff6b95" : "#ddd",
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

      // MODIFICADO: El antiguo paso 4 ahora es el 5
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
                          backgroundColor: isSelected ? "#ff6b95" : "white",
                          color: isSelected ? "white" : isCurrentMonth ? "#333" : "#ccc",
                          borderColor: isCurrentToday && isCurrentMonth ? "#ff6b95" : "transparent",
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
                              selectedTime === time ? "#ff6b95" : "#f8f9fa",
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

      // MODIFICADO: El antiguo paso 5 ahora es el 6
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
              {/* NUEVO: Resumen del profesional */}
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

      // MODIFICADO: El antiguo paso 6 ahora es el 7
      case 7:
        const appointment = appointments[appointments.length - 1];
        return (
          <div style={styles.stepContent}>
            <div style={styles.confirmationContainer}>
              <div style={styles.confirmationIcon}>✓</div>
              <h2 style={styles.confirmationTitle}>¡Cita confirmada!</h2>
              <p style={styles.confirmationDetails}>
                {formatDate(appointment.date)} - {appointment.time} - {appointment.center.name} - {appointment.service.name} ({appointment.service.duration})
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
      {sidebarOpen && (
        <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />
      )}
      <div style={styles.contentWrapper}>
        {renderSidebar()}
        <div
          style={{
            ...styles.mainContent,
            marginLeft: sidebarOpen ? "300px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

// ... (overlayStyle, headerStyles, sidebarStyles no cambian)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  display: "block"
};

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
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#ff6b95"
    }
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
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#ff6b95"
    }
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logoIcon: {
    fontSize: "24px"
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50"
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
    ":hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#ff6b95"
    }
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#f8f9fa"
    }
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
    backgroundColor: "#ff6b95",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "14px"
  },
  newAppointmentButton: {
    backgroundColor: "#ff6b95",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#ff5a8c",
      transform: "translateY(-1px)"
    }
  }
};

const sidebarStyles = {
  container: {
    width: "300px",
    height: "calc(100vh - 70px)",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: "70px",
    overflowY: "auto",
    zIndex: 1000,
    transition: "transform 0.3s ease",
    transform: "translateX(0)"
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px"
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.1)"
    }
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#ff6b95",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginRight: "15px"
  },
  userInfo: {
    flex: 1
  },
  welcome: {
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 4px 0",
    color: "#ecf0f1"
  },
  userName: {
    fontSize: "14px",
    margin: "0 0 4px 0",
    color: "#bdc3c7",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  userStatus: {
    fontSize: "12px",
    margin: 0,
    color: "#f39c12",
    fontWeight: "500"
  },
  progressSection: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ecf0f1",
    margin: "0 0 15px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: 0.8,
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      opacity: 1
    }
  },
  stepNumber: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    marginRight: "10px"
  },
  stepText: {
    fontSize: "13px",
    fontWeight: "500"
  },
  menuSection: {
    flex: 1,
    marginBottom: "30px"
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
    opacity: 0.8,
    position: "relative",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      opacity: 1
    }
  },
  menuIcon: {
    fontSize: "18px",
    marginRight: "12px",
    width: "20px",
    textAlign: "center"
  },
  menuLabel: {
    fontSize: "14px",
    fontWeight: "500",
    flex: 1
  },
  notificationBadge: {
    backgroundColor: "#e74c3c",
    color: "white",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center"
  },
  contactSection: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0"
  },
  contactIcon: {
    fontSize: "14px",
    marginRight: "10px",
    width: "20px",
    textAlign: "center",
    opacity: 0.7
  },
  contactText: {
    fontSize: "13px",
    color: "#bdc3c7",
    fontWeight: "400"
  },
  footer: {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },
  footerText: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 5px 0",
    color: "#ecf0f1"
  },
  footerSubtext: {
    fontSize: "12px",
    margin: 0,
    color: "#7f8c8d",
    fontStyle: "italic"
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
    backgroundColor: "#fafafa",
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
    color: "#333",
    margin: "0 0 8px 0"
  },
  stepSubtitle: {
    fontSize: "14px",
    color: "#666",
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
    color: "#333"
  },
  centerAddress: {
    fontSize: "14px",
    color: "#666",
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
      borderColor: "#ff6b95",
      boxShadow: "0 0 0 2px rgba(255, 107, 149, 0.2)"
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95"
    }
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
    color: "#333"
  },
  serviceDuration: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 8px 0"
  },
  servicePrice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ff6b95",
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95"
    }
  },
  // --- NUEVOS ESTILOS PARA EL PASO 3 ---
  employeeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
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
    margin: "0",
    color: "#333",
  },
  // ------------------------------------
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
      borderColor: "#ff6b95",
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95",
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
      borderColor: "#ff6b95",
      boxShadow: "0 0 0 2px rgba(255, 107, 149, 0.2)",
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
      borderColor: "#ff6b95",
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95",
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95",
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
      backgroundColor: "#ff6b95",
      color: "white",
      borderColor: "#ff6b95"
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
    backgroundColor: "#ff6b95",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#ff5a8c",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(255, 107, 149, 0.3)"
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
      borderColor: "#ff6b95",
      color: "#ff6b95"
    }
  }
};

export default Appointments;