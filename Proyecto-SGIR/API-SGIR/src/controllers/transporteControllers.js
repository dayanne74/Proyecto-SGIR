import transporteSchema from '../models/transporte.js'; 
import { validatorHandler } from '../middleware/validator.handler.js';
import { createTransporteSchema, getTransporteSchema, deleteTransporteSchema } from '../validators/transporteValidators.js';

export const createTransporte = [
    validatorHandler(createTransporteSchema, "body"),
    async (req, res) => {
        try {
            const nuevoTransporte = new transporteSchema(req.body);
            const data = await nuevoTransporte.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
];

export const getTransportes = async (req, res) => {
    try {
        const data = await transporteSchema.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransporteById = [
    validatorHandler(getTransporteSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const transporte = await transporteSchema.findById(id);
            if (!transporte) return res.status(404).json({ message: 'Transporte no encontrado' });
            res.json(transporte);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const deleteTransporte = [
    validatorHandler(deleteTransporteSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await transporteSchema.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Transporte no encontrado' });
            }
            res.json({ message: 'Transporte eliminado' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];
