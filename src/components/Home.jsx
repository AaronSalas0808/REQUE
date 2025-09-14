import React, { forwardRef, useState } from "react";

const Home = forwardRef(({ onExploreServices, onReservaClick }, ref) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleReservaClick = () => {
    window.location.href = "#login";
    if (onReservaClick) onReservaClick();
  };

  const handleExploreServices = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Datos de servicios
  const servicesData = {
    "Barbería": [
      { id: 1, name: "Corte de cabello clásico", duration: "30 min", price: "$15-25", category: "Barbería", image: "💇", description: "Corte tradicional con técnicas probadas que nunca pasan de moda. Incluye lavado y acabado con productos premium.", benefits: "Estilo atemporal, acabado impecable, experiencia relajante" },
      { id: 2, name: "Corte de cabello moderno/estilo", duration: "45 min", price: "$20-30", category: "Barbería", image: "💇", description: "Tendencias actuales y cortes vanguardistas con asesoramiento de estilo personalizado.", benefits: "Look actualizado, asesoramiento profesional, productos de fijación premium" },
      { id: 3, name: "Afeitado tradicional con navaja", duration: "30 min", price: "$15-20", category: "Barbería", image: "✂️", description: "Afeitado clásico con navaja straight, toallas calientes y productos de primera calidad para una experiencia premium.", benefits: "Barba suave, exfoliación natural, menor irritación" },
      { id: 4, name: "Arreglo de barba y bigote", duration: "25 min", price: "$12-18", category: "Barbería", image: "🧔", description: "Delineación, perfilado y arreglo de barba con técnicas precisas para mantener tu estilo impecable.", benefits: "Forma definida, líneas limpias, aspecto cuidado" },
      { id: 5, name: "Corte + Barba (Combo)", duration: "60 min", price: "$30-40", category: "Barbería", image: "👨", description: "Servicio completo que incluye corte de cabello y arreglo de barba con productos premium y acabado perfecto.", benefits: "Precio especial, look completo, experiencia premium" },
      { id: 6, name: "Tinte para cabello/barba", duration: "45 min", price: "$20-30", category: "Barbería", image: "🎨", description: "Aplicación profesional de tinte para cubrir canas o cambiar tu look con productos de calidad que cuidan tu piel y cabello.", benefits: "Cobertura natural, productos hipoalergénicos, resultado uniforme" },
      { id: 7, name: "Mascarilla facial/tratamientos", duration: "30 min", price: "$15-25", category: "Barbería", image: "🧴", description: "Tratamientos rejuvenecedores con ingredientes naturales para hidratar y revitalizar la piel.", benefits: "Piel hidratada, aspecto rejuvenecido, relax absoluto" },
      { id: 8, name: "Depilación de cejas", duration: "15 min", price: "$8-12", category: "Barbería", image: "👁️", description: "Delineación precisa de cejas con técnicas profesionales para realzar tu mirada de forma natural.", benefits: "Mirada definida, forma natural, técnica indolora" },
      { id: 9, name: "Limpieza facial masculina", duration: "45 min", price: "$25-35", category: "Barbería", image: "✨", description: "Limpieza profunda con vapor, exfoliación y extracción de impurezas para una piel saludable.", benefits: "Puras limpios, piel oxigenada, prevención de imperfecciones" },
    ],
    "Belleza": [
      { id: 10, name: "Corte de dama", duration: "45 min", price: "$20-30", category: "Belleza", image: "💇‍♀️", description: "Corte moderno y personalizado según tu tipo de rostro, cabello y estilo de vida con técnicas actualizadas.", benefits: "Estilo personalizado, asesoramiento profesional, técnicas actualizadas" },
      { id: 11, name: "Peinado para eventos", duration: "60 min", price: "$35-60", category: "Belleza", image: "👰", description: "Peinados elegantes para ocasiones especiales con fijación profesional que garantiza durabilidad.", benefits: "Diseño exclusivo, productos de larga duración, look fotográfico" },
      { id: 12, name: "Tinte/coloración", duration: "90 min", price: "$40-70", category: "Belleza", image: "🌈", description: "Coloración profesional con productos de calidad que protegen el cabello y mantienen su vitalidad.", benefits: "Color vibrante, cubrimiento de canas, fórmula protectora" },
      { id: 13, name: "Mechas/balayage", duration: "120 min", price: "$60-100", category: "Belleza", image: "🎨", description: "Técnicas de iluminación personalizadas para crear dimensiones y reflejos naturales con un efecto sun-kissed.", benefits: "Efecto natural, bajo mantenimiento, personalizado" },
      { id: 14, name: "Tratamientos capilares", duration: "45 min", price: "$25-45", category: "Belleza", image: "💆‍♀️", description: "Hidratación, reconstrucción o nutrición profunda según las necesidades específicas de tu cabello.", benefits: "Cabello revitalizado, reparación de daños, brillo intenso" },
      { id: 15, name: "Alisado/keratina", duration: "120 min", price: "$80-150", category: "Belleza", image: "🔀", description: "Tratamientos profesionales de alisado con fórmulas avanzadas que protegen la fibra capilar.", benefits: "Manejabilidad, reducción de frizz, efecto duradero" },
      { id: 16, name: "Extensiones de cabello", duration: "120 min", price: "$100-250", category: "Belleza", image: "👑", description: "Aplicación profesional de extensiones de cabello de alta calidad con métodos seguros y naturales.", benefits: "Volumen instantáneo, longitud adicional, resultado natural" },
    ],
    "Manos y Pies": [
      { id: 17, name: "Manicure básica", duration: "30 min", price: "$15-20", category: "Manos y Pies", image: "💅", description: "Limpieza, cutículas, forma y esmaltado básico para mantener tus manos impecables.", benefits: "Manos presentables, cutículas cuidadas, esmaltado duradero" },
      { id: 18, name: "Manicure spa/lujo", duration: "45 min", price: "$25-35", category: "Manos y Pies", image: "💅", description: "Experiencia premium que incluye exfoliación, mascarilla nutritiva y masaje relajante para manos.", benefits: "Hidratación profunda, relax, tratamiento completo" },
      { id: 19, name: "Pedicure básica", duration: "45 min", price: "$20-25", category: "Manos y Pies", image: "👣", description: "Limpieza profunda, cuidado de cutículas, callosidades y esmaltado para pies perfectos.", benefits: "Pies cuidados, eliminación de durezas, aspecto saludable" },
      { id: 20, name: "Pedicure spa/lujo", duration: "60 min", price: "$30-40", category: "Manos y Pies", image: "👣", description: "Tratamiento completo con baño relajante, exfoliación, mascarilla y masaje podal rejuvenecedor.", benefits: "Pies suaves, relax profundo, hidratación intensiva" },
      { id: 21, name: "Uñas acrílicas", duration: "90 min", price: "$40-60", category: "Manos y Pies", image: "💅", description: "Aplicación profesional de uñas acrílicas con formas y longitudes personalizadas según tu preferencia.", benefits: "Durabilidad, resistencia, personalización de forma" },
      { id: 22, name: "Uñas de gel", duration: "75 min", price: "$35-50", category: "Manos y Pies", image: "💅", description: "Esmaltado semipermanente que mantiene tus uñas perfectas por semanas con brillo intenso.", benefits: "Brillo prolongado, cero secado, hasta 3 semanas de duración" },
      { id: 23, name: "Decoración de uñas", duration: "30 min", price: "$10-25", category: "Manos y Pies", image: "✨", description: "Diseños artísticos, nail art, cristales y técnicas especiales para uñas únicas y originales.", benefits: "Diseño personalizado, tendencias actuales, detalles exclusivos" },
    ],
    "Spa y Bienestar": [
      { id: 24, name: "Masaje relajante (30 min)", duration: "30 min", price: "$40", category: "Spa y Bienestar", image: "💆", description: "Masaje suave que promueve la relajación profunda, alivia la tension y reduce el estrés.", benefits: "Reducción de estrés, circulación mejorada, relax inmediato" },
      { id: 25, name: "Masaje relajante (50 min)", duration: "50 min", price: "$65", category: "Spa y Bienestar", image: "💆", description: "Sesión extendida de masaje relajante para una desconexión profunda y renovación completa.", benefits: "Relajación profunda, alivio muscular, experiencia rejuvenecedora" },
      { id: 26, name: "Masaje relajante (80 min)", duration: "80 min", price: "$90", category: "Spa y Bienestar", image: "💆", description: "Experiencia premium de masaje que combina técnicas para alcanzar un estado de bienestar total.", benefits: "Bienestar integral, liberación total de tensiones, renovación física y mental" },
      { id: 27, name: "Masaje descontracturante", duration: "60 min", price: "$50-80", category: "Spa y Bienestar", image: "💆‍♂️", description: "Masaje terapéutico focalizado en zonas de tensión y contracturas para aliviar dolores musculares.", benefits: "Alivio del dolor, mayor movilidad, liberación de puntos de tensión" },
      { id: 28, name: "Tratamiento facial completo", duration: "60 min", price: "$45-70", category: "Spa y Bienestar", image: "✨", description: "Limpieza profunda, exfoliación, extracción, mascarilla y masaje facial personalizado según tu tipo de piel.", benefits: "Piel renovada, poros limpios, hidratación intensiva" },
      { id: 29, name: "Depilación facial", duration: "25 min", price: "$15-25", category: "Spa y Bienestar", image: "👁️", description: "Depilación precisa de vello facial con cera de alta calidad y técnicas que minimizan molestias.", benefits: "Piel suave, resultados duraderos, técnica profesional" },
      { id: 30, name: "Depilación corporal (por zona)", duration: "30 min", price: "$20-40", category: "Spa y Bienestar", image: "✨", description: "Depilación profesional por zonas con productos hipoalergénicos y técnicas que reducen el crecimiento futuro.", benefits: "Piel suave, menos rebrote, precisión en cada zona" },
      { id: 31, name: "Maquillaje profesional", duration: "60 min", price: "$35-60", category: "Spa y Bienestar", image: "💄", description: "Aplicación profesional de maquillaje para eventos especiales con productos de alta gama y técnicas expertas.", benefits: "Look perfecto, productos de larga duración, realce de características" },
      { id: 32, name: "Ceja y pestañas (tinte/laminado)", duration: "45 min", price: "$20-35", category: "Spa y Bienestar", image: "👁️", description: "Tinte y laminado de cejas y pestañas para realzar tu mirada con resultados naturales y duraderos.", benefits: "Mirada definida, ahorro de tiempo diario, efecto natural" },
    ]
  };

  // Si hay una categoría seleccionada, mostrar los servicios
  if (selectedCategory) {
    return (
      <div style={containerStyle}>
        <div style={servicesHeaderStyle}>
          <button 
            onClick={handleBackToHome}
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#3498db";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#3498db";
            }}
          >
            ← Volver al inicio
          </button>
          <h2 style={servicesTitleStyle}>Servicios de {selectedCategory}</h2>
          <div style={{width: "100px"}}></div> {/* Espaciador para equilibrar el diseño */}
        </div>
        
        <div style={servicesGridStyle}>
          {servicesData[selectedCategory].map(service => (
            <div key={service.id} style={serviceCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div style={serviceIconStyle}>{service.image}</div>
              <h3 style={serviceNameStyle}>{service.name}</h3>
              <p style={serviceDescriptionStyle}>{service.description}</p>
              <p style={serviceDetailStyle}>Duración: {service.duration}</p>
              <p style={serviceDetailStyle}>Precio: {service.price}</p>
              <p style={serviceBenefitsStyle}>Beneficios: {service.benefits}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista normal del home
  return (
    <div style={containerStyle}>
      {/* Hero Section - INICIO */}
      <section ref={ref?.homeRef} style={heroStyle}>
        <div style={heroContentStyle}>
          <div style={logoContainerStyle}>
            <h1 style={heroTitleStyle}>Apolo Barber & Spa</h1>
            <p style={heroSloganStyle}>Juventud, fuerza y estilo</p>
          </div>
          <p style={heroSubtitleStyle}>Descubre una nueva experiencia de belleza y bienestar</p>
          <div style={buttonContainerStyle}>
            <button 
              onClick={handleReservaClick} 
              style={reservaButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
              }}
            >
              Reserva aquí
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS Section */}
      <section ref={ref?.serviciosRef} style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Nuestros Servicios</h2>
        <div style={servicesContainerStyle}>
          {/* Primera fila con 2 servicios */}
          <div style={servicesRowStyle}>
            <div style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div style={cardIconStyle}>💆‍♂️</div>
              <h3 style={cardTitleStyle}>Servicios de Spa y Bienestar</h3>
              <p style={serviceDescStyle}>Relájate con un masaje terapéutico.</p>
              <button
                onClick={() => handleExploreServices("Spa y Bienestar")}
                style={serviceButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3498db";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#3498db";
                }}
              >
                Ver opciones
              </button>
            </div>

            <div style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div style={cardIconStyle}>💇</div>
              <h3 style={cardTitleStyle}>Servicios de Barbería</h3>
              <p style={serviceDescStyle}>Un look fresco y moderno.</p>
              <button
                onClick={() => handleExploreServices("Barbería")}
                style={serviceButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3498db";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#3498db";
                }}
              >
                Ver opciones
              </button>
            </div>
          </div>
          
          {/* Segunda fila con 2 servicios */}
          <div style={servicesRowStyle}>
            <div style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div style={cardIconStyle}>👑</div>
              <h3 style={cardTitleStyle}>Servicios de Belleza</h3>
              <p style={serviceDescStyle}>Dale forma a tu vida.</p>
              <button
                onClick={() => handleExploreServices("Belleza")}
                style={serviceButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3498db";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#3498db";
                }}
              >
                Ver opciones
              </button>
            </div>

            <div style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div style={cardIconStyle}>💅</div>
              <h3 style={cardTitleStyle}>Servicios de Manos y Pies</h3>
              <p style={serviceDescStyle}>Piel suave y libre de imperfecciones.</p>
              <button
                onClick={() => handleExploreServices("Manos y Pies")}
                style={serviceButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3498db";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#3498db";
                }}
              >
                Ver opciones
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS Section */}
      <section ref={ref?.sobreNosotrosRef} style={{...sectionStyle, background: "#f8f9fa"}}>
        <div style={aboutContentStyle}>
          <div style={aboutTextStyle}>
            <h2 style={sectionTitleStyle}>Sobre Nosotros</h2>
            <p style={aboutDescriptionStyle}>
              En <strong style={{color: "#3498db"}}>Apolo Barber & Spa</strong> reinventamos el concepto de cuidado personal. 
              Nuestro espacio ha sido diseñado para ofrecer una experiencia única donde la belleza 
              y el bienestar se fusionan bajo el lema: <em>"Juventud, fuerza y estilo"</em>.
            </p>
            <p style={aboutDescriptionStyle}>
              Nos enorgullece ser un establecimiento donde cada cliente recibe atención personalizada de la más alta calidad. 
              Nuestro equipo de profesionales está comprometido con brindarte servicios excepcionales en un 
              ambiente relajante y sofisticado.
            </p>
            
            {/* Cuadrícula de características 2x2 */}
            <div style={featuresGridStyle}>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>⭐</span>
                <h4 style={featureTitleStyle}>Calidad Premium</h4>
                <p style={featureTextStyle}>Productos de primera calidad y técnicas avanzadas</p>
              </div>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>👥</span>
                <h4 style={featureTitleStyle}>Personal Experto</h4>
                <p style={featureTextStyle}>Profesionales certificados con años de experiencia</p>
              </div>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>🌿</span>
                <h4 style={featureTitleStyle}>Ambiente Único</h4>
                <p style={featureTextStyle}>Espacio diseñado para tu comodidad y relax</p>
              </div>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>⏰</span>
                <h4 style={featureTitleStyle}>Horarios Flexibles</h4>
                <p style={featureTextStyle}>Abiertos todos los días para tu conveniencia</p>
              </div>
            </div>
          </div>
          
          {/* Imagen a la derecha */}
          <div style={aboutImageStyle}>
            <div style={placeholderImageStyle}>
              <span style={{color: "#3498db", fontSize: "48px", marginBottom: "15px"}}>🏛️</span>
              <h3 style={{margin: "0 0 10px 0", color: "#2c3e50"}}>Nuestro Espacio</h3>
              <p style={{margin: 0, color: "#7f8c8d", textAlign: "center"}}>
                Un ambiente moderno y acogedor diseñado para tu máxima comodidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO Section */}
      <section ref={ref?.contactoRef} style={{...sectionStyle, background: "#ffffff"}}>
        <h2 style={sectionTitleStyle}>Contacto</h2>
        <div style={contactContainerStyle}>
          <div style={contactRowStyle}>
            <div style={contactCardStyle}>
              <div style={contactIconStyle}>📍</div>
              <h3 style={contactTitleStyle}>Ubicación</h3>
              <p style={contactTextStyle}>Calle Elegante 123, Ciudad</p>
              <p style={contactTextStyle}>Centro Comercial Moderno, Local 45</p>
            </div>
            
            <div style={contactCardStyle}>
              <div style={contactIconStyle}>📞</div>
              <h3 style={contactTitleStyle}>Teléfono</h3>
              <p style={contactTextStyle}>+34 123 456 789</p>
              <p style={contactTextStyle}>+34 987 654 321</p>
            </div>
            
            <div style={contactCardStyle}>
              <div style={contactIconStyle}>✉️</div>
              <h3 style={contactTitleStyle}>Email</h3>
              <p style={contactTextStyle}>info@apolobarber.com</p>
              <p style={contactTextStyle}>reservas@apolobarber.com</p>
            </div>
            
            <div style={contactCardStyle}>
              <div style={contactIconStyle}>🕒</div>
              <h3 style={contactTitleStyle}>Horario</h3>
              <p style={contactTextStyle}>Lunes a Viernes: 8:00 - 20:00</p>
              <p style={contactTextStyle}>Sábados: 10:00 - 18:00</p>
              <p style={contactTextStyle}>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        {/* Mapa de ubicación */}
        <div style={mapContainerStyle}>
          <div style={placeholderMapStyle}>
            <span style={{color: "#3498db", fontSize: "32px"}}>🗺️</span>
            <p style={{margin: "15px 0 0 0", color: "#7f8c8d"}}>Mapa de ubicación</p>
            <p style={{margin: "5px 0 0 0", color: "#bdc3c7", fontSize: "12px"}}>
              Estamos ubicados en el corazón de la ciudad
            </p>
          </div>
        </div>
      </section>

      {/* OPINIONES Section */}
      <section ref={ref?.opinionesRef} style={{...sectionStyle, background: "#f8f9fa"}}>
        <h2 style={sectionTitleStyle}>Opiniones de Clientes</h2>
        <div style={reviewsGridStyle}>
          <div style={reviewCardStyle}>
            <div style={reviewHeaderStyle}>
              <span style={reviewNameStyle}>Carlos M.</span>
              <span style={reviewRatingStyle}>★★★★★</span>
            </div>
            <p style={reviewTextStyle}>
              "El mejor servicio de barbería que he experimentado. Atención excepcional y resultados increíbles."
            </p>
          </div>
          
          <div style={reviewCardStyle}>
            <div style={reviewHeaderStyle}>
              <span style={reviewNameStyle}>Elena R.</span>
              <span style={reviewRatingStyle}>★★★★★</span>
            </div>
            <p style={reviewTextStyle}>
              "Me enanta!!! El trato es excelente y siempre salgo sintiéndome renovada."
            </p>
          </div>
          
          <div style={reviewCardStyle}>
            <div style={reviewHeaderStyle}>
              <span style={reviewNameStyle}>Javier L.</span>
              <span style={reviewRatingStyle}>★★★★☆</span>
            </div>
            <p style={reviewTextStyle}>
              "Buenísimo servicio. El ambiente es relajante y los profesionales saben exactamente lo que necesitas."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

