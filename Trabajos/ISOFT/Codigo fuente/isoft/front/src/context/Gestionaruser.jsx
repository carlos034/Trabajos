import { createContext, useContext, useState } from "react";
import { getUsersRequest, deleteUserRequest } from "../api/gestionaruser";

export const Gestionaruser = createContext();

export const useGestionar = () => {
    const context = useContext(Gestionaruser);

    if(!context){
        throw new Error("useGestionar no puede ser usado con GestionarProvider")
    }

    return context
}

export function GestionarProvider ({children}) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
          const res = await getUsersRequest();
          setUsers(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      const deleteUser = async (id) => {
        try {
          const res = await deleteUserRequest(id);
        } catch (error) {
          console.error(error);
        }
      };


    return(
        <Gestionaruser.Provider value ={{
            users,
            getUsers,
            deleteUser,
        }}> 
           {children}
        </Gestionaruser.Provider>

    );
}