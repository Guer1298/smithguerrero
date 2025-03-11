document.addEventListener("DOMContentLoaded", () => {
    verificarSesion(); // Verificar si ya hay sesión activa
});

// 📌 URL BASE DEL SERVIDOR (VERIFICA QUE SEA CORRECTA)
const BASE_URL = "http://localhost:5001/api/auth"; // Ajusta según tu backend

// 📌 Función para Registrar Usuario
async function registrarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rol = document.getElementById("rol").value;

    if (!nombre || !email || !password) {
        mostrarError("❌ Todos los campos son obligatorios.");
        return;
    }

    console.log("📤 Enviando datos al servidor...");

    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password, rol })
        });

        console.log("📥 Respuesta del servidor recibida:", res);

        // Verificar si la respuesta tiene formato JSON válido
        const data = await res.json().catch(() => ({ error: "⚠️ Respuesta inválida del servidor" }));

        if (!res.ok) {
            throw new Error(data.error || `⚠️ Error ${res.status}: No se pudo registrar.`);
        }

        alert("✅ Registro exitoso. Inicia sesión.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("🚨 Error en el registro:", error);
        mostrarError(error.message || "❌ Error en el servidor. Intenta más tarde.");
    }
}

// 📌 Función para Iniciar Sesión
async function iniciarSesion(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        mostrarError("❌ Por favor, ingresa correo y contraseña.");
        return;
    }

    console.log("📤 Intentando iniciar sesión...");

    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        console.log("📥 Respuesta del servidor recibida:", res);

        const data = await res.json().catch(() => ({ error: "⚠️ Respuesta inválida del servidor" }));

        if (!res.ok) {
            throw new Error(data.error || `⚠️ Error ${res.status}: Credenciales incorrectas.`);
        }

        // Guardar el token y el rol en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);

        alert("✅ Inicio de sesión exitoso.");
        redirigirSegunRol(data.rol);
    } catch (error) {
        console.error("🚨 Error en el inicio de sesión:", error);
        mostrarError(error.message || "❌ Error en el servidor. Intenta más tarde.");
    }
}

// 📌 Función para Redirigir según el Rol
function redirigirSegunRol(rol) {
    console.log(`🔀 Redirigiendo usuario con rol: ${rol}`);

    switch (rol) {
        case "administrador":
            window.location.href = "/public/CRM/dashboard.html";
            break;
        case "abogado":
            window.location.href = "/public/CRM/dashboard.html";
            break;
        case "asistente":
            window.location.href = "dashboard_asistente.html";
            break;
        case "cliente":
            window.location.href = "dashboard_cliente.html";
            break;
        default:
            window.location.href = "dashboard.html"; // Redirección genérica
    }
}

// 📌 Función para Mostrar Errores
function mostrarError(mensaje) {
    const errorBox = document.getElementById("error-message");
    if (errorBox) {
        errorBox.textContent = mensaje;
        errorBox.style.display = "block";
    }
}

// 📌 Función para Verificar Sesión Activa
function verificarSesion() {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (token && rol) {
        redirigirSegunRol(rol);
    }
}

// 📌 Event Listeners para los formularios
document.getElementById("registerForm")?.addEventListener("submit", registrarUsuario);
document.getElementById("loginForm")?.addEventListener("submit", iniciarSesion);
