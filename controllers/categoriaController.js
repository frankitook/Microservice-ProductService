const Categoria = require('../models/categoriaModel');
const Subcategoria = require('../models/subcategoriaModel');

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
};

const obtenerCategoriaPorId = async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const categoria = await Categoria.findOne({ where: { idCategoria } });
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = await Categoria.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría' });
    }
};


const actualizarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    const { nombre } = req.body;
    try {
        const categoria = await Categoria.findOne({ where: { idCategoria } });
        if (categoria) {
            if (nombre !== undefined) {
                categoria.nombre = nombre; 
            }
            await categoria.save(); 
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
};


const eliminarCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    try {
        
        const subcategorias = await Subcategoria.findAll({ where: { idCategoria } });
        if (subcategorias.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar la categoría porque tiene subcategorías asociadas' });
        }

        const categoria = await Categoria.findOne({ where: { idCategoria } });
        if (categoria) {
            await categoria.destroy(); 
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
};

const obtenerSubcategoriasPorCategoria = async (req, res) => {
    const { idCategoria } = req.params;
    try {
        const subcategorias = await Subcategoria.findAll({ where: { idCategoria } });
        if (subcategorias.length > 0) {
            res.json(subcategorias);
        } else {
            res.status(404).json({ message: 'No se encontraron subcategorías para esta categoría' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las subcategorías' });
    }
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerSubcategoriasPorCategoria
};