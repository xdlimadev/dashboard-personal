# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Version](https://img.shields.io/badge/version-3.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

Dashboard personal interactivo con gestión de tareas tipo Kanban, temporizador Pomodoro, widget del clima en tiempo real y **API REST completa** con PHP y MySQL.

---

## ✨ Características

### 📋 Sistema de Tareas Kanban
- **Tres columnas:** Pendientes, En Progreso y Completadas
- **Drag & Drop nativo:** Arrastra tareas entre columnas o dentro de la misma para reordenar
- **Reordenamiento con persistencia:** El orden de las tareas se mantiene en la base de datos
- **Batch updates:** Actualización eficiente de múltiples tareas en una sola petición
- **Optimistic UI updates:** Cambios instantáneos con rollback automático si falla el servidor
- **Indicadores visuales:** Líneas moradas muestran dónde se insertará la tarea al arrastrar
- **Navegación con botones:** Mueve tareas con flechas
- **Toast notifications:** Feedback visual profesional para todas las acciones
- **Backend completo:** API REST con CRUD completo de tareas
- **Sistema multiusuario:** Cada usuario tiene sus propias tareas
- **Normalización de datos:** Tipos consistentes entre frontend y backend

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
- **Pantalla de autenticación:** Formularios de login y registro con diseño glassmorphism
- **Botón de logout integrado:** Visible en el header del dashboard
- **Verificación de sesión:** Comprobación automática al cargar la página
- **Toast notifications:** Feedback visual para acciones de autenticación
- **Encriptación de contraseñas:** Bcrypt para máxima seguridad
- **Protección contra SQL injection:** Prepared statements en todas las queries
- **API REST completa:** 9 endpoints JSON funcionales
- **Base de datos relacional:** MySQL con tablas relacionadas por FOREIGN KEY
- **Seguridad por usuario:** Cada usuario solo puede ver/modificar sus propias tareas

### ⏰ Reloj y Fecha
- **Hora en tiempo real:** Actualización cada segundo
- **Fecha completa:** Día de la semana, día, mes y año
- **Formato personalizado:** Diseño limpio y legible

### 🎨 Diseño Responsive
- **Optimizado para ultrawide:** Diseñado para monitores 3440x1440 y superiores
- **Full HD:** Adaptado para 1920x1080
- **Laptops:** Compatible con 1366px - 1440px
- **Tablets:** Layout adaptado para 1024px
- **Variables CSS:** Sistema de personalización fácil con variables CSS
- **Glassmorphism:** Efecto de vidrio esmerilado con blur
- **Tema oscuro:** Paleta de colores morados y oscuros
- **Animaciones suaves:** Transiciones y efectos hover

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Flexbox, Media Queries, Glassmorphism y animaciones
- **JavaScript (Vanilla ES6+)** - Lógica y funcionalidad
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
├── index.html              # Página principal (incluye UI de login/registro)
├── style.css               # Estilos con variables CSS y responsive
├── script.js               # Lógica del frontend
├── api/                    # Backend PHP
│   ├── config/
│   │   └── database.php    # Configuración de la BD
│   ├── auth/
│   │   ├── register.php        # Registro de usuarios
│   │   ├── login.php           # Inicio de sesión
│   │   ├── logout.php          # Cierre de sesión
│   │   └── check_session.php   # Verificación de sesión activa
│   └── tasks/
│       ├── create.php      # Crear tarea
│       ├── read.php        # Leer tareas
│       ├── update.php      # Actualizar tarea (texto, estado)
│       ├── update_order.php# Actualizar orden de tareas (batch)
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
- ✅ **Optimistic updates con rollback:** Reversión automática si falla el servidor
- ✅ **Normalización de tipos:** Consistencia entre frontend y backend

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

#### 4. Verificar sesión
Comprueba si hay una sesión activa. Usado al cargar la página para decidir si mostrar el dashboard o la pantalla de login.
```http
GET /auth/check_session.php
```

**Respuestas:**
- `200 OK` - Sesión activa
```json
{
    "authenticated": true,
    "user": {
        "id": 1,
        "username": "usuario"
    }
}
```
- `401 Unauthorized` - Sin sesión activa
```json
{
    "authenticated": false
}
```

---

### 📋 Gestión de Tareas (CRUD)

> **Nota:** Todos estos endpoints requieren que el usuario esté autenticado (sesión activa).

---

#### 5. Crear tarea
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

#### 6. Leer tareas
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

#### 7. Actualizar tarea
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

