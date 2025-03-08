const API_URL = "http://localhost:5001/api";

async function obtenerUsuarios() {
    try {
        const response = await fetch(`${API_URL}/auth/users`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

async function registrarUsuario(nombre, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Usuario registrado con éxito");
        } else {
            alert("Error: " + data.msg);
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
}
