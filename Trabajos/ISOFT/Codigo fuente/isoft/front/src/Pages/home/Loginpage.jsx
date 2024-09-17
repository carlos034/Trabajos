import { useForm } from 'react-hook-form';
import React,{useEffect} from 'react';
import { Link, img } from 'react-router-dom';
import css from '../../css/style.css'
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Loginpage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signin, user, isAuthenticated, erros: loginErrors} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      if(user.tipo_usuario === "doctor"){
        navigate("/Homedoctor")
      }else if (user.tipo_usuario === "paciente"){
        navigate ("/Homepaciente")
      }else if (user.tipo_usuario === "administrador"){
        navigate ("/Homeadministrador")
      }
    }
  },[isAuthenticated])

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  return (
    <div className='background-element'>
      <div className="register-container">
      <div className='corner-image'>
      </div>
      <form onSubmit={onSubmit}>
      {
          loginErrors.map((error,i)=>(
            <div className="error-container" key={i}>
              {error}
            </div>
          ))
        }
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email", { required: true })} />
          {errors.email && <span className="error-message">Este campo es requerido</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" {...register("password", { required: true })} />
          {errors.password && <span className="error-message">Este campo es requerido</span>}
        </div>
        <div className="form-gro">
          <input type="checkbox" id="rememberPassword" {...register("rememberPassword")} />
          <label htmlFor="rememberPassword">Guardar contraseña</label>
        </div>
        <div className="form-group terms-and-conditions">
          <h1>¿No tienes una cuenta?</h1>
          <Link to="/register">Regístrate aquí</Link> 
        </div>
        <div className="container">
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default Loginpage;
