document.addEventListener("DOMContentLoaded", () => {
    cargarConfiguraciones();
    manejarEventos();
});

// 📌 Cargar configuraciones guardadas en localStorage
function cargarConfiguraciones() {
    const rol = localStorage.getItem("rol") || "abogado";
    const notificaciones = localStorage.getItem("notificaciones") === "true";
    const modoOscuro = localStorage.getItem("modoOscuro") === "true";

    document.getElementById("selectRol").value = rol;
    document.getElementById("notificaciones").checked = notificaciones;
    document.getElementById("temaOscuro").checked = modoOscuro;

    aplicarModoOscuro(modoOscuro);
}

// 📌 Manejo de eventos
function manejarEventos() {
    document.getElementById("guardarConfig").addEventListener("click", mostrarModalConfirmacion);
    document.getElementById("confirmarGuardado").addEventListener("click", guardarConfiguraciones);
    document.querySelector(".close-modal").addEventListener("click", cerrarModal);
    document.getElementById("temaOscuro").addEventListener("change", () => {
        aplicarModoOscuro(document.getElementById("temaOscuro").checked);
    });
}

// 📌 Mostrar el modal de confirmación antes de guardar
function mostrarModalConfirmacion() {
    document.getElementById("configModal").style.display = "block";
}

// 📌 Cerrar el modal
function cerrarModal() {
    document.getElementById("configModal").style.display = "none";
}

// 📌 Guardar configuraciones en localStorage
function guardarConfiguraciones() {
    const rolSeleccionado = document.getElementById("selectRol").value;
    const notificacionesActivadas = document.getElementById("notificaciones").checked;
    const modoOscuroActivado = document.getElementById("temaOscuro").checked;

    localStorage.setItem("rol", rolSeleccionado);
    localStorage.setItem("notificaciones", notificacionesActivadas);
    localStorage.setItem("modoOscuro", modoOscuroActivado);

    cerrarModal();
    alert("✅ Configuración guardada correctamente.");
}

// 📌 Aplicar modo oscuro
function aplicarModoOscuro(activar) {
    if (activar) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}