// Estilos
const containerStyle = {
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: "#2c3e50",
};

const heroStyle = {
  background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "100px 20px 60px",
  color: "white",
};

const logoContainerStyle = {
  marginBottom: "20px"
};

const heroContentStyle = {
  maxWidth: "800px"
};

const heroTitleStyle = {
  fontSize: "3.5rem",
  fontWeight: 700,
  margin: "0 0 10px 0",
  color: "white",
  letterSpacing: "1px"
};

const heroSloganStyle = {
  fontSize: "1.4rem",
  fontWeight: 300,
  margin: "0 0 30px 0",
  color: "rgba(255,255,255,0.9)",
  fontStyle: "italic"
};

const heroSubtitleStyle = {
  fontSize: "1.3rem",
  fontWeight: 300,
  margin: "0 0 50px 0",
  color: "rgba(255,255,255,0.9)",
  lineHeight: "1.6"
};

const buttonContainerStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap"
};

const reservaButtonStyle = {
  background: "white",
  color: "#3498db",
  border: "none",
  padding: "18px 45px",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "16px",
  transition: "all 0.3s ease",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const sectionStyle = {
  padding: "80px 40px",
  background: "#ffffff",
};

const sectionTitleStyle = {
  textAlign: "center",
  fontSize: "2.8rem",
  fontWeight: 300,
  margin: "0 极 60px 0",
  color: "#2c3e50"
};

const servicesContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto"
};

const servicesRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginBottom: "30px",
  flexWrap: "wrap"
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "30px 25px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  border: "1px solid #ecf0f1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  textAlign: "center",
  width: "300px",
  minHeight: "280px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const cardIconStyle = {
  fontSize: "48px",
  marginBottom: "15px"
};

const cardTitleStyle = {
  fontSize: "1.5rem",
  fontWeight: 600,
  margin: "0 0 15px 0",
  color: "#3498db"
};

const serviceDescStyle = {
  color: "#7f8c8d",
  fontSize: "14px",
  lineHeight: "1.5",
  marginBottom: "20px",
  flexGrow: 1
};

const serviceButtonStyle = {
  background: "transparent",
  color: "#3498db",
  border: "1px solid #3498db",
  padding: "10px 20px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "all 0.3s ease",
  marginTop: "15px"
};

// Estilos para la sección Sobre Nosotros
const aboutContentStyle = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: "60px",
  maxWidth: "1200px",
  margin: "0 auto",
  alignItems: "start",
};

const aboutTextStyle = {
  paddingRight: "20px"
};

const aboutDescriptionStyle = {
  fontSize: "1.2rem",
  lineHeight: "1.8",
  color: "#7f8c8d",
  marginBottom: "30px"
};

// Estilos para la cuadrícula de características
const featuresGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginTop: "30px"
};

