const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // 🔹 Importar sequelize correctamente

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("administrador", "abogado", "asistente", "cliente"),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User;
