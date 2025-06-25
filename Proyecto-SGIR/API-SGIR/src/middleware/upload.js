// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Para obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Carpeta de destino: debe coincidir con la que sirves en index.js
const uploadsDir = path.join(__dirname, '../uploads');

// Asegura que exista la carpeta uploads
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración del storage de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Ejemplo: excursion-<timestamp>.<ext>
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `excursion-${timestamp}${ext}`);
  }
});

// Filtro opcional: acepta solo imágenes
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Solo se permiten imágenes'), false);
};

// Exporta el middleware Multer
export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }  // límite 2MB
});
