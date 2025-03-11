const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP
    message: "Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde.",
    headers: true,
});

module.exports = limiter;
