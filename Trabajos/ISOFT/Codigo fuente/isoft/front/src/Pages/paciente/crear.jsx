import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineDelete, AiOutlinePlusCircle, AiOutlineEdit } from 'react-icons/ai';
import '../../css/homestyle.css';
import { useAuth } from '../../context/AuthContext';
import { useGestionarcita } from '../../context/GestionarCita';

const Crear = () => {
  const { logout, user } = useAuth();
  const { createCita, errors: createErrors } = useGestionarcita();

  const [nombreDoctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const cita = {
      nombreDoctor,
      date,
      motivo,
    };

    createCita(cita);
  };


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
              <Link to="/Homepaciente">
                <AiOutlineHome className="menu-icon" />
                <span className="menu-text">Inicio</span>
              </Link>
            </li>
            <li className="menu-item active">
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
            <li className="menu-item">
              <Link to="/Homepaciente/Gestionarcita/Cancelar">
                <AiOutlineDelete className="menu-icon" />
                <span className="menu-text">Cancelar cita</span>
              </Link>
            </li>
          </ul>
        </aside>
        <main className="content2">
          <div className="form-container">
            <h2>Crear Cita Médica</h2>
            <form onSubmit={handleSubmit}>
              {createErrors && createErrors.map((error, i) => (
                <div className="error-container" key={i}>
                  {error}
                </div>
              ))}
              <div className="input-container">
                <label htmlFor="doctorField">Nombre del doctor:</label>
                <input
                  type="text"
                  id="doctorField"
                  placeholder="Buscar doctor..."
                  value={nombreDoctor}
                  onChange={(event) => setDoctor(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="fechaField">Fecha:</label>
                <input
                  type="date"
                  id="fechaField"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="motivoField">Motivo:</label>
                <input
                  type="text"
                  id="motivoField"
                  placeholder="Ingrese el motivo de la cita"
                  value={motivo}
                  onChange={(event) => setMotivo(event.target.value)}
                />
              </div>
              <button type="submit">Guardar Cita</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Crear;
