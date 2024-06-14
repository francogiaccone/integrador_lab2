import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import MedicamentoMonodroga from './MedicamentoMonodroga.js';

const UnidadMedida = sequelize.define('unidadmedida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abreviatura: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default UnidadMedida;