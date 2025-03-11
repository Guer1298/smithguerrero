const { Sequelize } = require("sequelize");
require("dotenv").config();

// 🔹 Configurar la conexión con PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        logging: false // Opcional: Desactiva logs de consultas en consola
    }
);

// 🔹 Función para conectar a la base de datos
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado a PostgreSQL correctamente.");
    } catch (error) {
        console.error("❌ Error en la conexión a PostgreSQL:", error);
        process.exit(1);
    }
}

// 🔹 Exportar `sequelize` y `connectDB`
module.exports = { sequelize, connectDB };