#### 8. Actualizar orden de tareas (batch)
Actualiza el `task_order` de múltiples tareas en una sola petición. Se usa al reordenar con drag & drop.
```http
POST /tasks/update_order.php
Content-Type: application/json

{
    "tasks": [
        { "id": 1, "task_order": 0 },
        { "id": 2, "task_order": 1 },
        { "id": 3, "task_order": 2 }
    ]
}
```

**Respuestas:**
- `200 OK` - Orden actualizado
```json
{
    "message": "Tasks order updated successfully"
}
```
- `401 Unauthorized` - Usuario no autenticado
- `400 Bad Request` - Datos inválidos o array vacío
- `500 Internal Server Error` - Error al actualizar

> **Nota de seguridad:** Solo se actualizan tareas que pertenecen al usuario autenticado (verificado con `user_id` en WHERE).

---

#### 9. Eliminar tarea
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

## 🎨 Personalización con Variables CSS

El dashboard utiliza un sistema completo de variables CSS para fácil personalización:
```css
:root {
    /* Espaciados */
    --spacing-xs: 6px;
    --spacing-sm: 10px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Tamaños de fuente */
    --font-xs: 0.75rem;
    --font-sm: 0.85rem;
    --font-md: 0.95rem;
    --font-lg: 1.1rem;
    --font-xl: 1.5rem;
    --font-xxl: 2.5rem;

    /* Tamaños de tarjetas */
    --card-small: 350px;
    --card-mid: 537.5px;
    --card-large: 1100px;

    /* Tamaños de columnas de tareas */
    --task-col-min: 320px;
    --task-col-max: 400px;
    --task-col-height: 450px;

    /* Colores */
    --color-primary: #a771f5;
    --color-bg: rgba(167, 113, 245, 0.15);
    --color-border: rgba(255, 255, 255, 0.2);

    /* Bordes y sombras */
    --radius-sm: 8px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

---

## 📱 Breakpoints Responsive

- **Ultrawide**: 3440px - 1921px (diseño optimizado)
- **Full HD**: 1920px - 1441px
- **Laptop**: 1440px - 1367px
- **Laptop Small**: 1366px - 1025px
- **Tablet**: 1024px - 769px (layout adaptado, columnas apiladas)
- **Mobile**: 768px y menor (pendiente de implementación)

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
- **Feedback visual:** Toast notifications para todas las acciones

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

### Tareas duplicadas al crear
- Verifica que `taskManager()` se llame solo una vez en la inicialización
- No debe estar dentro de `initDashboard()`

---

## 🚧 Próximas Mejoras

### Completado recientemente ✅
- [x] Conectar frontend con backend (reemplazar localStorage)
- [x] Formularios de login/registro en la interfaz
- [x] Botón de logout integrado en el header
- [x] Sincronización automática de tareas con la API
- [x] Verificación de sesión al cargar la página
- [x] Reordenamiento por drag & drop con persistencia en BD
- [x] Optimistic updates con rollback automático
- [x] Toast notifications profesionales
- [x] Batch processing para actualización de orden
- [x] Variables CSS para personalización
- [x] Diseño responsive (ultrawide, Full HD, laptop, tablet)
- [x] Normalización de tipos de datos
- [x] Prevención de listeners duplicados

### Pendiente
- [ ] Responsive para móviles (768px y menor)
- [ ] Notas Rápidas guardadas en backend (actualmente en localStorage)
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

**Bruno de Lima** - [GitHub](https://github.com/xdlimadev)

---

## 📚 Tecnologías Aprendidas en Este Proyecto

### Frontend
- HTML5 semántico
- CSS3 avanzado (Variables CSS, Flexbox, Media Queries, Animations)
- JavaScript ES6+ (Async/Await, Fetch, Classes, Optimistic Updates)
- DOM Manipulation
- Drag & Drop API
- Geolocation API
- Error Handling & Rollback Patterns

### Backend
- PHP OOP (Clases, Métodos)
- MySQL (DDL, DML, Relaciones, FOREIGN KEY)
- PDO (Prepared Statements)
- Sessions (Autenticación)
- Password Hashing (BCRYPT)
- REST API Design (CRUD completo + batch operations)
- JSON Manipulation
- HTTP Status Codes
- Security Best Practices
- Data Normalization

### DevOps
- Git & GitHub
- XAMPP Configuration
- Virtual Hosts
- phpMyAdmin
- API Testing (Thunder Client)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

---

**Versión:** 3.0  
**Última actualización:** Febrero 2026