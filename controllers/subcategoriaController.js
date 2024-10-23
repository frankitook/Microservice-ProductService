const Subcategoria = require('../models/subcategoriaModel');
const Producto = require('../models/productModel'); 

const obtenerProductosPorSubcategoria = async (req, res) => {
    const { codSub } = req.params;
    try {
        const productos = await Producto.findAll({ where: { codSub } });
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).json({ message: 'No se encontraron productos para esta subcategoría' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos de la subcategoría' });
    }
};

const obtenerSubcategorias= async (req,res) => {
    
    try {
        const subcategorias = await Subcategoria.findAll();
        res.json(subcategorias);

        
    } catch (error) {
        
        res.status(500).json({ message: 'Error al obtener las subcategorias' });
    };

}


const obtenerSubcategoriaPorCodSub = async (req, res) => {
    const { codSub } = req.params;
    try {
        const subcategoria = await Subcategoria.findOne({ where: { codSub } });
        if (subcategoria) {
            res.json(subcategoria);
        } else {
            res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la subcategoría' });
    }
};



const crearSubcategoria = async (req, res) => {
    const { idCategoria, codSub, nombre } = req.body;
    try {
        const nuevaSubcategoria = await Subcategoria.create({ idCategoria, codSub, nombre });
        res.status(201).json(nuevaSubcategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la subcategoría' });
    }
};


const eliminarSubcategoria = async (req, res) => {
    const { codSub } = req.params;
    try {
        const subcategoria = await Subcategoria.findOne({ where: { codSub } });
        if (subcategoria) {
            await subcategoria.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la subcategoría' });
    }
};


const actualizarSubcategoria = async (req, res) => {
    const { codSub } = req.params;
    const { idCategoria, nombre } = req.body;
    try {
        const subcategoria = await Subcategoria.findOne({ where: { codSub } });
        if (subcategoria) {
            
            if (idCategoria !== undefined) {
                subcategoria.idCategoria = idCategoria; 
            }
            if (nombre !== undefined) {
                subcategoria.nombre = nombre; 
            }

            await subcategoria.save(); 
            res.json(subcategoria);
        } else {
            res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la subcategoría' });
    }
};



module.exports ={obtenerSubcategorias,obtenerSubcategoriaPorCodSub, crearSubcategoria, eliminarSubcategoria, actualizarSubcategoria, obtenerProductosPorSubcategoria};