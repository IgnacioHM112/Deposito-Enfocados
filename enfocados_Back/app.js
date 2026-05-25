const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const articulosRoutes = require('./routes/articulos');
const movimientosRoutes = require('./routes/movimientos');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de Depósito Enfocados funcionando correctamente', status: 'OK' });
});

app.use('/api/articulos', articulosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ error: message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API de depósito escuchando en puerto ${port}`);
});
