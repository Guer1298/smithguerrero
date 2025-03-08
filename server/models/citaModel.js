const pool = require("./database");

const crearCita = async (usuario_id, fecha, motivo) => {
  const query = "INSERT INTO citas (usuario_id, fecha, motivo) VALUES ($1, $2, $3) RETURNING *";
  const values = [usuario_id, fecha, motivo];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerCitasPorUsuario = async (usuario_id) => {
  const query = "SELECT * FROM citas WHERE usuario_id = $1";
  const result = await pool.query(query, [usuario_id]);
  return result.rows;
};

module.exports = { crearCita, obtenerCitasPorUsuario };
