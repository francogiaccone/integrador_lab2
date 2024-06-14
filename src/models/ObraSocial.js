import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import PlanObraSocial from './PlanObraSocial.js';

const ObraSocial = sequelize.define('obrasocial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default ObraSocial;