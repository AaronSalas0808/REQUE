import React, { forwardRef } from "react";

const Home = forwardRef(({ onExploreServices, onReservaClick }, ref) => {
  const handleReservaClick = () => {
    // Redirigir al inicio de sesión
    window.location.href = "#login";
    if (onReservaClick) onReservaClick();
  };

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
              <h3 style={cardTitleStyle}>Masaje</h3>
              <p style={serviceDescStyle}>Relájate con un masaje terapéutico.</p>
              <button
                onClick={onExploreServices}
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
              <div style={cardIconStyle}>✂️</div>
              <h3 style={cardTitleStyle}>Corte de Pelo</h3>
              <p style={serviceDescStyle}>Un look fresco y moderno.</p>
              <button
                onClick={onExploreServices}
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
              <div style={cardIconStyle}>🧔</div>
              <h3 style={cardTitleStyle}>Corte de Barba</h3>
              <p style={serviceDescStyle}>Define tu estilo con precisión.</p>
              <button
                onClick={onExploreServices}
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
              <div style={cardIconStyle}>👁️</div>
              <h3 style={cardTitleStyle}>Corte de Cejas</h3>
              <p style={serviceDescStyle}>Dale forma a tu mirada.</p>
              <button
                onClick={onExploreServices}
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
              <div style={cardIconStyle}>✨</div>
              <h3 style={cardTitleStyle}>Depilación</h3>
              <p style={serviceDescStyle}>Piel suave y libre de vello.</p>
              <button
                onClick={onExploreServices}
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
              <div style={cardIconStyle}>🧴</div>
              <h3 style={cardTitleStyle}>Tratamientos</h3>
              <p style={serviceDescStyle}>Cuidado especializado.</p>
              <button
                onClick={onExploreServices}
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
              Nos enorgullece ser un establecimiento <strong>completamente unisex</strong>, donde 
              cada cliente recibe atención personalizada de la más alta calidad. Nuestro equipo 
              de profesionales está comprometido con brindarte servicios excepcionales en un 
              ambiente relajante y sofisticado.
            </p>
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
            </div>
          </div>
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
              <p style={contactTextStyle}>Lunes a Viernes: 9:00 - 20:00</p>
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
              "Me encanta que sea un espacio unisex. El trato es excelente y siempre salgo sintiéndome renovada."
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
  margin: "0 0 60px 0",
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

const aboutContentStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  maxWidth: "1200px",
  margin: "0 auto",
  alignItems: "center",
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

const featuresGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "25px",
  marginTop: "40px"
};

const featureItemStyle = {
  textAlign: "center",
  padding: "20px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
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
  display: "flex",
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
  fontSize: "14px"
};

const mapContainerStyle = {
  maxWidth: "800px",
  margin: "0 auto"
};

const placeholderMapStyle = {
  width: "100%",
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

export default Home;