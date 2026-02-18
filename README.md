# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Version](https://img.shields.io/badge/version-2.5-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

Dashboard personal interactivo con gestión de tareas tipo Kanban, temporizador Pomodoro, widget del clima en tiempo real y **API REST completa** con PHP y MySQL.

---

## ✨ Características

### 📋 Sistema de Tareas Kanban
- **Tres columnas:** Pendientes, En Progreso y Completadas
- **Drag & Drop nativo:** Arrastra tareas entre columnas o dentro de la misma para reordenar
- **Reordenamiento con persistencia:** El orden de las tareas se mantiene
- **Indicadores visuales:** Líneas moradas muestran dónde se insertará la tarea al arrastrar
- **Navegación con botones:** Mueve tareas con flechas
- **Backend completo:** API REST con CRUD completo de tareas
- **Sistema multiusuario:** Cada usuario tiene sus propias tareas

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
- **Login/Logout:** Autenticación completa con sesiones PHP
- **Encriptación de contraseñas:** Bcrypt para máxima seguridad
- **Protección contra SQL injection:** Prepared statements en todas las queries
- **API REST completa:** 7 endpoints JSON funcionales
- **Base de datos relacional:** MySQL con tablas relacionadas por FOREIGN KEY
- **Seguridad por usuario:** Cada usuario solo puede ver/modificar sus propias tareas

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

#### Crear base de datos y tablas
1. Abre `http://localhost/phpmyadmin`
2. Crea una nueva base de datos llamada `dashboard_db`
3. Ejecuta estos comandos SQL:

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
│   │   ├── register.php    # Registro de usuarios
│   │   ├── login.php       # Inicio de sesión
│   │   └── logout.php      # Cierre de sesión
│   └── tasks/
│       ├── create.php      # Crear tarea
│       ├── read.php        # Leer tareas
│       ├── update.php      # Actualizar tarea
│       └── delete.php      # Eliminar tarea
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

---

## 🔐 Seguridad Implementada

### Backend
- ✅ **Encriptación de contraseñas:** `password_hash()` con BCRYPT
- ✅ **Prepared Statements:** Prevención de SQL injection en todas las queries
- ✅ **Validación de datos:** Verificación de inputs en todos los endpoints
- ✅ **Sessions PHP:** Gestión segura de autenticación
- ✅ **Protección por usuario:** Verificación de `user_id` en WHERE clauses
- ✅ **HTTP Status Codes:** Respuestas apropiadas (200, 201, 400, 401, 404, 500)
- ✅ **Exit después de errores:** Prevención de ejecución de código adicional

### Frontend
- ✅ **Validación de formularios:** Prevención de datos vacíos
- ✅ **CORS Headers:** Control de acceso
- ✅ **Sanitización de inputs:** Prevención de XSS

---

## 📡 Documentación de la API

### Base URL
```
http://dashboard.local/api
```

---

### 🔐 Autenticación

#### 1. Registro de usuario
Crea una nueva cuenta de usuario.

```http
POST /auth/register.php
Content-Type: application/json

{
    "username": "usuario",
    "email": "email@ejemplo.com",
    "password": "contraseña"
}
```

**Respuestas:**
- `201 Created` - Usuario creado correctamente
```json
{
    "message": "User registered successfully"
}
```
- `400 Bad Request` - Usuario o email ya existe / Datos incompletos
```json
{
    "message": "User or email already exists"
}
```

---

#### 2. Inicio de sesión
Autentica un usuario y crea una sesión.

```http
POST /auth/login.php
Content-Type: application/json

{
    "username": "usuario",
    "password": "contraseña"
}
```

**Respuestas:**
- `200 OK` - Login exitoso
```json
{
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "usuario",
        "email": "email@ejemplo.com"
    }
}
```
- `401 Unauthorized` - Contraseña incorrecta
- `404 Not Found` - Usuario no encontrado
- `400 Bad Request` - Datos incompletos

---

#### 3. Cerrar sesión
Destruye la sesión del usuario.

```http
POST /auth/logout.php
```

**Respuestas:**
- `200 OK` - Sesión cerrada
```json
{
    "message": "Logged out successfully"
}
```

---

### 📋 Gestión de Tareas (CRUD)

> **Nota:** Todos estos endpoints requieren que el usuario esté autenticado (sesión activa).

---

#### 4. Crear tarea
Crea una nueva tarea para el usuario autenticado.

```http
POST /tasks/create.php
Content-Type: application/json

{
    "text": "Nombre de la tarea",
    "state": "pending",          // Opcional: pending, progress, completed
    "task_order": 0              // Opcional: número de orden
}
```

**Respuestas:**
- `201 Created` - Tarea creada
```json
{
    "message": "Task created successfully",
    "task": {
        "id": 1,
        "text": "Nombre de la tarea",
        "state": "pending",
        "task_order": 0
    }
}
```
- `401 Unauthorized` - Usuario no autenticado
- `400 Bad Request` - Datos incompletos
- `500 Internal Server Error` - Error al crear

