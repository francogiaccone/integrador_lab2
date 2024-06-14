import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Profesional from './Profesional.js';
import Especialidad from './Especialidad.js';

const ProfesionalEspecialidad = sequelize.define('profesional_especialidad', {
    idProfesional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idEspecialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
});

Profesional.belongsToMany(Especialidad, {
    through: ProfesionalEspecialidad,
    foreignKey: 'idProfesional',
    otherKey: 'idEspecialidad'
});

Especialidad.belongsToMany(Profesional, {
    through: ProfesionalEspecialidad,
    foreignKey: 'idEspecialidad',
    otherKey: 'idProfesional'
});

export default ProfesionalEspecialidad;