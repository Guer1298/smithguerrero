document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Alternar visibilidad de contraseñas
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            const type = passwordInput.type === "password" ? "text" : "password";
            passwordInput.type = type;
            this.classList.toggle("fa-eye-slash");
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener("click", function () {
            const type = confirmPasswordInput.type === "password" ? "text" : "password";
            confirmPasswordInput.type = type;
            this.classList.toggle("fa-eye-slash");
        });
    }

    // Validación y envío del formulario
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Simulación de registro exitoso
        registerForm.querySelector(".btn").innerHTML = "Registrando...";
        setTimeout(() => {
            alert("Registro exitoso. Redirigiendo al panel de abogados.");
            window.location.href = "dashboard.html";
        }, 1500);
    });
});
