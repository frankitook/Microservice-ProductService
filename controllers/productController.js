const Producto = require('../models/productModel');
const { Op } = require('sequelize');


const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};


const obtenerProductosEnStock = async (req, res)=>{

try{

    const productosEnStock = await Producto.findAll({ where: { stock: { [Op.gt]: 0 } } });

    if (productosEnStock.length > 0) {
        res.json(productosEnStock);
    } else {
        res.status(404).json({ message: 'No se encontraron productos en stock' });
    }

}catch(err){
    res.status(500).json({ message: 'Error al obtener los productos en stock' });
}


};


const obtenerProductoPorId = async (req, res) => {
    const { idProducto } = req.params;
    try {
        const producto = await Producto.findOne({ where: { idProducto } });
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};




const crearProducto = async (req, res) => {
    const { descripcion, precio, idCategoria, codSub, stock } = req.body;

   
    const imagen1 = req.files['imagen1'] ? req.files['imagen1'][0].buffer : null;
    const imagen2 = req.files['imagen2'] ? req.files['imagen2'][0].buffer : null;
    const imagen3 = req.files['imagen3'] ? req.files['imagen3'][0].buffer : null;

    try {
        const nuevoProductoData = {
            descripcion,
            precio,
            idCategoria,
            codSub,
            imagen1,
            imagen2,
            imagen3,
            stock
        };

        const nuevoProducto = await Producto.create(nuevoProductoData);

        res.status(201).json({ message: 'Producto creado correctamente', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};
  



const actualizarProducto = async (req, res) => {
    const { idProducto } = req.params;
    const { descripcion, precio, idCategoria, codSub, stock } = req.body;

    const imagen1 = req.files ? (req.files['imagen1'] ? req.files['imagen1'][0].buffer : null) : null;
    const imagen2 = req.files ? (req.files['imagen2'] ? req.files['imagen2'][0].buffer : null) : null;
    const imagen3 = req.files ? (req.files['imagen3'] ? req.files['imagen3'][0].buffer : null) : null;

    try {
        const numRowsUpdated = await Producto.update(
            {
                descripcion: descripcion !== undefined ? descripcion : undefined,
                stock: stock !== undefined ? stock : undefined,
                precio: precio !== undefined ? precio : undefined,
                idCategoria: idCategoria !== undefined ? idCategoria : undefined,
                codSub: codSub !== undefined ? codSub : undefined,
                imagen1: imagen1 !== null ? imagen1 : undefined,
                imagen2: imagen2 !== null ? imagen2 : undefined,
                imagen3: imagen3 !== null ? imagen3 : undefined
            },
            {
                where: { idProducto }
            }
        );

        if (numRowsUpdated > 0) {
            const updatedProduct = await Producto.findOne({ where: { idProducto } });
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};













const eliminarProducto = async (req, res) => {
    const { idProducto } = req.params;
    try {
        const producto = await Producto.findOne({ where: { idProducto } });
        if (producto) {
            await producto.destroy();
            res.json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    eliminarProducto,
    obtenerProductosEnStock,
    actualizarProducto,
};
