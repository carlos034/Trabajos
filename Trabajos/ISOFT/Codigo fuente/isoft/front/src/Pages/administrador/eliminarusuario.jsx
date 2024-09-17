import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEye} from 'react-icons/ai';
import '../../css/homestyle.css';
import {useAuth} from '../../context/AuthContext';
import { useGestionar } from '../../context/Gestionaruser';

const Eliminar = () => {
  const { logout } = useAuth();
  const { users, deleteUser } = useGestionar();


  return (
    <body>
      <div className="homepage-container">
        <header className="toolbar">
          <div className="logo">HONDA</div>
          <div className="user-info">
            <Link to="/login" onClick={() => { logout(); }}>
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
              <li className="menu-item active">
                <Link to="/Homeadministrador/Administradorusuario/Eliminarusuario"><AiOutlineDelete className="menu-icon" />
                  <span className="menu-text">Eliminar usuario</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Homeadministrador/Administradorusuario/Listarusuario"><AiOutlineEye className="menu-icon" />
                  <span className="menu-text">Listar usuario</span>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="content2">
            <div className="form-container">
              <h2>Eliminar usuario</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nombre del usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.usuario}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.tipo_usuario}</td>
                      <td>
                        <button type="button" onClick={() => deleteUser(usuario._id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </body>
  );
};
export default Eliminar