---

#### 5. Leer tareas
Obtiene todas las tareas del usuario autenticado, ordenadas por `task_order`.

```http
GET /tasks/read.php
```

**Respuestas:**
- `200 OK` - Tareas obtenidas
```json
{
    "tasks": [
        {
            "id": 1,
            "text": "Tarea 1",
            "state": "pending",
            "task_order": 0
        },
        {
            "id": 2,
            "text": "Tarea 2",
            "state": "progress",
            "task_order": 1
        }
    ]
}
```
- `401 Unauthorized` - Usuario no autenticado

---

#### 6. Actualizar tarea
Actualiza una tarea existente del usuario autenticado.

```http
PUT /tasks/update.php
Content-Type: application/json

{
    "id": 1,
    "text": "Tarea actualizada",
    "state": "progress",
    "task_order": 0
}
```

**Respuestas:**
- `200 OK` - Tarea actualizada
```json
{
    "message": "Task updated successfully"
}
```
- `401 Unauthorized` - Usuario no autenticado
- `400 Bad Request` - ID de tarea no proporcionado
- `500 Internal Server Error` - Error al actualizar

> **Nota de seguridad:** Solo se actualizan tareas que pertenecen al usuario autenticado (verificado con `user_id` en WHERE).

---

#### 7. Eliminar tarea
Elimina una tarea del usuario autenticado.

```http
DELETE /tasks/delete.php
Content-Type: application/json

{
    "id": 1
}
```

**Respuestas:**
- `200 OK` - Tarea eliminada
```json
{
    "message": "Task deleted successfully"
}
```
- `401 Unauthorized` - Usuario no autenticado
- `400 Bad Request` - ID de tarea no proporcionado
- `500 Internal Server Error` - Error al eliminar

> **Nota de seguridad:** Solo se eliminan tareas que pertenecen al usuario autenticado (verificado con `user_id` en WHERE).

---

## 🧪 Pruebas de la API

### Con Thunder Client (VS Code)
1. Instala la extensión "Thunder Client"
2. Crea requests según la documentación anterior
3. Usa las sesiones para mantener la autenticación

### Con cURL (Terminal)
```bash
# Registro
curl -X POST http://dashboard.local/api/auth/register.php \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"12345"}'

# Login
curl -X POST http://dashboard.local/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"12345"}' \
  -c cookies.txt

# Crear tarea (usando cookies de login)
curl -X POST http://dashboard.local/api/tasks/create.php \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"text":"Mi tarea"}'

# Leer tareas
curl -X GET http://dashboard.local/api/tasks/read.php \
  -b cookies.txt
```

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

### Primera vez
1. **Regístrate** creando una cuenta nueva
2. **Inicia sesión** con tus credenciales
3. **Empieza a usar** el dashboard

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
- Verifica que no haya espacios antes de `<?php`
- NO uses `?>` al final de archivos PHP puros
- Asegúrate de que los archivos estén en UTF-8 sin BOM

### Error "Column not found: task_order"
- Ejecuta: `ALTER TABLE tasks ADD COLUMN task_order INT DEFAULT 0 AFTER state;`

### Sesiones no persisten en Thunder Client
- Es normal, Thunder Client no mantiene cookies entre requests
- Las sesiones funcionarán correctamente cuando conectes el frontend

### No aparece el clima
- Verifica tu API Key de OpenWeatherMap
- Comprueba que esté activa (puede tardar 10-15 min)
- Revisa la consola del navegador para errores

### Geolocalización no funciona en móvil
- Requiere HTTPS (no funciona con HTTP en móviles)
- Considera desplegar en GitHub Pages o Netlify

---

## 🚧 Próximas Mejoras

- [ ] Conectar frontend con backend (reemplazar localStorage)
- [ ] Formularios de login/registro en la interfaz
- [ ] Botón de logout visible
- [ ] Sincronización automática de tareas
- [ ] Recuperación de contraseña
- [ ] Validación de email con código
- [ ] Panel de administración de usuarios
- [ ] Modo oscuro/claro toggle
- [ ] Exportar/importar tareas
- [ ] Notificaciones del Pomodoro
- [ ] Gráficos de productividad
- [ ] Aplicación móvil (PWA)
- [ ] Deploy en producción con HTTPS

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
- MySQL (DDL, DML, Relaciones, FOREIGN KEY)
- PDO (Prepared Statements)
- Sessions (Autenticación)
- Password Hashing (BCRYPT)
- REST API Design (CRUD completo)
- JSON Manipulation
- HTTP Status Codes
- Security Best Practices

### DevOps
- Git & GitHub
- XAMPP Configuration
- Virtual Hosts
- phpMyAdmin
- API Testing (Thunder Client)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!