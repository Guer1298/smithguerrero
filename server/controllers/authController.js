const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password || !rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "El correo ya está registrado." });
        }

        // 🔐 Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Contraseña encriptada:", hashedPassword);  // 👀 Debug

        // 📌 Guardar usuario con la contraseña encriptada
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword, // Guardar encriptada
            rol
        });

        res.status(201).json({ message: "✅ Usuario registrado con éxito", user: newUser });
    } catch (error) {
        console.error("🚨 Error en el registro:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};


// 📌 Función para Iniciar Sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 📌 Buscar el usuario en la BD
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        console.log("📌 Usuario encontrado:", user.email);
        console.log("🔹 Contraseña ingresada:", password);
        console.log("🔹 Contraseña en BD:", user.password);

        // 📌 Comparar la contraseña ingresada con la encriptada en BD
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔹 ¿Contraseña coincide?", isMatch);

        if (!isMatch) {
            console.log("🚨 Contraseña incorrecta para el usuario:", user.email);
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // 📌 Generar token con JWT
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, rol: user.rol, nombre: user.nombre });
    } catch (error) {
        console.error("🚨 Error en el login:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};





