import sequelize from '../database/database.js';
import Medicamento from '../models/Medicamento.js';
import Categoria from '../models/Categoria.js';
import Familia from '../models/Familia.js';
import MedicamentoFormaFarmaceutica from '../models/MedicamentoFormaFarmaceutica.js';
import MedicamentoMonodroga from '../models/MedicamentoMonodroga.js';
import FormaFarmaceutica from '../models/FormaFarmaceutica.js';
import Monodroga from '../models/Monodroga.js';
import UnidadMedida from '../models/UnidadMedida.js';

export const listarMedicamentos = async () => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Familia, as: 'familia' },
                { model: FormaFarmaceutica, as: 'formasFarmaceuticas' },
                {
                    model: MedicamentoMonodroga,
                    as: 'medicamentoMonodrogas',
                    include: [
                        { model: Monodroga, as: 'monodroga' },
                        { model: UnidadMedida, as: 'unidadMedida' },
                    ],
                },
            ],
        });
        return medicamentos;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los medicamentos'
        });
    }
};

export const obtenerMedicamentos = async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Familia, as: 'familia' },
                { model: FormaFarmaceutica, as: 'formasFarmaceuticas' },
                {
                    model: MedicamentoMonodroga,
                    as: 'medicamentoMonodrogas',
                    include: [
                        { model: Monodroga, as: 'monodroga' },
                        { model: UnidadMedida, as: 'unidadMedida' },
                    ],
                },
            ],
        });
        res.json(medicamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los medicamentos'
        });
    }
};

export const obtenerMedicamento = async (req, res) => {
    const { id } = req.params;

    const medicamento = await Medicamento.findByPk(id, {
        include: [
            { model: Categoria, as: 'categoria' },
            { model: Familia, as: 'familia' },
            { model: FormaFarmaceutica, as: 'formasFarmaceuticas' },
            {
                model: MedicamentoMonodroga,
                as: 'medicamentoMonodrogas',
                include: [
                    { model: Monodroga, as: 'monodroga' },
                    { model: UnidadMedida, as: 'unidadMedida' },
                ],
            },
        ],
    });

    if (medicamento) {
        res.json(medicamento);
    } else {
        res.status(404).json({
            msg: `No existe un medicamento con el id ${id}`
        });
    }
};

export const crearMedicamento = async (req, res) => {
    const {
        nombreGenerico, nombreComercial, idCategoria, idFamilia,
        idsFormasFarmaceuticas, idsMonodrogas, concentracion, idUnidadMedida
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const medicamento = await Medicamento.create({ //crear el medicamento
            nombreGenerico, nombreComercial, idCategoria, idFamilia
        }, { transaction: transaccion });

        for (const idFormaFarmaceutica of idsFormasFarmaceuticas) { //crear una o multiples formas farmaceuticas
            await MedicamentoFormaFarmaceutica.create({
                idMedicamento: medicamento.id,
                idFormaFarmaceutica
            }, { transaction: transaccion });
        }

        for (const idMonodroga of idsMonodrogas) { //crear una o multiples monodrogas
            await MedicamentoMonodroga.create({
                idMedicamento: medicamento.id,
                idMonodroga,
                concentracion,
                idUnidadMedida
            }, { transaction: transaccion });
        }

        await transaccion.commit();

        const medicamentoCompleto = await Medicamento.findByPk(medicamento.id, {
            include: [
                { model: Categoria },
                { model: Familia },
                { model: FormaFarmaceutica, through: { attributes: [] } },
                { model: Monodroga, through: { attributes: [] } },
                { model: MedicamentoMonodroga, include: [{ model: UnidadMedida }] }
            ]
        });

        res.json(medicamentoCompleto);

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear el medicamento'
        });
    }
};

export const editarMedicamento = async (req, res) => {
    const { id } = req.params;
    const {
        nombreGenerico, nombreComercial, idCategoria, idFamilia,
        idsFormasFarmaceuticas, idsMonodrogas, concentracion, idUnidadMedida
    } = req.body;

    const transaccion = await sequelize.transaction();

    try {
        const medicamento = await Medicamento.findByPk(id);

        if (!medicamento) {
            return res.status(404).json({
                msg: `No existe un medicamento con el id ${id}`
            });
        }

        await medicamento.update({ //actualizar info del medicamento
            nombreGenerico,
            nombreComercial,
            idCategoria,
            idFamilia
        }, { transaction: transaccion });

        //actualizar info de las formasFarmaceuticas del medicamento
        if (idsFormasFarmaceuticas.length > 0) {
            await MedicamentoFormaFarmaceutica.destroy({ //eliminar las formasfarmaceuticas asociadas al medicamento
                where: { idMedicamento: id },
                transaction: transaccion
            });

            for (const idFormaFarmaceutica of idsFormasFarmaceuticas) {
                await MedicamentoFormaFarmaceutica.create({
                    idMedicamento: id,
                    idFormaFarmaceutica
                }, { transaction: transaccion });
            }
        }

        //actualizar info de las monodrogas del medicamento
        if (idsMonodrogas.length > 0) {
            await MedicamentoMonodroga.destroy({ //eliminar las monodrogas asociadas al medicamento
                where: { idMedicamento: id },
                transaction: transaccion
            });

            for (const idMonodroga of idsMonodrogas) {
                await MedicamentoMonodroga.create({
                    idMedicamento: id,
                    idMonodroga,
                    concentracion,
                    idUnidadMedida
                }, { transaction: transaccion });
            }
        }

        await transaccion.commit();

        const medicamentoActualizado = await Medicamento.findByPk(id, {
            include: [
                { model: Categoria },
                { model: Familia },
                { model: FormaFarmaceutica, through: { attributes: [] } },
                { model: Monodroga, through: { attributes: [] } },
                { model: MedicamentoMonodroga, include: [{ model: UnidadMedida }] }
            ]
        });

        res.json(medicamentoActualizado);

    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al actualizar el medicamento y sus tablas'
        });
    }
};

export const eliminarMedicamento = async (req, res) => {
    const { id } = req.params;

    const transaccion = await sequelize.transaction();

    try {
        const medicamento = await Medicamento.findByPk(id);

        if (medicamento) {
            await MedicamentoFormaFarmaceutica.destroy({ //eliminar la info de la tabla medicamento_formafarmaceutica
                where: { idMedicamento: id },
                transaction: transaccion
            });

            await MedicamentoMonodroga.destroy({ //eliminar la info de la tabla medicamento_monodroga
                where: { idMedicamento: id },
                transaction: transaccion
            });

            await medicamento.destroy({ transaction: transaccion }); //eliminar el medicamento

            await transaccion.commit();

            res.json({
                msg: 'El medicamento y sus tablas asociadas fueron eliminadas exitosamente'
            });

        } else {
            res.status(404).json({
                msg: `No existe un medicamento con el id ${id}`
            });
        }
    } catch (error) {
        await transaccion.rollback();
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar el medicamento y sus tablas asociadas'
        });
    }
};