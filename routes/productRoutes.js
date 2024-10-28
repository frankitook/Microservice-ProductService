const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productController');
const autenticacion = require('../middlewares/auth');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage });



router.get('/', ProductoController.obtenerProductos);
router.get('/:idProducto', productController.obtenerProductoPorId);

router.post('/', upload.fields([
    { name: 'imagen1', maxCount: 1 },
    { name: 'imagen2', maxCount: 1 },
    { name: 'imagen3', maxCount: 1 }
]), ProductoController.crearProducto);

router.put('/:idProducto', ProductoController.actualizarProducto);
router.delete('/:idProducto', autenticacion.verificarToken, ProductoController.eliminarProducto);

module.exports = router;


