import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Monodroga from './Monodroga.js';
import UnidadMedida from './UnidadMedida.js';
import Medicamento from './Medicamento.js';

const MedicamentoMonodroga = sequelize.define('medicamento_monodroga', {
    idMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idMonodroga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    concentracion: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    idUnidadMedida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export default MedicamentoMonodroga;