import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Medicamento from './Medicamento.js';
import Prestacion from './Prestacion.js';
import PrescripcionMedicamento from './PrescripcionMedicamento.js';
import PrescripcionPrestacion from './PrescripcionPrestacion.js';
import Profesional from './Profesional.js';
import Paciente from './Paciente.js';

const Prescripcion = sequelize.define('prescripcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfesional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaPrescripcion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    vigencia: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Prescripcion.belongsToMany(Medicamento, {
    through: PrescripcionMedicamento,
    foreignKey: 'idPrescripcion',
    otherKey: 'idMedicamento'
});

Medicamento.belongsToMany(Prescripcion, {
    through: PrescripcionMedicamento,
    foreignKey: 'idMedicamento',
    otherKey: 'idPrescripcion'
});

Prescripcion.belongsToMany(Prestacion, {
    through: PrescripcionPrestacion,
    foreignKey: 'idPrescripcion',
    otherKey: 'idPrestacion'
});

Prestacion.belongsToMany(Prescripcion, {
    through: PrescripcionPrestacion,
    foreignKey: 'idPrestacion',
    otherKey: 'idPrescripcion'
});

Prescripcion.belongsTo(Profesional, { foreignKey: 'idProfesional' });
Prescripcion.belongsTo(Paciente, { foreignKey: 'idPaciente' });

export default Prescripcion;