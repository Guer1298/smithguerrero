const cors = require("cors");

const corsConfig = cors({
    origin: "http://localhost:5500", // ⚡ Puerto de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
});

module.exports = corsConfig;
