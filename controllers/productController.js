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
    const { descripcion, precio, idCategoria, codSub } = req.body;

   
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
        };

        const nuevoProducto = await Producto.create(nuevoProductoData);

        res.status(201).json({ message: 'Producto creado correctamente', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};
  



const actualizarProducto = async (req, res) => {
    const { idProducto } = req.params;
    const { descripcion, precio, idCategoria, codSub } = req.body;

    const imagen1 = req.files['imagen1'] ? req.files['imagen1'][0].buffer : null;
    const imagen2 = req.files['imagen2'] ? req.files['imagen2'][0].buffer : null;
    const imagen3 = req.files['imagen3'] ? req.files['imagen3'][0].buffer : null;

    try {
        const producto = await Producto.findOne({ where: { idProducto } });
        if (producto) {
            if (descripcion !== undefined) {
                producto.descripcion = descripcion;
            }
            if (precio !== undefined) {
                producto.precio = precio;
            }
            if (idCategoria !== undefined) {
                producto.idCategoria = idCategoria;
            }
            if (codSub !== undefined) {
                producto.codSub = codSub;
            }
            if (imagen1) producto.imagen1 = imagen1;
            if (imagen2) producto.imagen2 = imagen2;
            if (imagen3) producto.imagen3 = imagen3;

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
