const express = require("express");
const { nuevaCita, listarCitas } = require("../controllers/citaController");

const router = express.Router();

router.post("/crearCita", nuevaCita);
router.get("/:id", listarCitas);

module.exports = router;
