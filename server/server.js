require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { connectDB, sequelize } = require("./config/db"); // 🔹 Importar correctamente
const User = require("./models/User"); // 🔹 Importar modelo para sincronizarlo

// 🔥 Importar Middlewares
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const corsConfig = require("./middlewares/corsConfig");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const citaRoutes = require("./routes/citaRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api", contactRoutes);

// 🛡 Habilitar CORS correctamente
app.use(cors({
    origin: "http://localhost:5500", // Cambia esto según tu frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// 📌 Conectar a la base de datos
connectDB();

// 📌 Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Modelos sincronizados con PostgreSQL"))
    .catch(err => console.error("❌ Error en la sincronización:", err));

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
