const express = require('express');
const router = express.Router();
const despachoController = require('../controllers/despachoController');

router.post('/', despachoController.registrarDespacho);

module.exports = router;
