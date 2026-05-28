# Configuración con XAMPP

Este proyecto ha sido configurado para funcionar con XAMPP en lugar de Docker.

## Requisitos Previos

- XAMPP instalado ([Descargar XAMPP](https://www.apachefriends.org/))
- Node.js 18 o superior
- npm

## Pasos de Configuración

### 1. Iniciar XAMPP
- Abre el Panel de Control de XAMPP
- Inicia los siguientes servicios:
  - Apache (opcional, solo si usas el frontend en localhost)
  - MySQL
  - ProFTPD (opcional)

### 2. Crear la Base de Datos

#### Opción A: Usar phpMyAdmin
1. Ve a `http://localhost/phpmyadmin`
2. Crea una nueva base de datos llamada `deposito_enfocadosmza`
3. Selecciona la base de datos y ve a la pestaña "SQL"
4. Abre el archivo `db/init.sql` y copia todo su contenido
5. Pega el contenido en phpMyAdmin y ejecuta

#### Opción B: Usar línea de comandos
1. Abre CMD o PowerShell
2. Navega a la carpeta de instalación de XAMPP (ej: `C:\xampp`)
3. Ejecuta:
```bash
mysql -u root < "C:\ruta\a\tu\proyecto\db\init.sql"
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Ejecutar el Servidor

#### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

#### Modo producción:
```bash
npm start
```

La API estará disponible en: `http://localhost:3000`

## Endpoints Disponibles

- `GET /` - Estado de la API
- `POST /api/auth/login` - Login
- `GET /api/articulos` - Listar artículos
- `POST /api/articulos` - Crear artículo
- `GET /api/articulos/:id` - Obtener artículo
- `PUT /api/articulos/:id` - Actualizar artículo
- `DELETE /api/articulos/:id` - Eliminar artículo
- `GET /api/movimientos` - Listar movimientos
- `POST /api/movimientos` - Crear movimiento
- `GET /api/despachos` - Listar despachos
- `POST /api/despachos` - Crear despacho

## Puertos

- **MySQL**: 3306
- **API Node.js**: 3000
- **Apache**: 80
- **phpMyAdmin**: 3307 (si está habilitado)

## Solución de Problemas

### Error: "connect ECONNREFUSED 127.0.0.1:3306"
- Asegúrate de que MySQL está iniciado en XAMPP
- Verifica que el archivo `.env` tenga las credenciales correctas

### Error: "Database doesn't exist"
- Verifica que la base de datos `deposito_enfocadosmza` existe
- Ejecuta nuevamente el script `db/init.sql`

### Puerto 3000 ya está en uso
- Cambia el `PORT` en el archivo `.env`
- O detén el servicio que está usando ese puerto

## Notas

- El usuario de base de datos es `root` sin contraseña (configuración por defecto de XAMPP)
- Para cambiar la contraseña en XAMPP, accede a phpMyAdmin y modifícalo
- No olvides actualizar `.env` si cambias las credenciales
