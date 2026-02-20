# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

Requires XAMPP with Apache and MySQL running. The project is served from `C:\xampp\htdocs\dashboard-personal`.

**Configured virtual host:** `http://dashboard.local` (Apache vhosts pointing to this directory).

**Access:** `http://dashboard.local` or `http://localhost/dashboard-personal`

**Test API connectivity:**
```bash
curl -X GET http://dashboard.local/api/auth/check_session.php
```

**Test auth flow:**
```bash
curl -X POST http://dashboard.local/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"12345"}' \
  -c cookies.txt

curl -X GET http://dashboard.local/api/tasks/read.php -b cookies.txt
```

## Architecture

### Auth Flow
Authentication state is controlled by CSS classes on `<body>`: `authenticated` vs `not-authenticated`. On page load, `checkSession()` calls `GET /api/auth/check_session.php` to decide which class to apply, showing either the auth screen or the dashboard. All API calls use `credentials: 'include'` to send PHP session cookies.

### API URL Detection (`script.js:710-712`)
```js
const API_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://dashboard.local/api'  // Live Server → points to XAMPP
    : '/api';                        // XAMPP → relative path
```
This lets VS Code Live Server (port 5500) coexist with XAMPP.

### Frontend Global State
Tasks are stored in a global `tasks[]` array in `script.js`. This array is the source of truth for the UI — the API is called optimistically and `loadTasksFromAPI()` is used as a rollback on error.

### Initialization Chain
```
checkSession()
  └─ if authenticated → loadTasksFromAPI() + initDashboard()
       └─ initDashboard() calls: setupCityModal, getDataWeather, clock, taskManager, pomodoroTimer
```
`setupAuthUI()` and `setupLogout()` run unconditionally at script load (bottom of `script.js`).

### Backend Pattern
Every PHP endpoint follows the same structure:
1. `session_start()` + CORS headers
2. Check `$_SESSION['user_id']` → 401 if missing
3. `require_once '../config/database.php'` → `new Database()->getConnection()`
4. Parse `json_decode(file_get_contents("php://input"))`
5. Prepared statement with `:user_id` in WHERE clause for security

### Weather Widget
Uses OpenWeatherMap API. Coordinates are cached in `localStorage` as `weatherCoords`. Falls back to city-name search if geolocation fails. Auto-refreshes every 30 minutes (`setInterval(getDataWeather, 1800000)`).

### Drag & Drop
Visual feedback uses `.drag-over-top` / `.drag-over-bottom` CSS classes. On drop, calls `updateTaskState()` (if column changed) then `updateTaskOrder()` which does a batch POST to `update_order.php` with all task IDs and their new indices.

## Database

**Name:** `dashboard_db`
**Config:** `api/config/database.php` — default XAMPP credentials (`root`, empty password).

```sql
-- Add missing column if needed
ALTER TABLE tasks ADD COLUMN task_order INT DEFAULT 0 AFTER state;
```

## Key Gotchas

- PHP files must be UTF-8 **without BOM** and must **not** close with `?>`  — otherwise "Headers already sent" errors.
- Sessions don't persist in Thunder Client by default; use `-c cookies.txt` / `-b cookies.txt` with curl.
- Geolocation requires HTTPS on mobile browsers.
- The Pomodoro has commented-out short test durations at `script.js:614-617` — uncomment for quick testing.
