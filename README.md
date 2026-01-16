🛒 ML Items – Frontend

Frontend web construido en React + TypeScript que consume la ML Items API y permite:
- Visualizar productos
- Buscar items
- Predecir la condición del producto usando un modelo de ML
- Navegar los resultados de forma paginada
- Interactuar con la predicción desde la UI

⸻

🚀 Stack tecnológico
- React 18
- TypeScript
- Vite
- Fetch API
- CSS plano (responsive-first)

⸻

🧠 Funcionalidades implementadas

📋 Listado de productos
- Consumo del endpoint GET /items
- Renderizado de productos en formato tipo MercadoLibre
- Información mostrada:
- Título
- Precio
- Condición real (new / used)

⸻

🔍 Búsqueda de productos
- Input de búsqueda por texto
- Consumo del endpoint:

  GET /items/search?q=...

- Actualización dinámica del listado

⸻

🤖 Predicción de condición (Machine Learning)
- Cada producto permite ejecutar una predicción individual
- Consumo del endpoint:

  POST /items/predict-condition

  - Se envían los features relevantes del item:
- Título
- Precio
- Stock
- Categoría
- Flags de envío y pago
- Se muestra:
- Condición predicha (NEW / USED)
- Nivel de confianza (%)

La predicción se ejecuta on-demand, no automáticamente, para evitar sobrecargar el backend.

⸻

📦 Paginación progresiva
- El backend implementa paginación (limit / offset)
- El frontend consume los items en bloques de 10
- Se implementó botón “Cargar más”, simulando UX real de marketplace
- Mejora performance y experiencia de usuario

⸻

🎨 UI / UX
- Diseño simple y limpio, inspirado en MercadoLibre
- Layout responsive
- Componentización clara:
- ItemCard
- ItemList
- PredictCondition
- Separación clara entre:
- API layer
- Tipos
- Componentes
- Páginas

⸻

🗂️ Estructura del proyecto

```
src/
├── api/
│   └── items.ts        # Llamadas al backend
├── components/
│   ├── ItemCard.tsx
│   ├── ItemList.tsx
│   └── PredictCondition.tsx
├── pages/
│   └── Home.tsx
├── types/
│   └── item.ts
├── App.tsx
├── main.tsx
├── index.css
└── App.css
```

⚙️ Cómo correr el proyecto

1️⃣ Instalar dependencias

```
npm install
```

2️⃣ Levantar el frontend

```
npm run dev
```

Por defecto queda disponible en:

```
http://localhost:5173
```

⚠️ El backend debe estar corriendo en http://localhost:8000

🧪 Consideraciones técnicas
- Se manejan estados de carga y error
- El frontend no asume predicciones correctas (ML ≠ verdad)
- Se prioriza claridad del flujo sobre librerías externas
- Se evita sobre-ingeniería innecesaria