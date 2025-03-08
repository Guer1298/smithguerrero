const nodemailer = require("nodemailer");
require("dotenv").config();

// Función para enviar correo
exports.enviarMensaje = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Configurar transporte de Nodemailer (Usando Gmail en este caso)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Tu correo de envío
                pass: process.env.EMAIL_PASS  // Tu contraseña o app password
            }
        });

        // Configurar contenido del email
        const mailOptions = {
            from: `"SmithGuerrero Legal" <${process.env.EMAIL_USER}>`,
            to: "smithguerrero.legal@gmail.com", // Dirección que recibirá los mensajes
            subject: "Nuevo Mensaje desde la Página de Contacto",
            html: `
                <h2>Nuevo Mensaje de Contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Mensaje:</strong> ${message}</p>
            `
        };

        // Enviar email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: "Mensaje enviado con éxito" });

    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ message: "Error en el servidor, intenta más tarde" });
    }
};
