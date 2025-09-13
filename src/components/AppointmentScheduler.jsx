import React, { useState } from "react";

function AppointmentScheduler({ user, onBack, onConfirm }) {
  const [step, setStep] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState("");
  
  // Datos de ejemplo
  const centers = [
    { id: 1, name: "Centro A", address: "Av. Siempre Viva 123 - 12 km", rating: "4.8 (320)" },
    { id: 2, name: "Centro B", address: "Calle Luna 45 - 3.4 km", rating: "4.6 (180)" },
    { id: 3, name: "Centro C", address: "Paseo del Sol 88 - 5.0 km", rating: "4.9 (320)" }
  ];

  const services = [
    { id: 1, name: "Corte de Cabello", duration: "45 min", price: "$25" },
    { id: 2, name: "Corte de Barba", duration: "30 min", price: "$18" },
    { id: 3, name: "Manicura Spa", duration: "60 min", price: "$35" },
    { id: 4, name: "Tratamiento Facial", duration: "50 min", price: "$40" }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleConfirm = () => {
    const appointment = {
      center: selectedCenter,
      service: selectedService,
      date: selectedDate || new Date(),
      time: selectedTime,
      notes: notes,
      price: selectedService?.price
    };
    onConfirm(appointment);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Agendar Nueva Cita</h2>
        <p style={subtitleStyle}>Sigue los pasos para seleccionar el establecimiento, servicio, personalizar tu cita y confirmar.</p>
        
        {/* Progress indicator */}
        <div style={progressContainerStyle}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} style={progressStepStyle}>
              <div style={{
                ...progressCircleStyle,
                background: step >= num ? "#3498db" : "#ecf0f1",
                color: step >= num ? "white" : "#7f8c8d"
              }}>
                {num}
              </div>
              {num < 5 && <div style={progressLineStyle}></div>}
            </div>
          ))}
        </div>
      </div>

      <div style={contentStyle}>
        {/* Step 1: Select Center */}
        {step === 1 && (
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>1. Selecciona un establecimiento</h3>
            <div style={centersGridStyle}>
              {centers.map(center => (
                <div 
                  key={center.id}
                  style={{
                    ...centerCardStyle,
                    borderColor: selectedCenter?.id === center.id ? "#3498db" : "#e0e0e0"
                  }}
                  onClick={() => setSelectedCenter(center)}
                >
                  <h4 style={centerNameStyle}>{center.name}</h4>
                  <p style={centerAddressStyle}>{center.address}</p>
                  <span style={ratingStyle}>{center.rating}</span>
                  {selectedCenter?.id === center.id && (
                    <div style={selectedIndicatorStyle}>✓</div>
                  )}
                </div>
              ))}
            </div>
            <div style={buttonContainerStyle}>
              <button style={secondaryButtonStyle} onClick={onBack}>
                Cancelar
              </button>
              <button 
                style={primaryButtonStyle} 
                onClick={nextStep}
                disabled={!selectedCenter}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Service */}
        {step === 2 && (
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>2. Elige un servicio</h3>
            <div style={servicesGridStyle}>
              {services.map(service => (
                <div 
                  key={service.id}
                  style={{
                    ...serviceCardStyle,
                    borderColor: selectedService?.id === service.id ? "#3498db" : "#e0e0e0"
                  }}
                  onClick={() => setSelectedService(service)}
                >
                  <h4 style={serviceNameStyle}>{service.name}</h4>
                  <p style={serviceDurationStyle}>{service.duration}</p>
                  <p style={servicePriceStyle}>{service.price}</p>
                  {selectedService?.id === service.id && (
                    <div style={selectedIndicatorStyle}>✓</div>
                  )}
                </div>
              ))}
            </div>
            <div style={buttonContainerStyle}>
              <button style={secondaryButtonStyle} onClick={prevStep}>
                Atrás
              </button>
              <button 
                style={primaryButtonStyle} 
                onClick={nextStep}
                disabled={!selectedService}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Notes and Image */}
        {step === 3 && (
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>3. Imagen de referencia y notas</h3>
            <div style={uploadContainerStyle}>
              <div style={uploadAreaStyle}>
                <p style={uploadTextStyle}>Arrastra y suelta una imagen</p>
                <p style={uploadSubtextStyle}>o</p>
                <button style={browseButtonStyle}>Explorar archivos</button>
              </div>
            </div>
            <div style={notesContainerStyle}>
              <label style={labelStyle}>Notas adicionales:</label>
              <textarea
                style={textareaStyle}
                placeholder="Preferencias, alergias, comentarios especiales..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
            <div style={buttonContainerStyle}>
              <button style={secondaryButtonStyle} onClick={prevStep}>
                Atrás
              </button>
              <button style={primaryButtonStyle} onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Select Date and Time */}
        {step === 4 && (
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>4. Selecciona fecha y hora</h3>
            
            {/* Simple date selector */}
            <div style={dateSelectorStyle}>
              <label style={labelStyle}>Selecciona una fecha:</label>
              <input
                type="date"
                style={dateInputStyle}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div style={timeContainerStyle}>
              <label style={labelStyle}>Horarios disponibles:</label>
              <div style={timeGridStyle}>
                {timeSlots.map(time => (
                  <button
                    key={time}
                    style={{
                      ...timeSlotStyle,
                      background: selectedTime === time ? "#3498db" : "#ecf0f1",
                      color: selectedTime === time ? "white" : "#2c3e50"
                    }}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div style={buttonContainerStyle}>
              <button style={secondaryButtonStyle} onClick={prevStep}>
                Atrás
              </button>
              <button 
                style={primaryButtonStyle} 
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 5 && (
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>5. Resumen</h3>
            <div style={summaryCardStyle}>
              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>Establecimiento:</span>
                <span style={summaryValueStyle}>{selectedCenter?.name}</span>
              </div>
              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>Servicio:</span>
                <span style={summaryValueStyle}>{selectedService?.name} ({selectedService?.duration})</span>
              </div>
              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>Fecha:</span>
                <span style={summaryValueStyle}>{selectedDate}</span>
              </div>
              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>Hora:</span>
                <span style={summaryValueStyle}>{selectedTime}</span>
              </div>
              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>Precio:</span>
                <span style={summaryValueStyle}>{selectedService?.price}</span>
              </div>
              {notes && (
                <div style={summaryItemStyle}>
                  <span style={summaryLabelStyle}>Notas:</span>
                  <span style={summaryValueStyle}>{notes}</span>
                </div>
              )}
            </div>

            <div style={buttonContainerStyle}>
              <button style={secondaryButtonStyle} onClick={prevStep}>
                Volver
              </button>
              <button style={primaryButtonStyle} onClick={handleConfirm}>
                Confirmar cita
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos
const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
  paddingBottom: "20px",
  borderBottom: "1px solid #ecf0f1"
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "10px"
};

const subtitleStyle = {
  fontSize: "16px",
  color: "#7f8c8d",
  marginBottom: "30px"
};

const progressContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px"
};

const progressStepStyle = {
  display: "flex",
  alignItems: "center"
};

const progressCircleStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "14px"
};

const progressLineStyle = {
  width: "50px",
  height: "2px",
  background: "#ecf0f1",
  margin: "0 5px"
};

const contentStyle = {
  minHeight: "400px"
};

const stepStyle = {
  animation: "fadeIn 0.3s ease"
};

const stepTitleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "2c3e50",
  marginBottom: "20px",
  paddingBottom: "10px",
  borderBottom: "2px solid #3498db"
};

const centersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
  marginBottom: "30px"
};

const centerCardStyle = {
  padding: "20px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative"
};

const centerNameStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "8px"
};

const centerAddressStyle = {
  fontSize: "14px",
  color: "#7f8c8d",
  marginBottom: "8px"
};

const ratingStyle = {
  fontSize: "14px",
  color: "#f39c12",
  fontWeight: "600"
};

const servicesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginBottom: "30px"
};

const serviceCardStyle = {
  padding: "20px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  textAlign: "center"
};

const serviceNameStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "8px"
};

const serviceDurationStyle = {
  fontSize: "14px",
  color: "#7f8c8d",
  marginBottom: "8px"
};

const servicePriceStyle = {
  fontSize: "16px",
  color: "#27ae60",
  fontWeight: "600"
};

const selectedIndicatorStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#27ae60",
  color: "white",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px"
};

