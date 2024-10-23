const express = require('express');
const router = express.Router();
const SubcategoriaController = require('../controllers/subcategoriaController');
const autenticacion = require('../middlewares/auth');

router.get('/', autenticacion.verificarToken, SubcategoriaController.obtenerSubcategorias); 
router.get('/:codSub', autenticacion.verificarToken, SubcategoriaController.obtenerSubcategoriaPorCodSub); 
router.get('/:codSub/productos', autenticacion.verificarToken, SubcategoriaController.obtenerProductosPorSubcategoria);
router.post('/', autenticacion.verificarToken, SubcategoriaController.crearSubcategoria); 
router.put('/:codSub', autenticacion.verificarToken, SubcategoriaController.actualizarSubcategoria); 
router.delete('/:codSub', autenticacion.verificarToken, SubcategoriaController.eliminarSubcategoria); 

module.exports = router;