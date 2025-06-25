import contactoSchema from "../models/contacto.js"; 
import { validatorHandler } from "../middleware/validator.handler.js";
import { createContactoSchema, getContactoSchema, deleteContactoSchema } from "../validators/contactosValidators.js"; 

export const createContacto = [
  validatorHandler(createContactoSchema, "body"),
  async (req, res) => {
    try {
      const contacto = new contactoSchema(req.body);
      const data = await contacto.save();
      res.status(201).json(data); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  },
];

export const getContacto = async (req, res) => {
  try {
    const data = await contactoSchema.find(); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactoById = [
  validatorHandler(getContactoSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const contacto = await contactoSchema.findById(id); 
      if (!contacto) {
        return res.status(404).json({ message: "Contacto no encontrado" });
      }
      res.json(contacto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const deleteContacto = [
  validatorHandler(deleteContactoSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await contactoSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Contacto no encontrado" });
      }
      res.status(200).json({ message: "Contacto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];