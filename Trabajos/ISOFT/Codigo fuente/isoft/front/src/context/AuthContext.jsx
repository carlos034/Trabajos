import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest , loginRequest } from '../api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[erros, setErrors] =  useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
    }

  }
  

  useEffect(() => {
    if(erros.length > 0){
      const timer = setTimeout(() => {
          setErrors([])
      }, 5000);
      return () => clearTimeout(timer)
    }  
  },[erros])
  
  
  useEffect(() => {
    const cookies = Cookies.get()
    console.log(cookies.token)
    if(cookies.token){
      console.log(cookies.token)
    }
  }, [])

  const logout =() =>{
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  }
  

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        erros
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
