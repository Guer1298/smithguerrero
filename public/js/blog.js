document.addEventListener("DOMContentLoaded", () => {
    
     
    
    
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
       🔍 2. FILTRO DE ARTÍCULOS EN TIEMPO REAL
    ============================ */
    const searchInput = document.getElementById("search-blog");
    const categoryFilter = document.getElementById("filter-category");
    const blogPosts = document.querySelectorAll(".blog-post");

    function filtrarArticulos() {
        const query = searchInput.value.toLowerCase();
        blogPosts.forEach(post => {
            const title = post.querySelector("h3").innerText.toLowerCase();
            post.style.display = title.includes(query) ? "block" : "none";
        });
    }

    function filtrarCategoria() {
        const category = categoryFilter.value;
        blogPosts.forEach(post => {
            if (category === "all" || post.classList.contains(category)) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("keyup", filtrarArticulos);
    categoryFilter.addEventListener("change", filtrarCategoria);


    /* ============================
       📩 4. FORMULARIO DE SUSCRIPCIÓN
    ============================ */
    const subscribeForm = document.getElementById("subscribe-form");

    if (subscribeForm) {
        subscribeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector("input");
            const email = emailInput.value.trim();

            if (!validarEmail(email)) {
                mostrarMensaje("Por favor, introduce un correo válido.", "error");
                return;
            }

            mostrarMensaje("¡Gracias por suscribirte! 📩", "success");
            emailInput.value = "";
        });
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /* ============================
       📝 5. MANEJO DE COMENTARIOS
    ============================ */
    const commentForm = document.querySelector(".blog-comments textarea");
    const commentButton = document.querySelector(".blog-comments .btn");
    const commentsList = document.querySelector(".comments-list");

    function cargarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        commentsList.innerHTML = comentarios.map(comentario => 
            `<p><strong>${comentario.nombre}:</strong> ${comentario.mensaje}</p>`
        ).join("");
    }

    if (commentButton) {
        commentButton.addEventListener("click", () => {
            const comentario = commentForm.value.trim();
            if (!comentario) {
                mostrarMensaje("Escribe un comentario antes de enviarlo.", "error");
                return;
            }

            const nombre = "Usuario"; // Puedes personalizar esto con un campo de usuario
            const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
            comentarios.push({ nombre, mensaje: comentario });
            localStorage.setItem("comentarios", JSON.stringify(comentarios));

            commentForm.value = "";
            cargarComentarios();
            mostrarMensaje("Comentario agregado. 💬", "success");
        });

        cargarComentarios();
    }

    /* ============================
       📜 6. PAGINACIÓN DE ARTÍCULOS
    ============================ */
    const articlesPerPage = 3;
    let currentPage = 1;
    const articles = Array.from(blogPosts);
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const prevButton = document.querySelector(".pagination .prev");
    const nextButton = document.querySelector(".pagination .next");

    function mostrarPagina(page) {
        articles.forEach((article, index) => {
            article.style.display = (index >= (page - 1) * articlesPerPage && index < page * articlesPerPage) 
                ? "block" : "none";
        });
        prevButton.style.display = page === 1 ? "none" : "inline-block";
        nextButton.style.display = page === totalPages ? "none" : "inline-block";
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                mostrarPagina(currentPage);
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                mostrarPagina(currentPage);
            }
        });

        mostrarPagina(currentPage);
    }

    /* ============================
       🔥 7. MENSAJES DE ESTADO
    ============================ */
    function mostrarMensaje(mensaje, tipo) {
        const mensajeBox = document.createElement("div");
        mensajeBox.classList.add("mensaje-box", tipo);
        mensajeBox.textContent = mensaje;

        document.body.appendChild(mensajeBox);

        setTimeout(() => {
            mensajeBox.classList.add("mostrar");
        }, 100);

        setTimeout(() => {
            mensajeBox.classList.remove("mostrar");
            setTimeout(() => mensajeBox.remove(), 500);
        }, 4000);
    }

    /* ============================
       🎯 8. SCROLL SUAVE PARA ENLACES
    ============================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

}); // Fin del DOMContentLoaded
