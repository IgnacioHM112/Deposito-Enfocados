const articuloService = require('../services/articuloService');

exports.listarArticulos = async (req, res, next) => {
  try {
    const articulos = await articuloService.listarArticulos();
    res.json(articulos);
  } catch (error) {
    next(error);
  }
};

exports.crearArticulo = async (req, res, next) => {
  try {
    const articulo = await articuloService.crearArticulo(req.body);
    res.status(201).json(articulo);
  } catch (error) {
    next(error);
  }
};

exports.obtenerDetalleArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articulo = await articuloService.obtenerArticuloPorId(id);
    if (!articulo) return res.status(404).json({ error: 'Artículo no encontrado' });

    if (articulo.tipo === 'producto_terminado') {
      articulo.componentes = await articuloService.obtenerComponentesKit(id);
    }

    res.json(articulo);
  } catch (error) {
    next(error);
  }
};
