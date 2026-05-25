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
- **Contenedores:** Docker, Docker Compose
- **Túnel de Desarrollo:** ngrok

## 📦 Estructura de la Base de Datos

El sistema utiliza un esquema relacional optimizado:
- `articulos`: Información maestra y stock actual.
- `composicion_kits`: Relación de componentes para productos terminados.
- `movimientos`: Historial detallado de transacciones de inventario.
- `usuarios`: Gestión de acceso administrativo.

## 🛠️ Instalación y Uso

### Requisitos previos
- Docker & Docker Compose
- Node.js (v18+)

### Con Docker (Recomendado)
1. Clonar el repositorio.
2. Ejecutar:
   ```bash
   docker-compose up --build -d
   ```
3. La API estará disponible en `http://localhost:3000`.
4. El MySQL estará disponible en `localhost:3307`.

### Desarrollo Local
1. Instalar dependencias: `npm install`.
2. Configurar el archivo `.env` basado en `.env.example`.
3. Ejecutar: `npm run dev`.

## 🌐 Endpoints Principales

- `GET /api/articulos`: Lista todos los artículos y su stock.
- `POST /api/movimientos`: Registra una entrada/salida de stock.
- `POST /api/auth/login`: Autenticación de usuarios.

---
Desarrollado para **Enfocados MZA**.
