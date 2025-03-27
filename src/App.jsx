import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Entorno generar BrowserRouter; Routes y Route para las rutas
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';
import { AuthProvider } from './context/AuthProvider';
import {PacientesProvider} from './context/PacientesProvider';


function App(){

    return (
        <BrowserRouter> 
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        {/* Area pública */}
                        {/* Ruta principal, redirige al componente de autenticación */}
                        <Route path="/" element={<AuthLayout />}>
                            {/* Ruta hija para el login, con el index inyectamos a lo que tenga el padre (revisar AuthLayout) */}
                            <Route index element={<Login />}/>
                            <Route path="registrar" element={<Registrar/>} />
                            <Route path="olvide-password" element={<OlvidePassword/>} />
                            <Route path="olvide-password/:token" element={<NuevoPassword/>} />
                            <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
                        </Route>
                        {/* Area privada */}
                        <Route path='/admin' element={<RutaProtegida />}>
                            <Route index element={<AdministrarPacientes/>} />
                            <Route path="perfil" element={<EditarPerfil/>} />
                            <Route path="cambiar-password" element={<CambiarPassword/>} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;