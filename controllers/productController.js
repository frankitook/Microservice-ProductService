const Producto = require('../models/productModel');


const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
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
    const { imagenes, descripcion, precio, nroDni, idCategoria, codSub } = req.body;
    try {
        const nuevoProducto = await Producto.create({ imagenes, descripcion, precio, nroDni, idCategoria, codSub });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};


const actualizarProducto = async (req, res) => {
    const { idProducto } = req.params; 
    const { descripcion, precio, imagenes, idCategoria, codSub, nroDni } = req.body; 

    try {
        const producto = await Producto.findOne({ where: { idProducto } }); 
        if (producto) {
            
            if (descripcion !== undefined) {
                producto.descripcion = descripcion;
            }
            if (precio !== undefined) {
                producto.precio = precio;
            }
            if (imagenes !== undefined) {
                producto.imagenes = imagenes;
            }
            if (idCategoria !== undefined) {
                producto.idCategoria = idCategoria;
            }
            if (codSub !== undefined) {
                producto.codSub = codSub;
            }
            if (nroDni !== undefined) {
                producto.nroDni = nroDni;
            }

            await producto.save(); 
            res.json(producto); 
        } else {
            res.status(404).json({ message: 'Producto no encontrado' }); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' }); 
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
    actualizarProducto,
    eliminarProducto,
};
