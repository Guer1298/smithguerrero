document.addEventListener("DOMContentLoaded", () => {
    cargarComponentes();
});

function cargarComponentes() {
    fetch("components/navbar.html")
        .then(response => response.text())
        .then(data => document.getElementById("navbar-container").innerHTML = data);

    fetch("components/footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);
}
