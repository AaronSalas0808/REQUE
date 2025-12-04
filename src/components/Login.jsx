// components/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente validarías con el backend
    onLogin(formData.userType || 'general');
    alert(`¡${isLogin ? 'Inicio de sesión' : 'Registro'} exitoso!`);
  };

  const handleDemoLogin = (role) => {
    onLogin(role);
    alert(`Sesión demo iniciada como ${role === 'admin' ? 'Administrador' : role === 'company' ? 'Empresa Recicladora' : 'Usuario General'}`);
  };

  return (
    <div className="login">
      <div className="card">
        <h2 className="card-title">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        
        <div className="demo-login">
          <p>Iniciar sesión de demostración:</p>
          <div className="demo-buttons">
            <button 
              className="btn btn-secondary"
              onClick={() => handleDemoLogin('general')}
            >
              👤 Usuario General
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleDemoLogin('company')}
            >
              🏭 Empresa Recicladora
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleDemoLogin('admin')}
            >
              ⚙️ Administrador
            </button>
          </div>
        </div>
        
        <div className="login-divider">
          <span>o</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <p className="password-requirements">
              Mínimo 8 caracteres, incluir mayúscula, minúscula, número y símbolo
            </p>
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Tipo de cuenta</label>
              <div className="account-type">
                <label className="account-option">
                  <input
                    type="radio"
                    name="userType"
                    value="general"
                    checked={formData.userType === 'general'}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  />
                  <div className="account-card">
                    <div className="account-icon">👤</div>
                    <div>
                      <h5>Usuario General</h5>
                      <p>Para familias y personas que reciclan</p>
                    </div>
                  </div>
                </label>
                
                <label className="account-option">
                  <input
                    type="radio"
                    name="userType"
                    value="company"
                    checked={formData.userType === 'company'}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  />
                  <div className="account-card">
                    <div className="account-icon">🏭</div>
                    <div>
                      <h5>Empresa Recicladora</h5>
                      <p>Para centros de reciclaje y empresas</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}
          
          {isLogin && (
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Recordar sesión</span>
              </label>
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button 
              className="switch-mode"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? ' Regístrate aquí' : ' Inicia sesión aquí'}
            </button>
          </p>
          
          <div className="login-security">
            <p>🔒 Tu información está protegida con cifrado SSL/TLS</p>
            <p>🔐 Autenticación segura de dos factores disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;