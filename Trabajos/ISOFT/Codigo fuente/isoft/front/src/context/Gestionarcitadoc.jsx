import { createContext, useContext, useState } from "react";
import { getcitasdocRequest, deletecitadocRequest } from "../api/gestionarcitadoctor";

const Gestionarcitadoc = createContext();

export const useGestionarcitadoc = () => {
  const context = useContext(Gestionarcitadoc);

  if (!context) {
    throw new Error("useGestionarcitadoc no puede ser usado sin GestionarcitadocProvider");
  }

  return context;
};

export function GestionarcitadocProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCitas = async () => {
    try {
      const res = await getcitasdocRequest();
      setCitas(res.data);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const deletecita = async (id) =>{
    try {
      const res = await deletecitadocRequest(id);
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <Gestionarcitadoc.Provider
      value={{
        getCitas,
        deletecita,
        errors,
        citas
      }}
    >
      {children}
    </Gestionarcitadoc.Provider>
  );
}
