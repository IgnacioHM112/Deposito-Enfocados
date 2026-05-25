# Control de Stock - Depósito

Aplicación frontend React + Tailwind para un sistema interno de stock en depósito.

## Estructura
- `src/App.jsx` — panel principal con pestañas, formularios y llamadas API.
- `src/main.jsx` — punto de entrada React.
- `src/index.css` — estilos Tailwind.
- `package.json` — dependencias y scripts.

## Endpoints esperados
- `GET /api/stock` — lista de artículos.
- `POST /api/stock/ingreso` — crear o reponer stock.
- `POST /api/stock/estuches` — crear estuche.
- `POST /api/stock/salida` — registrar salida.

## Cómo ejecutar
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Características
- Pestañas limpias y funcionables para inventario, ingreso, configuración de estuches y despacho.
- Formularios dinámicos con cálculo de unidades totales.
- Alertas de error claras para falta de stock o validaciones.
- Interfaz pensada para uso diario: rápida, ordenada y usable.
