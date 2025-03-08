document.addEventListener("DOMContentLoaded", () => {
    console.log("📩 Contacto.js cargado correctamente.");

    // Formulario de contacto
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evita el envío tradicional

            // Captura de datos
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            // Validación de campos vacíos
            if (!name || !email || !phone || !message) {
                showAlert("Todos los campos son obligatorios", "error");
                return;
            }

            // Validar email
            if (!validateEmail(email)) {
                showAlert("Por favor, introduce un correo válido", "error");
                return;
            }

            // Construcción del objeto
            const formData = {
                name,
                email,
                phone,
                message
            };

            try {
                const response = await fetch("http://localhost:5001/api/contacto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert("Mensaje enviado correctamente", "success");
                    contactForm.reset();
                } else {
                    showAlert(data.message || "Error al enviar el mensaje", "error");
                }
            } catch (error) {
                showAlert("Error en el servidor. Intenta más tarde", "error");
                console.error("❌ Error en el envío:", error);
            }
        });
    }

    // Validación de email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Mostrar alertas personalizadas
    function showAlert(message, type) {
        const alertBox = document.createElement("div");
        alertBox.className = `alert ${type}`;
        alertBox.textContent = message;

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }

    // Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            item.classList.toggle("active");

            const answer = item.querySelector(".faq-answer");
            if (item.classList.contains("active")) {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        });
    });

    // WhatsApp - Enviar mensaje con datos prellenados
    const whatsappBtn = document.querySelector(".whatsapp");

    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", () => {
            const phoneNumber = "573003482107";
            const text = encodeURIComponent("Hola, necesito asesoría legal. ¿Podemos agendar una consulta?");
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

            window.open(whatsappUrl, "_blank");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("📩 Contacto.js cargado correctamente.");

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !phone || !message) {
                showAlert("Todos los campos son obligatorios", "error");
                return;
            }

            try {
                const response = await fetch("http://localhost:5001/api/contacto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, phone, message })
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert("Mensaje enviado correctamente, te responderemos pronto", "success");
                    contactForm.reset();
                } else {
                    showAlert(data.message || "Error al enviar el mensaje", "error");
                }
            } catch (error) {
                showAlert("Error en el servidor. Intenta más tarde", "error");
                console.error("❌ Error en el envío:", error);
            }
        });
    }

    function showAlert(message, type) {
        const alertBox = document.createElement("div");
        alertBox.className = `alert ${type}`;
        alertBox.textContent = message;

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});

