// Backend: Rutas para el dashboard (server/routes/dashboardRoutes.js)
const express = require('express');
const router = express.Router();
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware');
const DashboardController = require('../controllers/dashboardController');

// Rutas protegidas por autenticación y rol de administrador
router.get('/estadisticas', verificarToken, esAdmin, DashboardController.obtenerEstadisticas);
router.get('/usuarios', verificarToken, esAdmin, DashboardController.listarUsuarios);
router.post('/usuarios', verificarToken, esAdmin, DashboardController.crearUsuario);
router.put('/usuarios/:id', verificarToken, esAdmin, DashboardController.editarUsuario);
router.delete('/usuarios/:id', verificarToken, esAdmin, DashboardController.eliminarUsuario);
router.get('/citas', verificarToken, esAdmin, DashboardController.listarCitas);
router.put('/citas/:id', verificarToken, esAdmin, DashboardController.actualizarCita);
router.get('/reportes/pdf', verificarToken, esAdmin, DashboardController.generarReportePDF);
router.get('/notificaciones', verificarToken, esAdmin, DashboardController.obtenerNotificaciones);

module.exports = router;

// Backend: Controlador del dashboard (server/controllers/dashboardController.js)
const Usuario = require('../models/usuarioModel');
const Cita = require('../models/citaModel');
const jsPDF = require('jspdf');

exports.obtenerEstadisticas = async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const totalCitas = await Cita.countDocuments();
        res.json({ totalUsuarios, totalCitas });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error });
    }
};

exports.generarReportePDF = (req, res) => {
    const doc = new jsPDF();
    doc.text('Reporte de Citas y Usuarios', 10, 10);
    doc.save('reporte_smithguerrero.pdf');
    res.json({ msg: 'Reporte generado con éxito' });
};

// Frontend: Interfaz del Dashboard (public/js/dashboard.js)
document.addEventListener("DOMContentLoaded", async () => {
    const estadisticasContainer = document.getElementById("estadisticas");
    const usuariosContainer = document.getElementById("usuarios-lista");
    
    try {
        const res = await fetch("/api/dashboard/estadisticas");
        const data = await res.json();
        estadisticasContainer.innerHTML = `<p>Total Usuarios: ${data.totalUsuarios}</p><p>Total Citas: ${data.totalCitas}</p>`;
    } catch (error) {
        console.error("Error obteniendo estadísticas", error);
    }
});