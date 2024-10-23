const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');
const autenticacion = require('../middlewares/auth');

router.get('/', autenticacion.verificarToken, CategoriaController.obtenerCategorias); 
router.get('/:idCategoria', autenticacion.verificarToken, CategoriaController.obtenerCategoriaPorId); 
router.post('/', autenticacion.verificarToken, CategoriaController.crearCategoria); 
router.put('/:idCategoria', autenticacion.verificarToken, CategoriaController.actualizarCategoria); 
router.delete('/:idCategoria', autenticacion.verificarToken, CategoriaController.eliminarCategoria); 
router.get('/:idCategoria/subcategorias', autenticacion.verificarToken, CategoriaController.obtenerSubcategoriasPorCategoria); 

module.exports = router;