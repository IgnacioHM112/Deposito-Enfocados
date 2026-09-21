# 📦 Sistema de Control de Depósito - Enfocados MZA

Sistema integral para la gestión de inventario y stock de **Enfocados MZA**. Compuesto por un backend REST en Node.js/Express con MySQL y un frontend moderno en React + Tailwind CSS, con soporte para trazabilidad real de materias primas, productos terminados (kits) y despachos.

---

## 🏗️ Arquitectura del Proyecto

Estructura de monorepo:

```
Deposito-Enfocados/
├── enfocados_Back/     → API REST (Node.js, Express, MySQL)
└── enfocados_Front/    → Dashboard administrativo (React, Vite, Tailwind)
```

---

## 🚀 Características

### Backend
- **Gestión de Artículos:** materias primas y productos terminados.
- **Sistema de Kits:** composición dinámica (1 kit = N componentes).
- **Control de Movimientos:** entradas, salidas, ensamblajes y ajustes con actualización de stock en tiempo real.
- **Autenticación Segura:** usuarios con `bcryptjs` y sesiones `JWT`.
- **Infraestructura Docker:** listo para desarrollo y producción con Docker Compose.

### Frontend
- **Dashboard administrativo** con pestañas para inventario, ingreso de stock, configuración de estuches y despachos.
- **Formularios dinámicos** con cálculo de unidades totales.
- **Alertas de stock** para faltantes y validaciones.
- **Interfaz responsiva** pensada para uso diario en el depósito.

---

## 🛠️ Tecnologías

### Backend
| Tecnología | Uso |
|------------|-----|
| Node.js (v18+) | Runtime |
| Express.js | Framework web |
| MySQL 8.0 | Base de datos |
| JWT | Autenticación |
| BcryptJS | Encriptación de contraseñas |
| Docker & Docker Compose | Infraestructura |

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 18 | Librería principal |
| Vite | Herramienta de construcción |
| Tailwind CSS | Estilos |
| Axios | Peticiones HTTP |
| Lucide React | Iconos |

---

## 🗄️ Base de Datos

Esquema relacional optimizado:

| Tabla | Descripción |
|-------|-------------|
| `articulos` | Información maestra y stock actual |
| `composicion_kits` | Componentes de productos terminados |
| `movimientos` | Historial de transacciones de inventario |
| `usuarios` | Gestión de acceso administrativo |

---

## ⚙️ Instalación

### Requisitos previos
- Node.js (v18+) y npm
- Docker Desktop (para la base de datos y/o backend)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Deposito-Enfocados.git
cd Deposito-Enfocados
```

### 2. Configurar variables de entorno

Copiar los `.env.example` y ajustar:

**Backend** (`enfocados_Back/.env`):
```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=deposito_enfocadosmza
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

**Frontend** (`enfocados_Front/.env`):
```env
VITE_API_URL=http://localhost:3000/api
```

> 💡 **Nota:** `DB_PORT` debe coincidir con el puerto expuesto por el contenedor MySQL de Docker (ver `docker-compose.yml` en `enfocados_Back/`). `VITE_API_URL` debe apuntar al puerto donde corre el backend.

---

## 🏃 Cómo Ejecutar

### Opción A: Todo manual (desarrollo)

**Backend:**
```bash
cd enfocados_Back
npm install
npm run dev
```

**Frontend (en otra terminal):**
```bash
cd enfocados_Front
npm install
npm run dev
```

### Opción B: Backend con Docker
```bash
cd enfocados_Back
docker-compose up --build -d
```
Esto levanta la API y la base de datos MySQL automáticamente.

---

## 🌐 Endpoints de la API

Base URL: `VITE_API_URL` (ejemplo: `http://localhost:3000/api`)

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Crear cuenta |

### Artículos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/articulos` | Listado de artículos e inventario |
| GET | `/articulos/:id` | Detalle de un artículo (kits incluyen componentes) |
| POST | `/articulos` | Crear artículo |

### Movimientos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/movimientos` | Registrar entrada, salida o ensamblaje |

### Despachos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/despachos` | Registrar despacho de artículos |

### Autenticación JWT
El token se almacena en `localStorage` y el interceptor de Axios (`src/services/api.js`) lo incluye automáticamente:
```
Authorization: Bearer <token>
```

---

## 📄 Licencia

Desarrollado para **Enfocados MZA**. 🚀