const featureItemStyle = {
  background: "#ffffff",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "140px"
};

const featureIconStyle = {
  fontSize: "32px",
  marginBottom: "15px",
  display: "block"
};

const featureTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: 600,
  margin: "0 0 10px 0",
  color: "#2c3e50"
};

const featureTextStyle = {
  fontSize: "0.9rem",
  color: "#7f8c8d",
  margin: 0,
  lineHeight: "1.5"
};

const aboutImageStyle = {
  textAlign: "center"
};

const placeholderImageStyle = {
  width: "100%",
  height: "400px",
  background: "linear-gradient(135deg, #eef5ff 0%, #d6e4ff 100%)",
  borderRadius: "15px",
  display: "极",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#3498db",
  border: "2px dashed #3498db",
  padding: "30px"
};

const contactContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 50px"
};

const contactRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap"
};

const contactCardStyle = {
  background: "#ffffff",
  padding: "25px 20px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid #e9ecef",
  transition: "transform 0.3s ease",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  width: "250px",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const contactIconStyle = {
  fontSize: "32px",
  marginBottom: "15px",
  display: "block"
};

const contactTitleStyle = {
  fontSize: "1.2rem",
  fontWeight: 600,
  margin: "0 0 15px 0",
  color: "#3498db"
};

const contactTextStyle = {
  margin: "8px 0",
  color: "#7f8c8d",
  fontSize: "极px"
};

const mapContainerStyle = {
  maxWidth: "800px",
  margin: "0 auto"
};

const placeholderMapStyle = {
  width: "极%",
  height: "300px",
  background: "#eef5ff",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#3498db",
  border: "2px dashed #3498db"
};

const reviewsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  maxWidth: "1300px",
  margin: "0 auto"
};

