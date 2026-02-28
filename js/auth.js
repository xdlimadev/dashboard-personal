document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  register(username, email, password);
});

document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  login(username, password);
});

function setupAuthUI() {
  const showRegisterBtn = document.getElementById("show-register");
  const showLoginBtn = document.getElementById("show-login");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  showRegisterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });

  showLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}

async function register(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showToast("Cuenta creada correctamente. Ahora inicia sesión.", "success");
      // Cambiar a formulario de login
      document.getElementById("register-form").classList.remove("active");
      document.getElementById("login-form").classList.add("active");
    } else {
      showToast("❌ Error: " + data.message, "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("❌ Error al conectar con el servidor", "error");
  }
}

async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Ocultar pantalla de auth y mostrar dashboard
      document.body.classList.remove("not-authenticated");
      document.body.classList.add("authenticated");

      showToast("¡Inicio de sesión exitoso!", "success");

      // Cargar tareas del usuario
      loadTasksFromAPI();
      initDashboard();
    } else {
      showToast("❌ Error: " + data.message, "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("❌ Error al conectar con el servidor", "error");
  }
}

async function handleLogout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout.php`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("user");
      notes = [];
      tasks = [];
      editingNoteId = null;
      document.body.classList.remove("authenticated");
      document.body.classList.add("not-authenticated");

      showToast("Sesión cerrada correctamente", "success");
    } else {
      showToast("Error al cerrar sesión", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("Error al cerrar sesión", "error");
  }
}

function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    // Quitar listener anterior y añadir uno nuevo con la MISMA función
    logoutBtn.removeEventListener("click", handleLogout);
    logoutBtn.addEventListener("click", handleLogout);
  }
}

async function checkSession() {
  try {
    const response = await fetch(`${API_URL}/auth/check_session.php`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (data.authenticated) {
      localStorage.setItem("user", JSON.stringify(data.user));
      document.body.classList.remove("not-authenticated");
      document.body.classList.add("authenticated");

      loadTasksFromAPI();
      initDashboard();
    } else {
      document.body.classList.add("not-authenticated");
    }
  } catch (error) {
    console.error("Error checking session:", error);
    document.body.classList.add("not-authenticated");
  }
}
