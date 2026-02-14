# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Version](https://img.shields.io/badge/version-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)


## ✨ Características

### 📋 Sistema de Tareas Kanban
- **Tres columnas:** Pendientes, En Progreso y Completadas
- **Drag & Drop nativo:** Arrastra tareas entre columnas o dentro de la misma para reordenar
- **Reordenamiento con persistencia:** El orden de las tareas se mantiene al recargar la página
- **Indicadores visuales:** Líneas moradas muestran dónde se insertará la tarea al arrastrar
- **Navegación con botones:** Mueve tareas con flechas si prefieres
- **Persistencia completa:** Todas tus tareas y su orden se guardan localmente

### 🍅 Temporizador Pomodoro
- **Ciclos de trabajo/descanso:** 25 min trabajo, 5 min descanso corto, 15 min descanso largo
- **Contador de pomodoros:** Lleva el registro de tus sesiones completadas
- **Cambio automático:** Alterna entre modos automáticamente
- **Controles completos:** Play, pausa y reset

### 🌤️ Widget del Clima Inteligente
- **Geolocalización automática:** Detecta tu ubicación y muestra el clima local
- **Configuración manual:** Si rechazas la geolocalización, puedes buscar cualquier ciudad del mundo
- **Botón de cambio rápido:** Cambia de ubicación en cualquier momento con un solo click
- **Información completa:** Temperatura (mín/máx), humedad y velocidad del viento
- **Iconos dinámicos:** Cambian según las condiciones meteorológicas
- **Actualización automática:** Cada 30 minutos
- **Persistencia de preferencias:** Recuerda tu ciudad elegida
- **API:** OpenWeatherMap (funciona en cualquier parte del mundo)

### ⏰ Reloj y Fecha
- **Hora en tiempo real:** Actualización cada segundo
- **Fecha completa:** Día de la semana, día, mes y año
- **Formato personalizado:** Diseño limpio y legible

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño con Glassmorphism y animaciones
- **JavaScript (Vanilla)** - Lógica y funcionalidad
- **LocalStorage API** - Persistencia de datos
- **Drag & Drop API** - Interacción nativa HTML5
- **Geolocation API** - Detección automática de ubicación
- **Fetch API** - Consumo de APIs externas
- **OpenWeatherMap API** - Datos meteorológicos globales
- **Font Awesome** - Iconografía

## 🚀 Instalación y Uso

### Requisitos previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para widget del clima)
- **Importante:** Para que la geolocalización funcione en móviles, necesitas HTTPS

