/******************************************************
📌 JAVASCRIPT PROFESIONAL PARA INTERACCIÓN Y MODALES
******************************************************/

document.addEventListener("DOMContentLoaded", () => {
    
    // ✅ Inicializar AOS para animaciones
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000 });
    }

    /* ============================
       2. MENÚ RESPONSIVE Y MODO OSCURO
    ============================ */
    const header = document.getElementById("main-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    

    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }



    // ✅ Función para Filtrar Servicios Dinámicamente
    const searchInput = document.getElementById('searchService');

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const filtro = searchInput.value.toUpperCase();
            document.querySelectorAll('.service-item').forEach(servicio => {
                const titulo = servicio.querySelector('h3').textContent.toUpperCase();
                servicio.style.display = titulo.includes(filtro) ? "block" : "none";
            });
        });
    }

  




    

    /******************************************************
    📌 MANEJO DE MODALES DE SERVICIOS
    ******************************************************/

    // ✅ Seleccionar botones de apertura y cierre de modales
    const modalButtons = document.querySelectorAll(".btn-modal-open");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // ✅ Función para abrir un modal
    function openModal(serviceId) {
        const modal = document.getElementById(`modal-${serviceId}`);
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Evitar scroll en el fondo
        } else {
            console.error(`❌ No se encontró el modal con ID: modal-${serviceId}`);
        }
    }

    // ✅ Función para cerrar un modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = ""; // Restaurar scroll
        }
    }

    // ✅ Agregar eventos de apertura de modales
    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            openModal(this.getAttribute("data-service"));
        });
    });

    // ✅ Agregar eventos de cierre de modales
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            closeModal(this.closest(".modal"));
        });
    });

    // ✅ Cerrar modal al hacer clic fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ✅ Cerrar modal con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }
            });
        }
    });

});






