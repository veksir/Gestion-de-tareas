// frontend/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl mb-4">404 - Página No Encontrada</h1>
            <Link to="/" className="text-blue-500 underline">Volver al Inicio</Link>
        </div>
    );
};

export default NotFound;
