import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Utils/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>
        {/* No utilizamos collapse para mantener los elementos visibles */}
        <div className="navbar-nav ms-auto d-flex flex-row">
          {currentUser ? (
            <>
              <span className="navbar-text me-3">
                Bienvenido, {currentUser.nombre}
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn btn-outline-success">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
