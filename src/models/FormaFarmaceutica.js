import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const FormaFarmaceutica = sequelize.define('formafarmaceutica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default FormaFarmaceutica;