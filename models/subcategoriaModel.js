const { DataTypes } = require('sequelize');
const base = require('../config/bd');

const Subcategoria = base.define('Subcategoria', {
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categoria',
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