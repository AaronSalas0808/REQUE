// src/components/CommonInputs.jsx
import React, { useState } from 'react';

export const TextInput = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="form-field">
    {label && <label>{label}:</label>} {/* Solo renderiza el label si se proporciona */}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

export const TextAreaInput = ({ label, value, onChange, placeholder }) => (
  <div className="form-field">
    {label && <label>{label}:</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows="4" />
  </div>
);

export const NumberInput = ({ label, value, onChange, min = 0, max }) => (
  <div className="form-field">
    {label && <label>{label}:</label>}
    <input type="number" value={value} onChange={onChange} min={min} max={max} />
  </div>
);

export const SelectInput = ({ label, value, options, onChange }) => (
  <div className="form-field">
    {label && <label>{label}:</label>}
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const TagsInput = ({ label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className="form-field">
      {label && <label>{label}:</label>}
      <div className="tags-input-container">
        {value.map((tag) => (
          <span key={tag} className="tag">
            {tag}{' '}
            <button
              onClick={() => handleRemoveTag(tag)}
            >
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          placeholder={placeholder}
          className="tags-input-inner"
        />
        <button onClick={handleAddTag} className="button success-button">Añadir</button>
      </div>
    </div>
  );
};

export const ImageUpload = ({ label, images, onImagesChange, multiple = false }) => (
  <div className="form-field">
    {label && <label>{label}:</label>}
    <input
      type="file"
      accept="image/*"
      multiple={multiple}
      onChange={(e) => {
        console.log('Simulación: Archivos seleccionados para subir:', e.target.files);
        onImagesChange([
          ...images,
          `https://source.unsplash.com/random/140x100?nature,${images.length + 1}`, // Usando Unsplash para imágenes más variadas
        ]);
      }}
    />
    <div className="image-previews">
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={`Previsualización ${index + 1}`}
          className="image-preview"
        />
      ))}
    </div>
  </div>
);

export const AudienceSelector = ({ selectedAudiences, onSelectionChange, availableAudiences }) => (
  <div className="audience-selector">
    {availableAudiences.map((audience) => (
      <label key={audience.id}>
        <input
          type="checkbox"
          checked={selectedAudiences.includes(audience.id)}
          onChange={(e) => {
            console.log(`Selección de público '${audience.name}': ${e.target.checked}`);
            if (e.target.checked) {
              onSelectionChange([...selectedAudiences, audience.id]);
            } else {
              onSelectionChange(selectedAudiences.filter((id) => id !== audience.id));
            }
          }}
        />{' '}
        {audience.name}
      </label>
    ))}
  </div>
);