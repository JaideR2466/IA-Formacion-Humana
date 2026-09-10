# 🥽 Realidad Virtual & Ingeniería Informática

> **Proyecto Integrador**: Plataforma web interactiva con backend políglota (**Python** y **Java**) y **HTML/CSS/JS** para explorar el impacto de la **Ingeniería Informática** en la **Realidad Virtual** y la Computación Espacial.

---

## 🌟 La Realidad Virtual en la Ingeniería Informática

La **Realidad Virtual (VR)** representa uno de los desafíos interdisciplinarios más apasionantes y exigentes dentro de la **Ingeniería Informática**. Más allá de ser un medio de entretenimiento, la VR es la máxima expresión del diseño de sistemas en tiempo real, computación gráfica avanzada y procesamiento de datos espacial.

### 1. Computación Gráfica y Renderizado 3D Estereoscópico
Un Ingeniero Informático desarrolla los algoritmos encargados de generar dos imágenes paralelas ligeramente desplazadas (una para cada ojo) a tasas de refresco de 90Hz a 144Hz. Se emplean lenguajes como C++, GLSL/HLSL y arquitecturas como WebGL, Vulkan o DirectX para programar **Shaders**, sombras dinámicas y materiales realistas.

### 2. Sistemas en Tiempo Real (RTS) y Optimización de Latencia
En VR existe el concepto de **Latencia Motion-to-Photon (M2P)**: el tiempo transcurrido desde que el usuario mueve la cabeza hasta que los fotones de la pantalla reflejan ese movimiento.
- Para evitar el mareo (*Motion Sickness*), esta latencia debe ser **menor a 20 milisegundos**.
- Los ingenieros informáticos diseñan canalizaciones de renderizado asíncronas (*Asynchronous Timewarp / Spacewarp*) y optimizaciones a nivel de kernel e hilos.

### 3. Inteligencia Artificial & Foveated Rendering
Dado que renderizar resolución 4K a 120 FPS es extremadamente costoso, la informática moderna emplea **Foveated Rendering guiado por IA**. Mediante el seguimiento ocular (*Eye-Tracking*), la IA detecta dónde está mirando la fóvea del ojo humano y renderiza con máxima nitidez solo esa área reducida, difuminando la periferia y ahorrando hasta un **60% de cómputo GPU**.

### 4. Interacción Humano-Computador (HCI) y Computación Espacial
La interfaz ya no es una pantalla plana de dos dimensiones. La Ingeniería Informática redefine el paradigma de UI/UX para crear **Spatial UI** (Interfaces Espaciales 3D), seguimiento de manos (*Hand Tracking*) sin controles físicos y retroalimentación háptica en entornos inmersivos de medicina, educación y simulación aeronáutica.

### 5. Motores de Videojuegos & WebXR
Los ingenieros conciben y optimizan motores gráficos como **Unreal Engine** y **Unity**, utilizando estructuras de datos avanzadas (*Octrees, BVH Trees*) y estándares abiertos como **WebXR** y **OpenXR** para llevar la VR de forma universal a la web.

---

## 🛠️ Estructura del Proyecto

```text
IA Formacion Humana/
├── index.html                  # Landing Page con Three.js 3D Canvas, UI Futurista y Dashboard
├── css/
│   └── styles.css              # Sistema de diseño Cyberpunk/Glassmorphism y animaciones
├── js/
│   ├── app.js                  # Lógica interactiva de interfaz, sliders y consumo de APIs
│   └── vr-canvas.js            # Escena 3D Three.js con visor VR y campo de partículas
├── python_backend/
│   ├── app.py                  # API REST Flask para telemetría de visores VR y analítica
│   └── requirements.txt        # Dependencias de Python (Flask)
├── java_backend/
│   └── VRPhysicsEngine.java    # Motor Java concurrente para matrices 3D y Raycasting Benchmark
└── README.md                   # Documentación académica y técnica del proyecto
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Visualizar la Landing Page (HTML / CSS / JS)
No requiere instalación especial.
- Abre directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
- Disfruta de la escena 3D interactiva en Three.js y prueba la consola de control interactiva.

---

### 2. Ejecutar la API de Telemetría VR en Python

El servidor Python provee endpoints REST para obtener datos simulados de fotogramas, latencia y análisis informático en tiempo real.

**Requisitos**: Python 3.8+ instalado.

1. Abre tu terminal en la carpeta del proyecto y entra a `python_backend`:
   ```bash
   cd python_backend
   ```
2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Ejecuta el servidor Flask:
   ```bash
   python app.py
   ```
4. El servidor se iniciará en `http://127.0.0.1:5000`. Puedes probar los siguientes endpoints:
   - `http://127.0.0.1:5000/api/vr/telemetry` (Métricas de FPS y latencia)
   - `http://127.0.0.1:5000/api/vr/analytics` (Desglose de áreas de la Ingeniería Informática)

*Nota: Al presionar el botón "**🐍 Test Python API**" en la Landing Page, esta se conectará en tiempo real con este servidor.*

---

### 3. Ejecutar el Motor de Simulación en Java

El programa Java demuestra el uso de concurrencia multi-hilo y cálculo matricial para físicas 3D y raycasting de VR.

**Requisitos**: JDK (Java Development Kit) 8 u superior instalado.

1. Desde la raíz del proyecto, compila el archivo Java:
   ```bash
   javac java_backend/VRPhysicsEngine.java
   ```
2. Ejecuta la clase compilada:
   ```bash
   java java_backend.VRPhysicsEngine
   ```
3. Verás en consola el benchmark completo mostrando:
   - Matriz de proyección perspectiva 4x4 calculada para visión estereoscópica.
   - Benchmark paralelo de 1,000,000 de operaciones de Raycasting en 8 hilos.
   - Cálculo de la tasa de rayos por segundo y latencia por frame.

---

## 💡 Tecnologías Utilizadas

- **HTML5 & CSS3**: Estructura semántica, Grid/Flexbox, tipografía Google Fonts (Outfit / JetBrains Mono) y efectos glassmorphism con neón.
- **JavaScript (ES6+) & Three.js**: Renderizado gráfico 3D en WebGL en el navegador con visores VR animados y físicas de partículas responsive.
- **Python (Flask API)**: Microservicio ligero para analítica de datos de sensores y endpoints de telemetría.
- **Java (Multithreading Concurrency)**: Motor de benchmarks en paralelo para computación gráfica espacial y álgebra matricial.

---

## 👨‍💻 Autoría

Proyecto desarrollado para ilustrar la intersección profunda entre la **Realidad Virtual** y la **Ingeniería Informática**, uniendo desarrollo Web, Python y Java en una sola solución integrada.