### Configuración de la API del Clima
1. Regístrate gratis en [OpenWeatherMap](https://openweathermap.org/api)
2. Obtén tu API Key
3. En `script.js`, reemplaza:
```javascript
const API_KEY = "TU_API_KEY_AQUI";
```

### Pasos de instalación
1. Clona el repositorio:
```bash
git clone https://github.com/xdlimadev/dashboard-personal.git
```

2. Navega a la carpeta del proyecto:
```bash
cd dashboard-personal
```

3. Abre `index.html` en tu navegador:
   - Doble click en el archivo
   - O usa un servidor local (XAMPP, Live Server, etc.)

4. ¡Empieza a usar tu dashboard!

## 📁 Estructura del Proyecto

```
dashboard-personal/
├── index.html          # Estructura principal
├── style.css           # Estilos y diseño
├── script.js           # Lógica y funcionalidad
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Este archivo
```

## 🎨 Características de Diseño

- **Glassmorphism:** Efecto de vidrio esmerilado con blur
- **Tema oscuro:** Paleta de colores morados y oscuros
- **Responsive:** Adaptable a diferentes tamaños de pantalla
- **Animaciones suaves:** Transiciones y efectos hover
- **Scrollbar personalizada:** Diseño consistente con el tema
- **Indicadores visuales:** Feedback en tiempo real durante interacciones
- **Modal moderno:** Interfaz elegante para configuración de ciudad

## 🔄 Funcionalidades Técnicas

### Persistencia de Datos
- Las tareas se guardan en `localStorage`
- Se mantienen al recargar la página
- Estados sincronizados entre columnas
- **Orden personalizado persistente:** El orden de las tareas se guarda y restaura
- **Ubicación guardada:** La ciudad elegida se recuerda entre sesiones

### Drag & Drop Avanzado
- **Arrastre entre columnas:** Cambia el estado de las tareas
- **Reordenamiento dentro de columnas:** Prioriza tareas arrastrándolas
- **Indicadores visuales:** Líneas moradas muestran la posición de inserción
- **Efectos visuales:** La tarea se reduce ligeramente al arrastrar
- **Feedback inmediato:** Los cambios se ven en tiempo real
- **DataTransfer estándar:** Usa `text/plain` para máxima compatibilidad

### Geolocalización Inteligente
- **Automática:** Detecta tu ubicación usando la API de Geolocation
- **Fallback manual:** Si falla o rechazas, puedes buscar tu ciudad
- **Modal interactivo:** Interfaz amigable para configurar ubicación
- **Reintentar geolocalización:** Opción para volver a intentar el permiso
- **Búsqueda global:** Funciona con cualquier ciudad del mundo
- **Persistencia:** Guarda tu elección en localStorage

### Gestión de Estados y Orden
- Tareas: `pending`, `progress`, `completed`
- Cada tarea tiene una propiedad `order` que determina su posición
- Pomodoro: `trabajo`, `shortBreak`, `longBreak`
- Clima: Coordenadas guardadas para reutilización
- Sincronización completa con localStorage

## 📝 Uso

### Añadir Tareas
1. Escribe el nombre de la tarea en el input
2. Presiona Enter o click en el botón "+"
3. La tarea aparece en "Pendientes"

### Mover Tareas
- **Con botones:** Click en la flecha → para avanzar
- **Con drag & drop:** Arrastra la tarea a la columna deseada

### Reordenar Tareas
- **Arrastra tareas arriba/abajo** dentro de la misma columna
- **Indicadores visuales** muestran dónde se insertará
- **El orden se guarda automáticamente**

### Eliminar Tareas
- Click en el botón ✖ de cualquier tarea

### Configurar Ubicación del Clima
1. **Primera vez:** El navegador pedirá permiso de ubicación
   - **Permitir:** Se detecta automáticamente tu ciudad
   - **Rechazar:** Se abre un modal para buscar tu ciudad manualmente
2. **Cambiar ubicación:** Click en el icono 📍 junto al nombre de la ciudad
3. **Escribir ciudad:** Busca cualquier ciudad del mundo (ej: "Madrid", "París", "Tokyo")

### Usar el Pomodoro
1. Click en ▶ para iniciar
2. Click en ⏸ para pausar
3. Click en ↻ para reiniciar

## 🌐 APIs Utilizadas

### OpenWeatherMap
- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **Datos obtenidos:** 
  - Temperatura actual, mínima y máxima
  - Humedad
  - Velocidad del viento
  - Estado del cielo (descripción)
  - Nombre de la ciudad
- **Actualización:** Cada 30 minutos
- **Cobertura:** Mundial

## 🚧 Próximas Mejoras

- [ ] Despliegue en GitHub Pages con HTTPS
- [ ] Backend con PHP y base de datos
- [ ] Sistema de login y usuarios
- [ ] Modo oscuro/claro toggle
- [ ] Notas rápidas / Bloc de notas
- [ ] Gráficos de productividad
- [ ] Exportar/importar tareas
- [ ] Notificaciones del Pomodoro
- [ ] Filtros y búsqueda de tareas
- [ ] Etiquetas y categorías
- [ ] Previsión del clima de varios días
- [ ] Historial de ciudades buscadas

## 🔐 Seguridad y Privacidad

- **API Key del clima:** Debe ser configurada por cada usuario
- **Geolocalización:** Solo se usa si el usuario da permiso explícito
- **Datos locales:** Todo se guarda en localStorage del navegador (no se envía a ningún servidor)
- **Sin tracking:** No se recopilan datos de uso

## ⚠️ Notas Importantes

- **HTTPS requerido:** La geolocalización en móviles solo funciona con conexiones HTTPS
- **API Key:** Necesitas tu propia API Key de OpenWeatherMap (gratis hasta 1000 llamadas/día)
- **Compatibilidad:** Funciona mejor en navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje. Si tienes sugerencias o encuentras bugs, siéntete libre de abrir un issue.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 👨‍💻 Autor

**Bruno** - [GitHub](https://github.com/xdlimadev)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!