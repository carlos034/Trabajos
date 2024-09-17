import css from '../../css/style.css'
import { useForm } from 'react-hook-form';
import React, {useEffect} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {signup , user, isAuthenticated, erros: registerErrors} = useAuth();

  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      if(user.tipo_usuario === "doctor"){
        navigate("/Homedoctor")
      }else if (user.tipo_usuario === "paciente"){
        navigate ("/Homepaciente")
      }
    }
  },[isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="register-container">
      <div className='corner-image'>
      </div>
      <form onSubmit={onSubmit}>
        {
          registerErrors.map((error,i)=>(
            <div className="error-container" key={i}>
              {error}
            </div>
          ))
        }
        <div className="form-group">
          <label htmlFor="usuario">Nombre completo</label>
          <input type="text" id="usuario" {...register("usuario", { required: true })} />
          {errors.usuario && <span className="error-message">Este campo es requerido</span>}
        </div>
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
        <div className="form-group">
          <label htmlFor="tipo_usuario">Rol</label>
          <select id="tipo_usuario" {...register("tipo_usuario", { required: true })}>
            <option value="">Seleccionar rol</option>
            <option value="doctor">doctor</option>
            <option value="paciente">paciente</option>
          </select>
          {errors.tipo_usuario && <span className="error-message">Seleccione un rol</span>}
        </div>
        <div className="form-group terms-and-conditions">
          <input type="checkbox" id="terms" {...register("terms", { required: true })} />
          <label htmlFor="terms">Aceptar los términos y condiciones</label>
          {errors.terms && <span className="error-message">Debe aceptar los términos y condiciones</span>}
        </div>
        <div className='container'><button type="submit">Registrar</button></div>
      </form>
    </div>
  );
}

export default Register;