import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useGestionarcita } from '../../context/GestionarCita';

const Cancelar = () => {
  const { logout, user } = useAuth();
  const { deletecita, citas, getCitas } = useGestionarcita(); 


  useEffect(() => {
    getCitas();
  }, []);

  return (
    <body>
      <div className="homepage-container">
        <header className="toolbar">
          <div className="logo">
            HONDA 
          </div>
          <div className="user-info">
            <Link to="/login"onClick={()=>{logout();}}>
              <button>Cerrar sesión</button>
            </Link>
          </div>
        </header>
        <div className="dashboard-container">
          <aside className="sidebar">
            <ul className="menu">
              <li className="menu-item">
                <Link to="/Homepaciente">
                  <AiOutlineHome className="menu-icon" />
                  <span className="menu-text">Inicio</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Homepaciente/Gestionarcita/Crear">
                  <AiOutlinePlusCircle className="menu-icon" />
                  <span className="menu-text">Crear cita</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Homepaciente/Gestionarcita/Modificar">
                  <AiOutlineEdit className="menu-icon" />
                  <span className="menu-text">Modificar cita</span>
                </Link>
              </li>
              <li className="menu-item active">
                <Link to="/Homepaciente/Gestionarcita/Cancelar">
                  <AiOutlineDelete className="menu-icon" />
                  <span className="menu-text">Cancelar cita</span>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="content2">
            <h2>Citas Médicas</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre del doctor</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas &&
                  citas.map((cita) => (
                    <tr key={cita.id}>
                      <td>{cita.doctor.usuario}</td>
                      <td>{cita.date}</td>
                      <td>{cita.motivo}</td>
                      <td>
                      <button onClick={() => deletecita(cita._id)}>Cancelar</button>
                    </td>
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

export default Cancelar;
