import sequelize from '../database/database.js';
import PlanObraSocial from '../models/PlanObraSocial.js';

export const listarPlanes = async (req, res) => {
    try {
        const planes = await PlanObraSocial.findAll();
        return planes
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los planes de obra social'
        });
    }
};