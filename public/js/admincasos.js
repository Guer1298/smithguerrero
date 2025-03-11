// 📌 JavaScript para la Administración de Casos en SmithGuerrero CRM
document.addEventListener("DOMContentLoaded", () => {
    activarPestañas();
});

// 📌 Función para manejar el cambio entre pestañas de casos
function activarPestañas() {
    const tabs = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".case-section");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remover clase activa de todas las pestañas
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Mostrar la sección correspondiente
            sections.forEach(section => section.classList.remove("active"));
            document.getElementById(tab.getAttribute("onclick").split("'")[1]).classList.add("active");
        });
    });
}

// 📌 Función para cargar casos desde el backend (simulado aquí)
async function cargarCasos() {
    try {
        const res = await fetch("/api/casos"); // Asegúrate de que esta ruta está configurada en el backend
        const data = await res.json();
        
        const tableBody = document.querySelector("#casosActivos tbody");
        tableBody.innerHTML = "";
        
        data.forEach(caso => {
            const row = `<tr>
                <td>${caso.nombre}</td>
                <td class="status ${caso.estado.toLowerCase()}">${caso.estado}</td>
                <td>${caso.abogado}</td>
                <td>
                    <button class="view"><i class="fas fa-eye"></i> Ver</button>
                    <button class="edit"><i class="fas fa-edit"></i> Editar</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al cargar los casos:", error);
    }
}

// 📌 Cargar casos al iniciar la aplicación
document.addEventListener("DOMContentLoaded", cargarCasos);
