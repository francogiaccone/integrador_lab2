import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Persona from './Persona.js';
import PlanObraSocial from './PlanObraSocial.js';

const Paciente = sequelize.define('paciente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPersona: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPlanObraSocial: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Persona.hasOne(Paciente, {
    foreignKey: 'idPersona',
    sourceKey: 'id'
});

Paciente.belongsTo(Persona, {
    foreignKey: 'idPersona',
    targetKey: 'id'
});

PlanObraSocial.hasOne(Paciente, {
    foreignKey: 'idPlanObraSocial',
    sourceKey: 'id'
});

Paciente.belongsTo(PlanObraSocial, {
    foreignKey: 'idPlanObraSocial',
    targetKey: 'id'
});

export default Paciente;