import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useHistorialmedic } from '../../context/Historialmedic';

const Actualizarhistorial = () => {
  const { logout } = useAuth();
  const { historials, getshistorial } = useHistorialmedic();

  const [editing, setEditing] = useState(false);
  const [selectedHistorial, setSelectedHistorial] = useState({});

  useEffect(() => {
    getshistorial();
  }, []);

  const handleUpdateClick = (historial) => {
    setEditing(true);
    setSelectedHistorial(historial);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de actualización del historial en función de los valores del formulario
    // Puedes acceder a los valores utilizando el estado selectedHistorial
  };

  return (
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
          {!editing ? (
            <>
              <h2>Historial clínico</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nombre del paciente</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Tipo de Sangre</th>
                    <th>Régimen</th>
                    <th>Archivo del paciente</th>
                    <th>Acciones</th>
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
                      <td>
                        <button onClick={() => handleUpdateClick(historial)}>
                          Actualizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Actualizar Historial</h2>
              <div className="input-container">
                <label htmlFor="nombrePacienteField">Nombre del paciente:</label>
                <input
                  type="text"
                  id="nombrePacienteField"
                  value={selectedHistorial.Paciente?.usuario || ''}
                  placeholder="Nombre del paciente"
                />
              </div>
              <div className="input-container">
                <label htmlFor="edadPacienteField">Edad del paciente:</label>
                <input
                  type="number"
                  id="edadPacienteField"
                  value={selectedHistorial.edadPaciente || ''}
                  placeholder="Edad del paciente"
                />
              </div>
              <div className="input-container">
                <label htmlFor="generoPacienteField">Género del paciente:</label>
                <input
                  type="text"
                  id="generoPacienteField"
                  value={selectedHistorial.generoPaciente || ''}
                  placeholder="Género del paciente"
                />
              </div>
              <div className="input-container">
                <label htmlFor="tipoSangreField">Tipo de sangre:</label>
                <input
                  type="text"
                  id="tipoSangreField"
                  value={selectedHistorial.tipoSangrePaciente || ''}
                  placeholder="Tipo de sangre"
                />
              </div>
              <div className="input-container">
                <label htmlFor="regimenPacienteField">Régimen del paciente:</label>
                <input
                  type="text"
                  id="regimenPacienteField"
                  value={selectedHistorial.regimenPaciente || ''}
                  placeholder="Régimen del paciente"
                />
              </div>
              <div className="input-container">
                <label htmlFor="archivoFieldField">Archivo del paciente:</label>
                <input
                  type="text"
                  id="archivoField"
                  value={selectedHistorial.archivo || ''}
                  placeholder="Archivo del paciente"
                />
              </div>
              <button type="submit">Actualizar Historial</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default Actualizarhistorial;
