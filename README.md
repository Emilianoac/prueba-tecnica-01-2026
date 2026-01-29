# Prueba Técnica

Aplicación desarrollada con **Vue 3** y **TypeScript** como prueba técnica. El proyecto ha sido diseñado priorizando la solidez en el manejo del estado global y una estrategia de testing integral.

La aplicación permite listar artículos, realizar búsquedas con persistencia de estado y visualizar detalles específicos de cada elemento.

Previsualización: https://emilianoac.github.io/prueba-tecnica-01-2026

---

## Funcionalidad
* **Listado de artículos:** Consumo de datos desde una API externa.
* **Vista de detalle:** Visualización específica de cada artículo seleccionado.
* **Gestión de estados:** Control de estados de carga y error.
* **Persistencia de búsqueda:** El estado de los filtros se mantiene íntegro al navegar entre vistas.
* **Navegación por estado:** Cambio de vistas controlado mediante lógica de estado global.

---

## Stack Tecnológico
Durante el desarrollo se respetaron estrictamente las tecnologías mencionadas en el documento de la prueba técnica.  
Por este motivo no se incorporaron dependencias adicionales que no estuvieran explícitamente solicitadas, como Vue Router.

* **Core:** Vue 3
* **Lenguaje:** TypeScript
* **Estado:** Pinia
* **Comunicación:** Axios
* **Estilos:** TailwindCSS
* **Testing:** Vitest, Vue Test Utils y MSW (Mock Service Worker)

---

## Estructura del Proyecto

```text
src/
├── assets/           # Recursos estáticos (CSS, Imágenes)
├── components/       # Componentes por dominio (Article, UI, Illustrations)
├── composables/      # Lógica de estado y funciones reutilizables
├── config/           # Configuración global de la aplicación
├── constants/        # Constantes y valores fijos
├── services/         # Abstracción de red (API Services)
├── stores/           # Gestión de estado global con Pinia
├── types/            # Definiciones de interfaces y tipos TypeScript
├── views/            # Vistas principales
├── tests/            # Suite completa de pruebas (__tests__)
│   ├── mocks/        # Datos falsos y configuraciones de MSW
│   ├── integration/  # Tests de integración por componente y vista
│   └── unit/         # Tests unitarios (Stores, Services, Composables)
├── App.vue           # Componente raíz de la aplicación
└── main.ts           # Punto de entrada y configuración de Vue
```
---

## Instalación y Configuración

Siga estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Emilianoac/prueba-tecnica-01-2026.git
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:** El proyecto incluye un archivo `.env.example`. Debe crear un archivo `.env` en la raíz del proyecto basándose en este:

   ```bash
   cp .env.example .env
   ```
   Asegúrate de que la variable `VITE_API_URL` esté correctamente configurada:
   
    ```bash
    VITE_API_URL=https://jsonplaceholder.typicode.com
    ```
3. **Ejecutar en modo desarrollo:**

    ```bash
    npm run dev
    ```
---

## Testing

El proyecto aplica una estrategia de pruebas organizada por niveles para asegurar la estabilidad del sistema:

### Tests Unitarios
Enfoque en la lógica aislada de Stores, Services y Composables.

```bash
npm run test:unit
```

### Tests Intregración
Validación de flujos de usuario reales y comunicación entre componentes utilizando MSW para interceptar peticiones de red.

```bash
npm run test:integration
```

### Para ejecutar la suite completa de pruebas

```bash
npm run test
```