import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Categoria from './Categoria.js';
import Familia from './Familia.js';
import MedicamentoMonodroga from './MedicamentoMonodroga.js';
import FormaFarmaceutica from './FormaFarmaceutica.js';
import MedicamentoFormaFarmaceutica from './MedicamentoFormaFarmaceutica.js';
import Monodroga from './Monodroga.js';
import UnidadMedida from './UnidadMedida.js';

const Medicamento = sequelize.define('medicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreGenerico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreComercial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idFamilia: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Medicamento.belongsTo(Categoria, {
    foreignKey: 'idCategoria',
    as: 'categoria',
});

Medicamento.belongsTo(Familia, {
    foreignKey: 'idFamilia',
    as: 'familia',
});

Medicamento.belongsToMany(FormaFarmaceutica, {
    through: MedicamentoFormaFarmaceutica,
    foreignKey: 'idMedicamento',
    otherKey: 'idFormaFarmaceutica',
    as: 'formasFarmaceuticas',
});

Medicamento.hasMany(MedicamentoMonodroga, {
    foreignKey: 'idMedicamento',
    as: 'medicamentoMonodrogas',
});

MedicamentoMonodroga.belongsTo(Medicamento, {
    foreignKey: 'idMedicamento',
    as: 'medicamento',
});

MedicamentoMonodroga.belongsTo(Monodroga, {
    foreignKey: 'idMonodroga',
    as: 'monodroga',
});

MedicamentoMonodroga.belongsTo(UnidadMedida, {
    foreignKey: 'idUnidadMedida',
    as: 'unidadMedida',
});

export default Medicamento;