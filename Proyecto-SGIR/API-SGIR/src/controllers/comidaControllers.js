import comidaSchema from '../models/comida.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createComidaSchema, getComidaSchema, deleteComidaSchema } from '../validators/comidaValidator.js';

export const createComida = [
    validatorHandler(createComidaSchema, "body"),
    async (req, res) => {
        try {
            const nuevaComida = new comidaSchema(req.body);
            const data = await nuevaComida.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
];

export const getComida = async (req, res) => {
    try {
        const data = await comidaSchema.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getComidaById = [
    validatorHandler(getComidaSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const comida = await comidaSchema.findById(id);
            if (!comida) return res.status(404).json({ message: 'Comida no encontrada' });
            res.json(comida);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const deleteComida = [
    validatorHandler(deleteComidaSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await comidaSchema.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Comida no encontrada' });
            }
            res.json({ message: 'Comida eliminada' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];