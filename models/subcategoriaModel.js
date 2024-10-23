const { DataTypes } = require('sequelize');
const base = require('../configuration/db');

const Subcategoria = base.define('Subcategoria', {
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categorias',
            key: 'idCategoria'
        }
    },
    codSub: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'subcategorias',
    timestamps: false
});

module.exports = Subcategoria;