document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JS de la página cargado correctamente");

    /* ============================
       1. FETCH: OBTENER USUARIOS
    ============================ */
    fetch("http://localhost:5001/api/auth/users")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log("📌 Usuarios obtenidos:", data))
        .catch(error => console.error("❌ Error en la carga de usuarios:", error));

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

    

    /* ============================
       3. ANIMACIONES CON AOS Y GSAP
    ============================ */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true
        });
    }

    if (typeof gsap !== "undefined") {
        gsap.from(".fade-up", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    /* ============================
       4. SCROLL SUAVE EN ENLACES
    ============================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* ============================
       5. DASHBOARD: VERIFICACIÓN DE SESIÓN
    ============================ */
    const dashboardLink = document.getElementById("dashboard-link");

    if (dashboardLink) {
        const abogadoAutenticado = localStorage.getItem("abogado");
        if (abogadoAutenticado) {
            dashboardLink.classList.remove("hidden");
        }
    }

    /* ============================
       6. FORMULARIO DE CONTACTO
    ============================ */
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                mostrarMensaje("Por favor, completa todos los campos.", "error");
                return;
            }

            if (!validarEmail(email)) {
                mostrarMensaje("Correo inválido. Intenta nuevamente.", "error");
                return;
            }

            try {
                const response = await fetch("http://localhost:5001/enviar-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const result = await response.json();

                if (result.success) {
                    mostrarMensaje("¡Mensaje enviado con éxito! 📩", "success");
                    contactForm.reset();
                } else {
                    mostrarMensaje("❌ Hubo un problema al enviar tu mensaje.", "error");
                }
            } catch (error) {
                console.error("Error al enviar el mensaje:", error);
                mostrarMensaje("❌ No se pudo enviar el mensaje. Intenta más tarde.", "error");
            }
        });
    }

    /* ============================
       7. FORMULARIO DE NEWSLETTER
    ============================ */
    const newsletterForm = document.getElementById("newsletter-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailSubscribe = document.getElementById("email-subscribe").value.trim();

            if (!emailSubscribe) {
                mostrarMensaje("Ingrese un correo para suscribirse.", "error");
                return;
            }

            if (!validarEmail(emailSubscribe)) {
                mostrarMensaje("Correo inválido.", "error");
                return;
            }

            mostrarMensaje("¡Gracias por suscribirte! 📩", "success");
            newsletterForm.reset();
        });
    }

    /* ============================
       8. MANEJO DE MODALES
    ============================ */
    const modalButtons = document.querySelectorAll(".btn-modal-open");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    function openModal(serviceId) {
        const modal = document.getElementById(`modal-${serviceId}`);
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        } else {
            console.error(`❌ No se encontró el modal: modal-${serviceId}`);
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            openModal(this.getAttribute("data-service"));
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            closeModal(this.closest(".modal"));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }
            });
        }
    });

    /* ============================
       9. UTILIDADES GENERALES
    ============================ */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function mostrarMensaje(mensaje, tipo) {
        let mensajeBox = document.createElement("div");
        mensajeBox.classList.add("mensaje-box", tipo);
        mensajeBox.textContent = mensaje;

        document.body.appendChild(mensajeBox);

        setTimeout(() => mensajeBox.classList.add("mostrar"), 100);
        setTimeout(() => {
            mensajeBox.classList.remove("mostrar");
            setTimeout(() => mensajeBox.remove(), 500);
        }, 4000);
    }
});

  



