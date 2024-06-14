import Persona from '../models/Persona.js';

export const obtenerPersonas = async (req, res) => {
    const personas = await Persona.findAll();

    res.json(personas);
}

export const obtenerPersona = async (req, res) => {
    const { id } = req.params;

    const persona = await Persona.findByPk(id);

    if (persona) {
        res.json(persona);
    } else {
        res.status(404).json({
            msg: `No existe una persona con el id ${id}`
        })
    }
}

export const crearPersona = async (req, res) => {
    const { body } = req;

    try {
        const nuevaPersona = await Persona.create(body);
        return res.json(nuevaPersona);

    } catch (error) {
        console.error(error);
        res.json({
            msg: 'Ocurrió un error al crear la persona'
        });
    }
}

export const editarPersona = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const persona = await Persona.findByPk(id);

        if (persona) {
            await persona.update(body);
            res.json({
                msg: `La persona (id ${id}) fue actualizada con éxito`
            });

        } else {
            res.status(404).json({
                msg: `No existe la persona con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error al actualizar la persona'
        });
    }
}

export const eliminarPersona = async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findByPk(id);

    if (persona) {
        await persona.destroy();
        res.json({
            msg: 'La persona fue eliminada exitosamente'
        });
    } else {
        res.status(404).json({
            msg: `No existe una persona con el id ${id}`
        });
    }
}