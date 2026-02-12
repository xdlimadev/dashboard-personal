# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Version](https://img.shields.io/badge/version-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

Dashboard personal interactivo con gestión de tareas tipo Kanban, temporizador Pomodoro y widget del clima en tiempo real.


## ✨ Características

### 📋 Sistema de Tareas Kanban
- **Tres columnas:** Pendientes, En Progreso y Completadas
- **Drag & Drop nativo:** Arrastra tareas entre columnas o dentro de la misma para reordenar
- **Navegación con botones:** Mueve tareas con flechas si prefieres
- **Persistencia:** Todas tus tareas se guardan localmente

### 🍅 Temporizador Pomodoro
- **Ciclos de trabajo/descanso:** 25 min trabajo, 5 min descanso corto, 15 min descanso largo
- **Contador de pomodoros:** Lleva el registro de tus sesiones completadas
- **Cambio automático:** Alterna entre modos automáticamente
- **Controles completos:** Play, pausa y reset

### 🌤️ Widget del Clima
- **Información en tiempo real:** Temperatura, humedad y estado del cielo
- **Actualización automática:** Cada 30 minutos
- **Iconos dinámicos:** Cambian según las condiciones meteorológicas
- **API:** Integración con el-tiempo.net

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
- **Fetch API** - Consumo de API del clima
- **Font Awesome** - Iconografía

## 🚀 Instalación y Uso

### Requisitos previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (solo para el widget del clima)

### Pasos
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

## 🔄 Funcionalidades Técnicas

### Persistencia de Datos
- Las tareas se guardan en `localStorage`
- Se mantienen al recargar la página
- Estados sincronizados entre columnas

### Drag & Drop
- Arrastre entre columnas
- Feedback visual durante el arrastre
- Actualización automática del estado

### Gestión de Estados
- Tareas: `pending`, `progress`, `completed`
- Pomodoro: `trabajo`, `shortBreak`, `longBreak`
- Sincronización con localStorage

## 📝 Uso

### Añadir Tareas
1. Escribe el nombre de la tarea en el input
2. Presiona Enter o click en el botón "+"
3. La tarea aparece en "Pendientes"

### Mover Tareas
- **Con botones:** Click en la flecha → para avanzar
- **Con drag & drop:** Arrastra la tarea a la columna deseada

### Eliminar Tareas
- Click en el botón ✖ de cualquier tarea

### Usar el Pomodoro
1. Click en ▶ para iniciar
2. Click en ⏸ para pausar
3. Click en ↻ para reiniciar

## 🌐 API Utilizada

**el-tiempo.net**
- Endpoint: `https://api.el-tiempo.net/json/v3/provincias/29/municipios/29038`
- Datos: Temperatura, humedad, estado del cielo
- Actualización: Cada 30 minutos

## 🚧 Próximas Mejoras

- [ ] Reordenamiento de tareas dentro de la misma columna
- [ ] Backend con PHP y base de datos
- [ ] Sistema de login y usuarios
- [ ] Modo oscuro/claro toggle
- [ ] Notas rápidas / Bloc de notas
- [ ] Gráficos de productividad
- [ ] Exportar/importar tareas
- [ ] Notificaciones del Pomodoro

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje. Si tienes sugerencias o encuentras bugs, siéntete libre de abrir un issue.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 👨‍💻 Autor

**Bruno** - [GitHub](https://github.com/xdlimadev)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
