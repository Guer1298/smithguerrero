const express = require("express");
const router = express.Router();
const { enviarMensaje } = require("../controllers/contactController");

router.post("/contacto", enviarMensaje);

module.exports = router;
