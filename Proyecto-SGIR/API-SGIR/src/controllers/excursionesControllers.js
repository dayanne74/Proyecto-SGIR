import excursionSchema from "../models/excursion.js";

// POST /api/excursiones
export const create = [
  async (req, res) => {
    try {
      // Incluye el nombre de archivo subido en el documento
      const nuevaExcursion = new excursionSchema({
        ...req.body,
        imagen: req.file ? req.file.filename : ""
      });
      const data = await nuevaExcursion.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// GET /api/excursiones
export const getAll = async (req, res) => {
  try {
    const data = await excursionSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/excursiones/:id
export const getById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const excursion = await excursionSchema.findById(id);
      if (!excursion) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      res.json(excursion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// PUT /api/excursiones/:id
export const update = [
  async (req, res) => {
    const { id } = req.params;
    try {
      // Construye el objeto de actualización
      const campos = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        destino: req.body.destino,
        precio: req.body.precio,
        duracion: req.body.duracion,
        transporte: req.body.transporte,
        comida: req.body.comida,
        actividad: req.body.actividad,
      };
      // Si se subió nueva imagen, actualiza ese campo también
      if (req.file) {
        campos.imagen = req.file.filename;
      }

      const excursionActualizada = await excursionSchema.findByIdAndUpdate(
        id,
        { $set: campos },
        { new: true }
      );

      if (!excursionActualizada) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      res.json(excursionActualizada);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// DELETE /api/excursiones/:id
export const remove = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await excursionSchema.findByIdAndDelete(id);
      if (!eliminado) {
        return res.status(404).json({ message: "Excursión no encontrada" });
      }
      res.json({ message: "Excursión eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
