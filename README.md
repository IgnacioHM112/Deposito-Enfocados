# 📦 Sistema de Control de Depósito - Enfocados MZA

Este repositorio contiene la solución integral para la gestión de inventario y stock de **Enfocados MZA**. El sistema está compuesto por un backend robusto en Node.js y un frontend moderno desarrollado en React.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado en una estructura de monorepo:

- **[`enfocados_Back/`](./enfocados_Back)**: API REST desarrollada con Node.js, Express y MySQL. Incluye soporte para Docker y gestión de base de datos.
- **[`enfocados_Front/`](./enfocados_Front)**: Dashboard administrativo desarrollado con React, Vite y Tailwind CSS.

---

## 🚀 Características Principales

- **Gestión de Artículos:** Control total sobre materias primas y productos terminados.
- **Sistema de Kits (Composiciones):** Definición dinámica de productos compuestos y procesos de ensamblaje.
- **Control de Movimientos:** Registro histórico detallado de entradas, salidas, ensamblajes y ajustes.
- **Trazabilidad en Tiempo Real:** Actualización automática del stock ante cualquier movimiento detectado.
- **Autenticación Segura:** Sistema de acceso protegido mediante JWT (JSON Web Tokens) y encriptación de contraseñas.
- **Interfaz Responsiva:** Dashboard moderno diseñado para una gestión rápida y eficiente.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Lenguaje:** Node.js (v18+)
- **Framework:** Express.js
- **Base de Datos:** MySQL 8.0
- **Seguridad:** JWT, BcryptJS
- **Infraestructura:** Docker & Docker Compose

### Frontend
- **Librería Principal:** React 18
- **Estilos:** Tailwind CSS
- **Herramienta de Construcción:** Vite
- **Peticiones HTTP:** Axios
- **Iconos:** Lucide React

---

## ⚙️ Configuración e Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Deposito-Enfocados.git
cd Deposito-Enfocados
```

### 2. Configurar Variables de Entorno
Debes configurar los archivos `.env` tanto en el backend como en el frontend basándote en los archivos `.env.example` proporcionados.

#### Backend (`enfocados_Back/.env`):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=enfocados_db
DB_PORT=3306
JWT_SECRET=tu_secreto_super_seguro
```

#### Frontend (`enfocados_Front/.env`):
```env
VITE_API_URL=http://localhost:3000
```

---

## 🏃 Cómo Ejecutar

### Opción A: Usando Docker (Recomendado para Backend)
Dentro de la carpeta `enfocados_Back/`:
```bash
docker-compose up --build -d
```
Esto levantará la API y la base de datos MySQL automáticamente.

### Opción B: Ejecución Manual

#### Levantar el Backend:
```bash
cd enfocados_Back
npm install
npm run dev
```

#### Levantar el Frontend:
```bash
cd enfocados_Front
npm install
npm run dev
```

---

## 🛡️ Endpoints de la API (Resumen)

- `POST /api/auth/login`: Inicio de sesión y obtención de token.
- `GET /api/articulos`: Listado de todos los artículos y su stock actual.
- `POST /api/movimientos`: Registro de nuevos movimientos (Entradas, Salidas, Kits).

---

Desarrollado para **Enfocados MZA**. 🚀
