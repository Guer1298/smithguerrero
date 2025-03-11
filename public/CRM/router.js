document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // 📌 Función para cargar páginas dinámicamente
    function loadPage(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                loadScript(page);
            })
            .catch(error => console.error("Error al cargar la página:", error));
    }

    // 📌 Cargar script correspondiente al módulo
    function loadScript(page) {
        const script = document.createElement("script");
        script.src = `js/${page}.js`;
        script.defer = true;
        document.body.appendChild(script);
    }

    // 📌 Capturar clicks en los enlaces del sidebar
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const page = event.target.dataset.route;
            history.pushState({}, "", `#${page}`);
            loadPage(page);
        });
    });

    // 📌 Manejar el cambio de URL manualmente
    window.addEventListener("popstate", () => {
        const page = location.hash.replace("#", "") || "clientes";
        loadPage(page);
    });

    // 📌 Cargar la página correcta al inicio
    const initialPage = location.hash.replace("#", "") || "clientes";
    loadPage(initialPage);
});

