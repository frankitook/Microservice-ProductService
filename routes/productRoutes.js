const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productController');
const autenticacion = require('../middlewares/auth');

router.get('/', autenticacion.verificarToken, ProductoController.obtenerProductos);
router.post('/', autenticacion.verificarToken, ProductoController.crearProducto);
router.put('/:idProducto', autenticacion.verificarToken, ProductoController.actualizarProducto);
router.delete('/:idProducto', autenticacion.verificarToken, ProductoController.eliminarProducto);

module.exports = router;
