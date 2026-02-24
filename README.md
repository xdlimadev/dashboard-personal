# 📊 Dashboard Personal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Version](https://img.shields.io/badge/version-3.2-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

Dashboard personal interactivo con gestión de tareas tipo Kanban, temporizador Pomodoro, widget del clima en tiempo real, **estadísticas con gráficos interactivos** y **API REST completa** con PHP y MySQL.

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
- **Tracking temporal:** Fecha de completado guardada para estadísticas

### 📊 Estadísticas y Analytics **[NUEVO]**
- **Gráfico Donut:** Visualización del estado actual de tareas (Pendientes, En Progreso, Completadas)
- **Gráfico de Líneas:** Progreso de tareas completadas en los últimos 7 días
- **Actualización en tiempo real:** Los gráficos se actualizan automáticamente al mover tareas
- **Colores distintivos:** Naranja (pendientes), Azul (progreso), Verde (completadas)
- **Chart.js:** Gráficos interactivos y responsive
- **Endpoint optimizado:** Query con GROUP BY para timeline eficiente

### 🍅 Temporizador Pomodoro
- **Ciclos de trabajo/descanso:** 25 min trabajo, 5 min descanso corto, 15 min descanso largo
- **Contador de pomodoros:** Lleva el registro de tus sesiones completadas
- **Cambio automático:** Alterna entre modos automáticamente
- **Controles completos:** Play, pausa y reset

### 🌤️ Widget del Clima Inteligente
- **API Key protegida:** Configuración de secretos no expuesta en el código
- **Endpoint backend:** Peticiones al clima a través de tu servidor (seguridad)
- **Geolocalización automática:** Detecta tu ubicación y muestra el clima local
- **Configuración manual:** Busca cualquier ciudad del mundo
- **Botón de cambio rápido:** Cambia de ubicación en un click
- **Información completa:** Temperatura actual, mín/máx, humedad y velocidad del viento
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
- **API REST completa:** 11 endpoints JSON funcionales
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
- **Chart.js 4.4.0** - Gráficos interactivos y visualización de datos
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
- **OpenWeatherMap API** - Datos meteorológicos globales (protegida en backend)

---

## 🚀 Instalación y Configuración

### Requisitos previos
- **XAMPP** (Apache + MySQL + PHP) o equivalente
- Navegador web moderno
- Conexión a internet (para widget del clima y Chart.js CDN)
- Cuenta en OpenWeatherMap (API Key gratuita)

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
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Migración de datos (si tienes tareas antiguas)
Si ya tenías tareas completadas antes de la v3.2, ejecuta esto para poblar las estadísticas:
```sql
UPDATE tasks 
SET completed_at = created_at 
WHERE state = 'completed' AND completed_at IS NULL;
```

### Paso 4: Configurar credenciales de la base de datos
Edita `api/config/database.php`:
```php
private $host = "localhost";
private $db_name = "dashboard_db";
private $username = "root";
private $password = ""; // Tu contraseña de MySQL (vacío por defecto en XAMPP)
```

### Paso 5: Configurar secretos (API Keys)

#### 1. Copia el archivo de ejemplo:
```bash
cp api/config/secrets.example.php api/config/secrets.php
```

#### 2. Edita `api/config/secrets.php`:
```php
<?php
return [
    'weather_api_key' => 'TU_API_KEY_DE_OPENWEATHERMAP_AQUI',
];
```

