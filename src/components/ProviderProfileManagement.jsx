// src/components/ProviderProfileManagement.jsx
import React, { useState, useEffect } from 'react';
import { TextInput, TextAreaInput, ImageUpload, SelectInput, NumberInput } from './CommonInputs';

const ProviderProfileManagement = ({ providerId = 'mockProvider123' }) => {
  const [providerProfile, setProviderProfile] = useState({
    id: providerId,
    companyName: 'Aventura Total S.A.',
    contactPerson: 'Juan Pérez',
    email: 'contacto@aventuratotal.com',
    phone: '+506 8888-9999',
    address: '100m Este del Parque Central, La Fortuna',
    description: 'Empresa líder en turismo de aventura con más de 10 años de experiencia en Costa Rica. Ofrecemos experiencias inolvidables con seguridad y calidad.',
    logo: 'https://source.unsplash.com/random/150x80?logo,adventure',
    galleryImages: ['https://source.unsplash.com/random/200x150?costarica,1', 'https://source.unsplash.com/random/200x150?costarica,2'],
    servicesOffered: [
      {
        id: 'serv001',
        name: 'Tour de Canopy Extremo',
        description: 'Vuela entre los árboles con nuestras 7 líneas de canopy, incluyendo la más larga de la región (1km).',
        category: 'Actividad de Aventura',
        priceType: 'Por Persona',
        basePrice: 60,
        conditions: 'Edad mínima 10 años. Peso máximo 110kg. No apto para embarazadas.',
        availability: 'Todos los días 8am, 10am, 1pm, 3pm.',
        serviceImages: ['https://source.unsplash.com/random/200x150?canopy,zipline', 'https://source.unsplash.com/random/200x150?canopy,forest'],
      },
      {
        id: 'serv002',
        name: 'Rappel en Cascadas',
        description: 'Experimenta la adrenalina descendiendo 3 cascadas impresionantes con guías certificados.',
        category: 'Actividad de Aventura',
        priceType: 'Por Persona',
        basePrice: 85,
        conditions: 'Mayores de 15 años. Se requiere experiencia previa. Incluye equipo de seguridad.',
        availability: 'Martes y Jueves 9am.',
        serviceImages: ['https://source.unsplash.com/random/200x150?waterfall,rappel'],
      },
    ],
  });

  const [newService, setNewService] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    priceType: 'Por Persona',
    basePrice: 0,
    conditions: '',
    availability: '', // Podría ser un calendario más complejo
    serviceImages: [],
  });

  const handleProfileChange = (field, value) => {
    setProviderProfile((prev) => ({ ...prev, [field]: value }));
    console.log(`Perfil actualizado: ${field} -> ${value}`);
  };

  const handleSaveProfile = () => {
    alert('Simulación: Perfil de proveedor guardado!');
    console.log('Perfil de proveedor guardado:', providerProfile);
    // Aquí se enviaría `providerProfile` a un API
  };

  const handleAddService = () => {
    if (newService.name.trim()) {
      const serviceToAdd = { ...newService, id: `serv${Date.now()}` };
      setProviderProfile((prev) => ({
        ...prev,
        servicesOffered: [...prev.servicesOffered, serviceToAdd],
      }));
      setNewService({
        id: null, name: '', description: '', category: '',
        priceType: 'Por Persona', basePrice: 0, conditions: '', availability: '', serviceImages: []
      });
      alert(`Simulación: Servicio "${serviceToAdd.name}" añadido!`);
      console.log('Nuevo servicio añadido:', serviceToAdd);
    } else {
      alert('Por favor, ingresa el nombre del servicio.');
    }
  };

  const handleUpdateService = (id, field, value) => {
    setProviderProfile((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
    console.log(`Servicio ${id} actualizado: ${field} -> ${value}`);
  };

  const handleRemoveService = (id) => {
    const serviceName = providerProfile.servicesOffered.find(s => s.id === id)?.name;
    if (window.confirm(`¿Estás seguro de que quieres eliminar el servicio "${serviceName}"?`)) {
      setProviderProfile((prev) => ({
        ...prev,
        servicesOffered: prev.servicesOffered.filter((s) => s.id !== id),
      }));
      alert(`Simulación: Servicio "${serviceName}" eliminado.`);
      console.log(`Servicio ${id} eliminado.`);
    }
  };

  return (
    <div className="page-container">
      <h2>Módulo de Proveedores - Gestión de Perfil y Servicios</h2>

      <section className="section-card">
        <h3>Información del Perfil del Proveedor</h3>
        <TextInput
          label="Nombre de la Empresa"
          value={providerProfile.companyName}
          onChange={(e) => handleProfileChange('companyName', e.target.value)}
        />
        <TextInput
          label="Persona de Contacto"
          value={providerProfile.contactPerson}
          onChange={(e) => handleProfileChange('contactPerson', e.target.value)}
        />
        <TextInput
          label="Email de Contacto"
          type="email"
          value={providerProfile.email}
          onChange={(e) => handleProfileChange('email', e.target.value)}
        />
        <TextInput
          label="Teléfono"
          value={providerProfile.phone}
          onChange={(e) => handleProfileChange('phone', e.target.value)}
        />
        <TextInput
          label="Dirección Física"
          value={providerProfile.address}
          onChange={(e) => handleProfileChange('address', e.target.value)}
        />
        <TextAreaInput
          label="Descripción de la Empresa"
          value={providerProfile.description}
          onChange={(e) => handleProfileChange('description', e.target.value)}
        />
        <ImageUpload
          label="Logo de la Empresa"
          images={providerProfile.logo ? [providerProfile.logo] : []}
          onImagesChange={(newImages) => handleProfileChange('logo', newImages[0] || '')}
          multiple={false}
        />
        <ImageUpload
          label="Galería de Imágenes de la Empresa"
          images={providerProfile.galleryImages}
          onImagesChange={(newImages) => handleProfileChange('galleryImages', newImages)}
          multiple={true}
        />
        <div className="action-buttons">
          <button onClick={handleSaveProfile} className="button primary-button">
            Guardar Perfil
          </button>
        </div>
      </section>

      <section className="section-card">
        <h3>Catálogo de Servicios Ofrecidos</h3>

        {providerProfile.servicesOffered.map((service) => (
          <div key={service.id} className="provider-service-item">
            <h4>{service.name}</h4>
            <TextInput
              label="Nombre del Servicio"
              value={service.name}
              onChange={(e) => handleUpdateService(service.id, 'name', e.target.value)}
            />
            <TextAreaInput
              label="Descripción Detallada"
              value={service.description}
              onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
            />
            <TextInput
              label="Categoría"
              value={service.category}
              onChange={(e) => handleUpdateService(service.id, 'category', e.target.value)}
              placeholder="Ej: Actividad de Aventura, Transporte, Alojamiento"
            />
            <SelectInput
              label="Tipo de Tarifa"
              value={service.priceType}
              options={[
                { value: 'Por Persona', label: 'Por Persona' },
                { value: 'Por Grupo', label: 'Por Grupo' },
                { value: 'Por Hora', label: 'Por Hora' },
              ]}
              onChange={(e) => handleUpdateService(service.id, 'priceType', e.target.value)}
            />
            <NumberInput
              label="Precio Base"
              value={service.basePrice}
              onChange={(e) => handleUpdateService(service.id, 'basePrice', parseFloat(e.target.value) || 0)}
              min={0}
            />
            <TextAreaInput
              label="Condiciones y Requisitos"
              value={service.conditions}
              onChange={(e) => handleUpdateService(service.id, 'conditions', e.target.value)}
              placeholder="Ej: Edad mínima, equipo requerido, restricciones médicas."
            />
            <TextAreaInput
              label="Disponibilidad / Calendario"
              value={service.availability}
              onChange={(e) => handleUpdateService(service.id, 'availability', e.target.value)}
              placeholder="Ej: Lunes a Viernes 8am-5pm. Requiere reserva con 24h de antelación."
            />
            <ImageUpload
              label="Imágenes del Servicio"
              images={service.serviceImages}
              onImagesChange={(newImages) => handleUpdateService(service.id, 'serviceImages', newImages)}
              multiple={true}
            />
            <div className="provider-service-actions">
              <button onClick={() => alert('Simulación: Guardar cambios del servicio')} className="button primary-button">
                Guardar Cambios
              </button>
              <button onClick={() => handleRemoveService(service.id)} className="button danger-button">
                Eliminar Servicio
              </button>
            </div>
          </div>
        ))}

        <h4 style={{ marginTop: '40px' }}>Añadir Nuevo Servicio</h4>
        <div className="new-service-form">
          <TextInput
            label="Nombre del Nuevo Servicio"
            value={newService.name}
            onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: Alquiler de Kayaks"
          />
          <TextAreaInput
            label="Descripción"
            value={newService.description}
            onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
          />
          <TextInput
              label="Categoría"
              value={newService.category}
              onChange={(e) => setNewService((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Ej: Actividad Acuática"
          />
          <NumberInput
              label="Precio Base"
              value={newService.basePrice}
              onChange={(e) => setNewService((prev) => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 }))}
              min={0}
          />
          <div className="action-buttons" style={{ textAlign: 'left', marginTop: '15px' }}>
            <button onClick={handleAddService} className="button success-button">
              Añadir Servicio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderProfileManagement;