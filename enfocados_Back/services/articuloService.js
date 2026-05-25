const pool = require('../config/db');

exports.listarArticulos = async () => {
  const [rows] = await pool.execute(
    `SELECT id, sku, nombre, descripcion, tipo, stock_actual, stock_minimo, ubicacion, precio_costo, ultima_actualizacion
     FROM articulos
     ORDER BY id`
  );
  return rows;
};

exports.crearArticulo = async ({ sku, nombre, descripcion, tipo, stock_actual, stock_minimo, ubicacion, precio_costo }) => {
  const [result] = await pool.execute(
    `INSERT INTO articulos (sku, nombre, descripcion, tipo, stock_actual, stock_minimo, ubicacion, precio_costo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [sku || null, nombre, descripcion || null, tipo, stock_actual || 0, stock_minimo || 5, ubicacion || null, precio_costo || 0.00]
  );
  return { id: result.insertId, sku, nombre, tipo };
};

exports.obtenerArticuloPorId = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM articulos WHERE id = ?', [id]);
  return rows[0];
};

exports.obtenerComponentesKit = async (id_kit) => {
  const [rows] = await pool.execute(
    `SELECT c.id_componente, a.nombre, c.cantidad_necesaria
     FROM composicion_kits c
     JOIN articulos a ON c.id_componente = a.id
     WHERE c.id_kit = ?`,
    [id_kit]
  );
  return rows;
};

exports.crearComposicionKit = async (id_kit, id_componente, cantidad) => {
  await pool.execute(
    'INSERT INTO composicion_kits (id_kit, id_componente, cantidad_necesaria) VALUES (?, ?, ?)',
    [id_kit, id_componente, cantidad]
  );
};
