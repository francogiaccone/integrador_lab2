import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const PrescripcionMedicamento = sequelize.define('prescripcion_medicamento', {
    idPrescripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    frecuencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default PrescripcionMedicamento;