document.addEventListener("DOMContentLoaded", function () {

    /*** --- MENÚ RESPONSIVO --- ***/
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /*** --- EFECTO STICKY HEADER --- ***/
    window.addEventListener("scroll", function () {
        let header = document.querySelector("header");
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    /*** --- ANIMACIÓN DE APARICIÓN EN SCROLL --- ***/
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Ejecuta la función al cargar la página

    /*** --- VALIDACIÓN DEL FORMULARIO DE CONTACTO --- ***/
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Por favor, completa todos los campos antes de enviar.");
                event.preventDefault();
            } else if (!validateEmail(email)) {
                alert("Por favor, ingresa un correo válido.");
                event.preventDefault();
            } else {
                alert("¡Mensaje enviado con éxito!");
            }
        });
    }

    // Función para validar email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /*** --- BOTÓN DE WHATSAPP FLOTANTE --- ***/
    const whatsappButton = document.createElement("a");
    whatsappButton.href = "https://wa.me/573003482107";
    whatsappButton.classList.add("whatsapp-float");
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappButton);

});

