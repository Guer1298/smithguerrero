const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.connect()
    .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
    .catch(err => console.error("❌ Error de conexión a PostgreSQL:", err));

module.exports = pool;
