import { createContext, useContext, useState} from "react";
import { createRequest, gethistsRequest, gethistspacRequest } from "../api/histortialclinico";

const Historialmedic = createContext();

export const useHistorialmedic = () => {
  const context = useContext(Historialmedic);

  if (!context) {
    throw new Error("useHistorialmedic no puede ser usado sin HistorialmedicProvider");
  }

  return context;
};


export function HistorialmedicProvider({ children }) {
  const [historials, sethistorials] = useState([]);
  const [errors, setErrors] = useState([]);

  const createhistorial = async (historial) => {
    try {
      const res = await createRequest(historial);
      console.log(res);
    } catch (error) {
      setErrors(["No se pudo crear la cita"]);
      console.log(error);
    }
    };

    const getshistorial = async (historial) => {
      try {
        const res = await gethistsRequest();
        sethistorials(res.data);
      } catch (error) {
        setErrors([error.message]);
      }
    };

    const getspachistorial = async (historial) => {
      try {
        const res = await gethistspacRequest();
        sethistorials(res.data);
      } catch (error) {
        setErrors([error.message]);
      }
    };

  return (
    <Historialmedic.Provider
      value={{
        createhistorial,
        getshistorial,
        getspachistorial,
        historials

      }}
    >
      {children}
    </Historialmedic.Provider>
  );
}