const uploadContainerStyle = {
  marginBottom: "30px"
};

const uploadAreaStyle = {
  border: "2px dashed #bdc3c7",
  borderRadius: "8px",
  padding: "40px 20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const uploadTextStyle = {
  fontSize: "16px",
  color: "#7f8c8d",
  marginBottom: "10px"
};

const uploadSubtextStyle = {
  fontSize: "14px",
  color: "#95a5a6",
  marginBottom: "15px"
};

const browseButtonStyle = {
  background: "#3498db",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
};

const notesContainerStyle = {
  marginBottom: "30px"
};

const labelStyle = {
  display: "block",
  fontSize: "16px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "10px"
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #bdc3c7",
  borderRadius: "6px",
  fontSize: "14px",
  resize: "vertical",
  fontFamily: "inherit"
};

const dateSelectorStyle = {
  marginBottom: "30px"
};

const dateInputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #bdc3c7",
  borderRadius: "6px",
  fontSize: "14px"
};

const timeContainerStyle = {
  marginBottom: "30px"
};

const timeGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "10px"
};

const timeSlotStyle = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.3s ease"
};

const summaryCardStyle = {
  background: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "30px"
};

const summaryItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
  paddingBottom: "15px",
  borderBottom: "1px solid #e0e0e0"
};

const summaryLabelStyle = {
  fontWeight: "600",
  color: "#2c3e50"
};

const summaryValueStyle = {
  color: "#7f8c8d",
  textAlign: "right"
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px"
};

const primaryButtonStyle = {
  background: "#3498db",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  flex: 1,
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "#2980b9"
  }
};

const secondaryButtonStyle = {
  background: "transparent",
  color: "#7f8c8d",
  border: "1px solid #bdc3c7",
  padding: "12px 25px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "16px",
  flex: 1,
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "#f8f9fa"
  }
};

export default AppointmentScheduler;