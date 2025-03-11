const express = require("express");
const { getAllCitas, getCitaById, createCita, deleteCita } = require("../controllers/citaController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Rutas protegidas con autenticación
router.get("/", authMiddleware, getAllCitas);
router.get("/:id", authMiddleware, getCitaById);
router.post("/", authMiddleware, createCita);
router.delete("/:id", authMiddleware, deleteCita);

module.exports = router;
