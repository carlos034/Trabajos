import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useGestionarcitadoc } from '../../context/Gestionarcitadoc';

const Gestionarplanilla = () => {
  const { logout } = useAuth();
  const { citas, getCitas } = useGestionarcitadoc();

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <div className="homepage-container">
      <header className="toolbar">
        <div className="logo">HONDA</div>
        <div className="user-info">
          <Link to="/login" onClick={logout}>
            <button>Cerrar sesión</button>
          </Link>
        </div>
      </header>
      <div className="dashboard-container">
        <aside className="sidebar">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/Homedoctor">
                <AiOutlineHome className="menu-icon" />
                <span className="menu-text">Inicio</span>
              </Link>
            </li>
          </ul>
        </aside>
        <main className="content2">
          <h2 className="table-title">Pacientes asociados al doctor</h2>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Nombre del Paciente</th>
              </tr>
            </thead>
            <tbody>
              {citas &&
                citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.paciente.usuario}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Gestionarplanilla;
