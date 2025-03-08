require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const citaRoutes = require("./routes/citaRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api", contactRoutes);

// WebSockets
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("mensaje", (msg) => {
        io.emit("mensaje", msg);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});



// Ruta para manejar el formulario de contacto
app.post('/enviar-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Usa variables de entorno
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
        to: 'smithguerrero.legal@gmail.com', // Tu correo donde recibirás los mensajes
        subject: `Nuevo mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



