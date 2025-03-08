const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // O tu usuario de PostgreSQL
  host: 'localhost',
  database: 'smithguerrero', // Debe coincidir con el nombre de la BD
  password: 'mapi123', // Asegúrate de que la contraseña es correcta
  port: 5432, // Puerto por defecto de PostgreSQL
});

pool.connect()
  .then(() => console.log('✅ Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión a PostgreSQL:', err));

module.exports = pool;
