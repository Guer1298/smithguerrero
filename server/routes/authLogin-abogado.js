const jwt = require("jsonwebtoken");
app.post("/api/auth/login-abogado", async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM abogados WHERE email = $1", [email]);

    if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user.id, email: user.email }, "secreto", { expiresIn: "1h" });
            res.json({ token, abogado: user });
        } else {
            res.status(400).json({ msg: "Credenciales inválidas" });
        }
    } else {
        res.status(400).json({ msg: "Correo no registrado" });
    }
});
