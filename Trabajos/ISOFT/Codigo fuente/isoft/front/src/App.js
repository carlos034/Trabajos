import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Loginpage from './Pages/home/Loginpage'
import Register from './Pages/home/Register'
import Homepage from './Pages/home/homepage'
import ProtectedRoutes from './ProtectedRoutes'

/*Rutas para el administrador*/
import Homeadministrador from './Pages/administrador/home'
import Administradorusuario from './Pages/administrador/administradorusuario'
import Eliminarusuario from './Pages/administrador/eliminarusuario'
import Listarusuario from './Pages/administrador/listarusuario'

/*Rutas para el doctor */
import Homedoctor from './Pages/doctor/home'
import Gestionar from './Pages/doctor/gestionarcitas/gestionarcita'
import Cancelarcita from './Pages/doctor/gestionarcitas/cancelar'
import Modificarcita from './Pages/doctor/gestionarcitas/modificar'
import Consultar from './Pages/doctor/consultarhistorial'
import Actualizarhistorial from './Pages/doctor/actualizarhistorial'
import Crearhistorial from './Pages/doctor/crearhistorial'
import Gestionarplanilla from './Pages/doctor/gestionarplanilla'

/*Rutas para el paciente*/ 
import Homepaciente from './Pages/paciente/home'
import Consultarhistorial from './Pages/paciente/consultarhistorial'
import Gestionarcita from './Pages/paciente/gestionarcita'
import Crear from './Pages/paciente/crear'
import Modificar from './Pages/paciente/modificar'
import Cancelar from './Pages/paciente/cancelar'
import { GestionarProvider } from './context/Gestionaruser'
import { GestionarCitaProvider } from './context/GestionarCita'
import { HistorialmedicProvider } from './context/Historialmedic'
import { GestionarcitadocProvider } from './context/Gestionarcitadoc'


function App() {
  return (
      <AuthProvider>
        <GestionarProvider>
        <GestionarCitaProvider>
          <GestionarcitadocProvider>
          <HistorialmedicProvider>
          <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Homepage/>} />
      <Route path='/Login' element ={<Loginpage/>} />
      <Route path='/Register' element ={<Register/>} />
      <Route element={<ProtectedRoutes/>} >
      <Route path='/Homeadministrador' element ={<Homeadministrador/>} />
      <Route path='/Homeadministrador/Administradorusuario' element ={<Administradorusuario/>} />
      <Route path='/Homeadministrador/Administradorusuario/Eliminarusuario' element ={<Eliminarusuario/>} />
      <Route path='/Homeadministrador/Administradorusuario/Listarusuario' element ={<Listarusuario/>} />
      <Route path='/Homedoctor' element ={<Homedoctor/>} />
      <Route path='/Homedoctor/Gestionar' element ={<Gestionar/>} />
      <Route path='/Homedoctor/Gestionar/Cancelarcita' element ={<Cancelarcita/>} />
      <Route path='/Homedoctor/Gestionar/Modificarcita' element ={<Modificarcita/>} />
      <Route path='/Homedoctor/Consultar' element ={<Consultar/>} />
      <Route path='/Homedoctor/Actualizarhistorial' element ={<Actualizarhistorial/>} />
      <Route path='/Homedoctor/Crearhistorial' element ={<Crearhistorial/>} />
      <Route path='/Homedoctor/Gestionarplanilla' element ={<Gestionarplanilla/>} />
      <Route path='/Homepaciente' element ={<Homepaciente/>} />
      <Route path='/Homepaciente/Gestionarcita' element ={<Gestionarcita/>} />
      <Route path='/Homepaciente/Gestionarcita/Crear' element ={<Crear/>} />
      <Route path='/Homepaciente/Gestionarcita/Cancelar' element ={<Cancelar/>} />
      <Route path='/Homepaciente/Gestionarcita/Modificar' element ={<Modificar/>} />
      <Route path='/Homepaciente/Consultarhistorialclinico' element ={<Consultarhistorial/>} />
      </Route>
    </Routes>
    </BrowserRouter>
          </HistorialmedicProvider>
          </GestionarcitadocProvider>
        </GestionarCitaProvider>
        </GestionarProvider>
      </AuthProvider>

  );
}

export default App;
