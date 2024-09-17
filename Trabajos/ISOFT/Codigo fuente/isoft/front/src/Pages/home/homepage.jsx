import React from 'react';
import { Link } from 'react-router-dom';
import css from '../../css/style.css'

function Homepage() {
  return (
    <body>
        <div className="center-container">
      <div className="box">
        <h2>¿Ya tienes una cuenta?</h2>
        <Link to="/Login">Iniciar sesión</Link>
      </div>
      <div className="box">
        <h2>¿Quieres registrarte?</h2>
        <Link to="/Register">Registrarse</Link>
      </div>
    </div>
        
    </body>
  );
}

export default Homepage;