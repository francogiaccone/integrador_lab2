import { Router } from 'express';
import { obtenerPacientes, listarPacientes, obtenerPaciente, crearPaciente, editarPaciente, eliminarPaciente } from '../controllers/paciente.js';
import { listarPlanes } from '../controllers/planobrasocial.js'
import Paciente from '../models/Paciente.js';
import Persona from '../models/Persona.js';
import PlanObraSocial from '../models/PlanObraSocial.js';

const router = Router();

router.get('/buscar', obtenerPacientes);
router.get('/buscar/:id', obtenerPaciente);
router.post('/crear', crearPaciente);
router.put('/editar/:id', editarPaciente);
router.delete('/eliminar/:id', eliminarPaciente);

router.get('/', async (req, res) => {
    try {
        const pacientes = await listarPacientes();
        res.render('pages/paciente', { titulo: 'Paciente | Hospital', tituloMenu: "Menú Paciente", pacientes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pacientes');
    }
});

router.get('/crear', async (req, res) => {
    try {
        const planesObraSocial = await listarPlanes();
        res.render('pages/paciente-crear', { titulo: 'Paciente | Hospital', tituloMenu: "Crear Paciente", planesObraSocial });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pacientes');
    }
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pacientes = await listarPacientes();
        const planesObraSocial = await listarPlanes();
        const paciente = await Paciente.findByPk(id, {
            include: [
                { model: Persona },
                { model: PlanObraSocial }
            ]
        });
        res.render('pages/paciente-actualizar', { titulo: 'Paciente | Hospital', tituloMenu: `Actualizar Paciente (id: ${id})`, pacientes, planesObraSocial, paciente });
    } catch (error) {
        console.error(error);
        res.status(500).send('No existe el paciente con ese id');
    }
});

export default router;