const movimientoService = require('../services/movimientoService');

exports.registrarMovimiento = async (req, res, next) => {
  try {
    const movimiento = await movimientoService.registrarMovimiento(req.body);
    res.status(201).json(movimiento);
  } catch (error) {
    next(error);
  }
};

exports.listarMovimientos = async (req, res, next) => {
  try {
    const movimientos = await movimientoService.listarMovimientos();
    res.json(movimientos);
  } catch (error) {
    next(error);
  }
};
