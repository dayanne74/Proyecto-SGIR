const rutasBase = [
    { path: '/', label: 'Inicio' },
    { path: '/SobreNosotros', label: 'Nosotros' },
    { path: '/Servicios', label: 'Servicios' },
    { path: '/Ayuda', label: 'Ayuda' },
    { path: '/Politica', label: 'Política' },
    { path: '/Terminos', label: 'Términos' },
  ];
  
  const rutasPorRol = {
    admin: [
      { path: '/adminPage', label: 'Dashboard' },
      { path: '/clientesCRUD', label: 'clientes' },
      { path: '/PaquetePage', label: 'Paquetes' },
      { path: '/FormExcursion', label: 'Excursiones' },
      { path: '/ComentarioCRUD', label: 'Comentarios' },
      { path: '/ListarContactos', label: 'Contactos' },
      { path: '/FormHotel', label: 'Hoteles' },
      { path: '/ReservaCrud', label: 'Reservas admin' },
      { path: '/Transporte', label: 'Transporte' },
    ],
    cliente: [
      { path: '/ReservasGestion', label: 'Mis Reservas' },
      { path: '/ReservaForm', label: 'Reservar' },
      { path: '/Contacto', label: 'Contáctanos' },
      { path: '/HotelesGestion', label: 'Hoteles' },
      { path: '/PaquetesGestion', label: 'Paquetes' },
      { path: '/ReservaForm', label: 'Paquetes' },
      { path: '/ConfirmationPage', label: 'Paquetes' },
    ],
  };
  
  export function obtenerRutasPermitidas(rol, autenticado) {
    const rutas = [...rutasBase];
  
    if (autenticado && rutasPorRol[rol]) {
      rutasPorRol[rol].forEach((ruta) => {
        if (!rutas.some(r => r.path === ruta.path)) {
          rutas.push(ruta);
        }
      });
    }
  
    return rutas;
  }
