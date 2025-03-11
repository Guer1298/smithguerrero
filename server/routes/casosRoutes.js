const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// ✅ Solo los administradores pueden ver todos los casos
router.get("/todos", verifyToken, checkRole(["admin"]), async (req, res) => {
    // Lógica para obtener todos los casos
});

// ✅ Abogados y administradores pueden ver sus propios casos
router.get("/:id", verifyToken, checkRole(["admin", "abogado"]), async (req, res) => {
    // Lógica para obtener un caso específico
});

// ✅ Solo asistentes pueden registrar clientes
router.post("/crear-cliente", verifyToken, checkRole(["asistente"]), async (req, res) => {
    // Lógica para registrar cliente
});

module.exports = router;
