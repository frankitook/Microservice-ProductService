const { DataTypes } = require('sequelize');
const base = require('../configuration/db');

const Categoria = base.define('Categoria', {
    idCategoria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'categorias',
    timestamps: false
});


module.exports = Categoria;