#### 3. Obtén tu API Key:
1. Regístrate gratis en [OpenWeatherMap](https://openweathermap.org/api)
2. Ve a tu perfil → API Keys
3. Copia tu API Key
4. Pégala en `secrets.php`

> **⚠️ IMPORTANTE:** El archivo `secrets.php` está en `.gitignore` y **NUNCA se subirá a GitHub**. Esto protege tu API Key.

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
├── script.js               # Lógica del frontend + Chart.js
├── api/                    # Backend PHP
│   ├── config/
│   │   ├── database.php        # Configuración de la BD
│   │   ├── secrets.php         # Claves secretas (NO en Git)
│   │   └── secrets.example.php # Plantilla de ejemplo
│   ├── auth/
│   │   ├── register.php        # Registro de usuarios
│   │   ├── login.php           # Inicio de sesión
│   │   ├── logout.php          # Cierre de sesión
│   │   └── check_session.php   # Verificación de sesión activa
│   ├── tasks/
│   │   ├── create.php      # Crear tarea
│   │   ├── read.php        # Leer tareas
│   │   ├── update.php      # Actualizar tarea (texto, estado, completed_at)
│   │   ├── update_order.php# Actualizar orden de tareas (batch)
│   │   ├── delete.php      # Eliminar tarea
│   │   └── stats.php       # Estadísticas (conteos y timeline) [NUEVO]
│   └── weather/
│       └── get_weather.php # Proxy para API del clima (protege API Key)
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

---

## 🔐 Seguridad Implementada

### Backend
- ✅ **Encriptación de contraseñas:** `password_hash()` con BCRYPT
- ✅ **Prepared Statements:** Prevención de SQL injection en todas las queries
- ✅ **Named parameters:** Uso consistente de PDO con `:param` syntax
- ✅ **Validación de datos:** Verificación de inputs en todos los endpoints
- ✅ **Sessions PHP:** Gestión segura de autenticación
- ✅ **Protección por usuario:** Verificación de `user_id` en WHERE clauses
- ✅ **HTTP Status Codes:** Respuestas apropiadas (200, 201, 400, 401, 404, 500)
- ✅ **Exit después de errores:** Prevención de ejecución de código adicional
- ✅ **API Keys protegidas:** Archivo `secrets.php` excluido de Git
- ✅ **Proxy backend:** Las API Keys nunca se exponen al frontend

### Frontend
- ✅ **Validación de formularios:** Prevención de datos vacíos
- ✅ **CORS Headers:** Control de acceso
- ✅ **Sanitización de inputs:** Prevención de XSS
- ✅ **Optimistic updates con rollback:** Reversión automática si falla el servidor
- ✅ **Normalización de tipos:** Consistencia entre frontend y backend
- ✅ **Sin API Keys expuestas:** Todas las peticiones pasan por el backend

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
- `400 Bad Request` - Usuario o email ya existe / Datos incompletos

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
- `401 Unauthorized` - Contraseña incorrecta
- `404 Not Found` - Usuario no encontrado

---

#### 3. Cerrar sesión
Destruye la sesión del usuario.
```http
POST /auth/logout.php
```

**Respuestas:**
- `200 OK` - Sesión cerrada

---

#### 4. Verificar sesión
Comprueba si hay una sesión activa.
```http
GET /auth/check_session.php
```

**Respuestas:**
- `200 OK` - Sesión activa
- `401 Unauthorized` - Sin sesión activa

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
    "state": "pending",
    "task_order": 0
}
```

---

#### 6. Leer tareas
Obtiene todas las tareas del usuario autenticado.
```http
GET /tasks/read.php
```

---

#### 7. Actualizar tarea
Actualiza una tarea existente. Automáticamente actualiza `completed_at` según el estado.
```http
PUT /tasks/update.php
Content-Type: application/json

{
    "id": 1,
    "text": "Tarea actualizada",
    "state": "completed",
    "task_order": 0
}
```

> **Nota:** Si `state = 'completed'`, `completed_at` se actualiza a NOW(). Si `state != 'completed'`, `completed_at` se pone en NULL.

---

#### 8. Actualizar orden (batch)
Actualiza el orden de múltiples tareas en una petición.
```http
POST /tasks/update_order.php
Content-Type: application/json

