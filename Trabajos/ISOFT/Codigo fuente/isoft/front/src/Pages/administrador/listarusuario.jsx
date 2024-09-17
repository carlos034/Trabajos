import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEye} from 'react-icons/ai';
import '../../css/homestyle.css';
import {useAuth} from '../../context/AuthContext';
import { useGestionar } from '../../context/Gestionaruser';
import { useEffect } from 'react';

const Listar = () => {
  const {logout} = useAuth();
  const{getUsers,users} =useGestionar();

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <body>
      <div className="homepage-container">
        <header className="toolbar">
          <div className="logo">
            HONDA 
          </div>
          <div className="user-info">
            <Link to="/login"onClick={()=>{logout();}} >
              <button>Cerrar sesión</button>
            </Link>
          </div>
        </header>
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
          <li className="menu-item active">
          <Link to="/Homeadministrador/Administradorusuario/Listarusuario"><AiOutlineEye className="menu-icon" />
            <span className="menu-text">Listar usuario</span></Link>
          </li>
        </ul>
      </aside>
      <main className="content2">
  <h1>Usuarios del sistema</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Correo electrónico</th>
        <th>Rol</th>
      </tr>
    </thead>
    <tbody>
    {users.map((usuario) => (
  <tr key={usuario.id}>
    <td>{usuario.usuario}</td>
    <td>{usuario.email}</td>
    <td>{usuario.tipo_usuario}</td>
  </tr>
                ))}
              </tbody>
  </table>
</main>

    </div>
      </div>
    </body>
  );
};
  
export default Listar