const pool = require("../models/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const result = await pool.query("SELECT * FROM abogados WHERE email = $1", [email]);

      if (result.rows.length === 0) {
          return res.status(401).json({ msg: "Usuario no encontrado" });
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ msg: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, userId: user.id });

  } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ msg: "Error en el servidor" });
  }
};



// ✅ Asegurar que register también está definido
exports.register = async (req, res) => {
    const { nombre, email, password, telefono, especialidad, tarjeta_profesional } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            "INSERT INTO abogados (nombre, email, telefono, especialidad, tarjeta_profesional, password) VALUES ($1, $2, $3, $4, $5, $6)",
            [nombre, email, telefono, especialidad, tarjeta_profesional, hashedPassword]
        );

        res.status(201).json({ msg: "Abogado registrado exitosamente" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }

    
  
};
