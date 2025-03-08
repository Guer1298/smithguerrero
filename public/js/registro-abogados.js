const bcrypt = require("bcrypt");
app.post("/api/auth/registro-abogado", async (req, res) => {
    const { nombre, email, tarjeta_profesional, especialidad, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await pool.query("INSERT INTO abogados (nombre, email, tarjeta_profesional, especialidad, password) VALUES ($1, $2, $3, $4, $5)", 
        [nombre, email, tarjeta_profesional, especialidad, hashedPassword]);
        res.json({ msg: "Registro exitoso" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
});
