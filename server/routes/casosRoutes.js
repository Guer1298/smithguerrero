const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { obtenerCasosPorAbogado } = require('../controllers/casosController');

router.get('/casos', authMiddleware, obtenerCasosPorAbogado);

module.exports = router;
