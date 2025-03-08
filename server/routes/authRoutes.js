const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/database");
const { login, register } = require("../controllers/authController"); // ❌ Puede ser un problema aquí

const router = express.Router();

router.post("/login", login);
router.post("/register", register); 

// Login de Abogados
router.post("/login-abogado", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM abogados WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, "secreto", { expiresIn: "1h" });
                res.json({ token, abogado: user });
            } else {
                res.status(400).json({ msg: "Credenciales inválidas" });
            }
        } else {
            res.status(400).json({ msg: "Correo no registrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
});

module.exports = router;
