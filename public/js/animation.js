document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 1000 });

    gsap.from(".hero-content h1", { opacity: 0, y: -50, duration: 1.2 });
    gsap.from(".hero-content p", { opacity: 0, y: 50, duration: 1.2, delay: 0.3 });
});
