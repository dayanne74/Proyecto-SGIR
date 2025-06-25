import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import usuarioRoutes from './routes/usuarios.routes.js';
import clientesRoutes from "./routes/usuarios.js";
import autentificacionesRoutes from "./routes/autenticación_routes.js";
import reservasRoutes from "./routes/reservas.js";
import hotelesRoutes from "./routes/hotels.js";
import paqueteRoutes from "./routes/paquete.js";
import adminRoutes from "./routes/admins.js";
import comentarioRoutes from "./routes/comentarios.js";
import excursionesRoutes from "./routes/excursiones.js";
import contactosRoutes from "./routes/contactos.js";
import transporteRoutes from "./routes/transportes.js";
import { crearRolesPredeterminados } from "./config/createRoles.js";
import { crearadminPredeterminado } from "./config/crearAdminPredeterminado.js";
import swaggerJSDOCs from "./swaggerConfig.js";
import connectDB from "./config/config.js";
import errorHandler from './middleware/errorHandler.js';
import multer from 'multer';

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));
console.log('🗂️ Sirviendo imágenes desde:', uploadsDir);
try {
  console.log('📂 Contenido de uploads:', fs.readdirSync(uploadsDir));
} catch (err) {
  console.error('❌ No se puede acceder a uploads:', err.message);
}
const upload = multer({ dest: uploadsDir });

// Initialize roles and admin
crearRolesPredeterminados();
crearadminPredeterminado();

// API Routes (each under its own namespace)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/autentificaciones', autentificacionesRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/hoteles', hotelesRoutes);
app.use('/api/paquetes', paqueteRoutes);
app.use('/api/excursiones', excursionesRoutes);
app.use('/api/contactos', contactosRoutes);
app.use('/api/transportes', transporteRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/admins', adminRoutes);

// Example image upload route (if needed)
app.post('/hotels', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file;
  res.json({
    message: 'Hotel agregado exitosamente',
    hotelData: { name, description, price, image }
  });
});

// Error handler
app.use(errorHandler);

// Welcome route
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la API de SGIR</h1>');
});

// Start server
const port = process.env.PORT || 5000;
(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${port}`);
      swaggerJSDOCs(app, port);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
