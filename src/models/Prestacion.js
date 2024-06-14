import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Prestacion = sequelize.define('prestacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    indicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    justificacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Prestacion;