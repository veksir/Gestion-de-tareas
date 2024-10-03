// frontend/src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Button from '../UI/Button';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <Link to="/" className="text-white text-xl font-bold">Task Manager</Link>
            <div>
                {userInfo ? (
                    <>
                        <span className="text-white mr-4">Hola, {userInfo.nombre}</span>
                        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Cerrar Sesión</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white mr-4">Iniciar Sesión</Link>
                        <Link to="/register" className="text-white">Registrar</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
