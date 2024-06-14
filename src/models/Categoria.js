import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Categoria = sequelize.define('categoria', {
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

export default Categoria;