import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Monodroga = sequelize.define('monodroga', {
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

export default Monodroga;