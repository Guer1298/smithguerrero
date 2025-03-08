document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5003/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // ✅ Guarda el token en localStorage
            window.location.href = "dashboard.html"; // ✅ Redirige al dashboard
        } else {
            alert(data.msg || "Error en el inicio de sesión");
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Hubo un problema con el servidor.");
    }
});


