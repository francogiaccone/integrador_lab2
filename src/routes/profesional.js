import { Router } from 'express';
import { obtenerProfesionales, listarEspecialidades, obtenerProfesional, crearProfesional, editarProfesional, eliminarProfesional } from '../controllers/profesional.js';
import Profesional from '../models/Profesional.js';
import Especialidad from '../models/Especialidad.js';
import Persona from '../models/Persona.js';

const router = Router();

router.get('/buscar', obtenerProfesionales);
router.get('/buscar/:id', obtenerProfesional);
router.post('/crear', crearProfesional);
router.put('/editar/:id', editarProfesional);
router.delete('/eliminar/:id', eliminarProfesional);

router.get('/', async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: [
                { model: Persona }, //info del modelo de persona
                { model: Especialidad } //info del modelo de las Especialidades
            ]
        });
        res.render('pages/profesional', { titulo: 'Profesional | Hospital', tituloMenu: "Menú Profesional", profesionales });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los profesionales');
    }
});

router.get('/crear', async (req, res) => {
    try {
        const especialidades = await listarEspecialidades();
        res.render('pages/profesional-crear', { titulo: 'Profesional | Hospital', tituloMenu: "Crear Profesional", especialidades });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los profesionales');
    }
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const especialidades = await listarEspecialidades();
        const profesional = await Profesional.findByPk(id, {
            include: [
                { model: Persona },
                { model: Especialidad, through: { attributes: [] } }
            ]
        });
        res.render('pages/profesional-actualizar', { titulo: 'Profesional | Hospital', tituloMenu: `Actualizar Profesional (id: ${id})`, profesional, especialidades });
    } catch (error) {
        console.error(error);
        res.status(500).send('No existe el profesional con ese id');
    }
});

export default router;