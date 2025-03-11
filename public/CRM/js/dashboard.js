document.addEventListener("DOMContentLoaded", function () {
    cargarEstadisticas();
    inicializarCalendario();
    inicializarNotificaciones();
    inicializarFiltros();
});

// 🚀 Simulación de carga de estadísticas desde el backend
function cargarEstadisticas() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById("casosActivos").textContent = data.casosActivos;
            document.getElementById("clientesAtendidos").textContent = data.clientesAtendidos;
            document.getElementById("citasPendientes").textContent = data.citasPendientes;
            document.getElementById("ingresos").textContent = `$${data.ingresos}`;
        });
}

// 📅 Inicializar Calendario
function inicializarCalendario() {
    new FullCalendar.Calendar(document.getElementById("calendar"), {
        initialView: "dayGridMonth",
        locale: "es",
        events: "/api/citas"
    }).render();
}

// 🔔 Notificaciones en Tiempo Real
function inicializarNotificaciones() {
    const notifButton = document.querySelector(".btn-notifications");
    notifButton.addEventListener("click", () => {
        alert("Tienes nuevas notificaciones 📩");
    });
}

// 🔍 Filtros de Búsqueda
function inicializarFiltros() {
    document.getElementById("search").addEventListener("input", function () {
        let searchTerm = this.value.toLowerCase();
        document.querySelectorAll("#casesTable tr").forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(searchTerm) ? "" : "none";
        });
    });
}

// 📥 Exportación a Excel
document.getElementById("exportData").addEventListener("click", function () {
    let table = document.querySelector("table");
    let wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, "reporte_smithguerrero.xlsx");
});

// 📩 WhatsApp y Email Directo
document.querySelectorAll(".whatsapp").forEach(btn => {
    btn.addEventListener("click", function () {
        window.open("https://wa.me/573001234567", "_blank");
    });
    
});

document.addEventListener("DOMContentLoaded", function () {
    const rol = localStorage.getItem("rol");

    if (!rol) {
        window.location.href = "index.html"; // Redirigir al login si no hay rol
    }

    // Ocultar secciones según el rol
    if (rol === "abogado") {
        document.querySelector(".finanzas").style.display = "none";
        document.querySelector(".configuracion").style.display = "none";
    }

    if (rol === "asistente") {
        document.querySelector(".casos").style.display = "none";
        document.querySelector(".finanzas").style.display = "none";
        document.querySelector(".configuracion").style.display = "none";
        document.querySelector(".reportes").style.display = "none";
    }

    if (rol === "cliente") {
        document.querySelector(".casos").style.display = "none";
        document.querySelector(".clientes").style.display = "none";
        document.querySelector(".finanzas").style.display = "none";
        document.querySelector(".configuracion").style.display = "none";
        document.querySelector(".reportes").style.display = "none";
    }
});
