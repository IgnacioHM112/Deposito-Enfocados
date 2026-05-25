const despachoService = require('../services/despachoService');

exports.registrarDespacho = async (req, res, next) => {
  try {
    const despacho = await despachoService.registrarDespacho(req.body);
    res.status(201).json(despacho);
  } catch (error) {
    next(error);
  }
};
