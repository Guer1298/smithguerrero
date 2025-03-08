const db = require('../models/database');

exports.obtenerCasosPorAbogado = async (req, res) => {
    try {
        const abogadoId = req.user.id; // ID del abogado autenticado
        const casos = await db.query("SELECT * FROM casos WHERE abogado_id = $1", [abogadoId]);
        res.json(casos.rows);
    } catch (error) {
        console.error("Error al obtener casos:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
