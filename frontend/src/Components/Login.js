import React, { useState } from 'react';
import AuthService from '../Utils/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password);
      /* alert("Inicio Exitoso") */
      navigate('/'); // Cambia esto a la ruta de tu perfil o dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    
    <div className="container mb-3">
      <br/>
      <form onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" placeholder="" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="email" className="form-label" for="floatingInput">Correo</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="password" className="form-label">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;