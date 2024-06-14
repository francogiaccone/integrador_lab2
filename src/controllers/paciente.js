import sequelize from '../database/database.js';
import Paciente from '../models/Paciente.js';
import Persona from '../models/Persona.js';
import PlanObraSocial from '../models/PlanObraSocial.js';
import ObraSocial from '../models/ObraSocial.js';

export const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll({
            include: [
                { model: Persona }, //info del modelo de persona
                {
                    model: PlanObraSocial, //info del modelo de plan
                    include: [
                        { model: ObraSocial, through: { attributes: [] } } //dentro del plan, info del modelo de la obra social
                    ]
                }
            ]
        });
        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los pacientes'
        });
    }
};

export const listarPacientes = async () => {
    try {
        const pacientes = await Paciente.findAll({
            include: [
                { model: Persona }, //info del modelo de persona
                {
                    model: PlanObraSocial, //info del modelo de plan
                    include: [
                        { model: ObraSocial, through: { attributes: [] } } //dentro del plan, info del modelo de la obra social
                    ]
                }
            ]
        });
        return pacientes
    } catch (error) {
        console.error(error);
        return { msg: 'Ocurrió un error al obtener los pacientes' };
    }
};

export const obtenerPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const paciente = await Paciente.findByPk(id, {
            include: [
                { model: Persona },
                {
                    model: PlanObraSocial,
                    include: [
                        {
                            model: ObraSocial
                        }
                    ]
                }
            ]
        });

        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({
                msg: `No existe un paciente con el id ${id}`
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener el paciente'
        });
    }
};

export const crearPaciente = async (req, res) => {
    const {
        nombre, apellido, documento, fechaNacimiento, domicilio, sexo, idPlanObraSocial
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const persona = await Persona.create({
            nombre, apellido, documento, fechaNacimiento, domicilio, sexo
        }, { transaction: transaccion });

        const paciente = await Paciente.create({
            idPersona: persona.id, idPlanObraSocial
        }, { transaction: transaccion });

        await transaccion.commit();

        res.json({
            persona,
            paciente
        });

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear el paciente',
        });
    }
};

export const editarPaciente = async (req, res) => {
    const { id } = req.params;
    const {
        nombre, apellido, documento, fechaNacimiento, domicilio, sexo,
        idPlanObraSocial
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const paciente = await Paciente.findByPk(id);

        if (paciente) {
            await paciente.update({ idPlanObraSocial }, { transaction: transaccion }); //actualizar info del paciente

            const persona = await paciente.getPersona({ transaction: transaccion }); //actualizar info de la persona del paciente
            await persona.update({
                nombre,
                apellido,
                documento,
                fechaNacimiento,
                domicilio,
                sexo
            }, { transaction: transaccion });

            await transaccion.commit();

            const pacienteActualizado = await Paciente.findByPk(id, {
                include: [
                    { model: Persona },
                    {
                        model: PlanObraSocial,
                        include: [
                            {
                                model: ObraSocial
                            }
                        ]
                    }
                ]
            });
    
            res.json(pacienteActualizado);

        } else {
            res.status(404).json({
                msg: `No existe el paciente con el id ${id}`
            });
        }

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al actualizar el paciente'
        });
    }
};

export const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    const transaccion = await sequelize.transaction();

    try {
        const paciente = await Paciente.findByPk(id);

        if (paciente) {
            await paciente.destroy({ transaction: transaccion });

            const persona = await Persona.findByPk(paciente.idPersona);
            if (persona) {
                await persona.destroy({ transaction: transaccion });
            } else {
                throw new Error(`No se encontró la persona asociada al paciente con id ${id}`);
            }

            await transaccion.commit();

            res.json({
                msg: 'El paciente fue eliminado exitosamente'
            });

        } else {
            res.status(404).json({
                msg: `No existe un paciente con el id ${id}`
            });
        }

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar el paciente'
        });
    }
};