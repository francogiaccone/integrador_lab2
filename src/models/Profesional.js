import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Persona from './Persona.js';

const Profesional = sequelize.define('profesional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPersona: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profesion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idREFEPS: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
});

Persona.hasOne(Profesional, {
    foreignKey: 'idPersona',
    sourceKey: 'id'
});

Profesional.belongsTo(Persona, {
    foreignKey: 'idPersona',
    targetKey: 'id'
});

export default Profesional;