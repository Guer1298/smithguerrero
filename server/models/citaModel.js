const { Pool } = require("pg");
require("dotenv").config();

// 📌 Conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// 📌 Definir Modelo de Citas
const Cita = {
    getAllCitas: async () => {
        try {
            const result = await pool.query("SELECT * FROM citas");
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    getCitaById: async (id) => {
        try {
            const result = await pool.query("SELECT * FROM citas WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    createCita: async (cliente_id, abogado_id, fecha, motivo) => {
        try {
            const result = await pool.query(
                "INSERT INTO citas (cliente_id, abogado_id, fecha, motivo) VALUES ($1, $2, $3, $4) RETURNING *",
                [cliente_id, abogado_id, fecha, motivo]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    deleteCita: async (id) => {
        try {
            await pool.query("DELETE FROM citas WHERE id = $1", [id]);
            return { msg: "Cita eliminada correctamente" };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Cita;
