import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/homestyle.css';
import {useAuth} from '../../context/AuthContext';
const Home = () => {
  const {isAuthenticated,user, logout} = useAuth();

  return (
    <body>
      <div className='corner-image2'></div>
        <div className="homepage-container">
          <header className="toolbar">
            <div className="logo">
              HONDA <span className="welcome-message">Bienvenido {user.usuario}</span>
            </div>
            <div className="user-info">
              <Link to="/Login" onClick={()=>{logout();}}><button>Cerrar sesión</button></Link>
            </div>
          </header>
          <div className="options">
            <Link to="/Homeadministrador/Administradorusuario">Administrador de usuarios</Link>
          </div>
          <div className="content">
            <h1>Página de Inicio</h1>
          </div>
          <footer className="footer">
            <p>© 2023 Honda. Todos los derechos reservados.</p>
          </footer>
        </div>
    </body>
  );
};

export default Home;