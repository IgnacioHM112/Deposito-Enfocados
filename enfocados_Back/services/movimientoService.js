const pool = require('../config/db');

exports.registrarMovimiento = async ({ id_articulo, tipo_movimiento, cantidad, motivo }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Registrar el movimiento
    const [result] = await connection.execute(
      `INSERT INTO movimientos (id_articulo, tipo_movimiento, cantidad, motivo)
       VALUES (?, ?, ?, ?)`,
      [id_articulo, tipo_movimiento, cantidad, motivo || null]
    );

    // 2. Actualizar el stock en la tabla articulos
    let updateQuery = '';
    if (tipo_movimiento === 'entrada' || tipo_movimiento === 'ajuste' && cantidad > 0) {
      updateQuery = 'UPDATE articulos SET stock_actual = stock_actual + ? WHERE id = ?';
    } else if (tipo_movimiento === 'salida' || tipo_movimiento === 'ajuste' && cantidad < 0) {
      updateQuery = 'UPDATE articulos SET stock_actual = stock_actual - ? WHERE id = ?';
      if (tipo_movimiento === 'ajuste') cantidad = Math.abs(cantidad);
    }

    if (updateQuery) {
      await connection.execute(updateQuery, [cantidad, id_articulo]);
    }

    await connection.commit();
    return { id: result.insertId, id_articulo, tipo_movimiento, cantidad };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.listarMovimientos = async () => {
  const [rows] = await pool.execute(
    `SELECT m.*, a.nombre as articulo_nombre
     FROM movimientos m
     JOIN articulos a ON m.id_articulo = a.id
     ORDER BY m.fecha DESC`
  );
  return rows;
};
