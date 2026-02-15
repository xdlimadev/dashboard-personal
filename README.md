# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

Dashboard personal interactivo con gestión de tareas tipo Kanban, temporizador Pomodoro, widget del clima en tiempo real y backend con PHP y MySQL.

---

## ✨ Características

### 📋 Sistema de Tareas Kanban
- **Tres columnas:** Pendientes, En Progreso y Completadas
- **Drag & Drop nativo:** Arrastra tareas entre columnas o dentro de la misma para reordenar
- **Reordenamiento con persistencia:** El orden de las tareas se mantiene
- **Indicadores visuales:** Líneas moradas muestran dónde se insertará la tarea al arrastrar
- **Navegación con botones:** Mueve tareas con flechas
- **Backend integrado:** Sistema multiusuario con base de datos MySQL

### 🍅 Temporizador Pomodoro
- **Ciclos de trabajo/descanso:** 25 min trabajo, 5 min descanso corto, 15 min descanso largo
- **Contador de pomodoros:** Lleva el registro de tus sesiones completadas
- **Cambio automático:** Alterna entre modos automáticamente
- **Controles completos:** Play, pausa y reset

### 🌤️ Widget del Clima Inteligente
- **Geolocalización automática:** Detecta tu ubicación y muestra el clima local
- **Configuración manual:** Busca cualquier ciudad del mundo
- **Botón de cambio rápido:** Cambia de ubicación en un click
- **Información completa:** Temperatura (mín/máx), humedad y velocidad del viento
- **Iconos dinámicos:** Cambian según las condiciones meteorológicas
- **Actualización automática:** Cada 30 minutos
- **API:** OpenWeatherMap (funciona globalmente)

### 👤 Sistema de Usuarios (Backend)
- **Registro de usuarios:** Creación de cuentas con validación
- **Login/Logout:** Autenticación con sesiones PHP
- **Encriptación de contraseñas:** Bcrypt para seguridad
- **Protección contra SQL injection:** Prepared statements
- **API REST:** Endpoints JSON para comunicación frontend-backend
- **Base de datos relacional:** MySQL con tablas relacionadas

### ⏰ Reloj y Fecha
- **Hora en tiempo real:** Actualización cada segundo
- **Fecha completa:** Día de la semana, día, mes y año
- **Formato personalizado:** Diseño limpio y legible

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño con Glassmorphism y animaciones
- **JavaScript (Vanilla)** - Lógica y funcionalidad
- **LocalStorage API** - Persistencia temporal de datos
- **Drag & Drop API** - Interacción nativa HTML5
- **Geolocation API** - Detección automática de ubicación
- **Fetch API** - Consumo de APIs
- **Font Awesome** - Iconografía

### Backend
- **PHP 8.x** - Lógica del servidor
- **MySQL 8.x** - Base de datos relacional
- **PDO** - Conexión segura a la base de datos
- **Sessions** - Gestión de autenticación
- **JSON** - Formato de intercambio de datos
- **REST API** - Arquitectura de endpoints

### APIs Externas
- **OpenWeatherMap API** - Datos meteorológicos globales

---

## 🚀 Instalación y Configuración

### Requisitos previos
- **XAMPP** (Apache + MySQL + PHP) o equivalente
- Navegador web moderno
- Conexión a internet (para widget del clima)

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/xdlimadev/dashboard-personal.git
cd dashboard-personal
```

### Paso 2: Configurar XAMPP
1. Copia la carpeta del proyecto a `C:\xampp\htdocs\`
2. Inicia **Apache** y **MySQL** desde XAMPP Control Panel

### Paso 3: Configurar la base de datos

#### Opción A: Usando phpMyAdmin
1. Abre `http://localhost/phpmyadmin`
2. Crea una nueva base de datos llamada `dashboard_db`
3. Importa el archivo SQL o ejecuta estos comandos:

```sql
-- Crear base de datos
CREATE DATABASE dashboard_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dashboard_db;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de tareas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    state ENUM('pending', 'progress', 'completed') DEFAULT 'pending',
    task_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Paso 4: Configurar credenciales de la base de datos
Edita `api/config/database.php`:
```php
private $host = "localhost";
private $db_name = "dashboard_db";
private $username = "root";
private $password = ""; // Tu contraseña de MySQL (vacío por defecto en XAMPP)
```

### Paso 5: Configurar API del clima
1. Regístrate gratis en [OpenWeatherMap](https://openweathermap.org/api)
2. Obtén tu API Key
3. En `script.js`, reemplaza:
```javascript
const API_KEY = "TU_API_KEY_AQUI";
```

### Paso 6: Acceder al dashboard
Abre en tu navegador:
```
http://localhost/dashboard-personal
```

O si configuraste virtual host:
```
http://dashboard.local
```

---

## 📁 Estructura del Proyecto

```
dashboard-personal/
├── index.html              # Página principal
├── style.css               # Estilos y diseño
├── script.js               # Lógica del frontend
├── api/                    # Backend PHP
│   ├── config/
│   │   └── database.php    # Configuración de la BD
│   ├── auth/
│   │   ├── register.php    # Endpoint de registro
│   │   └── login.php       # Endpoint de login
│   └── tasks/
│       └── (próximamente)  # Endpoints CRUD de tareas
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

