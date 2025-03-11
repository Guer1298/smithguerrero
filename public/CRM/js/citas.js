document.addEventListener("DOMContentLoaded", function () {
    cargarCitas();
    inicializarCalendario();
});

// 📌 Cargar Citas desde la API
async function cargarCitas() {
    try {
        const res = await fetch("/api/citas");
        const citas = await res.json();

        if (!res.ok) throw new Error("Error al cargar citas");
        
        actualizarCalendario(citas);
    } catch (error) {
        console.error("🚨 Error al cargar citas:", error);
    }
}

// 📅 Inicializar FullCalendar.js
function inicializarCalendario() {
    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        editable: true,
        selectable: true,
        events: [],
        eventClick: manejarClickCita,
        dateClick: abrirModalNuevaCita,
        eventDrop: actualizarCitaArrastrada,
        eventResize: actualizarCitaArrastrada
    });

    calendar.render();
    window.calendar = calendar;
}

// 🔄 Actualizar Eventos en el Calendario
function actualizarCalendario(citas) {
    if (window.calendar) {
        window.calendar.removeAllEvents();
        citas.forEach(cita => {
            window.calendar.addEvent({
                id: cita.id,
                title: cita.cliente,
                start: cita.fecha,
                extendedProps: {
                    notas: cita.notas
                }
            });
        });
    }
}

// 📝 Agregar Nueva Cita
document.getElementById("guardarCita").addEventListener("click", async function () {
    const cliente = document.getElementById("clienteCita").value.trim();
    const fecha = document.getElementById("fechaCita").value;
    const notas = document.getElementById("notasCita").value.trim();

    if (!cliente || !fecha) {
        alert("⚠️ Debes completar el cliente y la fecha.");
        return;
    }

    try {
        const res = await fetch("/api/citas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cliente, fecha, notas })
        });

        const nuevaCita = await res.json();

        if (!res.ok) throw new Error(nuevaCita.error || "Error al agregar cita");

        cerrarModal();
        cargarCitas(); // Refrescar el calendario
    } catch (error) {
        console.error("🚨 Error al agregar cita:", error);
    }
});

// 📌 Manejar Click en Cita (Editar/Eliminar)
function manejarClickCita(info) {
    const { id, title, start, extendedProps } = info.event;

    if (confirm(`📌 Cita con ${title} el ${start.toLocaleDateString()}.\n\n¿Quieres editarla o eliminarla?`)) {
        document.getElementById("clienteCita").value = title;
        document.getElementById("fechaCita").value = start.toISOString().slice(0, 16);
        document.getElementById("notasCita").value = extendedProps.notas || "";
        
        document.getElementById("guardarCita").dataset.id = id;
        abrirModal();
    }
}

// ✏️ Actualizar Cita al Arrastrar/Redimensionar
async function actualizarCitaArrastrada(info) {
    try {
        const res = await fetch(`/api/citas/${info.event.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fecha: info.event.start.toISOString() })
        });

        if (!res.ok) throw new Error("Error al actualizar cita.");
    } catch (error) {
        console.error("🚨 Error al actualizar cita:", error);
    }
}

// ❌ Eliminar Cita
async function eliminarCita(id) {
    if (!confirm("¿Seguro que deseas eliminar esta cita?")) return;

    try {
        const res = await fetch(`/api/citas/${id}`, { method: "DELETE" });

        if (!res.ok) throw new Error("Error al eliminar cita.");

        cargarCitas();
    } catch (error) {
        console.error("🚨 Error al eliminar cita:", error);
    }
}

// 🔄 Abrir/Cerrar Modal
function abrirModal() { document.getElementById("citaModal").style.display = "block"; }
function cerrarModal() { document.getElementById("citaModal").style.display = "none"; }
document.querySelector(".close-modal").addEventListener("click", cerrarModal);
