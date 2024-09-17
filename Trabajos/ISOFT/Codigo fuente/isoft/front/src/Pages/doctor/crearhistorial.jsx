import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useHistorialmedic } from '../../context/Historialmedic';

const Crearhistorial = () => {
  const { logout } = useAuth();
  const { createhistorial } = useHistorialmedic();

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [edadPaciente, setEdadPaciente] = useState('');
  const [generoPaciente, setGeneroPaciente] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [regimenPaciente, setRegimenPaciente] = useState('');
  const [archivo, setarchivo] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const historialData = {
      nombrePaciente: nombrePaciente,
      edadPaciente: edadPaciente,
      generoPaciente: generoPaciente,
      tipoSangrePaciente: tipoSangre,
      regimenPaciente: regimenPaciente,
      archivo:archivo
    };

    createhistorial(historialData);

  };

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
            <div className="form-container">
              <h2>Crear Historial Medico</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label htmlFor="nombrePacienteField">
                    Nombre del paciente:
                  </label>
                  <input
                    type="text"
                    id="nombrePacienteField"
                    value={nombrePaciente}
                    onChange={(event) =>
                      setNombrePaciente(event.target.value)
                    }
                    placeholder="Nombre del paciente"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="edadPacienteField">
                    Edad del paciente:
                  </label>
                  <input
                    type="number"
                    id="edadPacienteField"
                    value={edadPaciente}
                    onChange={(event) => setEdadPaciente(event.target.value)}
                    placeholder="Edad del paciente"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="generoPacienteField">
                    Género del paciente:
                  </label>
                  <input
                    type="text"
                    id="generoPacienteField"
                    value={generoPaciente}
                    onChange={(event) =>
                      setGeneroPaciente(event.target.value)
                    }
                    placeholder="Género del paciente"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="tipoSangreField">Tipo de sangre:</label>
                  <input
                    type="text"
                    id="tipoSangreField"
                    value={tipoSangre}
                    onChange={(event) => setTipoSangre(event.target.value)}
                    placeholder="Tipo de sangre"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="regimenPacienteField">
                    Régimen del paciente:
                  </label>
                  <input
                    type="text"
                    id="regimenPacienteField"
                    value={regimenPaciente}
                    onChange={(event) =>
                      setRegimenPaciente(event.target.value)
                    }
                    placeholder="Régimen del paciente"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="archivoFieldField">
                    Archivo del paciente:
                  </label>
                  <input
                    type="text"
                    id="archivoField"
                    value={archivo}
                    onChange={(event) =>
                      setarchivo(event.target.value)
                    }
                    placeholder="archivo del paciente"
                  />
                </div>
                <button type="submit">Crear Historial</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </body>
  );
};

export default Crearhistorial;
