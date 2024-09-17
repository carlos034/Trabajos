import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineHome, AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useGestionarcita } from '../../context/GestionarCita';

const Modificar = () => {
  const { logout, user } = useAuth();
  const { updatecita, getCita, citas, getCitas } = useGestionarcita();
  const { setValue } = useForm();
  const [selectedCitaIndex, setSelectedCitaIndex] = useState(null);
  const [selectedCita, setSelectedCita] = useState(null);
  const navigate = useNavigate();

  const [nombreDoctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [motivo, setMotivo] = useState('');
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    getCitas();
  }, []);

  const handleActualizarClick = (citaId, index) => {
    const selected = citas.find((cita) => cita.id === citaId);
    if (selected) {
      setSelectedCita(selected);
      setSelectedCitaIndex(index);
      setValue('doctorField', selected.doctor.usuario);
      setValue('fechaField', selected.date);
      setValue('motivoField', selected.motivo);
      setShowTable(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const updatedCita = {
      ...selectedCita,
      doctor: { usuario: nombreDoctor },
      date,
      motivo,
    };

    try {
      await updatecita(selectedCita.id, updatedCita);
      console.log("Cita actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
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
              <li className="menu-item active">
                <Link to="/Homepaciente/Gestionarcita/Modificar">
                  <AiOutlineEdit className="menu-icon" />
                  <span className="menu-text">Modificar cita</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Homepaciente/Gestionarcita/Cancelar">
                  <AiOutlineDelete className="menu-icon" />
                  <span className="menu-text">Cancelar cita</span>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="content2">
            {showTable ? (
              <>
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
                      citas.map((cita, index) => (
                        <tr key={cita.id}>
                          <td>{cita.doctor.usuario}</td>
                          <td>{cita.date}</td>
                          <td>{cita.motivo}</td>
                          <td>
                            <button onClick={() => handleActualizarClick(cita.id, index)}>Actualizar</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <h2>Modificar Cita</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="input-container">
                    <label htmlFor="doctorField">Nombre del doctor:</label>
                    <input
                      type="text"
                      id="doctorField"
                      placeholder="Buscar doctor..."
                      value={
                        nombreDoctor ||
                        (selectedCitaIndex !== null ? citas[selectedCitaIndex].doctor.usuario : '')
                      }
                      onChange={(event) => setDoctor(event.target.value)}
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
                          ? new Date(citas[selectedCitaIndex].date).toISOString().split('T')[0]
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
                        (selectedCitaIndex !== null ? citas[selectedCitaIndex].motivo : '')
                      }
                      onChange={(event) => setMotivo(event.target.value)}
                    />
                  </div>
                  <button type="submit">Guardar Cita</button>
                </form>
              </>
            )}
          </main>
        </div>
      </div>
    </body>
  );
};

export default Modificar;

