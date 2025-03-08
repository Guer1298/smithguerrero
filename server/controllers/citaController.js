const { crearCita, obtenerCitasPorUsuario } = require("../models/citaModel");

const nuevaCita = async (req, res) => {
  try {
    const { usuario_id, fecha, motivo } = req.body;
    const cita = await crearCita(usuario_id, fecha, motivo);
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};

const listarCitas = async (req, res) => {
  try {
    const { id } = req.params;
    const citas = await obtenerCitasPorUsuario(id);
    res.json(citas);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};

module.exports = { nuevaCita, listarCitas };
