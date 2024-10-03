// frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/dashboard');
            })
            .catch(() => {});
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <Button type="submit" className="w-full">
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
            </form>
        </div>
    );
};

export default Login;
