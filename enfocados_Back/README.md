# 📦 Sistema de Control de Stock - Enfocados MZA

API robusta para la gestión de inventario, control de materias primas y productos terminados (kits), diseñada para depósitos con necesidades de trazabilidad real.

## 🚀 Características

- **Gestión de Artículos:** Soporte para materias primas y productos terminados.
- **Sistema de Kits:** Composición dinámica de productos (1 kit = N componentes).
- **Control de Movimientos:** Registro automatizado de entradas, salidas, ensamblajes y ajustes con actualización de stock en tiempo real.
- **Autenticación Segura:** Sistema de usuarios con encriptación `bcryptjs` y sesiones `JWT`.
- **Infraestructura Moderna:** Listo para desarrollo y producción con **Docker** y **Docker Compose**.
- **CORS Configurado:** Preparado para conectar con cualquier frontend de forma segura.

## 🛠️ Tecnologías utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL 8.0
- **Autenticación:** JSON Web Tokens (JWT)
- **Servidor Local:** XAMPP (Apache, MySQL, PHP)
- **Túnel de Desarrollo:** ngrok

## 📦 Estructura de la Base de Datos

El sistema utiliza un esquema relacional optimizado:
- `articulos`: Información maestra y stock actual.
- `composicion_kits`: Relación de componentes para productos terminados.
- `movimientos`: Historial detallado de transacciones de inventario.
- `usuarios`: Gestión de acceso administrativo.

## 🛠️ Instalación y Uso

### Requisitos previos
- XAMPP instalado ([Descargar](https://www.apachefriends.org/))
- Node.js (v18+)
- npm

### Configuración Rápida con XAMPP
1. Instalar dependencias: `npm install`
2. Iniciar MySQL en XAMPP Panel Control
3. Importar base de datos: 
   - Opción A: Usar phpMyAdmin en `http://localhost/phpmyadmin`
   - Opción B: Ejecutar `mysql -u root < db/init.sql`
4. Ejecutar servidor: `npm run dev` (desarrollo) o `npm start` (producción)
5. API disponible en `http://localhost:3000`

**⚠️ Nota:** El archivo `.env` ya contiene la configuración para XAMPP. Ver [SETUP-XAMPP.md](./SETUP-XAMPP.md) para instrucciones detalladas.

### Alternativa: Con Docker (Legacy)
Si deseas usar Docker, ver el archivo `docker-compose.yml` (deprecated).

## 🌐 Endpoints Principales

- `GET /api/articulos`: Lista todos los artículos y su stock.
- `POST /api/movimientos`: Registra una entrada/salida de stock.
- `POST /api/auth/login`: Autenticación de usuarios.

---
Desarrollado para **Enfocados MZA**.
