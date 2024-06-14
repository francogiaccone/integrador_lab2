import sequelize from '../database/database.js';
import Profesional from '../models/Profesional.js';
import Persona from '../models/Persona.js';
import ProfesionalEspecialidad from '../models/ProfesionalEspecialidad.js';
import Especialidad from '../models/Especialidad.js';

export const obtenerProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: [
                { model: Persona }, //info del modelo de persona
                { model: Especialidad } //info del modelo de las Especialidades
            ]
        });
        res.json(profesionales);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los profesionales'
        });
    }
};

export const listarEspecialidades = async () => {
    try {
        const especialidades = Especialidad.findAll();
        return especialidades;

    } catch (error) {
        console.error(error);
        return {
            msg: 'Ocurrió un error al obtener las especialidades'
        };
    }
};

export const obtenerProfesional = async (req, res) => {
    const { id } = req.params;

    try {
        const profesional = await Profesional.findByPk(id, {
            include: [
                { model: Persona }, //info del modelo de persona
                { model: Especialidad, through: { attributes: [] } } //info del modelo de las especialidades
            ]
        });

        if (profesional) {
            res.json(profesional);
        } else {
            res.status(404).json({
                msg: `No existe un profesional con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener el profesional'
        });
    }
};

export const crearProfesional = async (req, res) => {
    const {
        nombre, apellido, documento, fechaNacimiento, domicilio, sexo,
        profesion, matricula, idsEspecialidades, idREFEPS
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const persona = await Persona.create({ //crear la persona
            nombre, apellido, documento, fechaNacimiento, domicilio, sexo
        }, { transaction: transaccion });

        const profesional = await Profesional.create({ //crear el profesional al partir de la persona
            idPersona: persona.id, profesion, matricula, idREFEPS
        }, { transaction: transaccion });

        for (const idEspecialidad of idsEspecialidades) { //crear una o multiples especialidades
            await ProfesionalEspecialidad.create({
                idProfesional: profesional.id,
                idEspecialidad
            }, { transaction: transaccion });
        }

        await transaccion.commit();

        const especialidades = ProfesionalEspecialidad.findAll({
            where: {
                idProfesional: profesional.id
            }
        });

        res.json({
            persona,
            profesional,
            especialidades
        });

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear el profesional'
        });
    }
};

export const editarProfesional = async (req, res) => {
    const { id } = req.params;
    const { 
        nombre, apellido, documento, fechaNacimiento, domicilio, sexo,
        profesion, matricula, idREFEPS, idsEspecialidades 
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const profesional = await Profesional.findByPk(id);

        if (!profesional) {
            return res.status(404).json({
                msg: `No existe un profesional con el id ${id}`
            });
        }

        await profesional.update({ //actualizar info del profesional
            profesion,
            matricula,
            idREFEPS
        }, { transaction: transaccion });

        //actualizar info de la persona del profesional
        const persona = await profesional.getPersona({ transaction: transaccion });
        await persona.update({
            nombre,
            apellido,
            documento,
            fechaNacimiento,
            domicilio,
            sexo
        }, { transaction: transaccion });

        //actualizar info de las especialidades del profesional
        if (idsEspecialidades.length > 0) {
            await ProfesionalEspecialidad.destroy({
                where: {
                    idProfesional: id,
                },
                transaction: transaccion
            });

            for (const idEspecialidad of idsEspecialidades) {
                await ProfesionalEspecialidad.create({
                    idProfesional: id,
                    idEspecialidad
                }, { transaction: transaccion });
            }
        }

        await transaccion.commit();

        const profesionalActualizado = await Profesional.findByPk(id, {
            include: [
                { model: Persona },
                { model: Especialidad, through: { attributes: [] } }
            ]
        });

        res.json(profesionalActualizado);

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al actualizar el profesional y sus especialidades'
        });
    }
};

export const eliminarProfesional = async (req, res) => {
    const { id } = req.params;

    const transaccion = await sequelize.transaction();

    try {
        const profesional = await Profesional.findByPk(id);

        if (profesional) {
            await ProfesionalEspecialidad.destroy({ //eliminar la info de la tabla profesional_especialidad
                where: { idProfesional: id },
                transaction: transaccion
            });

            await profesional.destroy({ transaction: transaccion }); //eliminar el profesional

            await transaccion.commit();

            res.json({
                msg: 'El profesional y sus especialidades asociadas fueron eliminados exitosamente'
            });

        } else {
            res.status(404).json({
                msg: `No existe un profesional con el id ${id}`
            });
        }
    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar el profesional y sus especialidades asociadas'
        });
    }
};