// frontend/src/components/UI/Input.jsx
import React from 'react';

const Input = ({ type = 'text', name, placeholder, value, onChange, className = '' }) => {
    return (
        <input
            type={type}
            name={name} // Añadir esta línea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 ${className}`}
        />
    );
};

export default Input;
