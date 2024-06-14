import { Router } from 'express';
import { obtenerPrescripcion, obtenerPrescripciones, crearPrescripcion, eliminarPrescripcion, listarPrescripcion, listarPrescripciones } from '../controllers/prescripcion.js';
import { listarPacientes } from '../controllers/paciente.js';
import { listarPrestaciones } from '../controllers/prestacion.js';
import { listarMedicamentos } from '../controllers/medicamento.js';

const router = Router();

router.get('/buscar', obtenerPrescripciones);
router.get('/buscar/:id', obtenerPrescripcion);
router.post('/crear', crearPrescripcion);
router.delete('/eliminar/:id', eliminarPrescripcion);

router.get('/', async (req, res) => {
    try {
        const prescripciones = await listarPrescripciones();
        res.render('pages/prescripcion', { titulo: 'Prescripción | Hospital', tituloMenu: "Menú Prescripción", prescripciones });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las prescripciones');
    }
});

router.get('/crear', async (req, res) => {
    try {
        const pacientes = await listarPacientes();
        const prestaciones = await listarPrestaciones();
        const medicamentos = await listarMedicamentos();
        res.render('pages/prescripcion-crear', { titulo: 'Prescripción | Hospital', tituloMenu: "Crear Prescripción", pacientes, prestaciones, medicamentos});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las prescripciones');
    }
});

router.get('/ver/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescripcion = await listarPrescripcion(id)
        res.render('pages/prescripcion-ver', { titulo: 'Prescripción | Hospital', prescripcion});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las prescripciones');
    }
});

export default router;