---

## 🔐 Seguridad Implementada

### Backend
- ✅ **Encriptación de contraseñas:** `password_hash()` con BCRYPT
- ✅ **Prepared Statements:** Prevención de SQL injection
- ✅ **Validación de datos:** Verificación de inputs
- ✅ **Sessions PHP:** Gestión segura de autenticación
- ✅ **HTTP Status Codes:** Respuestas apropiadas (200, 201, 400, 401, 404, 500)

### Frontend
- ✅ **Validación de formularios:** Prevención de datos vacíos
- ✅ **CORS Headers:** Control de acceso
- ✅ **Sanitización de inputs:** Prevención de XSS

---

## 📡 Endpoints de la API

### Autenticación

#### Registro de usuario
```
POST /api/auth/register.php
Content-Type: application/json

{
    "username": "usuario",
    "email": "email@ejemplo.com",
    "password": "contraseña"
}
```

**Respuestas:**
- `201` - Usuario creado correctamente
- `400` - Usuario o email ya existe / Datos incompletos

#### Login
```
POST /api/auth/login.php
Content-Type: application/json

{
    "username": "usuario",
    "password": "contraseña"
}
```

**Respuestas:**
- `200` - Login exitoso (incluye datos del usuario)
- `401` - Contraseña incorrecta
- `404` - Usuario no encontrado
- `400` - Datos incompletos

---

## 🎨 Características de Diseño

- **Glassmorphism:** Efecto de vidrio esmerilado con blur
- **Tema oscuro:** Paleta de colores morados y oscuros
- **Responsive:** Adaptable a diferentes tamaños de pantalla
- **Animaciones suaves:** Transiciones y efectos hover
- **Scrollbar personalizada:** Diseño consistente con el tema
- **Indicadores visuales:** Feedback en tiempo real
- **Modal moderno:** Interfaz elegante para configuraciones

---

## 📝 Uso

### Registro e Inicio de Sesión
1. **Primera vez:** Regístrate creando una cuenta
2. **Inicia sesión** con tus credenciales
3. Tus tareas se guardarán en la base de datos

### Gestión de Tareas
- **Añadir:** Escribe y presiona Enter o click en "+"
- **Mover:** Botones de flecha o drag & drop entre columnas
- **Reordenar:** Arrastra dentro de la misma columna
- **Eliminar:** Click en ✖

### Configurar Ubicación del Clima
1. **Primera vez:** Permite geolocalización o busca tu ciudad
2. **Cambiar:** Click en 📍 junto al nombre de la ciudad

### Usar el Pomodoro
- **▶** Iniciar
- **⏸** Pausar
- **↻** Reiniciar

---

## 🔧 Solución de Problemas

### La base de datos no se conecta
- Verifica que MySQL esté corriendo en XAMPP
- Comprueba las credenciales en `api/config/database.php`
- Asegúrate de haber creado la base de datos `dashboard_db`

### Error "Headers already sent"
- Verifica que no haya espacios antes de `<?php` o después de `?>`
- Elimina `?>` al final de los archivos PHP puros

### No aparece el clima
- Verifica tu API Key de OpenWeatherMap
- Comprueba que esté activa (puede tardar 10-15 min)
- Revisa la consola del navegador para errores

### Geolocalización no funciona en móvil
- Requiere HTTPS (no funciona con HTTP en móviles)
- Considera desplegar en GitHub Pages o Netlify

---

## 🚧 Próximas Mejoras

- [ ] CRUD completo de tareas con backend
- [ ] Endpoint de logout
- [ ] Protección de rutas (verificación de sesión)
- [ ] Sincronización automática de tareas
- [ ] Panel de administración de usuarios
- [ ] Recuperación de contraseña
- [ ] Modo oscuro/claro toggle
- [ ] Exportar/importar tareas
- [ ] Notificaciones del Pomodoro
- [ ] Gráficos de productividad
- [ ] Aplicación móvil (PWA)

---

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje. Si tienes sugerencias o encuentras bugs, siéntete libre de abrir un issue.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

## 👨‍💻 Autor

**Bruno** - [GitHub](https://github.com/xdlimadev)

---

## 📚 Tecnologías Aprendidas en Este Proyecto

### Frontend
- HTML5 semántico
- CSS3 avanzado (Flexbox, Grid, Animations)
- JavaScript ES6+ (Async/Await, Fetch, Classes)
- DOM Manipulation
- Local Storage
- Drag & Drop API
- Geolocation API

### Backend
- PHP OOP (Clases, Métodos)
- MySQL (DDL, DML, Relaciones)
- PDO (Prepared Statements)
- Sessions
- Password Hashing
- REST API design
- JSON manipulation
- HTTP Status Codes

### DevOps
- Git & GitHub
- XAMPP configuration
- Virtual Hosts
- phpMyAdmin

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!