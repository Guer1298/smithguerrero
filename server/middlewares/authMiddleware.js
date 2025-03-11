const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado: No hay token" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Guardar usuario en la request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};

// 📌 Middleware para validar roles específicos
exports.checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: "Acceso no autorizado para este rol" });
        }
        next();
    };
};

module.exports = authMiddleware;
