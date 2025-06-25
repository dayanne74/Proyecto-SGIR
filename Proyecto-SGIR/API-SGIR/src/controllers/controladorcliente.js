import Cliente from '../models/cliente.js';
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createClienteSchema,
  updateClienteSchema,
  getClienteSchema,
  deleteClienteSchema
} from "../validators/clientesValidatorsDTO.js";

// Crear cliente
export const crearcliente = [
  validatorHandler(createClienteSchema, "body"),
  async (req, res) => {
    try {
      const cliente = new Cliente(req.body);
      const nuevoCliente = await cliente.save();
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener cliente por ID
export const obtenerClientePorId = [
  validatorHandler(getClienteSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Actualizar cliente por ID
export const actualizarcliente = [
  validatorHandler(getClienteSchema, "params"),
  validatorHandler(updateClienteSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      Object.assign(cliente, updateData); // Actualiza solo los campos enviados

      await cliente.save();
      res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Eliminar cliente por ID
export const borrarcliente = [
  validatorHandler(deleteClienteSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Cliente.deleteOne({ _id: id });
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