{
    "tasks": [
        { "id": 1, "task_order": 0 },
        { "id": 2, "task_order": 1 }
    ]
}
```

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

---

### 📊 Estadísticas **[NUEVO]**

#### 10. Obtener estadísticas
Devuelve conteos por estado y timeline de tareas completadas.
```http
GET /tasks/stats.php
```

**Respuesta exitosa (200 OK):**
```json
{
    "pending": 5,
    "progress": 3,
    "completed": 12,
    "timeline": [
        {"date": "2026-02-18", "count": 2},
        {"date": "2026-02-19", "count": 5},
        {"date": "2026-02-20", "count": 1}
    ]
}
```

**Detalles:**
- `pending`, `progress`, `completed`: Conteo actual de tareas en cada estado
- `timeline`: Array con fechas y cantidad de tareas completadas en los últimos 7 días
- Solo incluye días donde se completaron tareas (días sin tareas completadas no aparecen)

**Uso:**
- Gráfico Donut: Usa `pending`, `progress`, `completed`
- Gráfico de Líneas: Usa `timeline`

---

### 🌤️ Clima

#### 11. Obtener datos del clima
Endpoint proxy que protege la API Key de OpenWeatherMap.
```http
GET /weather/get_weather.php?city=Madrid
```

**O con coordenadas:**
```http
GET /weather/get_weather.php?lat=40.4168&lon=-3.7038
```

---

## 🧪 Pruebas de la API

### Con Thunder Client (VS Code)
1. Instala la extensión "Thunder Client"
2. Crea requests según la documentación
3. Usa las sesiones para mantener la autenticación

### Probar estadísticas
```bash
# Obtener stats (requiere sesión activa)
curl -X GET http://dashboard.local/api/tasks/stats.php \
  -b cookies.txt
```

---

## 🎨 Personalización con Variables CSS
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

### Ver Estadísticas **[NUEVO]**
- **Gráfico Donut:** Muestra distribución actual de tareas
- **Gráfico de Líneas:** Muestra progreso de los últimos 7 días
- **Actualización automática:** Los gráficos se actualizan al mover tareas

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

### Error "Column 'completed_at' not found"
Ejecuta esta migración:
```sql
ALTER TABLE tasks ADD COLUMN completed_at TIMESTAMP NULL AFTER task_order;
```

### Los gráficos no se muestran
- Verifica que Chart.js se cargue correctamente (revisa consola F12)
- Asegúrate de que el CDN de Chart.js esté en el HTML antes de `script.js`
- Verifica que `stats.php` devuelva datos correctos

### Los gráficos están vacíos
- Completa algunas tareas primero
- Verifica en phpMyAdmin que las tareas completadas tengan `completed_at` no NULL
- Si tienes tareas antiguas, ejecuta la migración de datos

### Los colores del donut no se ven
- Verifica que `maintainAspectRatio: false` esté en las opciones
- Asegúrate de que los colores sean vibrantes (no oscuros)

---

## 🚧 Próximas Mejoras

### Completado recientemente ✅
- [x] Conectar frontend con backend
- [x] Sistema de autenticación completo
- [x] Optimistic updates con rollback
- [x] Toast notifications profesionales
- [x] Batch processing
- [x] Variables CSS
- [x] Diseño responsive (ultrawide, Full HD, laptop, tablet)
- [x] Protección de API Keys
- [x] **Sistema de estadísticas con gráficos**
- [x] **Tracking de fecha de completado**
- [x] **Actualización de gráficos en tiempo real**

### Pendiente
- [ ] Responsive para móviles (768px y menor)
- [ ] Filtros de timeline (últimos 30 días, por mes)
- [ ] Estadísticas adicionales (tareas por día de la semana, productividad por hora)
- [ ] Exportar gráficos como imagen
- [ ] Crear Notas Rápidas guardadas en backend
- [ ] Recuperación de contraseña
- [ ] Modo oscuro/claro toggle
- [ ] PWA (Progressive Web App)
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
- Chart.js (Gráficos interactivos: Donut, Line)
- DOM Manipulation
- Drag & Drop API
- Geolocation API
- Error Handling & Rollback Patterns

### Backend
- PHP OOP (Clases, Métodos)
- MySQL (DDL, DML, Relaciones, FOREIGN KEY)
- PDO (Prepared Statements, Named Parameters)
- Sessions (Autenticación)
- Password Hashing (BCRYPT)
- REST API Design (CRUD + batch + stats endpoints)
- SQL Aggregation (SUM, COUNT, GROUP BY, DATE functions)
- JSON Manipulation
- HTTP Status Codes
- Security Best Practices (API Key protection, secrets management)
- Data Normalization
- Database Migrations

### DevOps & Security
- Git & GitHub
- .gitignore (secrets protection)
- XAMPP Configuration
- Virtual Hosts
- phpMyAdmin
- API Testing (Thunder Client)
- Secrets Management
- Environment-based configuration

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

---

**Versión:** 3.2  
**Última actualización:** Febrero 2026