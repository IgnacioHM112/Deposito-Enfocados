const pool = require('../config/db');

exports.registrarDespacho = async ({ articulo_id, cantidad }) => {
  if (!articulo_id || !cantidad || cantidad <= 0) {
    const error = new Error('Articulo_id y cantidad positiva son obligatorios');
    error.status = 400;
    throw error;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [articuloRows] = await connection.execute(
      'SELECT id, tipo, stock_unidades FROM articulos WHERE id = ?',
      [articulo_id]
    );
    if (articuloRows.length === 0) {
      const error = new Error('Artículo no encontrado');
      error.status = 404;
      throw error;
    }

    const articulo = articuloRows[0];
    if (articulo.tipo === 'simple') {
      if (articulo.stock_unidades < cantidad) {
        const error = new Error('Stock insuficiente para el artículo simple');
        error.status = 400;
        throw error;
      }
      await connection.execute(
        'UPDATE articulos SET stock_unidades = stock_unidades - ? WHERE id = ?',
        [cantidad, articulo_id]
      );
    } else {
      const [componentes] = await connection.execute(
        `SELECT c.articulo_simple_id, c.cantidad, a.stock_unidades
         FROM composicion c
         JOIN articulos a ON a.id = c.articulo_simple_id
         WHERE c.articulo_compuesto_id = ?`,
        [articulo_id]
      );

      if (componentes.length === 0) {
        const error = new Error('El artículo compuesto no tiene componentes definidos');
        error.status = 400;
        throw error;
      }

      for (const componente of componentes) {
        const requerido = componente.cantidad * cantidad;
        if (componente.stock_unidades < requerido) {
          const error = new Error(`Stock insuficiente en el componente ${componente.articulo_simple_id}`);
          error.status = 400;
          throw error;
        }
      }

      for (const componente of componentes) {
        const requerido = componente.cantidad * cantidad;
        await connection.execute(
          'UPDATE articulos SET stock_unidades = stock_unidades - ? WHERE id = ?',
          [requerido, componente.articulo_simple_id]
        );
      }
    }

    const [result] = await connection.execute(
      `INSERT INTO despachos (articulo_id, cantidad, fecha)
       VALUES (?, ?, NOW())`,
      [articulo_id, cantidad]
    );

    await connection.commit();
    return { id: result.insertId, articulo_id, cantidad, fecha: new Date().toISOString().slice(0, 19).replace('T', ' ') };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
