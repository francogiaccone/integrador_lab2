import sequelize from '../database/database.js';
import Prescripcion from '../models/Prescripcion.js';
import Profesional from '../models/Profesional.js';
import Paciente from '../models/Paciente.js';
import PrescripcionMedicamento from '../models/PrescripcionMedicamento.js';
import PrescripcionPrestacion from '../models/PrescripcionPrestacion.js';
import Medicamento from '../models/Medicamento.js';
import Prestacion from '../models/Prestacion.js';
import Persona from '../models/Persona.js';
import Especialidad from '../models/Especialidad.js';
import ObraSocial from '../models/ObraSocial.js';
import PlanObraSocial from '../models/PlanObraSocial.js';

export const listarPrescripciones = async () => {
    try {
        const prescripciones = await Prescripcion.findAll({
            include: [
                {
                    model: Medicamento,
                    through: {
                        model: PrescripcionMedicamento,
                        attributes: ['frecuencia', 'duracion']
                    }
                },
                {
                    model: Prestacion,
                    through: {
                        model: PrescripcionPrestacion,
                        attributes: []
                    }
                },
                {
                    model: Profesional,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                },
                {
                    model: Paciente,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                }
            ]
        });
        return prescripciones

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las prescripciones'
        });
    }
};

export const obtenerPrescripciones = async (req, res) => {
    try {
        const prescripciones = await Prescripcion.findAll({
            include: [
                {
                    model: Medicamento,
                    through: {
                        model: PrescripcionMedicamento,
                        attributes: ['frecuencia', 'duracion']
                    }
                },
                {
                    model: Prestacion,
                    through: {
                        model: PrescripcionPrestacion,
                        attributes: []
                    }
                },
                {
                    model: Profesional,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                },
                {
                    model: Paciente,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                }
            ]
        });
        res.json(prescripciones);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las prescripciones'
        });
    }
};

export const listarPrescripcion = async (id) => {

    try {
        const prescripcion = await Prescripcion.findByPk(id, {
            include: [
                {
                    model: Medicamento,
                    through: {
                        model: PrescripcionMedicamento,
                        attributes: ['frecuencia', 'duracion']
                    }
                },
                {
                    model: Prestacion,
                    through: {
                        model: PrescripcionPrestacion,
                        attributes: []
                    }
                },
                {
                    model: Profesional,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                },
                {
                    model: Paciente,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                }
            ]
        });

        if (prescripcion) {
            return prescripcion;
        } else {
            res.status(404).json({
                msg: `No existe una prescripcion con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener la prescripcion'
        });
    }
};

export const obtenerPrescripcion = async (req, res) => {
    const { id } = req.params;

    try {
        const prescripcion = await Prescripcion.findByPk(id, {
            include: [
                {
                    model: Medicamento,
                    through: {
                        model: PrescripcionMedicamento,
                        attributes: ['frecuencia', 'duracion']
                    }
                },
                {
                    model: Prestacion,
                    through: {
                        model: PrescripcionPrestacion,
                        attributes: []
                    }
                },
                {
                    model: Profesional,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                },
                {
                    model: Paciente,
                    include: [
                        {
                            model: Persona
                        }
                    ]
                }
            ]
        });

        if (prescripcion) {
            res.json(prescripcion);
        } else {
            res.status(404).json({
                msg: `No existe una prescripcion con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener la prescripcion'
        });
    }
};

export const crearPrescripcion = async (req, res) => {
    const {
        idProfesional, idPaciente,
        diagnostico, fechaPrescripcion, vigencia,
        medicamentos, idsPrestaciones
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const prescripcion = await Prescripcion.create({ //crear la prescripcion
            idProfesional, idPaciente,
            diagnostico, fechaPrescripcion, vigencia
        }, { transaction: transaccion });

        for (const medicamento of medicamentos) { //asociar uno o multiples medicamentos a prescripcion
            await PrescripcionMedicamento.create({
                idPrescripcion: prescripcion.id, idMedicamento: medicamento.id,
                frecuencia: medicamento.frecuencia, duracion: medicamento.duracion
            }, { transaction: transaccion });
        }

        for (const idPrestacion of idsPrestaciones) { //asociar una o multiples prestaciones a prescripcion
            await PrescripcionPrestacion.create({
                idPrescripcion: prescripcion.id, idPrestacion
            }, { transaction: transaccion });
        }

        await transaccion.commit();

        const prescripcionCompleta = await Prescripcion.findByPk(prescripcion.id, {
            include: [
                { model: Profesional }, //info del modelo de profesional
                { model: Paciente }, //info del modelo del paciente
                { model: Medicamento, through: { attributes: [] } }, //info de los medicamentos
                { model: Prestacion, through: { attributes: [] } }, //info de las prestaciones
            ]
        });

        res.json(prescripcionCompleta);

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear la prescripción'
        });
    }
};

export const eliminarPrescripcion = async (req, res) => {
    const { id } = req.params;

    const transaccion = await sequelize.transaction();

    try {
        const prescripcion = await Prescripcion.findByPk(id);

        if (prescripcion) {
            await PrescripcionMedicamento.destroy({ //eliminar la info de la tabla prescripcion_medicamento
                where: { idPrescripcion: id },
                transaction: transaccion
            });

            await PrescripcionPrestacion.destroy({ //eliminar la info de la tabla prescripcion_prestacion
                where: { idPrescripcion: id },
                transaction: transaccion
            });

            await prescripcion.destroy({ transaction: transaccion }); //eliminar la prescripcion

            await transaccion.commit();

            res.json({
                msg: 'La prescripcion y sus tablas asociadas fueron eliminadas exitosamente'
            });

        } else {
            res.status(404).json({
                msg: `No existe una prescripción con el id ${id}`
            });
        }
    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar la prescripción y sus tablas asociadas'
        });
    }
};