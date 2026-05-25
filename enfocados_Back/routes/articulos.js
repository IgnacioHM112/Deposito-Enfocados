const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articuloController');

router.get('/', articuloController.listarArticulos);
router.post('/', articuloController.crearArticulo);
router.get('/:id', articuloController.obtenerDetalleArticulo);

module.exports = router;
