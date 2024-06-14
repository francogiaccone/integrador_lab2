import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const PrescripcionPrestacion = sequelize.define('prescripcion_prestacion', {
    idPrescripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idPrestacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
});

export default PrescripcionPrestacion;