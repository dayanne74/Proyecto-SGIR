import hotelSchema from "../models/hotel.js";

// POST /api/hoteles
export const crearHotel = [
  async (req, res) => {
    try {
      const nuevoHotel = new hotelSchema({
        ...req.body,
        imagen: req.file ? req.file.filename : ""
      });
      const data = await nuevoHotel.save();
      res.status(201).json(data);
    } catch (error) {
      console.error("❌ Error al crear hotel:", error);
      res.status(500).json({ message: error.message });
    }
  }
];

// GET /api/hoteles
export const obtenerHoteles = async (req, res) => {
  try {
    const data = await hotelSchema.find();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener hoteles:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/hoteles/:id
export const obtenerHotelPorId = [
  async (req, res) => {
    try {
      const hotel = await hotelSchema.findById(req.params.id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }
      res.json(hotel);
    } catch (error) {
      console.error("❌ Error al buscar hotel:", error);
      res.status(500).json({ message: error.message });
    }
  }
];

// PUT /api/hoteles/:id
export const actualizarHotel = [
  async (req, res) => {
    try {
      const campos = {
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        numeroHabitaciones: req.body.numeroHabitaciones,
        numeroPersonas: req.body.numeroPersonas,
        comida: req.body.comida,
        precio: req.body.precio,
        categoria: req.body.categoria
      };
      if (req.file) {
        campos.imagen = req.file.filename;
      }

      const hotelActualizado = await hotelSchema.findByIdAndUpdate(
        req.params.id,
        { $set: campos },
        { new: true }
      );

      if (!hotelActualizado) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }

      res.json(hotelActualizado);
    } catch (error) {
      console.error("❌ Error al actualizar hotel:", error);
      res.status(500).json({ message: error.message });
    }
  }
];

// DELETE /api/hoteles/:id
export const eliminarHotel = [
  async (req, res) => {
    try {
      const eliminado = await hotelSchema.findByIdAndDelete(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }

      res.json({ message: "Hotel eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar hotel:", error);
      res.status(500).json({ message: error.message });
    }
  }
];
