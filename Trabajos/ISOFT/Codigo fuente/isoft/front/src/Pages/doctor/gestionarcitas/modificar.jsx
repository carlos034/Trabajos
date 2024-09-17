import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../../../css/homestyle.css';
import { useAuth } from '../../../context/AuthContext';
import { useGestionarcitadoc } from '../../../context/Gestionarcitadoc';

const Modificar = () => {
  const { logout } = useAuth();
  const { citas, getCitas } = useGestionarcitadoc();

  useEffect(() => {
    getCitas();
  }, []);

  const { setValue } = useForm();
  const [editing, setEditing] = useState(false);
  const [selectedCitaIndex, setSelectedCitaIndex] = useState(null);
  const [selectedCita, setSelectedCita] = useState(null);
  const navigate = useNavigate();

  const [nombreDoctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleActualizarClick = (citaId, index) => {
    const selected = citas.find((cita) => cita.id === citaId);
    if (selected) {
      setEditing(true);
      setSelectedCita(selected);
      setSelectedCitaIndex(index);
      setValue('pacienteField', selected.paciente.usuario);
      setValue('fechaField', selected.date);
      setValue('motivoField', selected.motivo);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de actualización de la cita en función de los valores del formulario
    // Puedes acceder a los valores utilizando los estados selectedCita, selectedCitaIndex, date y motivo
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
              <li className="menu-item active">
                <Link to="/Homedoctor/Gestionar/Modificarcita">
                  <AiOutlineEdit className="menu-icon" />
                  <span className="menu-text">Modificar cita</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Homedoctor/Gestionar/Cancelarcita">
                  <AiOutlineDelete className="menu-icon" />
                  <span className="menu-text">Cancelar cita</span>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="content2">
            {editing ? (
              <div className="form-container8">
                <form onSubmit={handleFormSubmit}>
                  <h2>Modificar cita</h2>
                  <div className="input-container">
                    <label htmlFor="pacienteField">Nombre del paciente:</label>
                    <input
                      type="text"
                      id="pacienteField"
                      placeholder="Buscar doctor..."
                      value={
                        selectedCitaIndex !== null
                          ? citas[selectedCitaIndex].paciente.usuario
                          : ''
                      }
                      readOnly
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="fechaField">Fecha:</label>
                    <input
                      type="date"
                      id="fechaField"
                      value={
                        date ||
                        (selectedCitaIndex !== null
                          ? new Date(
                              citas[selectedCitaIndex].date
                            ).toISOString().split('T')[0]
                          : '')
                      }
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="motivoField">Motivo:</label>
                    <input
                      type="text"
                      id="motivoField"
                      placeholder="Ingrese el motivo de la cita"
                      value={
                        motivo ||
                        (selectedCitaIndex !== null
                          ? citas[selectedCitaIndex].motivo
                          : '')
                      }
                      onChange={(event) => setMotivo(event.target.value)}
                    />
                  </div>
                  <button type="submit">Guardar Cita</button>
                </form>
              </div>
            ) : (
              <>
                <h2>Citas Médicas</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre del paciente</th>
                      <th>Fecha</th>
                      <th>Motivo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas &&
                      citas.map((cita, index) => (
                        <tr key={cita.id}>
                          <td>{cita.paciente.usuario}</td>
                          <td>{cita.date}</td>
                          <td>{cita.motivo}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleActualizarClick(cita.id, index)
                              }
                            >
                              Actualizar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            )}
          </main>
        </div>
      </div>
    </body>
  );
};

export default Modificar;
