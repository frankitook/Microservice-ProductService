const { DataTypes } = require('sequelize');
const base = require('../configuration/db');

const Producto = base.define('Producto', {
    idProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imagen1: { type: DataTypes.BLOB('long'), allowNull: true }, 
    imagen2: { type: DataTypes.BLOB('long'), allowNull: true }, 
    imagen3: { type: DataTypes.BLOB('long'), allowNull: true }, 
    descripcion: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    stock: {type:DataTypes.INTEGER, allowNull: true},
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subcategorias',
            key: 'idCategoria'
        }
    },
    codSub: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subcategorias',
            key: 'codSub'
        }
    }
}, {
    tableName: 'productos',
    timestamps: false
});

module.exports = Producto;
