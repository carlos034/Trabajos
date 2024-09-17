import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useHistorialmedic } from '../../context/Historialmedic';

const Consultarhistorial = () => {
  const { logout } = useAuth();
  const { historials, getshistorial } = useHistorialmedic();

  useEffect(() => {
    getshistorial();
  }, []);

  return (
    <body>
      <div className="homepage-container">
        <header className="toolbar">
          <div className="logo">HONDA</div>
          <div className="user-info">
            <Link to="/login" onClick={() => logout()}>
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
            <h2>Historial clinico</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre del paciente</th>
                  <th>Edad</th>
                  <th>Género</th>
                  <th>Tipo de Sangre</th>
                  <th>Régimen</th>
                  <th>Archivo del paciente</th>
                </tr>
              </thead>
              <tbody>
                {historials.map((historial) => (
                  <tr key={historial.id}>
                    <td>{historial.Paciente.usuario}</td>
                    <td>{historial.edadPaciente}</td>
                    <td>{historial.generoPaciente}</td>
                    <td>{historial.tipoSangrePaciente}</td>
                    <td>{historial.regimenPaciente}</td>
                    <td>{historial.archivo}</td>
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

export default Consultarhistorial;

