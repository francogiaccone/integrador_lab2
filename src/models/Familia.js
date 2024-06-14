import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Familia = sequelize.define('familia', {
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

export default Familia;