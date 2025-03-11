const Cita = require("../models/citaModel");

// 📌 Obtener todas las citas
exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.getAllCitas();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener citas" });
    }
};

// 📌 Obtener una cita por ID
exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.getCitaById(req.params.id);
        if (!cita) return res.status(404).json({ msg: "Cita no encontrada" });
        res.json(cita);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener cita" });
    }
};

// 📌 Crear nueva cita
exports.createCita = async (req, res) => {
    const { cliente_id, abogado_id, fecha, motivo } = req.body;

    try {
        const newCita = await Cita.createCita(cliente_id, abogado_id, fecha, motivo);
        res.status(201).json(newCita);
    } catch (error) {
        res.status(500).json({ error: "Error al crear cita" });
    }
};

// 📌 Eliminar cita
exports.deleteCita = async (req, res) => {
    try {
        const result = await Cita.deleteCita(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar cita" });
    }
};
