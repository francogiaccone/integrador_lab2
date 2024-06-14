import { Router } from 'express';
import { obtenerMedicamento, obtenerMedicamentos, crearMedicamento, editarMedicamento, eliminarMedicamento } from '../controllers/medicamento.js';
import Medicamento from '../models/Medicamento.js';
import Categoria from '../models/Categoria.js';
import Familia from '../models/Familia.js';
import FormaFarmaceutica from '../models/FormaFarmaceutica.js';
import Monodroga from '../models/Monodroga.js';
import UnidadMedida from '../models/UnidadMedida.js';
import MedicamentoMonodroga from '../models/MedicamentoMonodroga.js';

const router = Router();

router.get('/buscar', obtenerMedicamentos);
router.get('/buscar/:id', obtenerMedicamento);
router.post('/crear', crearMedicamento);
router.put('/editar/:id', editarMedicamento);
router.delete('/eliminar/:id', eliminarMedicamento);

router.get('/', async (req, res) => {
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
        res.render('pages/medicamento', { titulo: 'Medicamento | Hospital', tituloMenu: "Menú Medicamento", medicamentos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los medicamentos');
    }
});

export default router;