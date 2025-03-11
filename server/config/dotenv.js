const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Exportar configuración
module.exports = {
    port: process.env.PORT || 5003,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432,
    },
};
