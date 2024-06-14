import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const MedicamentoFormaFarmaceutica = sequelize.define('medicamento_formafarmaceutica', {
    idMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idFormaFarmaceutica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
});

export default MedicamentoFormaFarmaceutica;