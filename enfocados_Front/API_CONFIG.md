# Configuración de API - Enfocados Front

## Base URL
- **URL Base**: `http://localhost:3000/api`
- **Configuración**: Variable de entorno `VITE_API_URL` (por defecto: `http://localhost:3000/api`)

## Endpoints Configurados

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Crear nueva cuenta

### Artículos
- `GET /articulos` - Obtener listado de artículos/inventario

### Movimientos de Stock
- `POST /movimientos` - Registrar movimiento de entrada o ensamblaje
  - `tipo_movimiento: 'entrada'` - Ingreso de stock
  - `tipo_movimiento: 'ensamblaje'` - Ensamblaje de productos

### Despachos
- `POST /despachos` - Registrar salida/despacho de artículos

## Autenticación JWT

### Configuración de Token
- Los tokens JWT se almacenan en `localStorage` bajo la clave `token`
- El token se incluye automáticamente en todas las peticiones protegidas

### Header de Autorización
```
Authorization: Bearer <token>
```

El interceptor de Axios en `src/services/api.js` añade automáticamente el header de autorización si existe un token válido en `localStorage`.

## Estructura de Requests

### Login/Register
```javascript
// POST /auth/login
{
  "email": "usuario@example.com",
  "password": "contraseña"
}

// POST /auth/register
{
  "nombre": "Nombre Usuario",
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

### Ingreso de Stock
```javascript
// POST /movimientos
{
  "id_articulo": "123",
  "tipo_movimiento": "entrada",
  "cantidad": 10,
  "motivo": "Carga de stock manual"
}
```

### Ensamblaje
```javascript
// POST /movimientos
{
  "nombre_nuevo_articulo": "Estuche Premium",
  "tipo_movimiento": "ensamblaje",
  "componentes": [
    { "itemId": "123", "quantity": 5 },
    { "itemId": "456", "quantity": 2 }
  ],
  "motivo": "Ensamblaje de estuche"
}
```

### Despacho
```javascript
// POST /despachos
{
  "id_articulo": "123",
  "cantidad": 5,
  "motivo": "Despacho"
}
```

## Manejo de Errores
- Los errores HTTP incluyen mensajes descriptivos en `response.data.message`
- El componente Auth muestra "Credenciales incorrectas. Intenta de nuevo." por defecto
- Otros errores muestran el mensaje del servidor o un mensaje genérico

## Desarrollo Local
Para desarrollo local, asegúrate de que el servidor backend esté corriendo en `http://localhost:3000`
