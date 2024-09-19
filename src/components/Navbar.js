// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar los tokens almacenados en localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isAuthenticated');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');

    // Recargar la página para aplicar los cambios
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">LogoGenerico</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mascotas">Mascotas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Clientes">Clientes</Link>
            </li>
            {/* Botón para cerrar sesión */}
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

