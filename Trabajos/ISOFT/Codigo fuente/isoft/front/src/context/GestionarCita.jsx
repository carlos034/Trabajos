import { createContext, useContext, useState, useEffect } from "react";
import { createRequest, getcitasRequest, UpdatecitaRequest, deletecitaRequest, getcitaRequest} from "../api/gestionarcitapaciente";


const GestionarCita = createContext();

export const useGestionarcita = () => {
  const context = useContext(GestionarCita);

  if (!context) {
    throw new Error("useGestionarcita no puede ser usado sin GestionarCitaProvider");
  }

  return context;
};

export function GestionarCitaProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [errors, setErrors] = useState([]);

  const createCita = async (cita) => {
    try {
      const res = await createRequest(cita);
      console.log(res);
    } catch (error) {
      setErrors(["No se encontró el doctor"]);
      console.log(error);
    }
  };

  const getCitas = async () => {
    try {
      const res = await getcitasRequest();
      setCitas(res.data);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getCita = async (id) => {
    try {
      const res = await getcitaRequest(id);
      return res.data;
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const updatecita = async (id, cita) => {
    try {
      const res = await UpdatecitaRequest(id, cita);
      console.log(res);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const deletecita = async (id) =>{
    try {
      const res = await deletecitaRequest(id);
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <GestionarCita.Provider
      value={{
        createCita,
        getCitas,
        getCita,
        updatecita,
        deletecita,
        errors,
        citas,
      }}
    >
      {children}
    </GestionarCita.Provider>
  );
}

