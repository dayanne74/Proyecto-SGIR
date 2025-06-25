import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute';
import ConfirmationPage from './paginas/gestionreservas/ConfirmationPage.jsx';
// Páginas públicas
import Principal from './paginas/inicio/paginaprincipal';
import Nosotros from './paginas/nosotros/nosotros';
import Servicios from './paginas/servicios/Servicios';
import InicioCon from './paginas/inicio/inicioCon';
import TerminosDeUso from './paginas/politicas/Terminos';
import Ayuda from './paginas/politicas/Ayuda';
import PoliticaDePrivacidad from './paginas/politicas/politica';
import RegisterForm from './componentes/RegisterForm.jsx';
import Login from './paginas/Login.jsx';
import InicioContactos from './paginas/contacto/InicioContactos.jsx';
import Hotel from './paginas/servicios/Hotel.jsx';
import Paquetes from './paginas/servicios/Paquetes.jsx';
import ExcursionDesc from './paginas/descripcion/DescExcursion.jsx';
import PaqueteDesc from './paginas/descripcion/DescPaquete.jsx';
import HotelDesc from './paginas/descripcion/DescHotel.jsx';


// Ruta protegida cliente
import ReservasGestion from './paginas/gestionreservas/ReservasGestion.jsx';
import PaquetesGestion from './paginas/gestionreservas/gestionPaquetes.jsx'
import HotelesGestion from './paginas/gestionreservas/gestionHoteles.jsx'
import ReservaForm from './paginas/reservas/resevar';

// Página de acceso denegado
import AccessDenied from './paginas/AccesoDenegado/AccesoDenegado.jsx';

// Rutas protegidas solo para Admin
import AdminPage from './paginas/dashboard/AdminPage.jsx';

import ClientesCRUD from './componentes/clientesCRUD';
import PaquetePage from './paginas/paquete/PaquetePage';
import Excursiones from './paginas/excursiones/Excursiones';
import ComentarioCRUD from './componentes/comentarioCRUD.jsx'; 
import ListaDeContactos from './paginas/contacto/ListarContactos';
import CrudHoteles from './paginas/hoteles/CrudHoteles.jsx';
import ReservaCrud from './paginas/reservas/ReservaCrud';
import Transporte from './paginas/transporte/TablaTransporte';
import UserList from "./paginas/admin/UserList.jsx";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Principal />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/inicio-con" element={<InicioCon />} />
          <Route path="/terminos" element={<TerminosDeUso />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/politica" element={<PoliticaDePrivacidad />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/InicioContactos" element={<InicioContactos />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/paquetes" element={<Paquetes />} />
          
          <Route path="/excursiondesc" element={<ExcursionDesc />} />
          <Route path="/paquetedesc" element={<PaqueteDesc />} />
          <Route path="/hoteldesc" element={<HotelDesc />} />
          <Route path="/reserva" element={<ReservaForm />} />
         

          {/* Página de acceso denegado */}
          <Route path="/denegado" element={<AccessDenied />} />

          {/* Rutas protegidas solo para admin */}
          
            <Route path="adminPage" element={<AdminPage />} />
            <Route path="clientesCRUD" element={<ClientesCRUD />} />
            <Route path="UserList" element={<UserList />} />
            <Route path="PaquetePage" element={<PaquetePage />} />
            <Route path="Excursiones" element={<Excursiones />} />
            <Route path="comentarioCRUD" element={<ComentarioCRUD />} />
            <Route path="ListarContactos" element={< ListaDeContactos />} />
            <Route path="CrudHoteles" element={<CrudHoteles />} />
            <Route path="ReservaCrud" element={<ReservaCrud />} />
            <Route path="Transporte" element={<Transporte />} />
          {/* Protegidas cliente */}
          <Route
            path="cliente/ReservasGestion"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <ReservasGestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="ConfirmationPage"
            
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <ConfirmationPage />
              </ProtectedRoute>
            }
          />
          
           <Route
            path="PaquetesGestion"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <PaquetesGestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="HotelesGestion"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <HotelesGestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="ReservaForm"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <ReservaForm />
              </ProtectedRoute>
            }
          />
          

          {/* Ruta de fallback */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


