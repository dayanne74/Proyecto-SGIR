import Paquete from "../models/paquete.js";

// POST /api/paquetes
export const crearPaquete = [
  async (req, res) => {
    try {
      const nuevoPaquete = new Paquete({
        ...req.body,
        imagen: req.file ? req.file.filename : ""
      });
      const data = await nuevoPaquete.save();
      res.status(201).json(data);
    } catch (error) {
      console.error("❌ Error al crear paquete:", error);
      res.status(500).json({ message: error.message });
    }
  },
];

// GET /api/paquetes
export const obtenerPaquetes = async (req, res) => {
  try {
    const data = await Paquete.find();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener paquetes:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/paquetes/:id
export const obtenerPaquetePorId = [
  async (req, res) => {
    try {
      const paquete = await Paquete.findById(req.params.id);
      if (!paquete) return res.status(404).json({ message: "Paquete no encontrado" });
      res.json(paquete);
    } catch (error) {
      console.error("❌ Error al buscar paquete por ID:", error);
      res.status(500).json({ message: error.message });
    }
  },
];

// PUT /api/paquetes/:id
export const actualizarPaquete = [
  async (req, res) => {
    try {
      const campos = {
        ...req.body,
        imagen: req.file ? req.file.filename : undefined
      };

      const paqueteActualizado = await Paquete.findByIdAndUpdate(
        req.params.id,
        { $set: campos },
        { new: true }
      );

      if (!paqueteActualizado)
        return res.status(404).json({ message: "Paquete no encontrado" });

      res.json(paqueteActualizado);
    } catch (error) {
      console.error("❌ Error al actualizar paquete:", error);
      res.status(500).json({ message: error.message });
    }
  },
];

// DELETE /api/paquetes/:id
export const eliminarPaquete = [
  async (req, res) => {
    try {
      const eliminado = await Paquete.findByIdAndDelete(req.params.id);
      if (!eliminado)
        return res.status(404).json({ message: "Paquete no encontrado" });

      res.json({ message: "Paquete eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar paquete:", error);
      res.status(500).json({ message: error.message });
    }
  },
];

export const buscarPaquetePorDestino = async (req, res) => {
  try {
    const { destino } = req.query;
    if (!destino) {
      return res.status(400).json({ message: "Destino no proporcionado" });
    }

    const paquetes = await Paquete.find({
      destino: { $regex: new RegExp(destino, 'i') },
    });

    if (!paquetes.length) {
      return res.status(404).json({ message: "No se encontraron paquetes para este destino" });
    }

    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filtrarPaquetePorEstado = async (req, res) => {
  try {
    const { activo } = req.query;
    if (activo !== 'true' && activo !== 'false') {
      return res.status(400).json({ message: "El parámetro 'activo' debe ser true o false" });
    }

    const paquetes = await Paquete.find({ activo: activo === 'true' });

    if (!paquetes.length) {
      return res.status(404).json({ message: "No se encontraron paquetes con ese estado" });
    }

    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
