import sequelize from '../database/database.js';
import Prestacion from '../models/Prestacion.js';

export const listarPrestaciones = async () => {
    try {
        const prestaciones = await Prestacion.findAll();
        return prestaciones
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las prestaciones'
        });
    }
};

export const obtenerPrestaciones = async (req, res) => {
    try {
        const prestaciones = await Prestacion.findAll();
        res.json(prestaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las prestaciones'
        });
    }
};

export const obtenerPrestacion = async (req, res) => {
    const { id } = req.params;

    try {
        const prestacion = await Prestacion.findByPk(id);

        if (prestacion) {
            res.json(prestacion);
        } else {
            res.status(404).json({
                msg: `No existe una prestación con el id ${id}`
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener la prestación'
        });
    }
};

export const crearPrestacion = async (req, res) => {
    const { nombre, lado, indicacion, justificacion } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const prestacion = await Prestacion.create({
            nombre, lado, indicacion, justificacion
        }, { transaction: transaccion });

        await transaccion.commit();

        res.json(prestacion);

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear la prestacion'
        });
    }
};

export const editarPrestacion = async (req, res) => {
    const { id } = req.params;
    const { nombre, lado, indicacion, justificacion } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const prestacion = await Prestacion.findByPk(id);

        if (prestacion) {
            await prestacion.update({ nombre, lado, indicacion, justificacion }, { transaction: transaccion }); //actualizar info de la prestacion

            await transaccion.commit();

            const prestacionActualizada = await Prestacion.findByPk(id);
    
            res.json(prestacionActualizada);

        } else {
            res.status(404).json({
                msg: `No existe la prestación con el id ${id}`
            });
        }

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al actualizar la prestación'
        });
    }
};

export const eliminarPrestacion = async (req, res) => {
    const { id } = req.params;

    const transaccion = await sequelize.transaction();

    try {
        const prestacion = await Prestacion.findByPk(id);

        if (prestacion) {
            await prestacion.destroy({ transaction: transaccion });

            await transaccion.commit();

            res.json({
                msg: 'La prestación fue eliminada exitosamente'
            });

        } else {
            res.status(404).json({
                msg: `No existe una prestación con el id ${id}`
            });
        }

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar la prestación'
        });
    }
};