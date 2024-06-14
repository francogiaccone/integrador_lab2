import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import ObraSocial from './ObraSocial.js';

const PlanObraSocial = sequelize.define('plan_obrasocial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idObraSocial: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

PlanObraSocial.belongsToMany(ObraSocial, {
    through: 'ObraSocial_PlanObraSocial',
    foreignKey: 'idPlanObraSocial',
    otherKey: 'idObraSocial'
});

ObraSocial.belongsToMany(PlanObraSocial, {
    through: 'ObraSocial_PlanObraSocial',
    foreignKey: 'idObraSocial',
    otherKey: 'idPlanObraSocial',
    as: 'planes'
});
export default PlanObraSocial;