const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/database"); // ✅ Mantén esta única importación de la base de datos
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 🚀 Asegúrate de que esté con "POST"
router.post("/register", register);
router.post("/login", login);

// 📌 Login de abogados
router.post("/login-abogado", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 📌 Verificar si el abogado existe en la base de datos
        const result = await pool.query("SELECT * FROM abogados WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ msg: "Correo no registrado" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Credenciales inválidas" });
        }

        // 📌 Generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, abogado: user });

    } catch (error) {
        console.error("❌ Error en login de abogado:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
});

// 📌 Ruta protegida con Middleware de Autenticación
router.get("/perfil", authMiddleware, (req, res) => {
    res.json({ message: "Acceso autorizado", user: req.user });
});

module.exports = router;
