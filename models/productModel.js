const { DataTypes } = require('sequelize');
const base = require('../config/bd');

const Producto = base.define('Producto', {
    idProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imagenes: { type: DataTypes.BLOB('long'), allowNull: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    nroDni: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Personas',
            key: 'nroDni'
        }
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Subcategoria',
            key: 'idCategoria'
        }
    },
    codSub: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Subcategoria',
            key: 'codSub'
        }
    }
}, {
    tableName: 'productos',
    timestamps: false
});

module.exports = Producto;