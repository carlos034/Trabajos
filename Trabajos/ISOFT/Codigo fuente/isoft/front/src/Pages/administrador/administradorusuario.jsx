import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEye} from 'react-icons/ai';
import '../../css/homestyle.css';
import {useAuth} from '../../context/AuthContext';

const Administradorusuario = () => {
  const {logout} = useAuth();

  return (
    <body>
      <div className="homepage-container">
        <header className="toolbar">
          <div className="logo">
            HONDA 
          </div>
          <div className="user-info">
            <Link to="/login" onClick={()=>{logout();}}>
              <button>Cerrar sesión</button>
            </Link>
          </div>
        </header>
      </div>
      <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="menu">
          <li className="menu-item">
          <Link to="/Homeadministrador"><AiOutlineHome className="menu-icon" />
            <span className="menu-text">Inicio</span>
          </Link>
          </li>
          <li className="menu-item">
          <Link to="/Homeadministrador/Administradorusuario/Eliminarusuario"><AiOutlineDelete className="menu-icon" />
            <span className="menu-text">Eliminar usuario</span>
          </Link>
          </li>
          <li className="menu-item">
          <Link to="/Homeadministrador/Administradorusuario/Listarusuario"><AiOutlineEye className="menu-icon" />
            <span className="menu-text">Listar usuario</span></Link>
          </li>
        </ul>
      </aside>
      <main className="content2">
      </main>
    </div>
    </body>
  );
};
  
  export default Administradorusuario;