const reviewCardStyle = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid #ecf0f1"
};

const reviewHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const reviewNameStyle = {
  fontWeight: 600,
  color: "#2c3e50",
  fontSize: "16px"
};

const reviewRatingStyle = {
  color: "#f39c12",
  fontSize: "1.2rem"
};

const reviewTextStyle = {
  color: "#7f8c8d",
  lineHeight: "1.6",
  fontStyle: "italic",
  margin: 0,
  fontSize: "15px"
};

// Nuevos estilos para la vista de servicios
const servicesHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "40px 40px 20px",
  background: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const servicesTitleStyle = {
  fontSize: "2.5rem",
  fontWeight: 300,
  margin: 0,
  color: "#2c3e50",
  textAlign: "center",
  flex: 1
};

const backButtonStyle = {
  background: "transparent",
  color: "#3498db",
  border: "2px solid #3498db",
  padding: "12px 25px",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const servicesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "30px",
  padding: "40px",
  maxWidth: "1400px",
  margin: "0 auto",
};

const serviceCardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  border: "1px solid #ecf0f1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "280px"
};

const serviceIconStyle = {
  fontSize: "48px",
  marginBottom: "15px"
};

const serviceNameStyle = {
  fontSize: "1.2rem",
  fontWeight: 600,
  margin: "0 0 15px 0",
  color: "#2c3e50"
};

const serviceDescriptionStyle = {
  color: "#7f8c8d",
  marginBottom: "15px",
  lineHeight: "1.5",
  fontSize: "0.95rem",
};

const serviceDetailStyle = {
  color: "#34495e",
  marginBottom: "8px",
  fontSize: "0.9rem",
};

const serviceBenefitsStyle = {
  color: "#27ae60",
  fontWeight: "500",
  marginTop: "15px",
  fontSize: "0.9rem",
  fontStyle: "italic",
};

export default Home;