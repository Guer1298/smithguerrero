const pool = require("./database");

const crearUsuario = async (nombre, email, password) => {
  const query = "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *";
  const values = [nombre, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerUsuarios = async () => {
  const result = await pool.query("SELECT id, nombre, email FROM usuarios");
  return result.rows;
};

module.exports = { crearUsuario, obtenerUsuarios };
