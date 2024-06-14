import { Router } from 'express';
import { obtenerPrestaciones, obtenerPrestacion, crearPrestacion, editarPrestacion, eliminarPrestacion } from '../controllers/prestacion.js';
import Prestacion from '../models/Prestacion.js';

const router = Router();

router.get('/buscar', obtenerPrestaciones);
router.get('/buscar/:id', obtenerPrestacion);
router.post('/crear', crearPrestacion);
router.put('/editar/:id', editarPrestacion);
router.delete('/eliminar/:id', eliminarPrestacion);

router.get('/', async (req, res) => {
    try {
        const prestaciones = await Prestacion.findAll();
        res.render('pages/prestacion', { titulo: 'Prestación | Hospital', tituloMenu: "Menú Prestación", prestaciones });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las prestaciones');
    }
});

router.get('/crear', async (req, res) => {
    res.render('pages/prestacion-crear', { titulo: 'Prestación | Hospital', tituloMenu: "Crear Prestación" });
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prestacion = await Prestacion.findByPk(id);
        res.render('pages/prestacion-actualizar', { titulo: 'Prestación | Hospital', tituloMenu: `Actualizar Prestación (id: ${id})`, prestacion });
    } catch (error) {
        console.error(error);
        res.status(500).send('No existe la prestacion con ese id');
    }
});

export default router;